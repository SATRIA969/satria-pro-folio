// Semua angka paket, harga, dan durasi ada di file ini supaya mudah diganti.
// Harga yang bernilai `null` belum diisi: situs akan menampilkan
// "diskusikan via WhatsApp" dan TIDAK menampilkan angka apa pun.
// TODO: isi harga asli dan cek ulang durasi (angka durasi di bawah hanya perkiraan awal).

export interface Paket {
  id: string;
  nama: string;
  deskripsi: string;
  cocokUntuk: string;
  durasi: string;
  hargaMulai: number | null;
  poin: string[];
}

export const PAKET: Paket[] = [
  {
    id: "landing",
    nama: "Landing Page",
    deskripsi:
      "Satu halaman yang fokus pada satu tujuan: memperkenalkan produk, mengumpulkan pesan, atau mengarahkan pengunjung ke WhatsApp.",
    cocokUntuk: "UMKM, promo, event, dan personal brand",
    durasi: "± 3–7 hari kerja",
    hargaMulai: null,
    poin: ["Satu halaman yang rapi dan jelas", "Tombol aksi ke WhatsApp atau form", "Tampil nyaman di HP dan laptop"],
  },
  {
    id: "bisnis",
    nama: "Website Bisnis",
    deskripsi:
      "Website beberapa halaman untuk menampilkan profil, layanan atau produk, dan cara menghubungi bisnismu secara profesional.",
    cocokUntuk: "Usaha yang ingin tampil kredibel dan mudah ditemukan",
    durasi: "± 1–3 minggu",
    hargaMulai: null,
    poin: ["Beberapa halaman dengan navigasi jelas", "Halaman layanan, profil, dan kontak", "Struktur siap dikembangkan"],
  },
  {
    id: "redesain",
    nama: "Redesain & Optimasi",
    deskripsi:
      "Merapikan tampilan dan mempercepat website yang sudah ada tanpa harus mulai dari nol.",
    cocokUntuk: "Website lama yang berantakan, lambat, atau sulit dipakai di HP",
    durasi: "± 1–2 minggu",
    hargaMulai: null,
    poin: ["Tampilan dirapikan dan dibuat responsif", "Kecepatan muat halaman ditingkatkan", "Struktur halaman disederhanakan"],
  },
];

export const TERMASUK_SEMUA = [
  "Desain responsif",
  "Optimasi kecepatan",
  "SEO dasar",
  "Deploy & hosting",
  "Revisi 2x",
];

export const BUDGET_OPSI = [
  "Belum tahu, diskusi dulu",
  "Di bawah Rp 1 juta",
  "Rp 1–3 juta",
  "Rp 3–7 juta",
  "Di atas Rp 7 juta",
];

export const JENIS_PROYEK = ["Landing Page", "Website Bisnis", "Redesain & Optimasi", "Lainnya"];

export interface JenisWeb {
  id: string;
  label: string;
  deskripsi: string;
  /** Jumlah halaman yang sudah termasuk di harga dasar. */
  halamanDasar: number;
  hariDasar: number;
  hargaDasar: number | null;
}

export const JENIS_WEB: JenisWeb[] = [
  { id: "landing", label: "Landing Page", deskripsi: "Satu halaman fokus", halamanDasar: 1, hariDasar: 4, hargaDasar: null },
  { id: "bisnis", label: "Website Bisnis", deskripsi: "Beberapa halaman", halamanDasar: 5, hariDasar: 10, hargaDasar: null },
  { id: "redesain", label: "Redesain & Optimasi", deskripsi: "Rapikan web yang ada", halamanDasar: 3, hariDasar: 6, hargaDasar: null },
];

export const HALAMAN_TAMBAHAN: { hari: number; harga: number | null } = { hari: 1.5, harga: null };

export interface Fitur {
  id: string;
  label: string;
  hari: number;
  harga: number | null;
}

export const FITUR: Fitur[] = [
  { id: "form", label: "Form kontak / pemesanan", hari: 1, harga: null },
  { id: "cms", label: "Konten mudah diubah (CMS)", hari: 3, harga: null },
  { id: "bahasa", label: "Multi-bahasa", hari: 2, harga: null },
  { id: "animasi", label: "Animasi & interaksi lanjutan", hari: 2, harga: null },
];

export function formatRupiah(n: number) {
  return `Rp ${new Intl.NumberFormat("id-ID").format(n)}`;
}

const bulatkan = (n: number) => Math.round(n / 50000) * 50000;

export interface HasilEstimasi {
  hariMin: number;
  hariMaks: number;
  /** null = harga belum diisi, tampilkan "diskusikan via WhatsApp". */
  hargaMin: number | null;
  hargaMaks: number | null;
}

export function hitungEstimasi(jenisId: string, halaman: number, fiturIds: string[]): HasilEstimasi {
  const jenis = JENIS_WEB.find((j) => j.id === jenisId) ?? JENIS_WEB[0]!;
  const tambahan = Math.max(0, halaman - jenis.halamanDasar);
  const fitur = FITUR.filter((f) => fiturIds.includes(f.id));

  const hari = jenis.hariDasar + tambahan * HALAMAN_TAMBAHAN.hari + fitur.reduce((s, f) => s + f.hari, 0);
  const hariMin = Math.max(1, Math.round(hari * 0.8));
  const hariMaks = Math.max(hariMin, Math.ceil(hari * 1.25));

  if (jenis.hargaDasar === null) {
    return { hariMin, hariMaks, hargaMin: null, hargaMaks: null };
  }
  const total =
    jenis.hargaDasar +
    tambahan * (HALAMAN_TAMBAHAN.harga ?? 0) +
    fitur.reduce((s, f) => s + (f.harga ?? 0), 0);
  return { hariMin, hariMaks, hargaMin: bulatkan(total * 0.9), hargaMaks: bulatkan(total * 1.2) };
}
