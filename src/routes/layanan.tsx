import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/layanan")({
  head: () => ({
    meta: pageMeta("Layanan", "Layanan pembuatan website bisnis, landing page, UI design, hingga deploy dan hosting oleh Dian Satria Utama."),
  }),
  component: () => <ComingSoon eyebrow="Layanan" title="Layanan" />,
});
