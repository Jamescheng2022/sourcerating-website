import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEEPSEEK_ENDPOINT = "https://api.deepseek.com/chat/completions";

type RiskLevel = "Low" | "Moderate" | "High";

interface RiskScreenInput {
  name: string;
  email: string;
  company: string;
  country: string;
  supplier: string;
  category: string;
  stage: string;
  targetMarket: string;
  drawingStatus: string;
  concern: string;
}

interface RiskAssessment {
  riskLevel: RiskLevel;
  confidence: string;
  summary: string;
  keyRisks: string[];
  evidenceToRequest: string[];
  questionsForSupplier: string[];
  recommendedNextStep: string;
}

function clean(value: unknown, max = 1600) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function normalizeAssessment(value: Partial<RiskAssessment> | null, fallback: RiskAssessment): RiskAssessment {
  if (!value) return fallback;

  const riskLevel: RiskLevel =
    value.riskLevel === "Low" || value.riskLevel === "Moderate" || value.riskLevel === "High"
      ? value.riskLevel
      : fallback.riskLevel;

  return {
    riskLevel,
    confidence: clean(value.confidence, 80) || fallback.confidence,
    summary: clean(value.summary, 700) || fallback.summary,
    keyRisks: Array.isArray(value.keyRisks) && value.keyRisks.length ? value.keyRisks.slice(0, 5).map((item) => clean(item, 220)).filter(Boolean) : fallback.keyRisks,
    evidenceToRequest: Array.isArray(value.evidenceToRequest) && value.evidenceToRequest.length ? value.evidenceToRequest.slice(0, 6).map((item) => clean(item, 220)).filter(Boolean) : fallback.evidenceToRequest,
    questionsForSupplier: Array.isArray(value.questionsForSupplier) && value.questionsForSupplier.length ? value.questionsForSupplier.slice(0, 6).map((item) => clean(item, 260)).filter(Boolean) : fallback.questionsForSupplier,
    recommendedNextStep: clean(value.recommendedNextStep, 500) || fallback.recommendedNextStep,
  };
}

function buildRuleAssessment(input: RiskScreenInput): RiskAssessment {
  const text = `${input.stage} ${input.drawingStatus} ${input.concern} ${input.category}`.toLowerCase();
  let score = 0;
  const keyRisks: string[] = [];

  if (/before deposit|before contract|deposit/.test(text)) {
    score += 18;
    keyRisks.push("Payment may move before the supplier's legal entity, factory address, and process ownership are verified.");
  }

  if (/production ongoing|before shipment|quality|delay|problem|rework|urgent/.test(text)) {
    score += 20;
    keyRisks.push("The current order stage suggests quality, schedule, or shipment-release risk may already be active.");
  }

  if (/no technical documents|preliminary specs|no drawings|not available/.test(text)) {
    score += 18;
    keyRisks.push("Supplier capability is hard to judge without drawings, specifications, standards, or acceptance criteria.");
  }

  if (/certificate|traceability|test report|compliance|ce|ukca|astm|en |as\/nz/.test(text)) {
    score += 15;
    keyRisks.push("Document traceability and destination-market compliance need to be connected to the actual goods.");
  }

  if (/custom|made-to-spec|equipment|mep|civil|structural|fabricated/.test(text)) {
    score += 10;
    keyRisks.push("Project-specific products need process evidence, not only catalog photos or a low quotation.");
  }

  if (/bank|payment|invoice|trading|agent|whatsapp|alibaba|unknown/.test(text)) {
    score += 12;
    keyRisks.push("Commercial identity and payment-chain consistency should be checked before committing funds.");
  }

  const riskLevel: RiskLevel = score >= 45 ? "High" : score >= 24 ? "Moderate" : "Low";

  const defaultRisk =
    "The first pass did not identify an extreme red flag, but supplier identity, factory capability, document traceability, and inspection hold points still need evidence.";

  return {
    riskLevel,
    confidence: "Preliminary desk screen",
    summary:
      riskLevel === "High"
        ? "This supplier should not be treated as approved yet. Verify identity, capability, documents, and order controls before deposit, production release, or shipment."
        : riskLevel === "Moderate"
          ? "This supplier may be workable, but the buyer should request targeted evidence and define inspection hold points before relying on the quote."
          : "The initial risk appears manageable if the supplier provides clear documents, project-relevant evidence, and accepts defined inspection controls.",
    keyRisks: keyRisks.length ? keyRisks.slice(0, 5) : [defaultRisk],
    evidenceToRequest: [
      "Business license, exact legal company name, factory address, and export entity.",
      "Recent project or production evidence for a similar construction material, equipment, or component package.",
      "Drawings/specifications revision, applicable standards, material grade, finish, tolerance, and acceptance criteria.",
      "QA/QC records, inspection flow, material certificates, and traceability method for batches, lots, heat numbers, or serial numbers.",
      "Production schedule, critical hold points, packing method, labels, and shipment-release document list.",
    ],
    questionsForSupplier: [
      "Which processes are completed in-house, and which are subcontracted?",
      "Who is responsible for technical review, QA/QC, and final shipment release?",
      "Can you show evidence from a similar order with sensitive customer data removed?",
      "How will material certificates and test reports be linked to the actual goods shipped?",
      "What are the most likely delivery or quality risks for this order, and how will you control them?",
    ],
    recommendedNextStep:
      riskLevel === "High"
        ? "Hold payment or shipment release until a focused desk verification or factory visit confirms the legal entity, factory capability, document traceability, and current production status."
        : "Send the evidence request to the supplier first. If the answers are weak, unclear, or inconsistent, move to a paid desk check or factory verification visit.",
  };
}

