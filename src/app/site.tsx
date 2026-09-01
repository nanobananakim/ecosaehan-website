"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Download, Leaf, Link2, Mail, Menu, MessageCircle, Package, Phone, ShieldCheck, Truck, TreePine, X } from "lucide-react";
import { verifyAdminPassword } from "./admin/actions";
import type { DocumentFile } from "./document-utils";

const mats = [["26001347", "ESMAT30-6"], ["26001348", "ESMAT30-8"], ["26008048", "ESMAT30-10"], ["26008049", "ESMAT30-12"], ["26001349", "ESMAT30-15"]];
const pins = [["25991808", "ES-PIN-200"], ["25991809", "ES-PIN-250"], ["25985301", "ES-IPIN-250"], ["25985288", "ES-7PIN-200"], ["25985289", "ES-UPIN-200"]];
const deliveries = [
  ["2026-05-06", "경주시 사적관리사무소", "문화유적지 보행로 정비"],
  ["2026-05-15", "대구광역시 달성군", "근린공원 둘레길 정비"],
  ["2026-05-28", "경주시", "도시공원 관리용 자재 공급"],
  ["2026-06-19", "대구광역시 달성군", "하천 정비 현장 자재 공급"]
];

export function Logo() {
  return <Link className="ci-logo" href="/" aria-label="에코새한 홈"><Image src="/logo-light.png" alt="에코새한" width={407} height={162} priority /></Link>;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [menuOpen]);
  const closeMenu = () => {
    setMenuOpen(false);
    setMobileSection(null);
  };
  const toggleSection = (section: string) => {
    setMobileSection(mobileSection === section ? null : section);
  };
  return <header className="site-header"><div className="nav-wrap"><Logo /><nav className={menuOpen ? "nav-links open" : "nav-links"}>
    <Link className="home-link" href="/" onClick={closeMenu}>HOME</Link>
    <Link className="mega-trigger" href="/about" onClick={closeMenu}>회사소개</Link>
    <button className="mega-trigger" type="button" aria-expanded={mobileSection === "products"} onClick={() => toggleSection("products")}>제품소개</button>
    <Link className="mega-trigger" href="/certifications" onClick={closeMenu}>인증·납품실적</Link>
    <button className="mega-trigger" type="button" aria-expanded={mobileSection === "support"} onClick={() => toggleSection("support")}>고객센터</button>
    <div className="mega-menu">
      <div className={`mega-column${mobileSection === "products" ? " open" : ""}`}><button className="mega-heading" type="button" aria-expanded={mobileSection === "products"} onClick={() => toggleSection("products")}>제품소개</button><div className="mega-items-wrap"><div className="mega-items"><Link href="/products/palm-mat" onClick={closeMenu}>보행매트(야자매트)</Link><Link href="/products/cargo-tension-bar" onClick={closeMenu}>화물차탄력바</Link><Link href="/products/tree-band" onClick={closeMenu}>수목천연밴드</Link><Link href="/products/tree-tie" onClick={closeMenu}>지주목결속바</Link><Link href="/products/house-band" onClick={closeMenu}>하우스밴드</Link></div></div></div>
      <div className={`mega-column${mobileSection === "support" ? " open" : ""}`}><button className="mega-heading" type="button" aria-expanded={mobileSection === "support"} onClick={() => toggleSection("support")}>고객센터</button><div className="mega-items-wrap"><div className="mega-items"><Link href="/contact" onClick={closeMenu}>문의하기</Link><Link href="/support/materials" onClick={closeMenu}>설계자료실</Link><Link href="/support/faq" onClick={closeMenu}>FAQ</Link></div></div></div>
    </div>
    <Link className="home-link" href="/admin" onClick={closeMenu}>관리자</Link>
  </nav><button className="menu-toggle" aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={menuOpen} onClick={() => { setMenuOpen(!menuOpen); setMobileSection(null); }}>{menuOpen ? <X /> : <Menu />}</button></div></header>;
}

