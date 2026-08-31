import fs from "node:fs";
import path from "node:path";

export type DocumentFile = {
  name: string;
  url: string;
  ext: string;
  size: number;
  modified: string;
};

export function listDocuments(publicDir: string): DocumentFile[] {
  const absDir = path.join(process.cwd(), "public", publicDir);
  try {
    return fs
      .readdirSync(absDir)
      .filter(file => !file.startsWith("."))
      .map(file => {
        const stat = fs.statSync(path.join(absDir, file));
        return {
          name: file,
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
