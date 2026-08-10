import { NextResponse } from "next/server";
import {
  guardPublicFormRequest,
  isSpamTrapFilled,
  isValidEmail,
} from "@/lib/request-guard";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 4000) : "";
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const requestId = request.headers.get("x-vercel-id") || undefined;
  const guardFailure = guardPublicFormRequest(request, "contact");

  if (guardFailure) {
    console.warn(JSON.stringify({
      level: "warn",
      event: "form_request_rejected",
      route: "/api/contact",
      requestId,
      reason: guardFailure.reason,
    }));
    return NextResponse.json(
      { error: guardFailure.error },
      { status: guardFailure.status },
    );
  }

  const body = await request.json().catch(() => null);
  if (isSpamTrapFilled(body)) {
    console.warn(JSON.stringify({
      level: "warn",
      event: "form_request_rejected",
      route: "/api/contact",
      requestId,
      reason: "spam_trap",
    }));
    return NextResponse.json({ ok: true });
  }

  const name = clean(body?.name);
  const email = clean(body?.email);
  const company = clean(body?.company);
  const targetCountry = clean(body?.targetCountry);
  const projectType = clean(body?.projectType);
  const materialCategory = clean(body?.materialCategory);
  const supplier = clean(body?.supplier);
  const orderStage = clean(body?.orderStage);
  const drawingStatus = clean(body?.drawingStatus);
  const message = clean(body?.message);

  if (!name || !isValidEmail(email) || !message) {
    console.warn(JSON.stringify({
      level: "warn",
      event: "form_validation_failed",
      route: "/api/contact",
      requestId,
    }));
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "contact@sourcerating.com";

  if (!apiKey) {
    console.error(JSON.stringify({
      level: "error",
      event: "lead_delivery_unavailable",
      route: "/api/contact",
      requestId,
      reason: "email_not_configured",
    }));
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const text = [
    "New Source Rating inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company / Country: ${company || "Not provided"}`,
    `Target country / project location: ${targetCountry || "Not provided"}`,
    `Project type: ${projectType || "Not selected"}`,
    `Material / component category: ${materialCategory || "Not selected"}`,
    `Supplier name / link: ${supplier || "Not provided"}`,
    `Order stage: ${orderStage || "Not selected"}`,
    `Drawings/specifications: ${drawingStatus || "Not selected"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Source Rating Website <contact@sourcerating.com>",
      to: [to],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      text,
    }),
  });

  if (!response.ok) {
    console.error(JSON.stringify({
      level: "error",
      event: "lead_delivery_failed",
      route: "/api/contact",
      requestId,
      providerStatus: response.status,
      durationMs: Date.now() - startedAt,
    }));
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 502 });
  }

  console.log(JSON.stringify({
    level: "info",
    event: "lead_delivery_succeeded",
    route: "/api/contact",
    requestId,
    durationMs: Date.now() - startedAt,
  }));

  return NextResponse.json({ ok: true });
}
