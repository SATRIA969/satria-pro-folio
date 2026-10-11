import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/proses")({
  head: () => ({
    meta: pageMeta(
      "Proses",
      "Cara kerja Dian Satria Utama: diskusi kebutuhan, desain dan pengembangan, lalu rilis website yang siap dipakai.",
    ),
  }),
  component: ProsesPage,
});

// TODO: cek ulang estimasi waktu tiap tahap agar sesuai kebiasaan kerjamu.
const STEPS = [
  {
    n: "01",
    t: "Diskusi",
    waktu: "± 1–2 hari",
    butuh: "Tujuan website, target pengunjung, contoh website yang kamu suka, dan materi seperti logo, foto, atau teks jika sudah ada.",
    terima: "Kesepakatan lingkup pekerjaan, daftar halaman, serta perkiraan waktu dan biaya.",
  },
  {
    n: "02",
    t: "Desain & Bangun",
    waktu: "Sesuai paket (lihat halaman Layanan)",
    butuh: "Tanggapan atas pratinjau yang kukirim dan materi final saat dibutuhkan.",
    terima: "Desain yang jelas, pratinjau berkala, dan website responsif yang bisa dicoba sebelum rilis.",
  },
  {
    n: "03",
    t: "Rilis",
    waktu: "± 1–2 hari",
    butuh: "Persetujuan akhir, dan akses domain atau hosting jika kamu sudah punya.",
    terima: "Website online dan siap dipakai, revisi akhir (revisi 2x sudah termasuk), serta panduan singkat penggunaannya.",
  },
];

// TODO: cek ulang jawaban FAQ, terutama soal domain/hosting dan maintenance.
const FAQ = [
  {
    q: "Berapa kali revisi yang termasuk?",
    a: "Dua kali revisi sudah termasuk di semua paket. Kalau butuh lebih, kita bahas dulu di awal supaya tidak ada kejutan.",
  },
  {
    q: "Berapa biayanya?",
    a: "Tergantung jenis website, jumlah halaman, dan fitur yang dibutuhkan. Kamu bisa melihat paket di halaman Layanan atau mencoba halaman Estimasi, lalu kita pastikan angkanya lewat WhatsApp.",
  },
  {
    q: "Berapa lama pengerjaannya?",
    a: "Landing page biasanya paling cepat, website bisnis lebih lama karena halamannya lebih banyak. Perkiraan ada di halaman Layanan dan Estimasi, dan dipastikan setelah kita berdiskusi.",
  },
  {
    q: "Bagaimana dengan domain dan hosting?",
    a: "Aku membantu menyiapkan dan men-deploy website ke hosting. Kalau kamu ingin domain sendiri, domainnya dibeli atas namamu dan biayanya terpisah, kita bahas di awal.",
  },
  {
    q: "Apakah ada maintenance setelah rilis?",
    a: "Setelah rilis kamu bisa meminta perbaikan kecil atau pembaruan konten. Bentuk dan biayanya kita sesuaikan dengan kebutuhanmu.",
  },
];

function ProsesPage() {
  return (
    <main className="bg-hero pt-28">
      <PageHeader
        eyebrow="Proses"
        title={
          <>
            Begini <em className="font-serif font-normal">cara kerjaku</em>
          </>
        }
        intro="Tiga tahap yang jelas, supaya kamu tahu apa yang terjadi dan apa yang perlu disiapkan di setiap langkah."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8">
        <ol className="space-y-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <li className="glass grid gap-6 rounded-[28px] p-8 md:grid-cols-[auto_1fr] md:gap-10">
                <span className="text-5xl font-light md:text-6xl">{s.n}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-serif text-3xl italic">{s.t}</h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs">
                      <Clock className="size-3.5" />
                      {s.waktu}
                    </span>
                  </div>
                  <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                    <div>
                      <dt className="font-medium">Yang kubutuhkan darimu</dt>
                      <dd className="mt-1 text-muted-foreground">{s.butuh}</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Yang kamu terima</dt>
                      <dd className="mt-1 text-muted-foreground">{s.terima}</dd>
                    </div>
                  </dl>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <Reveal className="text-center">
          <p className="mb-3 font-serif text-lg italic text-muted-foreground">/ FAQ</p>
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
            Pertanyaan <em className="font-serif font-normal">yang sering muncul</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <Accordion type="single" collapsible className="glass mt-12 rounded-[28px] px-6 py-2">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      <section className="px-3 pb-16 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-cta p-8 text-center md:p-16">
          <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
            Siap <em className="font-serif font-normal">mulai?</em>
          </h2>
          <div className="mt-8 flex justify-center">
            <Link
              to="/kontak"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              Hubungi Saya
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
