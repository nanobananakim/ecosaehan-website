import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

export function listImages(publicDir: string): string[] {
  const absDir = path.join(process.cwd(), "public", publicDir);
  try {
    return fs
      .readdirSync(absDir)
      .filter(file => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
      .sort()
      .map(file => `/${publicDir}/${file}`);
  } catch {
    return [];
  }
}

export function findImage(publicDir: string, baseName: string): string | null {
  const absDir = path.join(process.cwd(), "public", publicDir);
  try {
    const match = fs
      .readdirSync(absDir)
      .find(file => file.startsWith(`${baseName}.`) && IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()));
    return match ? `/${publicDir}/${match}` : null;
  } catch {
    return null;
  }
}
