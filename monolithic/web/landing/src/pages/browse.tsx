import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { Search, Play, Radio, BadgeCheck, Users, ArrowRight } from "lucide-react";
import { Section, SectionHeading, CtaBanner } from "@/components/site/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/site/Reveal";

type Channel = {
  name: string;
  teacher: string;
  category: string;
  subs: string;
  price: string;
  live?: boolean;
  tagline: string;
};

const CHANNELS: Channel[] = [
  { name: "Physics with Priya", teacher: "Priya Menon", category: "JEE", subs: "12.4k", price: "₹499/mo", live: true, tagline: "Concept-first physics for JEE Main & Advanced." },
  { name: "NEET Bio by Dr. Kavya", teacher: "Dr. Kavya S", category: "NEET", subs: "9.6k", price: "₹599/mo", tagline: "Complete Class 11–12 Biology with weekly NEET drills." },
  { name: "SSC Reasoning · Arjun", teacher: "Arjun Rao", category: "SSC", subs: "6.2k", price: "₹299/mo", tagline: "Fast tricks for SSC CGL, CHSL and Bank exams." },
  { name: "Math Made Easy", teacher: "Ravi Shankar", category: "Class 10", subs: "8.1k", price: "₹249/mo", tagline: "CBSE Class 9–10 Math with mock tests every Sunday." },
  { name: "Organic Chemistry Lab", teacher: "Nikhil Bansal", category: "JEE", subs: "5.4k", price: "₹399/mo", live: true, tagline: "Mechanisms, not memorisation. Weekly doubt hours." },
  { name: "English Spoken Studio", teacher: "Farah Ahmed", category: "Spoken", subs: "14.7k", price: "₹199/mo", tagline: "Confidence, fluency, interview-ready English." },
  { name: "Class 12 Accounts Pro", teacher: "Sneha Kapoor", category: "Class 12", subs: "3.8k", price: "₹299/mo", tagline: "Full CBSE syllabus with paper practice and revision." },
  { name: "UPSC Foundation", teacher: "Vikram Iyer", category: "UPSC", subs: "7.9k", price: "₹699/mo", tagline: "NCERT-first prelims prep with daily current affairs." },
  { name: "Coding for Kids", teacher: "Aisha Khan", category: "Coding", subs: "4.3k", price: "₹349/mo", tagline: "Scratch, Python and web basics for ages 10–15." },
];

const CATEGORIES = ["All", "JEE", "NEET", "SSC", "Class 10", "Class 12", "UPSC", "Spoken", "Coding"] as const;

function BrowsePage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CHANNELS.filter((c) => {
      const matchCat = cat === "All" || c.category === cat;
      const matchQ =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.teacher.toLowerCase().includes(query) ||
        c.tagline.toLowerCase().includes(query);
      return matchCat && matchQ;
    });
  }, [q, cat]);

  return (
    <>
      <Section className="pb-8">
        <SectionHeading
          eyebrow="Browse channels"
          title="Find a teacher worth following"
          description="Every channel is run by an educator, not an algorithm. Subscribe monthly, cancel any time."
          align="left"
        />

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search teachers, subjects, exams…"
              className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm shadow-[var(--shadow-card)] outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                cat === c
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Section>

      <Section className="pt-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-14 text-center">
            <p className="text-sm text-muted-foreground">No channels match that search yet.</p>
          </div>
        ) : (
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <RevealItem key={c.name}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
                  <div className="relative aspect-video overflow-hidden bg-[image:var(--gradient-hero)]">
                    <div className="flex h-full items-center justify-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-primary shadow-xl">
                        <Play className="h-6 w-6 fill-current" />
                      </span>
                    </div>
                    {c.live ? (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                        <Radio className="h-3 w-3" /> LIVE
                      </span>
                    ) : null}
                    <span className="absolute right-3 top-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                      {c.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold">{c.name}</h3>
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">by {c.teacher}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{c.tagline}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3.5 w-3.5" /> {c.subs} subscribers
                      </span>
                      <span className="text-sm font-semibold text-foreground">{c.price}</span>
                    </div>
                    <button className="mt-4 inline-flex items-center justify-center gap-1 rounded-lg bg-accent-amber px-3 py-2 text-xs font-semibold text-accent-amber-foreground transition-all hover:brightness-105">
                      Subscribe <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        )}
      </Section>

      <Section>
        <Reveal>
          <CtaBanner
            title="Are you a teacher?"
            description="Your channel could be here next. Launch on VaaniTube and keep 60% of every subscription."
            primary={{ label: "Start Your Channel", to: "/teachers" }}
            secondary={{ label: "See pricing", to: "/pricing" }}
          />
        </Reveal>
      </Section>
    </>
  );
}
export default BrowsePage;
