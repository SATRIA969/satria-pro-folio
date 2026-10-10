import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE_NAME } from "@/lib/site";

const base = "text-sm text-muted-foreground transition-colors hover:text-foreground";
const active =
  "!text-foreground font-medium underline decoration-accent decoration-2 underline-offset-8";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled || open ? "glass" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="font-serif text-2xl italic" onClick={() => setOpen(false)}>
          {SITE_NAME}
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={base}
              activeProps={{ className: active, "aria-current": "page" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/kontak"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Hubungi Saya
          </Link>
        </div>
        <button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-border lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border px-5 pb-6 lg:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground"
                activeProps={{ className: active, "aria-current": "page" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/kontak"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Hubungi Saya
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
