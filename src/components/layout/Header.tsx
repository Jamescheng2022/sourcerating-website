import Link from "next/link";
import { topics } from "@/lib/topics";
export function Header() {
 return <header className="editorial-header"><div className="editorial-brand-row"><Link href="/" className="editorial-logo" aria-label="SourceRating home"><span>S.</span>SourceRating</Link><form action="/" role="search"><label htmlFor="site-search" className="sr-only">Search articles</label><input id="site-search" name="q" type="search" placeholder="Search procurement topics…"/><button type="submit" aria-label="Search articles">Search</button></form></div><nav aria-label="Article topics" className="editorial-topics">{topics.map(t=><Link href={t === "All" ? "/" : `/?topic=${encodeURIComponent(t)}`} key={t}>{t}</Link>)}</nav></header>;
}
