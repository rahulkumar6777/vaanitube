import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, PlayCircle } from "lucide-react";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/teachers", label: "For Teachers" },
  { to: "/students", label: "For Students" },
  { to: "/browse", label: "Browse" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/team", label: "Team" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]">
            <PlayCircle className="h-5 w-5" />
          </span>
          <span className="truncate text-lg font-semibold tracking-tight text-foreground">
            VaaniTube
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={"end" in l ? l.end : false}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                    isActive ? "text-foreground bg-secondary" : "text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/pricing"
            className="hidden sm:inline-flex items-center rounded-lg bg-accent-amber px-4 py-2 text-sm font-semibold text-accent-amber-foreground shadow-sm transition-all hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Your Channel
          </Link>

          <button
            className="md:hidden rounded-lg p-2 text-foreground hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={"end" in l ? l.end : false}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-foreground ${
                    isActive ? "text-foreground bg-secondary" : "text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/pricing"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-accent-amber px-4 py-2 text-sm font-semibold text-accent-amber-foreground"
            >
              Start Your Channel
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
