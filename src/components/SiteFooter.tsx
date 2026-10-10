import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { GITHUB_URL, NAV_ITEMS, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
      <div>
        <p className="font-serif text-3xl italic">{SITE_NAME}</p>
        <p className="mt-1 text-sm text-muted-foreground">Website rapi, cepat, dan siap dipakai.</p>
      </div>
      <nav className="flex flex-wrap gap-6 text-sm text-muted-foreground">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
            activeOptions={{ exact: item.to === "/" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="grid size-10 place-items-center rounded-full border border-border hover:text-foreground"
        >
          <Github className="size-4" />
        </a>
        <p>© 2026 {SITE_NAME}</p>
      </div>
    </footer>
  );
}
