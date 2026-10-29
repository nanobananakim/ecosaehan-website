import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Footer, Header } from "../../site";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getGroups, writableCategories } from "@/lib/board";
import { WriteForm } from "../write-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "글쓰기 | 에코새한", robots: { index: false, follow: false } };

export default async function WritePage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin");
  const { c } = await searchParams;
  const categories = writableCategories(await getGroups());
  // a selected group name falls back to the first category
  const defaultCategory = c && categories.includes(c) ? c : categories[0];

  return (
    <>
      <Header />
      <section className="section-pad board-section">
        <div className="board-top">
          <h2>글쓰기</h2>
          <Link href="/admin" className="button button-outline">목록</Link>
        </div>
        {categories.length === 0 ? (
          <p className="board-empty">카테고리가 없어요. 목록 화면 아래 "카테고리 관리"에서 먼저 만들어 주세요.</p>
        ) : (
          <WriteForm categories={categories} defaultCategory={defaultCategory} />
        )}
      </section>
      <Footer />
    </>
  );
}
