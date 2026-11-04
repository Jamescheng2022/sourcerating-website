import Link from "next/link";
export function Footer() { return <footer className="editorial-footer"><div><Link href="/">SourceRating</Link><span>© {new Date().getFullYear()} · James Cheng</span></div><div><Link href="/about">About the author</Link><a href="mailto:contact@sourcerating.com">Contact</a><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>; }
