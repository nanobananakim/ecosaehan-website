"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import { createPost } from "./actions";
import { MAX_FILE_BYTES, FILE_PREFIX, type BoardFile } from "@/lib/board";

export function WriteForm({ categories, defaultCategory }: { categories: string[]; defaultCategory: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const files = data.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

    const tooBig = files.find(f => f.size > MAX_FILE_BYTES);
    if (tooBig) {
      setStatus(`"${tooBig.name}" 파일이 20MB를 넘습니다.`);
      return;
    }

    setBusy(true);
    try {
      const uploaded: BoardFile[] = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        setStatus(`첨부 업로드 중 (${i + 1}/${files.length}) ${f.name}`);
        const ext = f.name.includes(".") ? f.name.slice(f.name.lastIndexOf(".")).slice(0, 12).replace(/[^\w.]/g, "") : "";
        const blob = await upload(`${FILE_PREFIX}${crypto.randomUUID()}${ext}`, f, {
          access: "private",
          handleUploadUrl: "/api/board/upload",
          multipart: f.size > 5 * 1024 * 1024,
        });
        uploaded.push({ name: f.name, pathname: blob.pathname, size: f.size });
      }
      setStatus("저장 중...");
      const res = await createPost({
        category: String(data.get("category")),
        title: String(data.get("title")),
        body: String(data.get("body")),
        files: uploaded,
      });
      if (!res.ok) {
        setStatus(res.error);
      } else {
        form.reset();
        setStatus("등록했어요.");
        router.refresh();
      }
    } catch (e) {
      setStatus(`실패: ${(e as Error).message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form ref={formRef} className="board-write" onSubmit={onSubmit}>
      <h3>글쓰기</h3>
      <select name="category" defaultValue={defaultCategory} aria-label="카테고리">
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input name="title" placeholder="제목" maxLength={200} required />
      <textarea name="body" placeholder="본문" rows={10} />
      <label className="board-file-input">첨부파일 (파일당 20MB까지)<input type="file" name="files" multiple /></label>
      <div className="board-write-actions">
        <span>{status}</span>
        <button className="button button-primary" type="submit" disabled={busy}>{busy ? "등록 중..." : "등록"}</button>
      </div>
    </form>
  );
}
