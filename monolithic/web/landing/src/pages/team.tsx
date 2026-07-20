
import { Github, Linkedin, Twitter } from "lucide-react";
import { Section, SectionHeading, CtaBanner } from "@/components/site/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/Reveal";

const team = [
  { name: "Rahul Kumar", role: "Founder & CEO", bio: "A Backend and Devops Developer.", initial: "R" },
];

function TeamPage() {
  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="The team"
          title="Meet the team behind VaaniTube"
          description="A small, focused team of engineers, designers, and educators building the platform we always wished existed."
        />
      </Section>

      <Section className="pt-4">
        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <RevealItem key={m.name}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-hero)] text-xl font-semibold text-primary-foreground">
                    {m.initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold">{m.name}</p>
                    <p className="truncate text-sm text-primary">{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{m.bio}</p>
                <div className="mt-5 flex gap-2">
                  {[Twitter, Github, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label="Social link"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <Section className="bg-secondary/30">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
                Why we built this
              </span>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Teachers should own their audience — and most of the revenue.
              </h3>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Every existing platform we tried took too big a cut, buried creators in algorithmic
                noise, or forced educators to bolt together five different tools just to run a class.
              </p>
              <p>
                VaaniTube is our answer: a single, teaching-first platform where creators run their
                own channels, keep 60% of every rupee, and get real tools — live streaming, tests,
                analytics — without duct tape.
              </p>
              <p>
                We're building it in the open with the community. If you're an educator, we'd love
                to have you on board.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <SectionHeading title="Our stack" align="center" />
        <Reveal className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {["React", "Vite", "TanStack Start", "Tailwind CSS", "Framer Motion", "TypeScript", "Cloudflare", "PostgreSQL"].map(
            (t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm"
              >
                {t}
              </span>
            ),
          )}
        </Reveal>
      </Section>

      <Section className="pt-4">
        <Reveal>
          <CtaBanner
            title="Come teach with us"
            description="Join hundreds of educators already earning their fair share on VaaniTube."
            primary={{ label: "Start Your Channel", to: "/pricing" }}
            secondary={{ label: "See how it works", to: "/features" }}
          />
        </Reveal>
      </Section>
    </>
  );
}
export default TeamPage;
