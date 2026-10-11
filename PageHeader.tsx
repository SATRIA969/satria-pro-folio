import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <header className="mx-auto max-w-5xl px-5 pb-6 pt-16 text-center md:pt-24">
      <p className="mb-3 font-serif text-lg italic text-muted-foreground">/ {eyebrow}</p>
      <h1 className="text-5xl font-medium tracking-tight md:text-7xl">{title}</h1>
      {intro && <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{intro}</p>}
    </header>
  );
}
