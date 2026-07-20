import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  Layers,
  Sparkles,
  Radio,
  Wallet,
  UserPlus,
  CreditCard,
  Video,
  BadgeDollarSign,
  Quote,
  ArrowRight,
  Play,
} from "lucide-react";
import { Section, SectionHeading, CtaBanner } from "@/components/site/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/Reveal";

function TeachersPage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Highlights />
      <HowItWorksTeaser />
      <Testimonials />
      <Section>
        <Reveal>
          <CtaBanner
            title="Your classroom. Your channel. Your revenue."
            description="Join the growing community of educators building sustainable teaching businesses on VaaniTube."
            primary={{ label: "Start Your Channel", to: "/pricing" }}
            secondary={{ label: "See how it works", to: "/features" }}
          />
        </Reveal>
      </Section>
    </>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10" style={{ backgroundImage: "var(--gradient-soft)" }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8 lg:pt-24 lg:pb-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" /> For educators — Live classes on all creator plans
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Build your own teaching channel.{" "}
            <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">
              Keep 60% of every subscription.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg text-muted-foreground"
          >
            VaaniTube is the video platform designed for educators. Launch multiple
            channels from one account, host lessons, go live, and get paid — with a
            transparent 60/40 revenue split on subscriptions and ads.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-amber px-5 py-3 text-sm font-semibold text-accent-amber-foreground shadow-sm transition-all hover:brightness-105 hover:-translate-y-0.5"
            >
              Start Your Channel <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              See How It Works
            </Link>
          </motion.div>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex -space-x-2">
              {["A", "R", "M", "K"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-7 w-7 place-items-center rounded-full border-2 border-background bg-[image:var(--gradient-hero)] text-[10px] font-semibold text-primary-foreground"
                >
                  {c}
                </span>
              ))}
            </span>
            2,400+ educators already teaching on VaaniTube
          </div>
        </div>

        <div className="relative h-[420px] sm:h-[480px]">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.7 }}
            className="absolute left-0 top-8 w-[78%] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-elegant)]"
          >
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                <Play className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">Physics with Priya</p>
                <p className="text-xs text-muted-foreground">JEE Advanced · Live now</p>
              </div>
              <span className="ml-auto rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                LIVE
              </span>
            </div>
            <div className="mt-3 aspect-video overflow-hidden rounded-xl bg-[image:var(--gradient-hero)]">
              <div className="flex h-full items-center justify-center">
                <motion.span
                  animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-primary shadow-xl"
                >
                  <Play className="h-6 w-6 fill-current" />
                </motion.span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <StatMini label="Subs" value="12.4k" />
              <StatMini label="This month" value="₹84,300" />
              <StatMini label="Watch hrs" value="9,120" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-0 w-[52%] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
          >
            <p className="text-xs font-medium text-muted-foreground">Payout ready</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">₹1,42,500</p>
            <p className="mt-1 text-xs text-muted-foreground">Your 60% share · Nov 2026</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[60%] rounded-full bg-[image:var(--gradient-hero)]" />
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">60% creator · 40% platform</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-0 right-6 w-[58%] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-amber text-accent-amber-foreground">
                <Layers className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">3 active channels</p>
                <p className="text-xs text-muted-foreground">Physics · Chemistry · Doubt Hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-secondary/60 p-2">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function TrustStrip() {
  const stats = [
    { v: "2,400+", l: "Teachers onboarded" },
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

function Highlights() {
  const items = [
    { icon: Layers, title: "Multiple Channels", body: "Run separate channels for each subject, batch, or audience — all from one creator account." },
    { icon: Sparkles, title: "Flexible Plans", body: "Start small, scale up. Upgrade any time as your subscriber base and library grow." },
    { icon: Radio, title: "Live Streaming", body: "Host live classes and doubt sessions with chat, polls, and instant recordings." },
    { icon: Wallet, title: "60% Revenue Share", body: "Keep 60% of every subscription and ad dollar — the highest split in Indian ed-tech." },
  ];
  return (
    <Section>
      <SectionHeading
        eyebrow="Why VaaniTube"
        title="Built end-to-end for teaching"
        description="Every feature is designed around how educators actually create, deliver, and monetise their work."
      />
      <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <RevealItem key={it.title}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <it.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}

function HowItWorksTeaser() {
  const steps = [
    { icon: UserPlus, title: "Sign Up", body: "Create your teacher account in minutes." },
    { icon: CreditCard, title: "Choose Plan", body: "Pick Starter, Growth, or Pro." },
    { icon: Video, title: "Create Channel", body: "Launch one — or many — channels." },
    { icon: BadgeDollarSign, title: "Get Paid", body: "Earn 60% on every subscriber and ad view." },
  ];
  return (
    <Section className="bg-secondary/30">
      <SectionHeading eyebrow="How it works" title="From zero to paid in four steps" />
      <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <RevealItem key={s.title}>
            <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="absolute -top-3 -left-3 grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-hero)] text-xs font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <s.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
      <div className="mt-10 text-center">
        <Link to="/features" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Explore the full flow <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

function Testimonials() {
  const items = [
    { quote: "I moved my JEE physics batches to VaaniTube last year. Between subscriptions and ad share, I earn more than my old coaching salary — and I set my own schedule.", name: "Priya Menon", role: "Physics educator · 12.4k subs" },
    { quote: "Running Math, Reasoning, and English as three separate channels on one plan is a game changer. The analytics tell me exactly what students want more of.", name: "Arjun Rao", role: "SSC coach · 3 channels" },
    { quote: "The payouts are on time, every month. That predictability let me quit my day job and teach full-time.", name: "Ravi Shankar", role: "Class 10 Math · 8.1k subs" },
  ];
  return (
    <Section>
      <SectionHeading eyebrow="Loved by educators" title="Teachers building real businesses" />
      <RevealStagger className="mt-14 grid gap-6 lg:grid-cols-3">
        {items.map((t) => (
          <RevealItem key={t.name}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="mt-3 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-hero)] text-sm font-semibold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}
export default TeachersPage;
