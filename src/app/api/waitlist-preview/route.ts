import { NextResponse } from "next/server";

// TODO (Owner Gate): The local filesystem is read-only on Vercel serverless deployments.
// When ready to accept public production waitlist signups, the Owner must provision persistent storage:
// e.g. Vercel KV / Upstash Redis (KV_REST_API_URL / KV_REST_API_TOKEN) or PostgreSQL database (DATABASE_URL)
// and wire it here. Until persistent storage is provided, this route is fail-closed (HTTP 503) so no unpersisted
// user data is accepted or collected.
// DO NOT integrate or mock an unapproved store here; storage selection remains an Owner gate.

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error:
        "Mobile app waitlist registration is currently in preparation. Public submissions are not accepted at this time.",
    },
    { status: 503 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error:
        "Mobile app waitlist registration is currently in preparation.",
    },
    { status: 503 }
  );
}
