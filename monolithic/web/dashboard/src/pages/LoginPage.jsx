import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { authError, isAuthenticated, login, status } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const updateField = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await login(form);
      navigate("/");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[8px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <LockKeyhole size={22} />
          </div>
          <h1 className="text-2xl font-bold text-neutral-950">Login</h1>
          <p className="mt-2 text-sm leading-6 text-neutral-600">Continue to your VaaniTube feed.</p>
        </div>

        {(error || authError) && (
          <div className="mb-5 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error || authError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-neutral-800">Email</span>
            <span className="flex h-11 items-center gap-2 rounded-[8px] border border-neutral-300 bg-white px-3 focus-within:border-neutral-950">
              <Mail size={18} className="text-neutral-500" />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                name="email"
                onChange={updateField}
                placeholder="you@example.com"
                required
                type="email"
                value={form.email}
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-neutral-800">Password</span>
            <span className="flex h-11 items-center gap-2 rounded-[8px] border border-neutral-300 bg-white px-3 focus-within:border-neutral-950">
              <LockKeyhole size={18} className="text-neutral-500" />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                name="password"
                onChange={updateField}
                placeholder="Your password"
                required
                type={showPassword ? "text" : "password"}
                value={form.password}
              />
              <button
                className="text-neutral-500 transition hover:text-neutral-950"
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                title={showPassword ? "Hide password" : "Show password"}
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          <button
            className="h-11 w-full rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
            disabled={isSubmitting || status === "checking"}
            type="submit"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600">
          New here?{" "}
          <Link className="font-semibold text-neutral-950 underline-offset-4 hover:underline" to="/signup">
            Create account
          </Link>
        </p>
      </div>
    </section>
  );
}
