import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, role, region, priorityFeature } = body;

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const entry = {
      id: `prev_${Date.now()}`,
      email: email.trim().toLowerCase(),
      role: role || "Not specified",
      region: region || "Not specified",
      priorityFeature: priorityFeature || "General",
      createdAt: new Date().toISOString(),
      previewNote: "Local preview test capture only - never transmitted externally",
    };

    // Safely write to local repository preview storage for testing
    const previewDir = path.join(process.cwd(), "data");
    const filePath = path.join(previewDir, "preview-waitlist.json");

    try {
      await fs.mkdir(previewDir, { recursive: true });
      let existing: unknown[] = [];
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        existing = JSON.parse(fileContent);
      } catch {
        existing = [];
      }
      existing.push(entry);
      await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
    } catch {
      // If file system is read-only in certain serverless environments, gracefully continue
    }

    return NextResponse.json({
      ok: true,
      previewMode: true,
      id: entry.id,
      message:
        "Preview interest captured successfully in local test environment. No external email or CRM tracking was initiated.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process preview submission." },
      { status: 500 }
    );
  }
}
