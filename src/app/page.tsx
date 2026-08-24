"use client";

import { useState } from "react";
import { ArrowRight, Check, FileText, Leaf, Mail, Menu, Phone, ShieldCheck, X } from "lucide-react";

const mats = [
  ["26001347", "ESMAT30-6"],
  ["26001348", "ESMAT30-8"],
  ["-", "ESMAT30-10"],
  ["-", "ESMAT30-12"],
  ["26001349", "ESMAT30-15"]
];
const pins = [
  ["25991808", "ES-PIN-200"],
  ["25991809", "ES-PIN-250"],
  ["25985301", "ES-IPIN-250"],
  ["25985288", "ES-7PIN-200"],
  ["25985289", "ES-UPIN-200"]
];
const deliveries = [
  ["2026-05-06", "경주시 사적관리사무소", "대릉원 내 보행매트 구입"],
  ["2026-05-15", "대구광역시 달성군", "2026년 천내근린공원 둘레길 정비공사"],
  ["2026-05-28", "경주시", "도시공원 및 도시숲 관리용자재(야자매트) 구입"],
  ["2026-06-19", "대구광역시 달성군", "유가 용리 269번지선 하천정비공사"]
];

function Logo() {
  return <a className="logo" href="#home" aria-label="에코새한 홈"><span className="logo-mark"><Leaf size={22} strokeWidth={2.5} /></span><span>에코새한<small>ECO SAEHAN</small></span></a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [mailLink, setMailLink] = useState("");
  const navItems = [["회사소개", "about"], ["제품소개", "products"], ["인증·납품실적", "proof"], ["문의하기", "contact"]];

  function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = `이름: ${formData.get("name")}\n연락처: ${formData.get("phone")}\n\n문의 내용:\n${formData.get("message")}`;
    setMailLink(`mailto:ecosaehan@gmail.com?subject=${encodeURIComponent("에코새한 제품 문의")}\u0026body=${encodeURIComponent(body)}`);
    setSent(true);
  }

  return (
    <main>
      <header className="site-header">
        <div className="nav-wrap"><a className="ci-logo" href="#home" aria-label="에코새한 홈"><img src="/ci.svg" alt="에코새한" /></a><nav className={menuOpen ? "nav-links open" : "nav-links"}>{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>견적 문의 <ArrowRight size={16} /></a></nav><button className="menu-toggle" aria-label="메뉴 열기" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <section id="home" className="hero section-pad">
        <div className="hero-inner">
          <div className="hero-copy"><p className="eyebrow"><span /> PUBLIC PROCUREMENT PARTNER</p><h1>공공의 길을<br /><em>더 오래, 더 안전하게.</em></h1><p className="hero-desc">조달청 등록 야자매트(보행매트) 전문 제조기업, 에코새한.<br />친환경 천연섬유 자재로 관공서와 공공기관의 현장을 지킵니다.</p><div className="hero-actions"><a className="button button-primary" href="#products">제품 카탈로그 다운로드 <ArrowRight size={18} /></a><a className="text-link" href="#contact">문의하기 <ArrowRight size={16} /></a></div></div>
          <div className="hero-visual"><div className="stamp">DIRECT<br /><strong>MADE</strong><br />ECO FIBER</div><div className="mat-art"><div className="mat-art-line" /><div className="mat-art-line" /><div className="mat-art-line" /><span>100% NATURAL<br />COIR FIBER</span></div><div className="visual-caption"><span>01</span><span>자연에서 온 보행매트</span><span className="caption-line" /></div></div>
        </div>
        <div className="trust-bar"><div className="trust-inner"><div className="trust-item"><ShieldCheck size={23} /><span><b>조달청 나라장터</b> 등록업체</span></div><div className="trust-item"><FileText size={23} /><span><b>FITI 공인</b> 시험성적서 보유</span></div><div className="trust-item"><Leaf size={23} /><span><b>직접 생산·직납</b> 기반</span></div><div className="contract-date"><span>조달계약일자</span><strong>2025.12.30</strong></div></div></div>
      </section>

      <section id="about" className="about section-pad"><div className="section-heading"><p className="eyebrow">ABOUT ECO SAEHAN</p><h2>현장의 기준을 알고,<br /><em>성실함으로 답합니다.</em></h2></div><div className="about-grid"><div className="about-statement"><p>에코새한은 2015년부터 쌓아온 생산 기반을 바탕으로 공공 현장에 필요한 자재를 정확하게 공급합니다.</p><span>신생기업이지만 짧은 기간 내 다수의 관급공사에<br />성실히 납품하며 실적을 쌓아가고 있습니다.</span></div><dl className="company-info"><div><dt>상호</dt><dd>에코새한</dd></div><div><dt>대표자</dt><dd>김지은</dd></div><div><dt>사업자등록번호</dt><dd>842-52-00096</dd></div><div><dt>개업일</dt><dd>2015.12.04</dd></div><div className="wide"><dt>소재지</dt><dd>경상북도 경산시 진량읍 아사길 81-14</dd></div><div className="wide"><dt>업태·종목</dt><dd>제조·도매 / 보행매트, 식생매트, 탄성밴드, 철물</dd></div><div className="wide"><dt>생산기반</dt><dd>(주)새한합성산업 3공장</dd></div></dl></div></section>

      <section id="products" className="products section-pad"><div className="product-header"><div><p className="eyebrow">PRODUCT LINEUP</p><h2>자연의 섬유로 만든<br /><em>단단한 보행의 기반.</em></h2></div><p>100% 천연 야자섬유(코이어)로 제작한 보행매트입니다.<br />노면 포장과 비포장도로의 흙 유실 방지에 사용됩니다.</p></div><div className="product-showcase"><div className="product-visual"><div className="woven-shape" /><div className="product-label">ESMAT<br /><strong>30</strong></div><div className="material-note"><span className="number">02</span><span>COIR FIBER<br />WALKING MAT</span></div></div><div className="product-tables"><Table title="보행매트 · 단위 m" rows={mats} /><Table title="고정핀 · 단위 개" rows={pins} /><p className="price-note"><span>※</span> 단가는 변동되므로 표기하지 않습니다. 필요 규격을 알려주시면 빠르게 견적을 안내드립니다.</p></div></div><div className="other-products"><span>함께 생산합니다</span><b>화물용 탄력바</b><b>묘목용 수목밴드</b><span className="coming">상세 라인업은 추후 공개됩니다</span></div></section>

      <section id="proof" className="proof section-pad"><div className="proof-top"><div className="section-heading"><p className="eyebrow">TRUST & DELIVERY</p><h2>서류로 확인하고,<br /><em>현장으로 증명합니다.</em></h2></div><div className="certificate"><div className="certificate-icon"><Check size={22} /></div><div><b>FITI 시험성적서 보유</b><p>섬유감별 · 질량 · 두께 · 인장강도/변형률<br />KS 기준 충족</p></div></div></div><div className="delivery-head"><h3>납품 및 계약실적</h3><span>2026년 기준 <b>04</b>건</span></div><div className="delivery-table"><div className="delivery-row table-head"><span>계약일</span><span>수요기관</span><span>현장명</span></div>{deliveries.map((row) => <div className="delivery-row" key={row[0]}><span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span></div>)}</div></section>

      <section id="contact" className="contact section-pad"><div className="contact-inner"><div className="contact-copy"><p className="eyebrow">CONTACT</p><h2>필요한 자재,<br /><em>정확하게 상담하세요.</em></h2><p>현장에 맞는 규격과 수량을 알려주시면<br />확인 후 빠르게 안내해 드립니다.</p><div className="contact-list"><a href="tel:0538518702"><Phone size={19} />053-851-8702</a><a href="mailto:ecosaehan@gmail.com"><Mail size={19} />ecosaehan@gmail.com</a><span><Leaf size={19} />경상북도 경산시 진량읍 아사길 81-14</span></div></div><form className="contact-form" onSubmit={submitInquiry}>{sent ? <div className="form-success"><Check size={38} /><h3>문의 내용이 준비되었습니다.</h3><p>아래 버튼을 눌러 메일 앱에서 전송을 완료해 주세요.</p><a className="button button-primary" href={mailLink}>메일로 전송하기 <ArrowRight size={17} /></a></div> : <><div className="form-heading"><h3>제품 및 견적 문의</h3><span>평일 09:00 - 18:00</span></div><label>이름<input required name="name" placeholder="담당자 성함" /></label><label>연락처<input required name="phone" placeholder="전화번호 또는 이메일" /></label><label>문의 내용<textarea required name="message" placeholder="필요한 제품, 규격, 수량을 남겨주세요." rows={4} /></label><button className="button button-primary" type="submit">문의 내용 작성하기 <ArrowRight size={17} /></button></>}</form></div></section>

      <footer><div className="footer-inner"><Logo /><div><span>TEL 053-851-8702</span><span>FAX 053-782-8702</span><span>ecosaehan@gmail.com</span></div><p>© 2026 ECO SAEHAN. ALL RIGHTS RESERVED.</p></div></footer>
    </main>
  );
}

function Table({ title, rows }: { title: string; rows: string[][] }) { return <div className="mini-table-wrap"><h3>{title}</h3><div className="mini-table"><div className="mini-row mini-head"><span>식별번호</span><span>모델명</span></div>{rows.map((row) => <div className="mini-row" key={row[1]}><span>{row[0]}</span><b>{row[1]}</b></div>)}</div></div>; }
