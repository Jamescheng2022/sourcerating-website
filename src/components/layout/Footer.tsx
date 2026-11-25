import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  const { email } = siteConfig.contact;

  return (
    <footer className="editorial-footer">
      <div>
        <Link href="/">SourceRating</Link>
        <span>
          © {new Date().getFullYear()} AnThai Ventures LLC. {siteConfig.operatorNotice} Contact:{" "}
          <a href={`mailto:${email}`}>{email}</a>
        </span>
      </div>
      <div>
        <Link href="/about">About the author</Link>
        <a href={`mailto:${email}`}>Contact</a>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </footer>
  );
}
