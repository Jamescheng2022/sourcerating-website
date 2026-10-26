import { searchResearch } from "@/lib/research-catalog";

export function GET(request: Request) {
  const result = searchResearch(new URL(request.url).searchParams);
  return Response.json(result.body, {
    status: result.status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}
