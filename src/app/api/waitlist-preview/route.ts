import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// TODO (Owner Gate): The local filesystem (data/preview-waitlist.json) is read-only on Vercel serverless deployments.
// When ready to accept public production waitlist signups, the Owner must provision persistent storage:
// e.g. Vercel KV / Upstash Redis (KV_REST_API_URL / KV_REST_API_TOKEN) or PostgreSQL database (DATABASE_URL)
// and wire it here. Until persistent storage is provided, serverless attempts return 503 so the UI honestly reports the failure.
// DO NOT integrate or mock an unapproved store here; storage selection remains an Owner gate.

// Serialize local storage updates within this Node process.
let previewWriteQueue: Promise<void> = Promise.resolve();

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
      const write = previewWriteQueue.then(async () => {
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
      });
      // Keep later submissions running even if this write fails.
      previewWriteQueue = write.catch(() => {});
      await write;
    } catch {
      // Read-only filesystem (e.g. serverless preview) — do not claim success for an entry we did not persist.
      return NextResponse.json(
        {
          ok: false,
          error: "The submission could not be saved. Please try again later.",
        },
        { status: 503 }
      );
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
