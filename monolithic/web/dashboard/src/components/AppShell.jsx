import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  CircleUserRound,
  Clock3,
  Compass,
  Home,
  LogIn,
  LogOut,
  Menu,
  PlaySquare,
  Search,
  Upload,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "Explore", to: "/", icon: Compass },
  { label: "Subscriptions", to: "/", icon: PlaySquare },
  { label: "History", to: "/", icon: Clock3 },
];

export function AppShell() {
  const { isAuthenticated, isChecking, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center gap-3 px-3 sm:px-5">
          <button className="icon-button" type="button" title="Menu" aria-label="Menu">
            <Menu size={21} />
          </button>

          <NavLink className="flex shrink-0 items-center gap-2" to="/">
            <span className="flex h-8 w-9 items-center justify-center rounded-[8px] bg-red-600 text-white shadow-sm">
              <PlaySquare size={19} fill="currentColor" />
            </span>
            <span className="text-lg font-semibold tracking-normal">VaaniTube</span>
          </NavLink>

          <form className="mx-auto hidden w-full max-w-2xl items-center md:flex">
            <label className="sr-only" htmlFor="search">
              Search
            </label>
            <div className="flex h-10 w-full overflow-hidden rounded-full border border-neutral-300 bg-white">
              <input
                className="min-w-0 flex-1 px-4 text-sm outline-none"
                id="search"
                placeholder="Search"
                type="search"
              />
              <button
                className="flex w-14 items-center justify-center border-l border-neutral-300 bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
                type="submit"
                title="Search"
                aria-label="Search"
              >
                <Search size={19} />
              </button>
            </div>
          </form>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            {isChecking && !isAuthenticated ? (
              <div className="flex h-10 items-center gap-2" aria-label="Checking session">
                <span className="hidden h-9 w-24 animate-pulse rounded-full bg-neutral-200 sm:block" />
                <span className="h-10 w-10 animate-pulse rounded-full bg-neutral-200" />
              </div>
            ) : isAuthenticated ? (
              <>
                <button className="icon-button hidden sm:inline-flex" type="button" title="Upload" aria-label="Upload">
                  <Upload size={20} />
                </button>
                <button className="icon-button hidden sm:inline-flex" type="button" title="Notifications" aria-label="Notifications">
                  <Bell size={20} />
                </button>
                <div className="hidden items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 py-1 pl-1 pr-3 text-sm font-medium text-neutral-700 sm:flex">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-white">
                    <CircleUserRound size={18} />
                  </span>
                  {user?.role || "viewer"}
                </div>
                <button className="icon-button" type="button" title="Logout" aria-label="Logout" onClick={handleLogout}>
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink className="inline-flex h-9 items-center gap-2 rounded-full border border-neutral-300 px-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100" to="/login">
                  <LogIn size={17} />
                  <span className="hidden sm:inline">Login</span>
                </NavLink>
                <NavLink className="inline-flex h-9 items-center gap-2 rounded-full bg-neutral-950 px-3 text-sm font-semibold text-white transition hover:bg-neutral-800" to="/signup">
                  <UserPlus size={17} />
                  <span className="hidden sm:inline">Signup</span>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-4rem)] md:grid-cols-[5.5rem_1fr] xl:grid-cols-[15rem_1fr]">
        <aside className="hidden border-r border-neutral-200 bg-white md:block">
          <nav className="sticky top-16 flex flex-col gap-1 p-3">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 rounded-[8px] px-2 py-3 text-xs font-medium transition xl:flex-row xl:justify-start xl:px-3 xl:text-sm ${
                    isActive ? "bg-neutral-100 text-neutral-950" : "text-neutral-700 hover:bg-neutral-100"
                  }`
                }
                key={item.label}
                to={item.to}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
