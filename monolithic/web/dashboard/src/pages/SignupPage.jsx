import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CheckCircle2, FileImage, KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";
import { authApi } from "../lib/api.js";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  fullName: "",
  email: "",
  phoneno: "",
  age: "",
  password: "",
  verificationType: "pan",
  verificationValue: "",
  address: "",
};

function TextField({ label, name, onChange, placeholder, required = true, type = "text", value }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-neutral-800">{label}</span>
      <input
        className="h-11 w-full rounded-[8px] border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-neutral-950"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

export function SignupPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("viewer");
  const [step, setStep] = useState("details");
  const [form, setForm] = useState(initialForm);
  const [otp, setOtp] = useState("");
  const [photos, setPhotos] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const verificationPlaceholder = useMemo(
    () => (form.verificationType === "pan" ? "ABCDE1234F" : "123412341234"),
    [form.verificationType],
  );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const updateField = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const submitDetails = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      if (role === "creator") {
        const creatorPayload = new FormData();
        creatorPayload.append("fullName", form.fullName);
        creatorPayload.append("email", form.email);
        creatorPayload.append("phoneno", form.phoneno);
        creatorPayload.append("age", form.age);
        creatorPayload.append("password", form.password);
        creatorPayload.append("verificationType", form.verificationType);
        creatorPayload.append("verificationValue", form.verificationValue);
        creatorPayload.append("address", form.address);
        photos.slice(0, 2).forEach((photo) => creatorPayload.append("verificationPhotos", photo));

        await authApi.initCreatorSignup(creatorPayload);
      } else {
        await authApi.initViewerSignup({
          fullName: form.fullName,
          email: form.email,
          phoneno: form.phoneno,
          age: Number(form.age),
          password: form.password,
        });
      }

      setStep("verify");
      setMessage("OTP sent successfully.");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitOtp = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      const payload = await authApi.verifySignup({ email: form.email, otp });
      setMessage(payload?.message || "Registration verified successfully.");
      window.setTimeout(() => navigate("/login"), 900);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-[8px] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              {step === "verify" ? <KeyRound size={22} /> : <UserRound size={22} />}
            </div>
            <h1 className="text-2xl font-bold text-neutral-950">{step === "verify" ? "Verify OTP" : "Create account"}</h1>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {step === "verify" ? "Enter the 6 digit code sent to your email." : "Choose viewer or creator and complete signup."}
            </p>
          </div>

          {step === "details" && (
            <div className="inline-grid grid-cols-2 rounded-full bg-neutral-100 p-1">
              {["viewer", "creator"].map((option) => (
                <button
                  className={`h-9 rounded-full px-4 text-sm font-semibold capitalize transition ${
                    role === option ? "bg-neutral-950 text-white shadow-sm" : "text-neutral-700 hover:bg-neutral-200"
                  }`}
                  key={option}
                  onClick={() => setRole(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {message && (
          <div className="mb-5 flex items-start gap-2 rounded-[8px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {step === "details" ? (
          <form className="space-y-5" onSubmit={submitDetails}>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Full name" name="fullName" onChange={updateField} placeholder="Rahul Sharma" value={form.fullName} />
              <TextField label="Email" name="email" onChange={updateField} placeholder="you@example.com" type="email" value={form.email} />
              <TextField label="Phone number" name="phoneno" onChange={updateField} placeholder="+919999999999" value={form.phoneno} />
              <TextField label="Age" name="age" onChange={updateField} placeholder={role === "creator" ? "18" : "16"} type="number" value={form.age} />
              <TextField label="Password" name="password" onChange={updateField} placeholder="Strong password" type="password" value={form.password} />

              {role === "creator" && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-neutral-800">Verification type</span>
                  <select
                    className="h-11 w-full rounded-[8px] border border-neutral-300 bg-white px-3 text-sm outline-none transition focus:border-neutral-950"
                    name="verificationType"
                    onChange={updateField}
                    value={form.verificationType}
                  >
                    <option value="pan">PAN</option>
                    <option value="aadhaar">Aadhaar</option>
                  </select>
                </label>
              )}
            </div>

            {role === "creator" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Verification value"
                  name="verificationValue"
                  onChange={updateField}
                  placeholder={verificationPlaceholder}
                  value={form.verificationValue}
                />

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-neutral-800">Verification photos</span>
                  <span className="flex min-h-11 items-center gap-2 rounded-[8px] border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600">
                    <FileImage size={18} className="shrink-0 text-neutral-500" />
                    <input
                      accept="image/*"
                      className="min-w-0 flex-1 text-sm"
                      multiple
                      onChange={(event) => setPhotos(Array.from(event.target.files || []).slice(0, 2))}
                      required
                      type="file"
                    />
                  </span>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-neutral-800">Address</span>
                  <textarea
                    className="min-h-24 w-full resize-y rounded-[8px] border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-950"
                    name="address"
                    onChange={updateField}
                    placeholder="Complete address"
                    required
                    value={form.address}
                  />
                </label>
              </div>
            )}

            <button
              className="h-11 w-full rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={submitOtp}>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-neutral-800">Email</span>
              <span className="flex h-11 items-center gap-2 rounded-[8px] border border-neutral-300 bg-neutral-50 px-3">
                <Mail size={18} className="text-neutral-500" />
                <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" readOnly value={form.email} />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-neutral-800">OTP</span>
              <input
                className="h-12 w-full rounded-[8px] border border-neutral-300 bg-white px-3 text-center text-lg font-semibold tracking-[0.35em] outline-none transition focus:border-neutral-950"
                inputMode="numeric"
                maxLength={6}
                onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                required
                value={otp}
              />
            </label>

            <button
              className="h-11 w-full rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
              disabled={isSubmitting || otp.length !== 6}
              type="submit"
            >
              {isSubmitting ? "Verifying..." : "Verify account"}
            </button>

            <button className="mx-auto flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950" onClick={() => setStep("details")} type="button">
              <ShieldCheck size={16} />
              Edit signup details
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link className="font-semibold text-neutral-950 underline-offset-4 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
