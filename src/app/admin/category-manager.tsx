"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { editCategory } from "./actions";
import type { CategoryGroup } from "@/lib/board";

export function CategoryManager({ groups }: { groups: CategoryGroup[] }) {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function run(input: Parameters<typeof editCategory>[0]) {
    setBusy(true);
    const res = await editCategory(input);
    setMsg(res.ok ? "저장했어요." : res.error);
    setBusy(false);
    if (res.ok) router.refresh();
  }

  const add = (group?: string) => {
    const name = window.prompt(group ? `"${group}" 아래에 추가할 이름` : "새 카테고리 이름");
    if (name) void run({ op: "add", name, group });
  };
  const rename = (name: string) => {
    const to = window.prompt("새 이름", name);
    if (to && to !== name) void run({ op: "rename", name, to });
  };
  const remove = (name: string) => {
    if (window.confirm(`"${name}" 카테고리를 삭제할까요? (글이 있으면 삭제되지 않아요)`)) void run({ op: "delete", name });
  };

  return (
    <details className="board-cats">
      <summary>카테고리 관리</summary>
      {groups.map(g => (
        <div key={g.name} className="board-cat-group">
          <div className="board-cat-row strong"><span>{g.name}</span>
            <button type="button" disabled={busy} onClick={() => add(g.name)}>하위 추가</button>
            <button type="button" disabled={busy} onClick={() => rename(g.name)}>이름수정</button>
            <button type="button" disabled={busy} onClick={() => remove(g.name)}>삭제</button>
          </div>
          {g.items.map(i => (
            <div key={i} className="board-cat-row sub"><span>{i}</span>
              <button type="button" disabled={busy} onClick={() => rename(i)}>이름수정</button>
              <button type="button" disabled={busy} onClick={() => remove(i)}>삭제</button>
            </div>
          ))}
        </div>
      ))}
      <div className="board-cat-foot">
        <button type="button" disabled={busy} onClick={() => add()}>+ 카테고리 추가</button>
        <span>{msg}</span>
      </div>
    </details>
  );
}
