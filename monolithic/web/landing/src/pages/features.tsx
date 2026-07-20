
import {
  UserPlus,
  CreditCard,
  Video,
  Radio,
  Users,
  BadgeDollarSign,
  Layers,
  ClipboardCheck,
  BarChart3,
  ShieldCheck,
  Wallet,
  Play,
} from "lucide-react";
import { Section, SectionHeading, CtaBanner } from "@/components/site/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/Reveal";

const steps = [
  { icon: UserPlus, title: "Sign Up", body: "Create your teacher account with just your email." },
  { icon: CreditCard, title: "Choose a Plan", body: "Start on Starter or jump straight to Growth or Pro." },
  { icon: Layers, title: "Create Your Channel(s)", body: "Set up one channel — or several — from a single account." },
  { icon: Video, title: "Upload or Go Live", body: "Upload recorded lessons or stream live classes in HD." },
  { icon: Users, title: "Students Subscribe", body: "Learners find you and subscribe to your channels." },
  { icon: BadgeDollarSign, title: "Get Paid (60% share)", body: "Monthly payouts, transparent breakdowns, no hidden cuts." },
];

const featureGrid = [
  { icon: Layers, title: "Multi-channel accounts", body: "Run as many teaching channels as you need from one login." },
  { icon: Video, title: "Video hosting & streaming", body: "Adaptive HD delivery optimized for slow connections." },
  { icon: Radio, title: "Live classes", body: "Real-time streaming with chat, polls, and instant recordings." },
  { icon: ClipboardCheck, title: "Online tests (Pro)", body: "Build quizzes and mocks — auto-graded, timed, analytics-rich." },
  { icon: Users, title: "Subscriber management", body: "See who's subscribed, message batches, and reward loyalty." },
  { icon: BarChart3, title: "Analytics dashboard", body: "Watch-time, retention, revenue and cohort insights." },
  { icon: Wallet, title: "Secure payouts", body: "Direct bank transfers with full transaction history." },
  { icon: ShieldCheck, title: "Content protection", body: "DRM, watermarking, and download controls out of the box." },
];

const spotlights = [
  {
    title: "Launch multiple channels from one account",
    body: "Separate your Physics, Chemistry, and Doubt Hour audiences without juggling logins. Each channel has its own branding, subscribers, and pricing.",
  },
  {
    title: "Go live without extra tools",
    body: "One-click live streams with student chat, moderation, and instant post-class recording. No OBS or extra software required.",
  },
  {
    title: "Insight-rich analytics",
    body: "Understand what students actually watch, where they drop off, and which topics drive the most subscriptions and payouts.",
  },
];

function FeaturesPage() {
  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to teach and earn"
          description="From sign up to your first payout, VaaniTube handles the plumbing so you can focus on your students."
        />
      </Section>

      <Section className="pt-4">
        <SectionHeading eyebrow="How it works" title="Six steps. Zero friction." align="center" />
        <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <RevealItem key={s.title}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <Section className="bg-secondary/30">
        <SectionHeading eyebrow="What's included" title="A full teaching toolkit" />
        <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureGrid.map((f) => (
            <RevealItem key={f.title}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <Section>
        {spotlights.map((s, i) => (
          <Reveal key={s.title} className={i > 0 ? "mt-20" : ""}>
            <div
              className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="aspect-video overflow-hidden rounded-2xl bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
                <div className="flex h-full items-center justify-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-primary shadow-xl">
                    <Play className="h-7 w-7 fill-current" />
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.title}</h3>
                <p className="mt-4 text-muted-foreground">{s.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </Section>

      <Section className="pt-4">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Product tour</p>
            <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">Watch a 90-second walkthrough</h3>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              See a creator go from empty channel to first paid subscriber inside VaaniTube.
            </p>
            <div className="mx-auto mt-8 aspect-video max-w-3xl overflow-hidden rounded-2xl bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
              <div className="flex h-full items-center justify-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-primary shadow-xl">
                  <Play className="h-7 w-7 fill-current" />
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <CtaBanner
            title="Bring your teaching to VaaniTube"
            description="Set up your first channel today and start earning your 60% share."
            primary={{ label: "Start Your Channel", to: "/pricing" }}
          />
        </Reveal>
      </Section>
    </>
  );
}
export default FeaturesPage;
