import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 4000) : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "contact@sourcerating.com";

  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
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

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
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
    return NextResponse.json({ error: "Unable to send message right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