export function Footer() {
  return <footer><div className="footer-inner"><div className="footer-company"><strong>에코새한</strong><p>에코새한은 100% 천연 야자섬유(코이어) 소재의 보행매트(야자매트) 전문 제조업체로서 품질경영을 기초로 생산 및 관리하고, 조달청 등록업체로서 관공서·공공기관에 신뢰할 수 있는 친환경 자재를 합리적인 가격으로 공급하며 지속적인 실적 확대를 통해 성장해 나가고 있습니다.</p></div><div className="footer-details"><span>주소: 경상북도 경산시 진량읍 아사길 81-14</span><span>TEL: 053-851-8702</span><span>FAX: 053-782-8702</span><span>MOBILE: 010-2669-8702</span><span>E-mail: ecosaehan@gmail.com</span></div><p className="copyright">COPYRIGHT © 2026 by ECO SAEHAN</p></div></footer>;
}

function Shell({ children }: { children: React.ReactNode }) { return <><Header />{children}<Footer /></>; }
function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span />{children}</p>; }
function SupportPlaceholderPage({ title }: { title: string }) { return <Shell><section className="section-pad"><div className="section-heading"><Eyebrow>SUPPORT</Eyebrow><h2>{title}</h2></div><p>준비 중입니다.</p></section></Shell>; }

function HeroSlider({ slides }: { slides: string[] }) {
  if (slides.length === 0) {
    return <div className="hero-slider hero-slider-empty"><p>배너 이미지가 준비되는 대로 표시됩니다.</p></div>;
  }

  if (slides.length === 1) {
    return <div className="hero-slider"><img className="hero-slider-static" src={slides[0]} alt="에코새한 배너 이미지" /></div>;
  }

  const track = [...slides, ...slides];

  return <div className="hero-slider">
    <div className="hero-slider-track" style={{ animationDuration: `${slides.length * 3}s` }}>
      {track.map((src, i) => <img key={`${src}-${i}`} className="hero-slider-image" src={src} alt={`에코새한 배너 이미지 ${(i % slides.length) + 1}`} />)}
    </div>
  </div>;
}

const productCategoryRows = [
  [
    { slug: "palm-mat", title: "보행매트(야자매트)", href: "/products/palm-mat" },
    { slug: "cargo-tension-bar", title: "화물차탄력바", href: "/products/cargo-tension-bar" }
  ],
  [
    { slug: "tree-band", title: "수목천연밴드", href: "/products/tree-band" },
    { slug: "tree-tie", title: "지주목결속바", href: "/products/tree-tie" },
    { slug: "house-band", title: "하우스밴드", href: "/products/house-band" }
  ]
];

function CategoryNav({ images }: { images: Record<string, string | null> }) {
  return <div className="category-nav">
    {productCategoryRows.map(row => <div key={row.map(cat => cat.slug).join("-")} className={`category-row category-row-${row.length}`}>
      {row.map(cat => <Link key={cat.slug} className="category-card" data-slug={cat.slug} href={cat.href}>
        <div className="category-card-image">{images[cat.slug] ? <img src={images[cat.slug]!} alt={cat.title} /> : <span className="category-card-placeholder" />}</div>
        <span className="category-card-name">{cat.title}</span>
      </Link>)}
    </div>)}
  </div>;
}

export function HomePage({ slides }: { slides: string[] }) {
  return <Shell><section className="hero">
    <HeroSlider slides={slides} />
    <div className="hero-scrim" />
    <div className="hero-overlay">
      <Eyebrow>NATURAL MATERIAL MANUFACTURER</Eyebrow>
      <h1>천연 소재로 만드는<br /><em>보행매트, 에코새한</em></h1>
      <p className="hero-desc">천연 소재로 자연을 지키는 길을 만드는 기업, 에코새한<br />정직한 생산과 꾸준한 품질관리로 더 나은 현장을 만듭니다.</p>
      <div className="hero-actions"><Link className="button button-primary" href="/products">제품 라인업 보기 <ArrowRight size={18} /></Link><Link className="text-link" href="/contact">문의하기 <ArrowRight size={16} /></Link></div>
    </div>
  </section><section className="home-intro section-pad"><div className="home-intro-inner">
    <Eyebrow>ABOUT ECO SAEHAN</Eyebrow>
    <p>에코새한은 친환경 소재 연구를 통해 자연과 사람이 함께 살아가는 방법을 고민합니다.</p>
    <p>야자매트는 천연 코이어(coir) 섬유를 사용하여 제작되어, 자연 분해가 가능한 친환경 보행로 자재입니다. 수목천연밴드 역시 천연 면(cotton)과 천연 라텍스(latex)를 사용해 만들어집니다. 과거에는 수목 뿌리를 고무바로 감아 고정했지만, 저희는 시간이 지나면 땅속에서 자연 부식되는 소재를 선택해 환경을 먼저 생각했습니다.</p>
    <p>여기에 더해, 지주목결속바로 수목 지지 작업의 편리함을 더하고, 화물용 탄력바를 생산해 과거 타이어바로 힘겹게 결속하던 작업을 훨씬 수월하게 바꾸고 있습니다.</p>
    <p>에코새한은 앞으로도 더욱 친환경적인 소재와 기술을 연구하고 개발해 나가겠습니다. 늘 함께해주셔서 감사합니다.</p>
  </div></section></Shell>;
}

