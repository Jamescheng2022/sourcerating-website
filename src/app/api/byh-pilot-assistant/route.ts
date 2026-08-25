import { NextResponse } from "next/server";
import { byhEvidence, employeeKnowledge } from "@/data/byh-pilot";

const normalized = (value: string) => value.trim().toLowerCase();

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { question?: string; mode?: "public" | "employee" };
  const question = normalized(body.question ?? "");
  if (!question) return NextResponse.json({ error: "question_required" }, { status: 400 });

  if (body.mode === "employee") {
    const hits = employeeKnowledge.filter((item) =>
      [item.title, item.department, item.text].some((value) => normalized(value).split(/\s+/).some((part) => part.length > 3 && question.includes(part)))
    );
    const selected = hits.length ? hits.slice(0, 2) : employeeKnowledge.slice(0, 2);
    return NextResponse.json({
      answer: selected.map((item) => item.text).join("\n\n"),
      confidence: hits.length ? "medium" : "low",
      needsHumanReview: selected.some((item) => item.status === "pilot-example"),
      citations: selected.map((item) => ({ id: item.id, title: item.title, source: item.source })),
    });
  }

  const related = byhEvidence.filter((item) => {
    const haystack = normalized(`${item.title} ${item.summary}`);
    return ["โรงงาน", "factory", "phase", "ระยะ", "casting", "machining", "铸造", "机加工", "工厂"].some(
      (term) => question.includes(term) && haystack.includes(term)
    );
  });
  const selected = related.length ? related.slice(0, 3) : byhEvidence.slice(0, 2);
  return NextResponse.json({
    answer: selected.map((item) => item.summary).join(" "),
    confidence: related.length ? "high" : "medium",
    needsHumanReview: false,
    citations: selected.map((item) => ({ id: item.id, title: item.title, source: item.source, url: item.url })),
    boundary: "The assistant answers only from the pilot evidence set and does not promise price, delivery, certification or current capacity.",
  });
}
