import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/karya/")({
  head: () => ({
    meta: pageMeta(
      "Karya",
      "Kumpulan karya dan proyek website buatan Dian Satria Utama, dibangun dengan React, TypeScript, dan Tailwind.",
    ),
  }),
  component: KaryaPage,
});

function KaryaPage() {
  return (
    <main className="bg-hero pt-28">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <p className="mb-3 text-center font-serif text-lg italic text-muted-foreground">/ Karya</p>
        <h1 className="text-center text-5xl font-medium tracking-tight md:text-7xl">
          Karya <em className="font-serif font-normal">Pilihan</em>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground">
          Proyek yang aku rancang dan bangun dari konsep sampai online.
        </p>

        <div className="mt-14 grid gap-10">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              to="/karya/$slug"
              params={{ slug: p.slug }}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-[28px] bg-accent/40 p-3 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-soft">
                <img
                  src={p.gambar[0]?.src}
                  alt={p.gambar[0]?.alt ?? p.judul}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="aspect-[4/3] w-full rounded-[20px] object-cover transition-transform duration-700 group-hover:scale-[1.03] md:aspect-[16/9]"
                />
                <span className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Lihat Studi Kasus <ArrowUpRight className="size-4" />
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 px-1">
                <h2 className="mr-auto text-xl font-medium">{p.judul}</h2>
                <span className="rounded-full border border-border px-3 py-1 text-xs">{p.kategori}</span>
                <span className="rounded-full border border-border px-3 py-1 text-xs">{p.tahun}</span>
                <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                  Concept Project
                </span>
              </div>
              <p className="mt-2 max-w-2xl px-1 text-sm text-muted-foreground">{p.ringkasan}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