export function AboutPage() { return <Shell><section className="about section-pad"><div className="section-heading"><Eyebrow>ABOUT ECO SAEHAN</Eyebrow><h2>자연을 생각하는 마음,<br /><em>정직한 제품으로 답합니다.</em></h2></div><div className="about-grid"><div className="about-statement"><p>천연 소재를 바탕으로 더 오래 쓰이고, 자연에 부담을 덜 주는 제품을 고민합니다.</p><span>작은 약속도 꼼꼼하게 지키며 고객사 현장에<br />꾸준히 신뢰를 쌓아가는 제조기업입니다.</span></div><Greeting /></div></section></Shell>; }
function Greeting() { return <div className="greeting"><span className="quote-mark">“</span><p>안녕하십니까.</p><p>저희 에코새한은 천연 소재를 바탕으로 제품을 만들며, 환경에 부담을 덜 주는 방식을 늘 고민하는 기업입니다.</p><p>아직 시작한 지 오래되지 않은 기업이지만, 그렇기에 더욱 꼼꼼하게 품질을 관리하고 정직하게 제품을 만들겠다는 마음가짐으로 하루하루 실적을 쌓아가고 있습니다. 공인 시험기관의 성적서를 통해 제품 품질을 객관적으로 증명하며 성실히 사업을 이어가겠습니다.</p><p>저희 제품을 믿고 선택해주시는 모든 분들께 진심으로 감사드립니다.</p><strong>에코새한 대표 드림</strong></div>; }

export function ProductsPage({ categoryImages }: { categoryImages: Record<string, string | null> }) { return <Shell><section className="products section-pad"><div className="product-header"><div><Eyebrow>PRODUCT LINEUP</Eyebrow><h2>자연의 섬유로 만든<br /><em>단단한 보행의 기반.</em></h2></div><p>100% 천연 야자섬유(코이어)로 제작한 보행매트입니다.<br />노면 포장과 비포장도로의 흙 유실 방지에 사용됩니다.</p></div><CategoryNav images={categoryImages} /></section></Shell>; }
export function PalmMatPage({ images }: { images: string[] }) {
  const mainImage = images[0] ?? "/보행매트-시공사진.png";
  const secondImage = images[1];
  return <Shell><section className="product-detail section-pad"><Link className="back-link" href="/products">← 제품소개로 돌아가기</Link><div className="detail-heading"><Eyebrow>PRODUCT 1</Eyebrow><h1>보행매트(야자매트)</h1><p>100% 천연 야자섬유(코이어)로 만든 보행매트입니다. 노면 포장과 비포장도로의 흙 유실 방지에 사용됩니다.</p></div><div className="palm-mat-stack">
    <img className="palm-mat-photo" src={mainImage} alt="보행매트(야자매트)" />
    <Table title="보행매트 · 단위 m" rows={mats} />
    {secondImage ? <div className="pin-row" role="img" aria-label="보행매트(야자매트) 고정핀 5종"><div className="pin-cell pin-cell-1" style={{ backgroundImage: `url(${secondImage})` }} /><div className="pin-cell pin-cell-2" style={{ backgroundImage: `url(${secondImage})` }} /><div className="pin-cell pin-cell-3" style={{ backgroundImage: `url(${secondImage})` }} /><div className="pin-cell pin-cell-4" style={{ backgroundImage: `url(${secondImage})` }} /><div className="pin-cell pin-cell-5" style={{ backgroundImage: `url(${secondImage})` }} /></div> : <div className="palm-mat-photo-placeholder">사진 준비 중</div>}
    <Table title="고정핀 · 단위 개" rows={pins} />
  </div></section></Shell>;
}

