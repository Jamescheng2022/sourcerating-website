"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Factory,
  FileCheck2,
  Globe2,
  Menu,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { byhEvidence, pilotCopy, type PilotLanguage } from "@/data/byh-pilot";
import "./pilot.css";

type AssistantReply = {
  answer: string;
  confidence: string;
  citations: { id: string; title: string; source: string; url?: string }[];
};

const paths = ["overview", "factory", "capabilities", "quality", "careers", "contact"];

export function ByhPilotSite({ lang }: { lang: PilotLanguage }) {
  const c = pilotCopy[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState<AssistantReply | null>(null);
  const [loading, setLoading] = useState(false);

  async function askAssistant(preset?: string) {
    const nextQuestion = preset ?? question;
    if (!nextQuestion.trim()) return;
    setLoading(true);
    const response = await fetch("/api/byh-pilot-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: nextQuestion, mode: "public" }),
    });
    setReply((await response.json()) as AssistantReply);
    setQuestion(nextQuestion);
    setLoading(false);
  }

  return (
    <main className={`byh2-shell byh2-${lang}`} lang={lang === "zh" ? "zh-CN" : lang}>
      <div className="byh2-concept"><b>SOURCERATING PILOT</b><span>แนวคิดอิสระ · ไม่ใช่เว็บไซต์ทางการของ BYH</span></div>
      <header className="byh2-header">
        <Link className="byh2-brand" href={`/previews/byh-thailand-pilot/${lang}`}>
          <span className="byh2-mark">BYH</span>
          <span><strong>BYH NEW TECHNOLOGY</strong><small>THAILAND MANUFACTURING PLATFORM</small></span>
        </Link>
        <nav className="byh2-nav">
          {(c.nav as string[]).map((item, index) => <a key={paths[index]} href={`#${paths[index]}`}>{item}</a>)}
        </nav>
        <div className="byh2-tools">
          <div className="byh2-languages">
            {(["th", "en", "zh"] as PilotLanguage[]).map((item) => <Link className={lang === item ? "active" : ""} key={item} href={`/previews/byh-thailand-pilot/${item}`}>{item.toUpperCase()}</Link>)}
          </div>
          <button className="byh2-menu" aria-label="Menu" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="byh2-mobile-nav">{(c.nav as string[]).map((item, index) => <a onClick={() => setMenuOpen(false)} key={paths[index]} href={`#${paths[index]}`}>{item}</a>)}</div>}
      </header>

      <section className="byh2-hero" id="overview">
        <div className="byh2-hero-content">
          <div className="byh2-kicker">{c.eyebrow}</div>
          <h1>{c.hero}</h1>
          <p>{c.intro}</p>
          <div className="byh2-actions">
            <a className="byh2-button" href="#capabilities">{c.primary}<ArrowRight size={17} /></a>
            <button className="byh2-button secondary" onClick={() => document.getElementById("contact")?.scrollIntoView()}>{c.secondary}</button>
          </div>
          <div className="byh2-hero-note"><Sparkles size={14} />ภาพแนวคิดที่สร้างขึ้นใหม่ · ไม่ใช่ภาพถ่ายโรงงานจริงของ BYH</div>
        </div>
        <div className="byh2-hero-rail">
          <div><strong>18.10.2025</strong><span>เปิดโรงงานระยะที่ 1</span></div>
          <div><strong>21,500 m²</strong><span>พื้นที่อาคารระยะที่ 2 ที่ประกาศ</span></div>
          <div><strong>8,000 t/y</strong><span>กำลังการผลิตเพิ่มที่วางแผนไว้</span></div>
        </div>
      </section>

      <section className="byh2-proofbar">
        <span><CheckCircle2 /> ข้อมูลสาธารณะที่ตรวจสอบได้</span>
        <span><Globe2 /> ไทย · อังกฤษ · จีน</span>
        <span><ShieldCheck /> ไม่คาดเดาการรับรองหรือกำลังการผลิต</span>
      </section>

      <section className="byh2-section byh2-factory" id="factory">
        <div className="byh2-section-copy">
          <div className="byh2-kicker">THAILAND FACTORY</div>
          <h2>{c.factoryTitle}</h2>
          <p>{c.factoryBody}</p>
          <div className="byh2-timeline">
            <div><b>2024</b><span>จัดตั้งแพลตฟอร์มการลงทุนในประเทศไทย</span></div>
            <div><b>2025</b><span>โรงงานระยะที่ 1 เปิดดำเนินการ</span></div>
            <div><b>PHASE II</b><span>โรงหล่อ โรงกลึง และระบบสนับสนุนตามประกาศโครงการ</span></div>
          </div>
        </div>
        <aside className="byh2-factory-card">
          <Factory size={30} />
          <span>AMATA CITY CHONBURI</span>
          <h3>ฐานการผลิตในประเทศไทย</h3>
          <p>ตำแหน่งที่ตั้งและขอบเขตโครงการได้รับการยืนยันจากประกาศของ AMATA และผู้รับเหมา EPC ส่วนข้อมูลอุปกรณ์และใบรับรองท้องถิ่นรอการยืนยันจากบริษัท</p>
          <a href="https://en.chinaaie.com.cn/News_details/191.html" target="_blank" rel="noreferrer">ดูแหล่งข้อมูลโครงการ <ChevronRight size={16} /></a>
        </aside>
      </section>

      <section className="byh2-section byh2-dark" id="capabilities">
        <div className="byh2-heading-row">
          <div><div className="byh2-kicker">MANUFACTURING PATHWAY</div><h2>จากวิศวกรรมการหล่อ<br />สู่ชิ้นส่วนที่ตรวจสอบย้อนกลับได้</h2></div>
          <p>โครงสร้างเว็บไซต์มุ่งตอบคำถามของวิศวกรและฝ่ายจัดซื้อ ไม่ใช่เพียงนำเสนอเครื่องจักรหรือคำโฆษณาทั่วไป</p>
        </div>
        <div className="byh2-capabilities">
          {[
            ["01", "Casting engineering", "การออกแบบกระบวนการหล่อและการเตรียมชิ้นงานสำหรับรูปทรงที่ซับซ้อน"],
            ["02", "Precision machining", "การตัดเฉือน การจับยึด และการควบคุมคุณลักษณะสำคัญ"],
            ["03", "Process industrialization", "DFM เครื่องมือ ฟิกซ์เจอร์ และความพร้อมก่อนเริ่มผลิต"],
            ["04", "Metrology & release", "หลักฐานการตรวจสอบ การสอบกลับ และการปล่อยงานตามจุดควบคุม"],
          ].map(([number, title, description]) => <article key={number}><small>{number}</small><h3>{title}</h3><p>{description}</p><span>ขอบเขตท้องถิ่นต้องยืนยันโดย BYH</span></article>)}
        </div>
      </section>

      <section className="byh2-section" id="quality">
        <div className="byh2-heading-row">
          <div><div className="byh2-kicker">EVIDENCE LEDGER</div><h2>{c.proof}</h2></div>
          <p>{c.proofBody}</p>
        </div>
        <div className="byh2-ledger">
          {byhEvidence.map((item) => <article key={item.id}>
            <span className={`byh2-status ${item.status}`}>{item.status}</span>
            <div><small>{item.id} · {item.source}</small><h3>{item.title}</h3><p>{item.summary}</p></div>
            <a href={item.url} target="_blank" rel="noreferrer" aria-label={`Open source ${item.id}`}><FileCheck2 /></a>
          </article>)}
        </div>
      </section>

      <section className="byh2-section byh2-careers" id="careers">
        <div><div className="byh2-kicker">LOCAL TEAM ENABLEMENT</div><h2>เว็บไซต์สำหรับตลาด<br />ผู้ช่วย AI สำหรับทีมงาน</h2></div>
        <div className="byh2-career-copy"><p>พนักงานสามารถค้นหาขั้นตอนการทำงาน เอกสารคุณภาพ คำถามฝ่ายบุคคล และความรู้ข้ามภาษาได้จากแหล่งข้อมูลที่บริษัทอนุมัติ พร้อมการอ้างอิงและการส่งต่อให้ผู้รับผิดชอบเมื่อไม่แน่ใจ</p><Link className="byh2-button dark" href="/previews/byh-thailand-pilot/employee">เปิดตัวอย่าง BYH Works <ArrowRight size={17} /></Link></div>
      </section>

      <section className="byh2-section byh2-contact" id="contact">
        <div><div className="byh2-kicker">STRUCTURED RFQ</div><h2>เริ่มจากข้อมูลชิ้นงาน<br />ไม่ใช่คำสัญญา</h2><p>แบบฟอร์มตัวอย่างนี้ไม่ส่งหรือจัดเก็บข้อมูลจริง</p></div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label>ชื่อบริษัท<input placeholder="Company name" /></label>
          <div className="byh2-form-row"><label>อีเมลทำงาน<input type="email" placeholder="name@company.com" /></label><label>กระบวนการ<select defaultValue=""><option value="" disabled>เลือกกระบวนการ</option><option>Casting + machining</option><option>Precision machining</option><option>Tooling / fixture</option></select></label></div>
          <label>ข้อมูลโครงการ<textarea placeholder="Material, annual volume, target SOP, special characteristics" /></label>
          <label className="byh2-upload"><Upload />แนบแบบหรือข้อกำหนด<input type="file" /></label>
          <button className="byh2-button" type="submit">ตรวจสอบข้อมูล RFQ <ArrowRight size={17} /></button>
        </form>
      </section>

      <footer className="byh2-footer"><div className="byh2-brand"><span className="byh2-mark">BYH</span><span><strong>BYH NEW TECHNOLOGY</strong><small>THAILAND DIGITAL PILOT</small></span></div><p>Independent concept produced from public evidence. Not operated or endorsed by BYH or Wuxi BEST.</p><Link href="/previews/byh-thailand-pilot/operations">Operations console</Link></footer>

      <button className="byh2-assistant-trigger" onClick={() => setAssistantOpen(true)}><Bot />{c.assistant}</button>
      {assistantOpen && <div className="byh2-assistant" role="dialog" aria-modal="true">
        <header><div><small>PUBLIC EVIDENCE ASSISTANT</small><h2>{c.assistant}</h2></div><button onClick={() => setAssistantOpen(false)} aria-label="Close"><X /></button></header>
        <div className="byh2-chat-body">
          <div className="byh2-chat-intro"><MessageSquareText /><p>คำตอบอ้างอิงเฉพาะหลักฐานในโครงการทดลอง และจะไม่รับรองราคา ระยะเวลาส่งมอบ ใบรับรอง หรือกำลังการผลิตปัจจุบัน</p></div>
          <div className="byh2-presets">{["โรงงานระยะที่ 2 มีขอบเขตอะไร?", "BYH Thailand ทำกระบวนการอะไรบ้าง?"].map((item) => <button key={item} onClick={() => askAssistant(item)}>{item}</button>)}</div>
          {reply && <div className="byh2-reply"><small>CONFIDENCE · {reply.confidence}</small><p>{reply.answer}</p>{reply.citations.map((item) => <a key={item.id} href={item.url} target="_blank" rel="noreferrer">{item.id} · {item.source}</a>)}</div>}
        </div>
        <div className="byh2-chat-input"><input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") askAssistant(); }} placeholder={c.assistantHint as string} /><button onClick={() => askAssistant()} disabled={loading}>{loading ? "…" : <ArrowRight />}</button></div>
      </div>}
    </main>
  );
}
