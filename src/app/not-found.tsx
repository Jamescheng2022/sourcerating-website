import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "Page Not Found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
      <div className="text-center px-4">
        <p className="text-sm font-semibold uppercase text-brand-600 mb-3">404</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Page not found</h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-700 rounded-lg hover:bg-brand-800 transition-colors"><ArrowLeft className="h-4 w-4" />Back to Home</Link>
      </div>
    </div>
  );
}
