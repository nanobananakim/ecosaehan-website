import fs from "node:fs";
import path from "node:path";

export type DocumentFile = {
  name: string;
  title: string;
  url: string;
  ext: string;
  size: number;
  modified: string;
};

export function listDocuments(publicDir: string): DocumentFile[] {
  const absDir = path.join(process.cwd(), "public", publicDir);
  try {
    let titles: Record<string, string> = {};
    try {
      titles = JSON.parse(fs.readFileSync(path.join(absDir, "titles.json"), "utf-8"));
    } catch {}

    return fs
      .readdirSync(absDir)
      .filter(file => !file.startsWith(".") && file !== "titles.json")
      .map(file => {
        const stat = fs.statSync(path.join(absDir, file));
        return {
          name: file,
          title: titles[file] ?? path.basename(file, path.extname(file)),
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
