#!/usr/bin/env pwsh
# Source Rating Website �?One-Command Setup & Deploy to GitHub + Vercel
# Run: powershell -ExecutionPolicy Bypass -File setup.ps1

$ErrorActionPreference = "Stop"
$ProjectDir = "$PSScriptRoot"
$RepoUrl = "https://github.com/Jamescheng2022/sourcerating-website.git"
$GithubPAT = ""

Write-Host "=== SourceRating Website Setup ===" -ForegroundColor Cyan

# ── 1. Ensure Node.js ──
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Node.js $(node -v)" -ForegroundColor Green

# ── 2. Generate all source files ──
Write-Host "Generating project files..." -ForegroundColor Yellow

$files = @{}

# ── src/lib/utils.ts
$files["src/lib/utils.ts"] = @'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
'@

# ── src/lib/metadata.ts
$files["src/lib/metadata.ts"] = @'
import { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
interface PageMetadata { title: string; description: string; path: string; ogImage?: string; noIndex?: boolean; }
export function generatePageMetadata({ title, description, path, ogImage = "/images/og-default.jpg", noIndex = false }: PageMetadata): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = path === "/" ? `${title} - ${siteConfig.tagline}` : `${title} | ${siteConfig.name}`;
  return {
    title: fullTitle, description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: { title: fullTitle, description, url, siteName: siteConfig.name, locale: siteConfig.locale, type: "website", images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
export function generateOrganizationSchema() {
  return { "@context": "https://schema.org", "@type": "ProfessionalService", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description, contactPoint: { "@type": "ContactPoint", email: siteConfig.contact.email, contactType: "customer service", availableLanguage: ["English", "Chinese"] }, address: { "@type": "PostalAddress", addressCountry: "CN" } };
}
'@

# ── src/data/site-config.ts
$files["src/data/site-config.ts"] = @'
export const siteConfig = {
  name: "Source Rating",
  tagline: "China Factory Inspection & Industrial Sourcing",
  domain: "www.sourcerating.com",
  url: "https://www.sourcerating.com",
  description: "Independent, on-the-ground factory inspection, supplier verification, and industrial sourcing services in China. Helping overseas clients reduce risk and ensure quality.",
  author: "Source Rating",
  locale: "en_US",
  contact: { email: "contact@sourcerating.com", wechat: "SourceRating" },
  social: { linkedin: "https://linkedin.com/company/sourcerating" },
  nav: [
    { label: "Home", href: "/" }, { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" }, { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" },
  ],
  footer: {
    tagline: "Your independent, on-the-ground partner for factory inspection and industrial sourcing in China.",
    quickLinks: [{ label: "Services", href: "/services" }, { label: "Industries", href: "/industries" }, { label: "Case Studies", href: "/case-studies" }, { label: "Blog", href: "/blog" }, { label: "FAQ", href: "/faq" }],
    company: [{ label: "About", href: "/about" }, { label: "Contact", href: "/contact" }],
    legal: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }],
  },
} as const;
'@

Write-Host "Writing source files..." -ForegroundColor Yellow
foreach ($path in $files.Keys) {
    $fullPath = Join-Path $ProjectDir $path
    $dir = Split-Path $fullPath -Parent
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    Set-Content -Path $fullPath -Value $files[$path] -Encoding UTF8
}

Write-Host "[OK] Core files written" -ForegroundColor Green

# ── 3. Install dependencies ──
Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
Set-Location $ProjectDir
npm install
Write-Host "[OK] Dependencies installed" -ForegroundColor Green

# ── 4. Initialize Git & Push ──
Write-Host "Setting up Git..." -ForegroundColor Yellow
if (!(Test-Path ".git")) {
    git init
    git config user.name "SourceRating"
    git config user.email "contact@sourcerating.com"
}
git add -A
git commit -m "Initial commit: Source Rating website"
git branch -M main

# Push using PAT
$remoteUrl = $RepoUrl -replace "https://", "https://x-access-token:$GithubPAT@"
git remote remove origin 2>$null
git remote add origin $remoteUrl

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main --force
Write-Host "[OK] Pushed to GitHub" -ForegroundColor Green

# ── 5. Deploy to Vercel ──
Write-Host ""
Write-Host "=== NEXT: Deploy to Vercel ===" -ForegroundColor Cyan
Write-Host "1. Go to https://vercel.com/new"
Write-Host "2. Import your GitHub repo: Jamescheng2022/sourcerating-website"
Write-Host "3. Vercel auto-detects Next.js �?no special config needed"
Write-Host "4. Build command: npm run build (auto-detected)"
Write-Host "5. Output dir: .next (auto-detected)"
Write-Host "6. Add domain: www.sourcerating.com"
Write-Host ""
Write-Host "[DONE] Project is on GitHub and ready for Vercel!" -ForegroundColor Green
