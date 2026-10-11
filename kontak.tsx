import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Copy, Github, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/PageHeader";
import { BUDGET_OPSI, JENIS_PROYEK } from "@/data/pricing";
import { GITHUB_URL, WHATSAPP_DISPLAY, WHATSAPP_URL, pageMeta } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: pageMeta(
      "Kontak",
      "Hubungi Dian Satria Utama lewat WhatsApp untuk diskusi pembuatan website bisnis atau landing page.",
    ),
  }),
  component: KontakPage,
});

const field =
  "mt-1 w-full rounded-2xl border border-input bg-card/80 px-4 py-3 text-sm outline-none focus:border-foreground aria-[invalid=true]:border-destructive";

type Errors = { nama: boolean; email: boolean; jenis: boolean; kebutuhan: boolean };

function KontakPage() {
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Errors>({ nama: false, email: false, jenis: false, kebutuhan: false });

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
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const nama = get("nama");
    const email = get("email");
    const jenis = get("jenis");
    const budget = get("budget");
    const deadline = get("deadline");
    const kebutuhan = get("kebutuhan");

    const next: Errors = {
      nama: !nama,
      email: !/^\S+@\S+\.\S+$/.test(email),
      jenis: !jenis,
      kebutuhan: !kebutuhan,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    const deadlineText = deadline
      ? new Date(deadline).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
      : "";
    const lines = [
      `Halo Dian, aku ${nama} (${email}). Aku mau diskusi soal website.`,
      `Jenis proyek: ${jenis}`,
      budget ? `Budget: ${budget}` : "",
      deadlineText ? `Deadline: ${deadlineText}` : "",
      `Kebutuhan: ${kebutuhan}`,
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noreferrer");
  };

  return (
    <main className="bg-hero pt-28">
      <PageHeader
        eyebrow="Kontak"
        title={
          <>
            Punya ide website? <em className="font-serif font-normal">Yuk diskusikan.</em>
          </>
        }
      />

      <section className="px-3 pb-16 pt-8 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 rounded-[32px] bg-cta p-8 md:grid-cols-2 md:p-16">
          <div>
            <p className="text-lg leading-relaxed">
              Ceritakan kebutuhanmu lewat form, nanti pesannya langsung tersusun rapi di WhatsApp.
            </p>
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
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="size-4" />
              Biasanya membalas dalam &lt; 24 jam
            </p>
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
            <Link
              to="/estimasi"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 px-5 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-foreground"
            >
              Hitung estimasi proyek <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <form noValidate onSubmit={onSubmit} className="glass space-y-4 rounded-[24px] p-6">
            <label className="block text-sm">
              Nama
              <input type="text" name="nama" className={field} aria-invalid={errors.nama} />
            </label>
            <label className="block text-sm">
              Email
              <input type="email" name="email" className={field} aria-invalid={errors.email} />
            </label>
            <label className="block text-sm">
              Jenis proyek
              <select name="jenis" defaultValue="" className={field} aria-invalid={errors.jenis}>
                <option value="" disabled>
                  Pilih jenis proyek
                </option>
                {JENIS_PROYEK.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                Budget (opsional)
                <select name="budget" defaultValue="" className={field}>
                  <option value="">Pilih rentang budget</option>
                  {BUDGET_OPSI.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Deadline (opsional)
                <input type="date" name="deadline" className={field} />
              </label>
            </div>
            <label className="block text-sm">
              Kebutuhan
              <textarea name="kebutuhan" rows={4} className={field} aria-invalid={errors.kebutuhan} />
            </label>
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground">
              <MessageCircle className="size-4" />
              Kirim via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
