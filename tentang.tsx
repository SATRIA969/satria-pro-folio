import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, MessageCircle } from "lucide-react";
import portrait from "@/assets/portrait.png";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { GITHUB_URL, WHATSAPP_URL, pageMeta } from "@/lib/site";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: pageMeta(
      "Tentang",
      "Kenali Dian Satria Utama, web developer freelance yang fokus pada desain jelas, kode rapi, dan pengalaman pengguna yang nyaman.",
    ),
  }),
  component: TentangPage,
});

const SKILL_GROUPS = [
  { title: "Frontend", dot: "bg-tag-2", items: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
  { title: "Tools", dot: "bg-tag-5", items: ["GitHub", "Vercel"] },
  { title: "Desain", dot: "bg-tag-3", items: ["Figma", "UI Design", "Responsive Design"] },
];

const JANJI = [
  { t: "Revisi 2x", d: "Dua putaran revisi sudah termasuk di setiap paket." },
  { t: "Balasan cepat", d: "Pesanmu kubalas maksimal dalam 24 jam." },
  { t: "Update mingguan", d: "Kamu selalu tahu sampai mana progres website-mu." },
];

function TentangPage() {
  return (
    <main className="bg-hero pt-28">
      <PageHeader
        eyebrow="Tentang"
        title={
          <>
            Tentang <em className="font-serif font-normal">aku</em>
          </>
        }
      />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
          <Reveal className="mx-auto">
            <div className="overflow-hidden rounded-[28px] bg-accent/40 p-3">
              <img
                src={portrait}
                alt="Foto Dian Satria Utama"
                width={896}
                height={1152}
                className="w-64 rounded-[20px] object-cover grayscale sm:w-80"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              Fokusku adalah memadukan{" "}
              <em className="font-serif font-normal text-muted-foreground">desain yang jelas</em>, kode yang rapi, dan{" "}
              <em className="font-serif font-normal text-muted-foreground">pengalaman pengguna yang nyaman</em> untuk
              menyelesaikan masalah bisnis nyata.
            </p>
            <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Aku Dian, web developer freelance yang membantu bisnis punya website yang rapi, cepat, dan siap dipakai.
                Aku mengerjakannya dari awal sampai akhir: memahami kebutuhan, merancang tampilan, membangun, sampai
                website online.
              </p>
              <p>
                Menurutku, website yang bagus bukan yang paling ramai, tapi yang membuat pengunjung langsung paham dan
                mudah menghubungimu. Karena itu aku mengutamakan struktur yang jelas, tampilan yang nyaman di HP, dan
                halaman yang termuat cepat.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Reveal className="text-center">
          <p className="mb-3 font-serif text-lg italic text-muted-foreground">/ Skill</p>
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
            Alat yang <em className="font-serif font-normal">kupakai</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 120}>
              <div className="glass h-full rounded-[28px] p-8">
                <h3 className="font-serif text-3xl italic">{g.title}</h3>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
                      <span className={`size-2.5 rounded-full ${g.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="text-center">
          <p className="mb-3 font-serif text-lg italic text-muted-foreground">/ Komitmen</p>
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
            Janji <em className="font-serif font-normal">kerja</em>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {JANJI.map((j, i) => (
            <Reveal key={j.t} delay={i * 120}>
              <div className="glass h-full rounded-[28px] p-8 transition-transform duration-500 hover:-translate-y-2">
                <span className="text-5xl font-light">0{i + 1}</span>
                <h3 className="mt-12 font-serif text-3xl italic">{j.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{j.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-3 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-cta p-8 text-center md:p-16">
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
            Punya ide website? <em className="font-serif font-normal">Yuk diskusikan.</em>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
            <Link
              to="/karya"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-6 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-foreground"
            >
              Lihat Karya <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-11 place-items-center rounded-full bg-card/70 hover:bg-card"
            >
              <Github className="size-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
