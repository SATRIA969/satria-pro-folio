export function ComingSoon({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <main className="bg-hero pt-28">
      <section className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center">
        <p className="mb-3 font-serif text-lg italic text-muted-foreground">/ {eyebrow}</p>
        <h1 className="text-5xl font-medium tracking-tight md:text-7xl">{title}</h1>
        <p className="mt-6 font-serif text-3xl italic text-muted-foreground">Segera hadir</p>
      </section>
    </main>
  );
}
