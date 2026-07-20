import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${a}`}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium tracking-wide text-primary uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

export function CtaBanner({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] px-6 py-14 text-center shadow-[var(--shadow-elegant)] sm:px-12 sm:py-20">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <h3 className="relative text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
        {title}
      </h3>
      <p className="relative mx-auto mt-4 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
        {description}
      </p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={primary.to}
          className="inline-flex items-center rounded-lg bg-accent-amber px-5 py-3 text-sm font-semibold text-accent-amber-foreground shadow-sm transition-all hover:brightness-105 hover:-translate-y-0.5"
        >
          {primary.label}
        </a>
        {secondary ? (
          <a
            href={secondary.to}
            className="inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-primary-foreground backdrop-blur hover:bg-white/20"
          >
            {secondary.label}
          </a>
        ) : null}
      </div>
    </div>
  );
}