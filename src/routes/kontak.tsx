import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: pageMeta("Kontak", "Hubungi Dian Satria Utama lewat WhatsApp untuk diskusi pembuatan website bisnis atau landing page."),
  }),
  component: () => <ComingSoon eyebrow="Kontak" title="Kontak" />,
});
