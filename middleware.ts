import type { NextRequest } from "next/server";

const maintenanceHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex,nofollow,noarchive" />
  <title>Temporarily unavailable</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #f5f6f7;
      color: #1f2933;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    }
    main {
      width: min(560px, calc(100% - 40px));
      padding: 48px 40px;
      background: #fff;
      border: 1px solid #e3e6e8;
      border-radius: 14px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(20, 32, 43, 0.05);
    }
    h1 { margin: 0 0 12px; font-size: 28px; font-weight: 650; }
    p { margin: 0; color: #66717b; font-size: 15px; line-height: 1.7; }
  </style>
</head>
<body>
  <main>
    <h1>Temporarily unavailable</h1>
    <p>This site is currently offline for review.</p>
  </main>
</body>
</html>`;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default function middleware(_request: NextRequest) {
  return new Response(maintenanceHtml, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "Retry-After": "86400",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
