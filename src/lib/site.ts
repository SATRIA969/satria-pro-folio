export const SITE_NAME = "Dian Satria Utama";
export const WHATSAPP_URL =
  "https://wa.me/6285334814661?text=Halo%20Dian%2C%20aku%20mau%20diskusi%20soal%20website";
export const WHATSAPP_DISPLAY = "0853-3481-4661";
export const GITHUB_URL = "https://github.com/SATRIA969";

export const NAV_ITEMS = [
  { to: "/", label: "Beranda" },
  { to: "/tentang", label: "Tentang" },
  { to: "/layanan", label: "Layanan" },
  { to: "/karya", label: "Karya" },
  { to: "/proses", label: "Proses" },
  { to: "/kontak", label: "Kontak" },
] as const;

export function pageTitle(page: string) {
  return `${page} — ${SITE_NAME} | Web Developer Freelance`;
}

export function pageMeta(page: string, description: string) {
  const title = pageTitle(page);
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
