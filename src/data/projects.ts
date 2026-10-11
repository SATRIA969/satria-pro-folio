import saboraHero from "@/assets/sabora.jpg";

export interface LighthouseScores {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
}

export interface Project {
  slug: string;
  judul: string;
  kategori: string;
  tahun: string;
  ringkasan: string;
  masalah: string;
  pendekatan: string;
  hasil: string;
  teknologi: string[];
  gambar: { src: string; alt: string }[];
  linkDemo: string;
  lighthouse: LighthouseScores;
}

export const PROJECTS: Project[] = [
  {
    slug: "sabora",
    judul: "Sabora",
    kategori: "Restaurant Fine Dining Website",
    tahun: "2025",
    ringkasan:
      "Konsep website untuk restoran fine dining yang menonjolkan suasana, menu, dan kemudahan reservasi dalam satu pengalaman digital yang elegan.",
    // TODO: ganti dengan cerita masalah yang sebenarnya
    masalah:
      "Restoran fine dining sering punya website yang terasa generik: menu berupa PDF, foto kurang menggugah, dan reservasi yang mengharuskan tamu menelepon. Akibatnya, kesan premium restoran tidak sampai ke calon tamu sebelum mereka datang.",
    // TODO: ganti dengan pendekatan yang sebenarnya
    pendekatan:
      "Aku merancang visual yang tenang dan editorial — tipografi serif besar, foto hidangan full-bleed, dan ruang kosong yang lega — lalu membangunnya sebagai halaman cepat dengan navigasi sederhana: suasana, menu, dan reservasi bisa dijangkau dalam satu guliran.",
    // TODO: ganti dengan hasil yang sebenarnya
    hasil:
      "Hasilnya adalah konsep website yang terasa semewah restorannya: halaman termuat cepat, menu mudah dibaca di HP, dan alur reservasi jelas dari pertama kali halaman dibuka.",
    teknologi: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    gambar: [{ src: saboraHero, alt: "Tampilan halaman utama Sabora" }],
    linkDemo: "https://saborarepository.vercel.app/",
    // TODO: ganti dengan skor Lighthouse asli setelah diukur
    lighthouse: { performance: 98, seo: 100, accessibility: 96, bestPractices: 100 },
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1 || PROJECTS.length < 2) return undefined;
  return PROJECTS[(i + 1) % PROJECTS.length];
}
