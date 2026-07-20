import { Link } from "react-router-dom";
import { PlayCircle, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground">
              <PlayCircle className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">VaaniTube</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The teaching-first video platform. Launch your channels, run live classes,
            and keep 60% of every subscription and ad dollar.
          </p>
          <div className="mt-5 flex gap-2">
            <a href="#" aria-label="Twitter" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-background">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="GitHub" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-background">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground hover:bg-background">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/teachers" className="hover:text-foreground">For Teachers</Link></li>
            <li><Link to="/students" className="hover:text-foreground">For Students</Link></li>
            <li><Link to="/browse" className="hover:text-foreground">Browse Channels</Link></li>
            <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/team" className="hover:text-foreground">Team</Link></li>
            <li><a className="hover:text-foreground" href="#">Blog</a></li>
            <li><a className="hover:text-foreground" href="#">Careers</a></li>
            <li><a className="hover:text-foreground" href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} VaaniTube. All rights reserved.</p>
          <p>60% creator revenue share — always. No hidden cuts.</p>
        </div>
      </div>
    </footer>
  );
}