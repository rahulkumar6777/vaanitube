
import { useState } from "react";
import { Check, X, Star } from "lucide-react";
import { Section, SectionHeading, CtaBanner } from "@/components/site/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Plan = {
  name: string;
  tag: string;
  monthly: number;
  yearly: number;
  features: { label: string; ok: boolean }[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    tag: "For new educators finding their audience",
    monthly: 999,
    yearly: 9990,
    features: [
      { label: "35 videos per month", ok: true },
      { label: "Up to 3 hr max video length", ok: true },
      { label: "Live Streaming", ok: false },
      { label: "Online Tests", ok: false },
      { label: "Basic analytics", ok: true },
      { label: "Standard support", ok: true },
    ],
  },
  {
    name: "Growth",
    tag: "For creators scaling their channels",
    monthly: 2499,
    yearly: 24990,
    popular: true,
    features: [
      { label: "100 videos per month", ok: true },
      { label: "Up to 5 hr max video length", ok: true },
      { label: "Live Streaming", ok: true },
      { label: "Online Tests", ok: false },
      { label: "Advanced analytics", ok: true },
      { label: "Priority support", ok: true },
    ],
  },
  {
    name: "Pro",
    tag: "For established institutes and creators",
    monthly: 4999,
    yearly: 49990,
    features: [
      { label: "Unlimited videos", ok: true },
      { label: "Up to 8 hr max video length", ok: true },
      { label: "Live Streaming", ok: true },
      { label: "Online Tests", ok: true },
      { label: "Advanced analytics + export", ok: true },
      { label: "Priority + dedicated support", ok: true },
    ],
  },
];

function PricingPage() {
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple plans. Same 60% share."
          description="Pick the plan that fits your stage. Every plan includes the transparent 60/40 revenue split on subscriptions and ads."
        />
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                !yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                yearly ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Yearly
              <span className="rounded-full bg-accent-amber px-2 py-0.5 text-[10px] font-semibold text-accent-amber-foreground">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <RevealStagger className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <RevealItem key={p.name}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-card p-8 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 ${
                  p.popular
                    ? "border-accent-amber ring-2 ring-accent-amber/40 shadow-[var(--shadow-elegant)]"
                    : "border-border"
                }`}
              >
                {p.popular ? (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent-amber px-3 py-1 text-xs font-semibold text-accent-amber-foreground shadow-sm">
                    <Star className="h-3 w-3 fill-current" /> Most Popular
                  </span>
                ) : null}
                <div>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>
                </div>
                <div className="mt-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">
                      ₹{(yearly ? p.yearly / 12 : p.monthly).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {yearly ? `Billed ₹${p.yearly.toLocaleString("en-IN")} yearly` : "Billed monthly"}
                  </p>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2 text-sm">
                      {f.ok ? (
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      ) : (
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                      )}
                      <span className={f.ok ? "text-foreground" : "text-muted-foreground/70"}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <a
                    href="#"
                    className={`inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                      p.popular
                        ? "bg-accent-amber text-accent-amber-foreground hover:brightness-105"
                        : "bg-primary text-primary-foreground hover:brightness-110"
                    }`}
                  >
                    Choose {p.name}
                  </a>
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  60% revenue share on all plans — no hidden cuts
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </Section>

      <Section className="pt-4">
        <SectionHeading title="Compare every feature" align="center" />
        <Reveal className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left">
                <th className="p-4 font-semibold">Feature</th>
                <th className="p-4 font-semibold">Starter</th>
                <th className="p-4 font-semibold text-primary">Growth</th>
                <th className="p-4 font-semibold">Pro</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Videos per month", "35", "100", "Unlimited"],
                ["Max video length", "3 hours", "5 hours", "8 hours"],
                ["Live streaming", false, true, true],
                ["Online tests", false, false, true],
                ["Analytics", "Basic", "Advanced", "Advanced + Export"],
                ["Support", "Standard", "Priority", "Priority + Dedicated"],
                ["Multiple channels", true, true, true],
                ["Revenue share", "60%", "60%", "60%"],
              ].map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`p-4 ${j === 0 ? "font-medium" : "text-muted-foreground"}`}>
                      {typeof cell === "boolean" ? (
                        cell ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40" />
                        )
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>

      <Section className="pt-4">
        <SectionHeading eyebrow="FAQ" title="Answers to common questions" />
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "How does billing work?",
                a: "Subscriptions renew automatically each month or year, depending on the plan you choose. You'll receive an invoice by email and can manage billing from your creator dashboard.",
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Yes — switch plans anytime from your dashboard. Upgrades are prorated instantly, and downgrades apply at the next billing cycle.",
              },
              {
                q: "When and how do payouts work?",
                a: "Payouts are processed monthly to your linked bank account. You always keep 60% of subscription and ad revenue — the split is calculated transparently in your dashboard.",
              },
              {
                q: "Can I run multiple channels on one plan?",
                a: "Absolutely. Every plan supports unlimited channels per account. Your plan quota (videos/month, live streams) is shared across all your channels.",
              },
              {
                q: "What if I want to cancel?",
                a: "You can cancel any time. Your channels stay accessible until the end of the paid period, and your uploaded content remains downloadable for 90 days after that.",
              },
            ].map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <CtaBanner
            title="Ready to launch your channel?"
            description="Set up your first channel in minutes and start earning your 60% share from day one."
            primary={{ label: "Start Your Channel", to: "/pricing" }}
            secondary={{ label: "See features", to: "/features" }}
          />
        </Reveal>
      </Section>
    </>
  );
}
export default PricingPage;
