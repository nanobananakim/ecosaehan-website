import type { Metadata } from "next";
import Link from "next/link";
import { Download, Eye, Folder } from "lucide-react";
import { Footer, Header } from "../site";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { categoriesFor, getGroups, getPost, isNew, listPosts, writableCategories } from "@/lib/board";
import { login, logout } from "./actions";
import { CategoryManager } from "./category-manager";
import { WriteForm } from "./write-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "관리자 | 에코새한", robots: { index: false, follow: false } };

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\.\s*/g, ".");
const fmtSize = (n: number) => (n >= 1048576 ? `${(n / 1048576).toFixed(1)}MB` : `${Math.max(1, Math.round(n / 1024))}KB`);

const previewable = (name: string) => /.(png|jpe?g|gif|webp|pdf)$/i.test(name);
const fileUrl = (f: { pathname: string; name: string }, inline = false) =>
  `/api/board/file?p=${encodeURIComponent(f.pathname)}&n=${encodeURIComponent(f.name)}${inline ? "&inline=1" : ""}`;

export default async function Admin({ searchParams }: { searchParams: Promise<{ error?: string; c?: string; p?: string }> }) {
  const { error, c, p } = await searchParams;

  if (!(await isAdminAuthenticated())) {
    return (
      <>
        <Header />
        <section className="section-pad admin-section">
          <form className="admin-login" action={login}>
            <p className="eyebrow"><span />ADMIN</p>
            <h2>관리자 로그인</h2>
            <input type="password" name="password" placeholder="비밀번호" autoComplete="current-password" autoFocus required />
            <button className="button button-primary" type="submit">확인</button>
            {error && <p className="admin-error">비밀번호가 일치하지 않습니다</p>}
          </form>
        </section>
        <Footer />
      </>
    );
  }

  const groups = await getGroups();
  const writable = writableCategories(groups);
  const wanted = categoriesFor(groups, c);
  const selected = wanted ? c : undefined;
  const [all, post] = await Promise.all([listPosts(), p ? getPost(p) : Promise.resolve(null)]);
  const posts = wanted ? all.filter(x => wanted.includes(x.category)) : all;
  const countOf = (cats: string[]) => all.filter(x => cats.includes(x.category)).length;
  const href = (cat?: string, id?: string) => {
    const q = [cat && `c=${encodeURIComponent(cat)}`, id && `p=${id}`].filter(Boolean).join("&");
    return q ? `/admin?${q}` : "/admin";
  };
  const defaultCategory = wanted?.[0] ?? writable[0];

  return (
    <>
      <Header />
      <section className="section-pad board-section">
        <div className="board-top">
          <h2>자료실</h2>
          <form action={logout}><button type="submit" className="button button-outline">로그아웃</button></form>
        </div>
        <div className="board-layout">
          <nav className="board-nav" aria-label="카테고리">
            <p className="board-nav-title">카테고리</p>
            <Link href={href()} className={!selected ? "on strong" : "strong"}>전체보기 <span>({all.length})</span></Link>
            {groups.map(g => (
              <div key={g.name}>
                <Link href={href(g.name)} className={selected === g.name ? "on strong" : "strong"}>{g.name} <span>({countOf(g.items.length ? g.items : [g.name])})</span></Link>
                {g.items.map(item => (
                  <Link key={item} href={href(item)} className={selected === item ? "on sub" : "sub"}>{item} <span>({countOf([item])})</span></Link>
                ))}
              </div>
            ))}
          </nav>

          <div className="board-main">
            {p && !post && <p className="board-empty">글을 찾을 수 없어요.</p>}
            {post && (
              <article className="board-post">
                <p className="board-post-cat">{post.category}</p>
                <h3>{post.title}</h3>
                <p className="board-post-date">{fmtDate(post.createdAt)}</p>
                <div className="board-post-body">{post.body}</div>
                {post.files.map(f => (
                  <div key={f.pathname} className="board-attach">
                    <Folder size={20} /><span>{f.name} <small>{fmtSize(f.size)}</small></span>
                    {previewable(f.name) && <a href={fileUrl(f, true)} target="_blank" rel="noopener" className="board-attach-btn"><Eye size={16} />미리보기</a>}
                    <a href={fileUrl(f)} download className="board-attach-btn"><Download size={16} />다운로드</a>
                  </div>
                ))}
                <Link className="button button-outline board-back" href={href(selected)}>목록</Link>
              </article>
            )}

            <ul className="board-list">
              {posts.length === 0 && <li className="board-empty">아직 글이 없어요.</li>}
              {posts.map(x => (
                <li key={x.id} className={x.id === p ? "on" : undefined}>
                  <Link href={href(selected, x.id)}>{x.title}{x.files.length > 0 && <Folder size={14} />}{isNew(x.createdAt) && <b className="board-new">N</b>}</Link>
                  <em>{x.category}</em>
                  <time>{fmtDate(x.createdAt)}</time>
                </li>
              ))}
            </ul>

            <CategoryManager groups={groups} />
            <WriteForm key={defaultCategory} categories={writable} defaultCategory={defaultCategory} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