export function ProductDetailPage({ type, images }: { type: "tree-band" | "tree-tie" | "house-band" | "cargo-tension-bar"; images: string[] }) { const details = { "cargo-tension-bar": { number: "2", title: "화물차탄력바", description: "화물 적재물을 안정적으로 고정하는 탄력바입니다.", visualClass: "cargo-card-visual", icon: <Truck /> }, "tree-band": { number: "3", title: "수목천연밴드", description: "나무의 생장을 고려해 식재목을 보호하고 지지하는 천연 소재 밴드입니다.", visualClass: "tree-card-visual", icon: <TreePine /> }, "tree-tie": { number: "4", title: "지주목결속바", description: "식재목과 지주목을 안정적으로 결속해 초기 생장을 돕는 조경 자재입니다.", visualClass: "tie-card-visual", icon: <Link2 /> }, "house-band": { number: "5", title: "하우스밴드", description: "비닐하우스 골조를 단단히 고정하는 밴드입니다.", visualClass: "house-card-visual", icon: <Package /> } }[type]; const mainImage = images[0] ?? null; return <Shell><section className="product-detail section-pad"><Link className="back-link" href="/products">← 제품소개로 돌아가기</Link><div className="detail-heading"><Eyebrow>PRODUCT {details.number}</Eyebrow><h1>{details.title}</h1><p>{details.description}</p></div><div className="detail-layout"><div className={`detail-visual ${details.visualClass}`}>{mainImage ? <img src={mainImage} alt={details.title} /> : <div className="product-card-icon">{details.icon}</div>}</div><div className="detail-info">{type === "cargo-tension-bar" ? <ul className="product-variants"><li>신초강력탄력바 50mm</li><li>초강력탄력바 50mm</li><li>고탄력바 50mm</li><li>고탄력바 65mm</li></ul> : <p className="inquiry-note"><ShieldCheck size={18} /> 규격 문의: 전화 또는 이메일로 상담해 주세요.</p>}</div></div></section></Shell>; }
function Table({ title, headers = ["식별번호", "모델명"], rows }: { title: string; headers?: string[]; rows: string[][] }) { const single = headers.length === 1; return <div className="mini-table-wrap"><h3>{title}</h3><div className="mini-table"><div className={single ? "mini-row mini-head mini-row-single" : "mini-row mini-head"}>{headers.map(h => <span key={h}>{h}</span>)}</div>{rows.map((row, i) => <div className={single ? "mini-row mini-row-single" : "mini-row"} key={row[0] ?? i}>{row.map((cell, j) => j === row.length - 1 ? <b key={j}>{cell}</b> : <span key={j}>{cell}</span>)}</div>)}</div></div>; }

export function CertificationsPage({ images }: { images: string[] }) { return <Shell><section className="proof section-pad"><div className="proof-top"><div className="section-heading"><Eyebrow>TRUST & DELIVERY</Eyebrow><h2>서류로 확인하고,<br /><em>현장으로 증명합니다.</em></h2></div><div className="certificate"><div className="certificate-icon"><Check size={22} /></div><div><b>FITI 시험성적서 보유</b><p>섬유감별 · 질량 · 두께 · 인장강도/변형률<br />KS 기준 충족</p></div></div></div>{images.length > 0 ? <div className="cert-gallery">{images.map(src => <div className="cert-photo" key={src}><div className="cert-photo-inner"><img src={src} alt="인증·납품 실적 사진" loading="lazy" /></div></div>)}</div> : null}<div className="delivery-head"><h3>계약 및 현장실적</h3><span>2026년 기준 <b>04</b>건</span></div><div className="delivery-table"><div className="delivery-row table-head"><span>계약일</span><span>수요기관</span><span>현장명</span></div>{deliveries.map(row => <div className="delivery-row" key={row[0]}><span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span></div>)}</div></section></Shell>; }

