import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  GraduationCap,
  Users,
  ArrowRight,
  BadgeDollarSign,
  Radio,
  Play,
  Compass,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/Reveal";

function Index() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <PathCards />
      <SharedBenefits />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ backgroundImage: "var(--gradient-soft)" }} />
      <div className="mx-auto max-w-4xl px-4 pt-20 pb-16 text-center sm:px-6 lg:pt-28 lg:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" /> For teachers and students, together.
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          A teaching platform{" "}
          <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">
            built around real classrooms.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Teachers run their own subscription channels and keep 60% of every rupee.
          Students follow the educators they trust — no algorithm, no noise. Pick
          your path below.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/teachers"
            className="inline-flex items-center gap-2 rounded-lg bg-[image:var(--gradient-hero)] px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5"
          >
            I'm a Teacher <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/students"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-amber px-5 py-3 text-sm font-semibold text-accent-amber-foreground shadow-sm transition-all hover:brightness-105 hover:-translate-y-0.5"
          >
            I'm a Student <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const stats = [
    { v: "2,400+", l: "Teachers earning" },
    { v: "180k", l: "Students learning" },
    { v: "48k", l: "Hours streamed" },
    { v: "₹3.2Cr", l: "Paid to creators" },
  ];
  return (
    <div className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.v}</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PathCards() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Choose your path"
        title="One platform, two clear experiences"
        description="Whether you teach or learn, VaaniTube is designed around what you actually need."
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]">
              <GraduationCap className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">For Teachers</h3>
            <p className="mt-3 text-muted-foreground">
              Turn your teaching into a sustainable business. Multiple channels,
              live classes, mock tests, and monthly payouts.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                { i: BadgeDollarSign, t: "Keep 60% of every subscription & ad" },
                { i: Radio, t: "Live streaming on every plan" },
                { i: Play, t: "Multi-channel account from day one" },
              ].map((b) => (
                <li key={b.t} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <b.i className="h-4 w-4" />
                  </span>
                  <span>{b.t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              <Link
                to="/teachers"
                className="inline-flex items-center gap-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:opacity-90"
              >
                Explore for Teachers <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                See pricing
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-amber text-accent-amber-foreground shadow-[var(--shadow-elegant)]">
              <Users className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">For Students</h3>
            <p className="mt-3 text-muted-foreground">
              Follow the teachers you trust across JEE, NEET, SSC, Class 6–12
              and more. Focused learning, no algorithm rabbit-holes.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                { i: Compass, t: "Browse channels by teacher & exam" },
                { i: Radio, t: "Live doubt sessions with recordings" },
                { i: Play, t: "Mock tests, offline downloads, quizzes" },
              ].map((b) => (
                <li key={b.t} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-amber/20 text-accent-amber-foreground">
                    <b.i className="h-4 w-4" />
                  </span>
                  <span>{b.t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              <Link
                to="/students"
                className="inline-flex items-center gap-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:opacity-90"
              >
                Explore for Students <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/browse"
                className="inline-flex items-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                Browse channels
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function SharedBenefits() {
  const items = [
    { title: "Real classrooms, real teachers", body: "Every channel is owned and run by an actual educator. What you see is what they teach." },
    { title: "Live + on-demand together", body: "Recorded lessons for depth, live classes for connection. Both in the same subscription." },
    { title: "Fair for everyone", body: "Transparent 60/40 revenue split for teachers. Clear monthly pricing for students. No surprises." },
  ];
  return (
    <Section className="bg-secondary/30">
      <SectionHeading eyebrow="What we stand for" title="Learning that respects everyone's time" />
      <RevealStagger className="mt-14 grid gap-6 lg:grid-cols-3">
        {items.map((it) => (
          <RevealItem key={it.title}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-10 text-center text-primary-foreground shadow-[var(--shadow-elegant)] sm:p-16">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <h3 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
          Which side of the classroom are you on?
        </h3>
        <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/85">
          Start teaching your own channels, or start following the teachers you love.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/teachers"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-amber px-5 py-3 text-sm font-semibold text-accent-amber-foreground shadow-sm transition-all hover:brightness-105 hover:-translate-y-0.5"
          >
            Teach on VaaniTube <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/students"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-primary-foreground backdrop-blur hover:bg-white/20"
          >
            Learn on VaaniTube
          </Link>
        </div>
      </div>
    </Section>
  );
}
export default Index;
