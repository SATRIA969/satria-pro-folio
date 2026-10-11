import { createFileRoute } from "@tanstack/react-router";
import { Check, MessageCircle, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { FITUR, JENIS_WEB, formatRupiah, hitungEstimasi } from "@/data/pricing";
import { pageMeta } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/estimasi")({
  head: () => ({
    meta: pageMeta(
      "Estimasi Proyek",
      "Hitung perkiraan waktu dan biaya website kamu, lalu kirim hasilnya ke Dian Satria Utama lewat WhatsApp.",
    ),
  }),
  component: EstimasiPage,
});

const chipOn = "bg-primary text-primary-foreground";
const chipOff = "border border-border bg-card hover:border-foreground";

function EstimasiPage() {
  const [jenisId, setJenisId] = useState<string>(JENIS_WEB[0]!.id);
  const [halaman, setHalaman] = useState<number>(JENIS_WEB[0]!.halamanDasar);
  const [fiturIds, setFiturIds] = useState<string[]>([]);

  const jenis = JENIS_WEB.find((j) => j.id === jenisId) ?? JENIS_WEB[0]!;
  const hasil = hitungEstimasi(jenisId, halaman, fiturIds);

  const pilihJenis = (id: string) => {
    const j = JENIS_WEB.find((x) => x.id === id);
    if (!j) return;
    setJenisId(id);
    setHalaman(j.halamanDasar);
  };

  const toggleFitur = (id: string) =>
    setFiturIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const hargaText =
    hasil.hargaMin !== null && hasil.hargaMaks !== null
      ? `${formatRupiah(hasil.hargaMin)} – ${formatRupiah(hasil.hargaMaks)}`
      : null;
  const durasiText = `${hasil.hariMin}–${hasil.hariMaks} hari kerja`;

  const fiturLabel =
    FITUR.filter((f) => fiturIds.includes(f.id))
      .map((f) => f.label)
      .join(", ") || "tanpa fitur tambahan";
  const pesan = [
    "Halo Dian, aku sudah coba hitung estimasi proyek di websitemu.",
    `Jenis: ${jenis.label}`,
    `Jumlah halaman: ${halaman}`,
    `Fitur: ${fiturLabel}`,
    `Perkiraan waktu: ${durasiText}`,
    hargaText ? `Perkiraan biaya: ${hargaText}` : "",
    "Boleh kita diskusikan?",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <main className="bg-hero pt-28">
      <PageHeader
        eyebrow="Estimasi"
        title={
          <>
            Hitung <em className="font-serif font-normal">estimasi proyek</em>
          </>
        }
        intro="Pilih kebutuhanmu, lihat perkiraan waktu dan biayanya secara langsung, lalu kirim hasilnya ke WhatsApp."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="glass space-y-10 rounded-[28px] p-8">
              <div>
                <h2 className="font-serif text-3xl italic">1. Jenis website</h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {JENIS_WEB.map((j) => (
                    <button
                      key={j.id}
                      type="button"
                      onClick={() => pilihJenis(j.id)}
                      aria-pressed={jenisId === j.id}
                      className={`rounded-full px-5 py-2.5 text-left text-sm transition-colors ${
                        jenisId === j.id ? chipOn : chipOff
                      }`}
                    >
                      <span className="block font-medium">{j.label}</span>
                      <span className={`block text-xs ${jenisId === j.id ? "opacity-80" : "text-muted-foreground"}`}>
                        {j.deskripsi}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-3xl italic">2. Jumlah halaman</h2>
                <div className="mt-5 flex items-center gap-4">
                  <button
                    type="button"
                    aria-label="Kurangi halaman"
                    onClick={() => setHalaman((h) => Math.max(1, h - 1))}
                    disabled={halaman <= 1}
                    className="grid size-11 place-items-center rounded-full border border-border bg-card hover:border-foreground disabled:opacity-40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-12 text-center text-3xl font-medium" aria-live="polite">
                    {halaman}
                  </span>
                  <button
                    type="button"
                    aria-label="Tambah halaman"
                    onClick={() => setHalaman((h) => Math.min(20, h + 1))}
                    disabled={halaman >= 20}
                    className="grid size-11 place-items-center rounded-full border border-border bg-card hover:border-foreground disabled:opacity-40"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {jenis.halamanDasar} halaman sudah termasuk di paket {jenis.label}.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-3xl italic">3. Fitur tambahan</h2>
                <div className="mt-5 flex flex-wrap gap-3">
                  {FITUR.map((f) => {
                    const on = fiturIds.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => toggleFitur(f.id)}
                        aria-pressed={on}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                          on ? chipOn : chipOff
                        }`}
                      >
                        {on && <Check className="size-4" />}
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <div className="rounded-[28px] bg-cta p-8">
              <p className="font-serif text-lg italic text-muted-foreground">Perkiraan awal</p>
              <dl className="mt-4 space-y-5">
                <div>
                  <dt className="text-sm text-muted-foreground">Waktu pengerjaan</dt>
                  <dd className="mt-1 text-3xl font-medium tracking-tight">{durasiText}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Biaya</dt>
                  <dd className="mt-1 text-3xl font-medium tracking-tight">
                    {hargaText ?? "Diskusikan via WhatsApp"}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-foreground/70">
                Angka ini hanya perkiraan awal. Waktu dan biaya pasti kita tentukan setelah berdiskusi tentang
                kebutuhanmu.
              </p>
              <a
                href={waLink(pesan)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <MessageCircle className="size-4" />
                Kirim estimasi ini via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
