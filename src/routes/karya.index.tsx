import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/karya/")({
  head: () => ({
    meta: pageMeta("Karya", "Kumpulan karya dan proyek website buatan Dian Satria Utama, dibangun dengan React, TypeScript, dan Tailwind."),
  }),
  component: () => <ComingSoon eyebrow="Karya" title="Karya" />,
});
