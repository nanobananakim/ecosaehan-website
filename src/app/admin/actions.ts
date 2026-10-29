"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { ADMIN_COOKIE_NAME, adminSessionToken, isAdminAuthenticated } from "@/lib/adminAuth";
import { revalidatePath } from "next/cache";
import { CATEGORIES_PATH, FILE_PREFIX, MAX_FILE_BYTES, POST_PREFIX, getGroups, listPosts, writableCategories, type BoardFile, type CategoryGroup } from "@/lib/board";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct || password !== correct) {
    redirect("/admin?error=1");
  }

  (await cookies()).set(ADMIN_COOKIE_NAME, adminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // no maxAge: a session cookie, so closing the browser logs out
  });

  redirect("/admin");
}

export async function logout() {
  (await cookies()).set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  redirect("/admin");
}

export async function createPost(input: {
  category: string;
  title: string;
  body: string;
  files: BoardFile[];
}): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "로그인이 필요합니다." };

  const title = input.title.trim();
  const body = input.body.trim();
  if (!title) return { ok: false, error: "제목을 입력해 주세요." };
  if (!writableCategories(await getGroups()).includes(input.category)) return { ok: false, error: "카테고리를 선택해 주세요." };
  if (input.files.length > 20) return { ok: false, error: "첨부는 최대 20개까지입니다." };

  const files: BoardFile[] = [];
  for (const f of input.files) {
    if (!f.pathname.startsWith(FILE_PREFIX) || f.pathname.includes("..") || f.size > MAX_FILE_BYTES) {
      return { ok: false, error: "첨부 파일 정보가 올바르지 않습니다." };
    }
    files.push({ name: String(f.name).slice(0, 200), pathname: f.pathname, size: f.size });
  }

  const id = randomUUID();
  await put(
    `${POST_PREFIX}${id}.json`,
    JSON.stringify({ id, category: input.category, title: title.slice(0, 200), body, files, createdAt: new Date().toISOString() }),
    { access: "private", contentType: "application/json", addRandomSuffix: false },
  );
  return { ok: true, id };
}

async function saveGroups(groups: CategoryGroup[]) {
  await put(CATEGORIES_PATH, JSON.stringify(groups), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
  revalidatePath("/admin");
}

type CatResult = { ok: true } | { ok: false; error: string };

// op: add (name, optional group = add as sub-item), rename (name -> to), delete (name; only when it has no posts)
export async function editCategory(input: { op: "add" | "rename" | "delete"; name: string; group?: string; to?: string }): Promise<CatResult> {
  if (!(await isAdminAuthenticated())) return { ok: false, error: "로그인이 필요합니다." };
  const name = input.name.trim().slice(0, 40);
  if (!name) return { ok: false, error: "이름을 입력해 주세요." };
  const groups = (await getGroups()).map(g => ({ name: g.name, items: [...g.items] }));
  const taken = new Set(groups.flatMap(g => [g.name, ...g.items]));

  if (input.op === "add") {
    if (taken.has(name)) return { ok: false, error: "이미 있는 이름입니다." };
    if (input.group) {
      const g = groups.find(x => x.name === input.group);
      if (!g) return { ok: false, error: "상위 카테고리를 찾을 수 없습니다." };
      if (g.items.length === 0 && (await listPosts()).some(p => p.category === g.name)) {
        return { ok: false, error: "이 카테고리에 글이 있어서 하위를 만들 수 없습니다. 먼저 글을 옮기거나 삭제해 주세요." };
      }
      g.items.push(name);
    } else {
      groups.push({ name, items: [] });
    }
    await saveGroups(groups);
    return { ok: true };
  }

  const posts = await listPosts();
  if (input.op === "rename") {
    const to = (input.to ?? "").trim().slice(0, 40);
    if (!to) return { ok: false, error: "새 이름을 입력해 주세요." };
    if (to !== name && taken.has(to)) return { ok: false, error: "이미 있는 이름입니다." };
    let found = false;
    for (const g of groups) {
      if (g.name === name) { g.name = to; found = true; }
      const i = g.items.indexOf(name);
      if (i >= 0) { g.items[i] = to; found = true; }
    }
    if (!found) return { ok: false, error: "카테고리를 찾을 수 없습니다." };
    // posts keep the category name inside the post file, so move them to the new name
    for (const p of posts.filter(x => x.category === name)) {
      await put(`${POST_PREFIX}${p.id}.json`, JSON.stringify({ ...p, category: to }), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true });
    }
    await saveGroups(groups);
    return { ok: true };
  }

  // delete
  const group = groups.find(g => g.name === name);
  const doomed = group ? (group.items.length ? group.items : [group.name]) : [name];
  if (posts.some(p => doomed.includes(p.category))) return { ok: false, error: "글이 있는 카테고리는 지울 수 없습니다. 글을 먼저 정리해 주세요." };
  const next = group
    ? groups.filter(g => g.name !== name)
    : groups.map(g => ({ ...g, items: g.items.filter(i => i !== name) }));
  if (next.length === groups.length && next.every((g, i) => g.items.length === groups[i].items.length)) return { ok: false, error: "카테고리를 찾을 수 없습니다." };
  await saveGroups(next);
  return { ok: true };
}
