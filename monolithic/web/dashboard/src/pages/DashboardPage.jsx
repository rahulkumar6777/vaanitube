import { Link } from "react-router-dom";
import { LockKeyhole, Play, Sparkles, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const filters = ["All", "Courses", "Music", "Live", "Gaming", "News", "Coding", "Podcasts", "Recently uploaded"];

const videos = [
  {
    title: "Build a creator workflow that actually ships",
    channel: "Vaani Studio",
    views: "128K views",
    age: "2 days ago",
    duration: "18:42",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "React dashboard patterns for fast product teams",
    channel: "Frontend Circle",
    views: "81K views",
    age: "5 days ago",
    duration: "24:11",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "How modern video platforms organize feeds",
    channel: "Product School",
    views: "44K views",
    age: "1 week ago",
    duration: "12:09",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df0854?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Creator analytics explained without noise",
    channel: "Growth Notes",
    views: "203K views",
    age: "2 weeks ago",
    duration: "31:34",
    thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Authentication, sessions, and refresh token rotation",
    channel: "Security Desk",
    views: "96K views",
    age: "3 weeks ago",
    duration: "16:28",
    thumbnail: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Turning lessons into watchable episodes",
    channel: "Teacher Lab",
    views: "58K views",
    age: "1 month ago",
    duration: "21:06",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
];

function LoadingGrid() {
  return (
    <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="animate-pulse" key={index}>
          <div className="aspect-video rounded-[8px] bg-neutral-200" />
          <div className="mt-3 flex gap-3">
            <div className="h-9 w-9 rounded-full bg-neutral-200" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-4/5 rounded bg-neutral-200" />
              <div className="h-3 w-1/2 rounded bg-neutral-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AuthGate() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-xl flex-col items-center justify-center px-5 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
        <LockKeyhole size={25} />
      </div>
      <h1 className="text-2xl font-bold tracking-normal text-neutral-950 sm:text-3xl">Sign in to watch VaaniTube</h1>
      <p className="mt-3 text-sm leading-6 text-neutral-600">
        Your feed, watch history, and creator tools open after authentication.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800" to="/login">
          <Sparkles size={17} />
          Login
        </Link>
        <Link className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100" to="/signup">
          <UserPlus size={17} />
          Create account
        </Link>
      </div>
    </section>
  );
}

function VideoCard({ video }) {
  return (
    <article className="group min-w-0">
      <button className="relative block aspect-video w-full overflow-hidden rounded-[8px] bg-neutral-200 text-left shadow-sm" type="button">
        <img className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" src={video.thumbnail} alt="" loading="lazy" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-80" />
        <span className="absolute bottom-2 right-2 rounded bg-black/85 px-1.5 py-0.5 text-xs font-semibold text-white">{video.duration}</span>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-950 opacity-0 shadow-lg transition group-hover:opacity-100">
          <Play size={18} fill="currentColor" />
        </span>
      </button>
      <div className="mt-3 flex min-w-0 gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-amber-500 text-sm font-bold text-white">
          {video.channel.charAt(0)}
        </div>
        <div className="min-w-0">
          <h2 className="line-clamp-2 text-[15px] font-semibold leading-5 text-neutral-950">{video.title}</h2>
          <p className="mt-1 truncate text-sm text-neutral-600">{video.channel}</p>
          <p className="text-sm text-neutral-600">
            {video.views} / {video.age}
          </p>
        </div>
      </div>
    </article>
  );
}

export function DashboardPage() {
  const { isAuthenticated, isChecking } = useAuth();

  if (isChecking && !isAuthenticated) {
    return (
      <div className="px-4 py-5 sm:px-6">
        <div className="mb-5 flex gap-2 overflow-hidden">
          {filters.slice(0, 7).map((filter) => (
            <span className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-neutral-200" key={filter} />
          ))}
        </div>
        <LoadingGrid />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthGate />;
  }

  return (
    <div className="px-4 py-5 sm:px-6">
      <div className="sticky top-16 z-20 -mx-4 mb-5 flex gap-2 overflow-x-auto border-b border-neutral-200 bg-neutral-50 px-4 pb-3 sm:-mx-6 sm:px-6">
        {filters.map((filter, index) => (
          <button
            className={`h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition ${
              index === 0 ? "bg-neutral-950 text-white" : "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
            }`}
            key={filter}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.title} video={video} />
        ))}
      </div>
    </div>
  );
}
