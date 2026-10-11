import { WHATSAPP_URL } from "@/lib/site";

/** Link WhatsApp dengan pesan kustom, memakai nomor yang sama dengan WHATSAPP_URL. */
export function waLink(text: string) {
  const base = WHATSAPP_URL.split("?")[0] ?? WHATSAPP_URL;
  return `${base}?text=${encodeURIComponent(text)}`;
}
