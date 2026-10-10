import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: pageMeta("Tentang", "Kenali Dian Satria Utama, web developer freelance yang fokus pada desain jelas, kode rapi, dan pengalaman pengguna yang nyaman."),
  }),
  component: () => <ComingSoon eyebrow="Tentang" title="Tentang Aku" />,
});
