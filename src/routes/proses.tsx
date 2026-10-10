import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/proses")({
  head: () => ({
    meta: pageMeta("Proses", "Cara kerja Dian Satria Utama: diskusi kebutuhan, desain dan pengembangan, lalu rilis website yang siap dipakai."),
  }),
  component: () => <ComingSoon eyebrow="Proses" title="Proses Kerja" />,
});
