import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Copy, Github, MessageCircle } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import portrait from "@/assets/portrait.png";
import sabora from "@/assets/sabora.jpg";
import { GITHUB_URL, WHATSAPP_DISPLAY, WHATSAPP_URL, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta(
      "Beranda",
      "Aku membuat website yang rapi, cepat, dan siap dipakai untuk bisnis, mulai dari konsep sampai online.",
    ),
  }),
  component: Index,
});

const STACK = ["React", "TypeScript", "Tailwind CSS", "Vite", "GitHub", "Vercel", "Figma"];
const SKILLS = [
  { label: "Website Bisnis", dot: "bg-tag-1" },
  { label: "Landing Page", dot: "bg-tag-2" },
  { label: "UI Design", dot: "bg-tag-3" },
  { label: "Responsive Design", dot: "bg-tag-4" },
  { label: "Web Performance", dot: "bg-tag-5" },
  { label: "Deploy & Hosting", dot: "bg-tag-6" },
];
const STEPS = [
  { n: "01", t: "Diskusi", d: "Memahami kebutuhan, target pengunjung, dan tujuan website.", offset: "md:mt-24" },
  { n: "02", t: "Desain & Bangun", d: "Membuat desain dan mengembangkan website yang responsif.", offset: "md:mt-0" },
  { n: "03", t: "Rilis", d: "Uji coba, revisi, lalu website online dan siap dipakai.", offset: "md:mt-12" },
];

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`animate-fade-up ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 font-serif text-lg italic text-muted-foreground">/ {children}</p>;
}

const btn = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5";
const field = "mt-1 w-full rounded-2xl border border-input bg-card/80 px-4 py-3 text-sm outline-none focus:border-foreground aria-[invalid=true]:border-destructive";

function Index() {
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(WHATSAPP_DISPLAY.replace(/-/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nama = String(fd.get("nama") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const kebutuhan = String(fd.get("kebutuhan") ?? "").trim();
    const next = {
      nama: !nama,
      email: !/^\S+@\S+\.\S+$/.test(email),
      kebutuhan: !kebutuhan,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    const text = `Halo Dian, aku ${nama} (${email}). Aku mau diskusi soal website: ${kebutuhan}`;
    window.open(`https://wa.me/6285334814661?text=${encodeURIComponent(text)}`, "_blank", "noreferrer");
  };

  return (
    <main>
      <section className="relative overflow-hidden bg-hero pt-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-medium tracking-tight sm:text-7xl md:text-8xl">Hai, aku Dian</h1>
            <p className="relative z-20 -mb-6 font-serif text-6xl italic leading-none sm:text-8xl md:-mb-14 md:text-[9rem]">
              Web Developer
            </p>
          </div>
          <div className="relative grid items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
            <div className="order-2 pb-10 md:order-1 md:pb-32">
              <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-soft">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative size-2.5 rounded-full bg-success" />
                </span>
                Terbuka untuk proyek baru
              </span>
              <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
                {["Proyek konsep nyata", "React · TypeScript · Tailwind", "Siap dipakai klien"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-foreground" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative order-1 mx-auto md:order-2">
              <div className="absolute inset-x-[-20%] top-[10%] bottom-0 bg-glow blur-2xl" aria-hidden="true" />
              <img
                src={portrait}
                alt="Foto Dian Satria Utama"
                width={896}
                height={1152}
                className="relative w-72 grayscale [mask-image:linear-gradient(to_bottom,black_80%,transparent)] sm:w-96 md:w-[26rem]"
              />
            </div>
            <div className="order-3 pb-10 md:pb-32">
              <p className="max-w-xs text-base leading-relaxed">
                Aku membuat website yang rapi, cepat, dan siap dipakai untuk bisnis, mulai dari konsep sampai online.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#karya" className={`${btn} bg-primary text-primary-foreground hover:shadow-soft`}>
                  Lihat Karya
                  <span className="grid size-6 place-items-center rounded-full bg-accent text-accent-foreground">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`${btn} border border-foreground/20 bg-background/60 hover:border-foreground`}
                >
                  Hubungi via WhatsApp
                  <span className="grid size-6 place-items-center rounded-full bg-foreground/5">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden border-y border-border bg-background py-6" aria-label="Tech stack">
          <div className="flex w-max animate-marquee gap-14">
            {[...STACK, ...STACK, ...STACK, ...STACK].map((s, i) => (
              <span key={i} className="flex items-center gap-3 text-xl font-semibold text-muted-foreground/70">
                <span className="size-2 rounded-full bg-accent" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="tentang" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24 text-center md:py-36">
        <Reveal>
          <Eyebrow>Tentang</Eyebrow>
          <p className="text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            Fokusku adalah memadukan{" "}
            <em className="font-serif font-normal text-muted-foreground">desain yang jelas</em>, kode yang rapi, dan{" "}
            <em className="font-serif font-normal text-muted-foreground">pengalaman pengguna yang nyaman</em> untuk
            menyelesaikan masalah bisnis nyata.
          </p>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {SKILLS.map((s) => (
              <li key={s.label} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
                <span className={`size-2.5 rounded-full ${s.dot}`} />
                {s.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="cara-kerja" className="relative scroll-mt-24 overflow-hidden px-5 py-24 md:py-32">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-glow opacity-60 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="text-center">
            <Eyebrow>Proses</Eyebrow>
            <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
              Begini <em className="font-serif font-normal">cara kerjaku</em>
            </h2>
          </Reveal>
          <div className="relative mt-16 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 120} className={s.offset}>
                <div className="glass rounded-[28px] p-8 transition-transform duration-500 hover:-translate-y-2">
                  <span className="text-5xl font-light">{s.n}</span>
                  <h3 className="mt-16 font-serif text-3xl italic">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="karya" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 md:px-8">
        <Reveal className="text-center">
          <Eyebrow>Proyek Terbaik</Eyebrow>
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
            Karya <em className="font-serif font-normal">Pilihan</em>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <Reveal>
            <Link to="/karya/$slug" params={{ slug: "sabora" }} className="group block">
              <div className="relative overflow-hidden rounded-[28px] bg-accent/40 p-3 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-soft">
                <img
                  src={sabora}
                  alt="Tampilan Sabora"
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="aspect-[4/3] w-full rounded-[20px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Lihat Studi Kasus <ArrowUpRight className="size-4" />
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 px-1">
                <h3 className="mr-auto text-xl font-medium">Sabora</h3>
                <span className="rounded-full border border-border px-3 py-1 text-xs">Restaurant Fine Dining Website</span>
                <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">Concept Project</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="kontak" className="scroll-mt-24 px-3 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[32px] bg-cta p-8 md:grid-cols-2 md:p-16">
          <div>
            <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
              Punya ide website? <em className="font-serif font-normal">Yuk diskusikan.</em>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </div>
            <button
              type="button"
              onClick={copyNumber}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Copy className="size-4" />
              {copied ? "Nomor tersalin!" : `WhatsApp: ${WHATSAPP_DISPLAY} · ketuk untuk salin`}
            </button>
            <div className="mt-6 flex gap-3">
              <a
                href={GITHUB_URL}
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
                className="grid size-11 place-items-center rounded-full bg-card/70 hover:bg-card"
              >
                <Github className="size-5" />
              </a>
            </div>
          </div>
          <form noValidate onSubmit={onSubmit} className="glass space-y-4 rounded-[24px] p-6">
            <label className="block text-sm">
              Nama
              <input type="text" name="nama" className={field} aria-invalid={!!errors.nama} />
            </label>
            <label className="block text-sm">
              Email
              <input type="email" name="email" className={field} aria-invalid={!!errors.email} />
            </label>
            <label className="block text-sm">
              Kebutuhan
              <textarea name="kebutuhan" rows={4} className={field} aria-invalid={!!errors.kebutuhan} />
            </label>
            <button className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground">
              Kirim Pesan
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
