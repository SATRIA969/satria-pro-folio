import { createFileRoute, notFound } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";
import { pageMeta } from "@/lib/site";

const PROJECTS: Record<string, { name: string; description: string }> = {
  sabora: {
    name: "Sabora",
    description: "Studi kasus Sabora, konsep website restoran fine dining yang dirancang dan dibangun oleh Dian Satria Utama.",
  },
};

export const Route = createFileRoute("/karya/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS[params.slug];
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [...pageMeta("Karya Tidak Ditemukan", "Karya yang kamu cari tidak ditemukan."), { name: "robots", content: "noindex" }] };
    }
    return { meta: pageMeta(loaderData.name, loaderData.description) };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  return <ComingSoon eyebrow="Studi Kasus" title={project.name} />;
}
