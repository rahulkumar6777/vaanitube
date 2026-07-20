import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  Compass,
  Radio,
  MessagesSquare,
  ClipboardCheck,
  Download,
  BellRing,
  Search,
  UserPlus,
  BadgeCheck,
  Play,
  Quote,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Section, SectionHeading, CtaBanner } from "@/components/site/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/Reveal";

function StudentsPage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <WhyStudents />
      <HowItWorks />
      <SubjectStrip />
      <StudentVoices />
      <Section>
        <Reveal>
          <CtaBanner
            title="Find your teacher. Start learning today."
            description="Browse hundreds of teacher-run channels across JEE, NEET, SSC, Class 6–12 and more."
            primary={{ label: "Browse Channels", to: "/browse" }}
            secondary={{ label: "How subscribing works", to: "/features" }}
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
            <Sparkles className="h-3.5 w-3.5" /> For students — Learn directly from your teachers
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            The teachers you love.{" "}
            <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">
              One focused feed.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg text-muted-foreground"
          >
            Subscribe to teacher-run channels for the subjects you're preparing for.
            Watch lessons, join live doubt sessions, and take mock tests — without
            a scroll-forever algorithm deciding what you see.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-amber px-5 py-3 text-sm font-semibold text-accent-amber-foreground shadow-sm transition-all hover:brightness-105 hover:-translate-y-0.5"
            >
              Browse Channels <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              How it works
            </Link>
          </motion.div>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <BadgeCheck className="h-4 w-4 text-primary" /> 180,000+ students already learning
          </div>
        </div>

        <div className="relative h-[420px] sm:h-[480px]">
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.7 }}
            className="absolute right-0 top-8 w-[78%] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-elegant)]"
          >
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Search teachers, subjects, exams…</p>
            </div>
            <div className="mt-3 space-y-2">
              {[
                { n: "Physics with Priya", s: "JEE Advanced · 12.4k subs" },
                { n: "NEET Bio by Dr. Kavya", s: "Class 11–12 · 9.6k subs" },
                { n: "SSC Reasoning · Arjun Rao", s: "Bank + SSC · 6.2k subs" },
              ].map((c) => (
                <div key={c.n} className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                    <Play className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{c.n}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.s}</p>
                  </div>
                  <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Subscribe
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-[54%] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/10 text-red-600">
                <Radio className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">Live in 12 min</p>
                <p className="text-xs text-muted-foreground">Rotational Dynamics · Doubt hour</p>
              </div>
            </div>
            <button className="mt-3 w-full rounded-lg bg-[image:var(--gradient-hero)] px-3 py-2 text-xs font-semibold text-primary-foreground">
              Set reminder
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-0 left-6 w-[58%] rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-amber text-accent-amber-foreground">
                <ClipboardCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">Mock Test 04</p>
                <p className="text-xs text-muted-foreground">Score 78/100 · Rank 142</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ValueStrip() {
  const items = [
    { v: "1,200+", l: "Teacher channels" },
    { v: "24 exams", l: "Covered end-to-end" },
    { v: "48k hrs", l: "Of lessons + live" },
    { v: "Ad-lite", l: "Focused viewing" },
  ];
  return (
    <div className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
        {items.map((s) => (
          <div key={s.l} className="text-center">
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.v}</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyStudents() {
  const items = [
    { icon: Compass, title: "Discover by teacher", body: "Follow the educators you actually trust — not whatever the algorithm decides today." },
    { icon: Radio, title: "Live doubt sessions", body: "Ask questions in real time, get answers in class, revisit the recording anytime." },
    { icon: ClipboardCheck, title: "Mock tests & quizzes", body: "Auto-graded, timed practice with detailed analytics on your weak areas." },
    { icon: Download, title: "Learn offline", body: "Download lessons for spotty connections and commute-friendly revision." },
    { icon: MessagesSquare, title: "Peer + teacher chat", body: "Batch groups, moderated discussions, and direct teacher announcements." },
    { icon: BellRing, title: "No algorithm noise", body: "You subscribe, you decide. Notifications only for the channels you follow." },
  ];
  return (
    <Section>
      <SectionHeading
        eyebrow="Why students choose VaaniTube"
        title="A learning app that respects your attention"
        description="Made for exam prep, school subjects, and lifelong learning — with none of the doom-scrolling."
      />
      <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

function HowItWorks() {
  const steps = [
    { icon: UserPlus, title: "Create a free account", body: "Sign up in seconds with just your email." },
    { icon: Compass, title: "Find your teacher", body: "Browse channels by exam, subject, or class." },
    { icon: BadgeCheck, title: "Subscribe & watch", body: "Monthly subscription — cancel any time." },
    { icon: Radio, title: "Join live, test yourself", body: "Attend live classes and take mock tests each week." },
  ];
  return (
    <Section className="bg-secondary/30">
      <SectionHeading eyebrow="How it works" title="Learning in four steps" />
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
        <Link to="/browse" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Start browsing channels <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

function SubjectStrip() {
  const subjects = ["JEE Main", "JEE Advanced", "NEET", "SSC", "Bank PO", "UPSC Foundation", "Class 12 CBSE", "Class 10 CBSE", "State Boards", "Spoken English", "Coding", "GATE"];
  return (
    <Section>
      <SectionHeading eyebrow="Popular right now" title="Learn what you're preparing for" align="left" />
      <div className="mt-10 flex flex-wrap gap-3">
        {subjects.map((s) => (
          <Link
            key={s}
            to="/browse"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            {s}
          </Link>
        ))}
      </div>
    </Section>
  );
}

function StudentVoices() {
  const items = [
    { quote: "I dropped every other app. Following just my four teachers here is calmer and I actually finish the lessons.", name: "Meera Iyer", role: "Class 12 · Bengaluru" },
    { quote: "Live doubt classes twice a week + mock tests every Sunday — this is basically a coaching centre in my phone.", name: "Rahul Verma", role: "JEE aspirant · Patna" },
    { quote: "The offline download saved me on my daily 90-minute commute. I revise a full chapter each ride now.", name: "Ananya Das", role: "NEET · Kolkata" },
  ];
  return (
    <Section className="bg-secondary/30">
      <SectionHeading eyebrow="From real students" title="Learning that fits your day" />
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
export default StudentsPage;
