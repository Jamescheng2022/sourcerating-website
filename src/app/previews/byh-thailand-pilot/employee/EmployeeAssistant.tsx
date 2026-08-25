"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUp, Bot, FileText, Languages, Search, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { employeeKnowledge } from "@/data/byh-pilot";
import "./employee.css";

type Reply = { answer: string; confidence: string; needsHumanReview: boolean; citations: { id: string; title: string; source: string }[] };

export function EmployeeAssistant() {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState<Reply | null>(null);
  const [loading, setLoading] = useState(false);

  async function ask(preset?: string) {
    const text = preset ?? question;
    if (!text.trim()) return;
    setQuestion(text);
    setLoading(true);
    const response = await fetch("/api/byh-pilot-assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: text, mode: "employee" }) });
    setReply((await response.json()) as Reply);
    setLoading(false);
  }

  return <main className="byhw-shell" lang="th">
    <aside className="byhw-sidebar">
      <div className="byhw-brand"><span>BYH</span><div><strong>BYH WORKS</strong><small>THAILAND EMPLOYEE AI</small></div></div>
      <nav><button className="active"><Sparkles />ผู้ช่วยของฉัน</button><button><Search />ค้นหาความรู้</button><button><FileText />เอกสารของฉัน</button><button><Languages />แปลภาษา</button></nav>
      <div className="byhw-policy"><ShieldCheck /><div><b>Private workspace</b><span>คำตอบต้องอ้างอิงเอกสารและแสดงความไม่แน่ใจ</span></div></div>
      <Link href="/previews/byh-thailand-pilot/th"><ArrowLeft />กลับไปเว็บไซต์</Link>
    </aside>
    <section className="byhw-main">
      <header><div><small>สวัสดี · PILOT EMPLOYEE</small><h1>วันนี้ต้องการให้ช่วยอะไร?</h1></div><div className="byhw-user"><UserRound /><span>Production team<br /><small>Thai · Chinese · English</small></span></div></header>
      <div className="byhw-grid">
        <div className="byhw-chat">
          <div className="byhw-suggestions">
            {["โครงการระยะที่ 2 มีพื้นที่และอาคารอะไรบ้าง?", "ก่อนเผยแพร่ใบรับรองคุณภาพต้องตรวจสอบอะไร?", "ช่วยสรุปเอกสารนี้เป็นภาษาไทยสำหรับพนักงานใหม่"].map((item) => <button key={item} onClick={() => ask(item)}><Bot /><span>{item}</span></button>)}
          </div>
          {reply ? <article className="byhw-answer"><div className="byhw-answer-head"><Bot /><div><b>BYH Works</b><small>Confidence · {reply.confidence}</small></div></div><p>{reply.answer}</p>{reply.needsHumanReview && <div className="byhw-review">ต้องให้เจ้าของเอกสารตรวจสอบก่อนนำไปใช้จริง</div>}<div className="byhw-citations">{reply.citations.map((item) => <span key={item.id}><b>{item.id}</b>{item.title}<small>{item.source}</small></span>)}</div></article> : <div className="byhw-empty"><Sparkles /><h2>ค้นหา แปล และสรุป<br />จากความรู้ที่ได้รับอนุมัติ</h2><p>ระบบจะไม่สร้างกฎความปลอดภัย ข้อกำหนดคุณภาพ หรือนโยบายบุคคลขึ้นเอง หากไม่มีเอกสาร ระบบจะส่งต่อให้ผู้รับผิดชอบ</p></div>}
          <div className="byhw-input"><input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") ask(); }} placeholder="ถามเป็นภาษาไทย 中文 or English..." /><button onClick={() => ask()} disabled={loading}><ArrowUp /></button></div>
        </div>
        <aside className="byhw-library"><div className="byhw-library-head"><h2>Knowledge status</h2><span>3 sources</span></div>{employeeKnowledge.map((item) => <article key={item.id}><div><FileText /><span className={`byhw-dot ${item.status}`} /></div><b>{item.title}</b><small>{item.department} · {item.language}</small><p>{item.source}</p></article>)}<button className="byhw-upload">+ เพิ่มเอกสารที่อนุมัติ</button></aside>
      </div>
    </section>
  </main>;
}