export function ContactPage() { const [sent, setSent] = useState(false); const [mailLink, setMailLink] = useState(""); function submitInquiry(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const body = `이름: ${data.get("name")}\n연락처: ${data.get("phone")}\n\n문의 내용:\n${data.get("message")}`; setMailLink(`mailto:ecosaehan@gmail.com?subject=${encodeURIComponent("에코새한 제품 문의")}&body=${encodeURIComponent(body)}`); setSent(true); } return <Shell><section className="contact section-pad"><div className="contact-inner"><div className="contact-copy"><Eyebrow>CONTACT</Eyebrow><h2>필요한 자재,<br /><em>정확하게 상담하세요.</em></h2><p>현장에 맞는 규격과 수량을 알려주시면<br />확인 후 빠르게 안내해 드립니다.</p><div className="quick-contact"><a className="button button-outline" href="mailto:ecosaehan@gmail.com"><Mail size={17} />이메일로 문의하기</a><a className="button button-kakao" href="https://pf.kakao.com/_JxfJxaX" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} />카카오톡으로 문의하기</a></div><div className="contact-list"><a href="tel:0538518702"><Phone size={28} />053-851-8702</a><a href="mailto:ecosaehan@gmail.com"><Mail size={28} />ecosaehan@gmail.com</a><span><Leaf size={28} />경상북도 경산시 진량읍 아사길 81-14</span></div></div><form className="contact-form" onSubmit={submitInquiry}>{sent ? <div className="form-success"><Check size={38} /><h3>문의 내용이 준비되었습니다.</h3><p>아래 버튼을 눌러 메일 앱에서 전송을 완료해 주세요.</p><a className="button button-primary" href={mailLink}>메일로 전송하기 <ArrowRight size={17} /></a></div> : <><div className="form-heading"><h3>제품 및 견적 문의</h3><span>평일 09:00 - 18:00</span></div><label>이름<input required name="name" placeholder="담당자 성함" /></label><label>연락처<input required name="phone" placeholder="전화번호 또는 이메일" /></label><label>문의 내용<textarea required name="message" placeholder="필요한 제품, 규격, 수량을 남겨주세요." rows={4} /></label><button className="button button-primary" type="submit">문의 내용 작성하기 <ArrowRight size={17} /></button></>}</form></div></section></Shell>; }

export function SupportMaterialsPage({ files }: { files: DocumentFile[] }) {
  const total = files.length;
  return <Shell><section className="section-pad materials-section">
    <div className="section-heading"><Eyebrow>SUPPORT</Eyebrow><h2>설계자료실</h2></div>
    {files.length === 0 ? <p className="materials-empty">등록된 자료가 없습니다. 준비되는 대로 업로드하겠습니다.</p> : <div className="board">
      <div className="board-row board-head"><span className="board-no">번호</span><span>제목</span><span>첨부파일</span><span>작성자</span></div>
      {files.map((file, i) => <div className="board-row" key={file.name}>
        <span className="board-no">{total - i}</span>
        <a className="board-title" href={file.url} target="_blank" rel="noopener noreferrer">{file.title}</a>
        <a className="board-file" href={file.url} target="_blank" rel="noopener noreferrer" aria-label={`${file.title} 다운로드`}><Download size={18} /></a>
        <span className="board-author">관리자</span>
      </div>)}
    </div>}
  </section></Shell>;
}

export function SupportFaqPage() { return <SupportPlaceholderPage title="FAQ" />; }

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (await verifyAdminPassword(password)) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return <Shell><section className="section-pad admin-section">{authed ? <div className="admin-content"><Eyebrow>ADMIN</Eyebrow><h2>관리자 페이지입니다</h2></div> : <form className="admin-login" onSubmit={handleSubmit}><Eyebrow>ADMIN</Eyebrow><h2>관리자 로그인</h2><input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="비밀번호" autoFocus required /><button className="button button-primary" type="submit">확인</button>{error && <p className="admin-error">비밀번호가 일치하지 않습니다</p>}</form>}</section></Shell>;
}
