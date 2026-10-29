import { get, list } from "@vercel/blob";

export const MAX_FILE_BYTES = 20 * 1024 * 1024;
export const POST_PREFIX = "board/posts/";
export const FILE_PREFIX = "board/files/";

export type BoardFile = { name: string; pathname: string; size: number };
export type BoardPost = {
  id: string;
  category: string;
  title: string;
  body: string;
  files: BoardFile[];
  createdAt: string;
};

export type CategoryGroup = { name: string; items: string[] };

export const DEFAULT_GROUPS: CategoryGroup[] = [];

export const CATEGORIES_PATH = "board/categories.json";

// Categories live in a blob so the admin can edit them; the defaults apply until the first edit.
export async function getGroups(): Promise<CategoryGroup[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return DEFAULT_GROUPS;
  try {
    const res = await get(CATEGORIES_PATH, { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return DEFAULT_GROUPS;
    const groups = JSON.parse(await new Response(res.stream).text()) as CategoryGroup[];
    return Array.isArray(groups) ? groups : DEFAULT_GROUPS;
  } catch {
    return DEFAULT_GROUPS;
  }
}

// Every category a post can be written in (a group with no sub-items is itself a category).
export const writableCategories = (groups: CategoryGroup[]) => groups.flatMap(g => (g.items.length ? g.items : [g.name]));

// Categories shown when a sidebar entry is selected: all, one group, or one sub-item.
export function categoriesFor(groups: CategoryGroup[], selected: string | undefined): string[] | null {
  if (!selected) return null;
  const group = groups.find(g => g.name === selected);
  if (group) return group.items.length ? group.items : [group.name];
  return writableCategories(groups).includes(selected) ? [selected] : null;
}

// Posts from the last 3 days get an N badge.
export const isNew = (iso: string) => Date.now() - new Date(iso).getTime() < 3 * 86400000;

async function readPost(pathname: string): Promise<BoardPost | null> {
  try {
    const res = await get(pathname, { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return null;
    return JSON.parse(await new Response(res.stream).text()) as BoardPost;
  } catch {
    return null;
  }
}

export async function listPosts(): Promise<BoardPost[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  const blobs: { pathname: string }[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: POST_PREFIX, cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  const posts = await Promise.all(blobs.map(b => readPost(b.pathname)));
  return posts
    .filter((p): p is BoardPost => !!p)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPost(id: string): Promise<BoardPost | null> {
  if (!/^[0-9a-f-]{36}$/.test(id) || !process.env.BLOB_READ_WRITE_TOKEN) return null;
  return readPost(`${POST_PREFIX}${id}.json`);
}
