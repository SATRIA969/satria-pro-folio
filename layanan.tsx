import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Clock, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PAKET, TERMASUK_SEMUA, formatRupiah } from "@/data/pricing";
import { pageMeta } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/layanan")({
  head: () => ({
    meta: pageMeta(
      "Layanan",
      "Layanan pembuatan website bisnis, landing page, UI design, hingga deploy dan hosting oleh Dian Satria Utama.",
    ),
  }),
  component: LayananPage,
});

function LayananPage() {
  return (
    <main className="bg-hero pt-28">
      <PageHeader
        eyebrow="Layanan"
        title={
          <>
            Layanan <em className="font-serif font-normal">yang kutawarkan</em>
          </>
        }
        intro="Pilih paket yang paling dekat dengan kebutuhanmu. Detail akhirnya kita rapikan bersama lewat diskusi."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {PAKET.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <div className="glass flex h-full flex-col rounded-[28px] p-8 transition-transform duration-500 hover:-translate-y-2">
                <h2 className="font-serif text-3xl italic">{p.nama}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.deskripsi}</p>

                <p className="mt-6 text-sm">
                  <span className="text-muted-foreground">Cocok untuk: </span>
                  {p.cocokUntuk}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs">
                    <Clock className="size-3.5" />
                    {p.durasi}
                  </span>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                    {p.hargaMulai === null ? "Harga: tanya via WhatsApp" : `Mulai dari ${formatRupiah(p.hargaMulai)}`}
                  </span>
                </div>

                <ul className="mt-6 space-y-2 text-sm">
                  {p.poin.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(`Halo Dian, aku tertarik dengan paket ${p.nama}. Boleh diskusi?`)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft"
                >
                  <MessageCircle className="size-4" />
                  Tanya paket ini
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 text-center md:py-24">
        <Reveal>
          <p className="mb-3 font-serif text-lg italic text-muted-foreground">/ Termasuk</p>
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
            Termasuk di <em className="font-serif font-normal">semua paket</em>
          </h2>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {TERMASUK_SEMUA.map((t) => (
              <li key={t} className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm">
                <span className="size-2.5 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="px-3 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-cta p-8 text-center md:p-16">
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
            Belum yakin <em className="font-serif font-normal">pilih yang mana?</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/70">
            Coba hitung perkiraan waktu dan biayanya dulu, lalu kirim hasilnya ke WhatsApp untuk didiskusikan.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/estimasi"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              Hitung estimasi proyek
              <span className="grid size-6 place-items-center rounded-full bg-accent text-accent-foreground">
                <ArrowUpRight className="size-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
