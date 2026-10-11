import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";
import { getNextProject, getProject, type LighthouseScores } from "@/data/projects";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/karya/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          ...pageMeta("Karya Tidak Ditemukan", "Karya yang kamu cari tidak ditemukan."),
          { name: "robots", content: "noindex" },
        ],
      };
    }
    return { meta: pageMeta(loaderData.judul, loaderData.ringkasan) };
  },
  component: ProjectPage,
});

const LIGHTHOUSE_LABELS: { key: keyof LighthouseScores; label: string }[] = [
  { key: "performance", label: "Performance" },
  { key: "seo", label: "SEO" },
  { key: "accessibility", label: "Accessibility" },
  { key: "bestPractices", label: "Best Practices" },
];

const DEVICES = [
  { id: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
  { id: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: "390px" },
] as const;

function Section({ title, children }: { title: string; children: string }) {
  return (
    <section>
      <h2 className="font-serif text-3xl italic">{title}</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{children}</p>
    </section>
  );
}

function ProjectPage() {
  const project = Route.useLoaderData();
  const next = getNextProject(project.slug);
  const [device, setDevice] = useState<(typeof DEVICES)[number]["id"]>("desktop");
  const activeDevice = DEVICES.find((d) => d.id === device)!;

  return (
    <main className="bg-hero pt-28">
      <article className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <Link
          to="/karya"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Semua Karya
        </Link>

        <header className="mt-8 text-center">
          <p className="mb-3 font-serif text-lg italic text-muted-foreground">/ Studi Kasus</p>
          <h1 className="text-5xl font-medium tracking-tight md:text-7xl">{project.judul}</h1>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-xs">{project.kategori}</span>
            <span className="rounded-full border border-border px-3 py-1 text-xs">{project.tahun}</span>
            <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">Concept Project</span>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">{project.ringkasan}</p>
          {project.linkDemo && (
            <a
              href={project.linkDemo}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              Lihat Live Demo <ExternalLink className="size-4" />
            </a>
          )}
        </header>

        {project.gambar[0] && (
          <div className="mt-14 overflow-hidden rounded-[28px] bg-accent/40 p-3">
            <img
              src={project.gambar[0].src}
              alt={project.gambar[0].alt}
              width={1280}
              height={896}
              className="aspect-[16/9] w-full rounded-[20px] object-cover"
            />
          </div>
        )}

        <div className="mx-auto mt-16 max-w-3xl space-y-12">
          <Section title="Masalah">{project.masalah}</Section>
          <Section title="Pendekatan">{project.pendekatan}</Section>
          <Section title="Hasil">{project.hasil}</Section>
        </div>

        <section className="mt-16">
          <h2 className="text-center font-serif text-3xl italic">Teknologi</h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {project.teknologi.map((t) => (
              <li key={t} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-center font-serif text-3xl italic">Skor Lighthouse</h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {LIGHTHOUSE_LABELS.map(({ key, label }) => (
              <li key={key} className="glass rounded-[24px] p-6 text-center">
                <span className="text-4xl font-medium text-success">{project.lighthouse[key]}</span>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </li>
            ))}
          </ul>
        </section>

        {project.gambar.length > 1 && (
          <section className="mt-16">
            <h2 className="text-center font-serif text-3xl italic">Galeri</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {project.gambar.slice(1).map((g) => (
                <div key={g.src} className="overflow-hidden rounded-[24px] bg-accent/40 p-2">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[16px] object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.linkDemo && (
          <section className="mt-16">
            <h2 className="text-center font-serif text-3xl italic">Preview Perangkat</h2>
            <div className="mt-6 flex justify-center gap-2">
              {DEVICES.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDevice(d.id)}
                  aria-pressed={device === d.id}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                    device === d.id
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card hover:border-foreground"
                  }`}
                >
                  <d.icon className="size-4" /> {d.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <iframe
                src={project.linkDemo}
                title={`Pratinjau ${project.judul} di ${activeDevice.label}`}
                style={{ width: activeDevice.width, maxWidth: "100%" }}
                className="h-[640px] rounded-[24px] border border-border bg-card shadow-soft transition-all duration-500"
              />
            </div>
          </section>
        )}

        {next && (
          <nav className="mt-24 border-t border-border pt-12 text-center">
            <p className="font-serif text-lg italic text-muted-foreground">Proyek berikutnya</p>
            <Link
              to="/karya/$slug"
              params={{ slug: next.slug }}
              className="group mt-3 inline-flex items-center gap-3 text-4xl font-medium tracking-tight md:text-6xl"
            >
              {next.judul}
              <ArrowUpRight className="size-8 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </nav>
        )}
      </article>
    </main>
  );
}