async function getDeepSeekAssessment(input: RiskScreenInput, fallback: RiskAssessment): Promise<RiskAssessment | null> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 14000);

  try {
    const response = await fetch(DEEPSEEK_ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-v4-flash",
        thinking: { type: "disabled" },
        temperature: 0.2,
        max_tokens: 900,
        response_format: { type: "json_object" },
        stream: false,
        messages: [
          {
            role: "system",
            content:
              "You are a senior China construction supplier verification analyst. Return JSON only with keys: riskLevel, confidence, summary, keyRisks, evidenceToRequest, questionsForSupplier, recommendedNextStep. riskLevel must be Low, Moderate, or High. Be practical, cautious, and concise. Do not give legal advice.",
          },
          {
            role: "user",
            content: JSON.stringify(input),
          },
        ],
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== "string") return null;

    return normalizeAssessment(JSON.parse(content), fallback);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function sendLeadEmail(input: RiskScreenInput, assessment: RiskAssessment, source: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.CONTACT_TO || "contact@sourcerating.com";
  const text = [
    "New Source Rating risk screen",
    "",
    `Assessment source: ${source}`,
    `Risk level: ${assessment.riskLevel}`,
    `Summary: ${assessment.summary}`,
    "",
    "Client",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company / country: ${input.company || "Not provided"} / ${input.country || "Not provided"}`,
    "",
    "Supplier context",
    `Supplier: ${input.supplier}`,
    `Category: ${input.category}`,
    `Order stage: ${input.stage}`,
    `Target market / project location: ${input.targetMarket || "Not provided"}`,
    `Drawings/specifications: ${input.drawingStatus || "Not selected"}`,
    "",
    "Client concern",
    input.concern,
    "",
    "Key risks",
    ...assessment.keyRisks.map((item) => `- ${item}`),
    "",
    "Evidence to request",
    ...assessment.evidenceToRequest.map((item) => `- ${item}`),
    "",
    "Questions for supplier",
    ...assessment.questionsForSupplier.map((item) => `- ${item}`),
    "",
    "Recommended next step",
    assessment.recommendedNextStep,
  ].join("\n");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Source Rating Risk Screen <contact@sourcerating.com>",
      to: [to],
      reply_to: input.email,
      subject: `Risk screen: ${assessment.riskLevel} - ${input.supplier.slice(0, 80)}`,
      text,
    }),
  });

  return response.ok;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const input: RiskScreenInput = {
    name: clean(body?.name, 120),
    email: clean(body?.email, 160),
    company: clean(body?.company, 160),
    country: clean(body?.country, 120),
    supplier: clean(body?.supplier, 500),
    category: clean(body?.category, 160),
    stage: clean(body?.stage, 160),
    targetMarket: clean(body?.targetMarket, 160),
    drawingStatus: clean(body?.drawingStatus, 160),
    concern: clean(body?.concern, 1600),
  };

  if (!input.name || !input.email || !input.supplier || !input.category || !input.stage || !input.concern) {
    return NextResponse.json(
      { error: "Name, work email, supplier link/name, category, order stage, and main concern are required." },
      { status: 400 },
    );
  }

  const fallback = buildRuleAssessment(input);
  const aiAssessment = await getDeepSeekAssessment(input, fallback);
  const assessment = aiAssessment || fallback;
  const source = aiAssessment ? "deepseek" : "rules";
  const emailQueued = await sendLeadEmail(input, assessment, source);

  return NextResponse.json({
    ok: true,
    source,
    emailQueued,
    assessment,
    message: emailQueued
      ? "Your risk screen has been received for human review."
      : "Your preliminary screen is ready. Please email contact@sourcerating.com directly if you want a human follow-up.",
  });
}
