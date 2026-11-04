import { createHostedMembershipResponse } from "@/lib/hosted-membership";

export const dynamic = "force-dynamic";

// Deployment configuration only; request URLs and query parameters are ignored.
export function GET() {
  return createHostedMembershipResponse({
    enabled: process.env.SOURCERATING_MEMBERSHIP_ENABLED,
    url: process.env.SOURCERATING_MEMBERSHIP_URL,
  });
}
