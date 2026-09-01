import fs from "node:fs";
import path from "node:path";

export type DocumentFile = {
  name: string;
  title: string;
  category: string;
  url: string;
  ext: string;
  size: number;
  modified: string;
};

export const DOCUMENT_CATEGORIES = ["보행매트", "화물차탄력바", "수목천연밴드", "지주목결속바", "하우스밴드", "기타"] as const;

export function listDocuments(publicDir: string): DocumentFile[] {
  const absDir = path.join(process.cwd(), "public", publicDir);
  try {
    let titles: Record<string, string> = {};
    try {
      titles = JSON.parse(fs.readFileSync(path.join(absDir, "titles.json"), "utf-8"));
    } catch {}
    let categories: Record<string, string> = {};
    try {
      categories = JSON.parse(fs.readFileSync(path.join(absDir, "categories.json"), "utf-8"));
    } catch {}

    return fs
      .readdirSync(absDir)
      .filter(file => !file.startsWith(".") && file !== "titles.json" && file !== "categories.json")
      .map(file => {
        const stat = fs.statSync(path.join(absDir, file));
        return {
          name: file,
          title: titles[file] ?? path.basename(file, path.extname(file)),
          category: categories[file] ?? "기타",
          url: `/${publicDir}/${file}`,
          ext: path.extname(file).slice(1).toLowerCase(),
          size: stat.size,
          modified: stat.mtime.toISOString()
        };
      })
      .sort((a, b) => b.modified.localeCompare(a.modified));
  } catch {
    return [];
  }
}
