import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowLeft, Bot, CalendarDays, CheckCircle2, Database, Globe2, Inbox, ShieldCheck, Wrench } from "lucide-react";
import "./operations.css";

export const metadata: Metadata = { title: "BYH Digital Operations Pilot", robots: { index: false, follow: false } };

const health = [
  ["Website", "Healthy", "3 language routes · noindex pilot", Globe2],
  ["Employee AI", "Controlled", "3 pilot knowledge sources", Bot],
  ["Knowledge", "Review", "1 example document needs owner approval", Database],
  ["Security", "Pilot", "Authentication required before real use", ShieldCheck],
] as const;

export default function OperationsPage() {
  return <main className="byho-shell">
    <header><div><Link href="/previews/byh-thailand-pilot/th"><ArrowLeft /></Link><span className="byho-logo">BYH</span><div><strong>DIGITAL OPERATIONS</strong><small>WEBSITE · AI · CONTENT · MAINTENANCE</small></div></div><span className="byho-live"><i /> PILOT ENVIRONMENT</span></header>
    <section className="byho-title"><div><small>OPERATIONS OVERVIEW</small><h1>ระบบดิจิทัลหนึ่งชุด<br />ดูแลได้ตลอดปี</h1></div><div className="byho-date"><CalendarDays /><span>Next review<br /><b>01 Sep 2026</b></span></div></section>
    <section className="byho-health">{health.map(([title, status, note, Icon]) => <article key={title}><div><Icon /><span>{title}</span></div><b>{status}</b><small>{note}</small></article>)}</section>
    <section className="byho-grid">
      <article className="byho-panel"><header><div><Activity /><h2>Service health</h2></div><span>Last 24h</span></header><div className="byho-metric"><strong>99.98%</strong><span>Preview uptime</span></div>{["Thai, English and Chinese routes", "RFQ interaction", "Public evidence assistant", "Employee AI fallback"].map((item) => <div className="byho-row" key={item}><CheckCircle2 />{item}<b>PASS</b></div>)}</article>
      <article className="byho-panel"><header><div><Inbox /><h2>Approval queue</h2></div><span>3 items</span></header>{[["TH-LOCAL-001","ยืนยันเบอร์โทรและอีเมลฝ่ายขายไทย","Company owner"],["QA-001","อัปโหลดใบรับรองของนิติบุคคลไทย","Quality"],["MEDIA-001","ถ่ายภาพโรงงานจริงและวิดีโอ 3 คลิป","Local media team"]].map(([id,title,owner]) => <div className="byho-task" key={id}><small>{id}</small><b>{title}</b><span>{owner}</span></div>)}</article>
      <article className="byho-panel byho-wide"><header><div><CalendarDays /><h2>90-day content operations</h2></div><span>Draft · requires company approval</span></header><div className="byho-calendar">{[["SEP","โรงงานไทย: จากการเปิดระยะที่ 1 สู่การขยายระยะที่ 2","Website · LinkedIn"],["OCT","ความสามารถด้านการหล่อและการตัดเฉือนสำหรับลูกค้าในภูมิภาค","YouTube · Website"],["NOV","ทีมงานไทย: การฝึกอบรม คุณภาพ และการเติบโตในชลบุรี","LinkedIn · Facebook"]].map(([month,title,channel]) => <article key={month}><b>{month}</b><h3>{title}</h3><span>{channel}</span></article>)}</div></article>
      <article className="byho-panel byho-wide"><header><div><Wrench /><h2>Annual maintenance scope</h2></div><span>Automated + approval gates</span></header><div className="byho-maintenance">{["Uptime, SSL and domain","Backups and dependency updates","Broken links and form tests","SEO and multilingual health","AI answer evaluation","Knowledge expiration review","Monthly analytics summary","Preview, rollback and audit log"].map((item) => <span key={item}><CheckCircle2 />{item}</span>)}</div></article>
    </section>
  </main>;
}
