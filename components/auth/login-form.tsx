"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, KeyRound, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, ready, hydrate, loginWithOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const maskedEmail = useMemo(() => {
    const [name, domain] = email.split("@");
    if (!name || !domain) return email;
    return `${name.slice(0, 2)}${"*".repeat(Math.max(name.length - 2, 2))}@${domain}`;
  }, [email]);

  useEffect(() => hydrate(), [hydrate]);

  useEffect(() => {
    if (ready && user) {
      router.replace(params.get("next") || "/products");
    }
  }, [params, ready, router, user]);

  const sendOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    window.setTimeout(() => {
      const cleanEmail = email.trim().toLowerCase();
      if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
        setError("Please enter a valid email.");
        setLoading(false);
        return;
      }

      const nextOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setSentOtp(nextOtp);
      setOtp("");
      setMessage(`OTP sent to ${maskedEmail || cleanEmail}.`);
      console.info(`Anurag Foods preview OTP for ${cleanEmail}: ${nextOtp}`);
      setLoading(false);
    }, 550);
  };

  const verifyOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    window.setTimeout(() => {
      try {
        if (otp.trim() !== sentOtp) {
          throw new Error("Invalid OTP. Please check and try again.");
        }

        loginWithOtp(email);
        router.replace(params.get("next") || "/products");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to verify OTP.");
      } finally {
        setLoading(false);
      }
    }, 420);
  };

  return (
    <div className="auth-shell">
      <div className="auth-creative-panel" aria-hidden="true">
        <div className="auth-orbit auth-orbit-one" />
        <div className="auth-orbit auth-orbit-two" />
        <div className="auth-floating-card auth-floating-card-one">
          <ShieldCheck className="h-5 w-5" />
          Secure OTP
        </div>
        <div className="auth-floating-card auth-floating-card-two">
          <Sparkles className="h-5 w-5" />
          Fast orders
        </div>
        <div className="auth-phone">
          <div className="auth-phone-top" />
          <div className="auth-code-row">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <span key={item}>{sentOtp ? sentOtp[item] : "•"}</span>
            ))}
          </div>
          <p>One time password</p>
        </div>
      </div>

      {!sentOtp ? (
        <form onSubmit={sendOtp} className="auth-card">
          <div className="auth-icon">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron">OTP Login</p>
            <h1 className="mt-2 text-3xl font-black text-tealInk">Login with email OTP</h1>
            <p className="mt-2 text-sm leading-6 text-tealInk/60">Enter your email and verify a 6 digit OTP to continue.</p>
          </div>

          <label className="auth-field">
            <Mail className="h-5 w-5 text-saffron" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" type="email" required />
          </label>

          {error ? <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p> : null}

          <Button variant="orange" disabled={loading} className="h-12 gap-2">
            {loading ? "Sending OTP..." : "Send OTP"}
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-center text-sm text-tealInk/70">
            Need account details?{" "}
            <Link href="/register" className="font-black text-saffron hover:text-tealInk">
              Create account
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="auth-card">
          <div className="auth-icon">
            <KeyRound className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron">Verify email</p>
            <h1 className="mt-2 text-3xl font-black text-tealInk">Enter OTP</h1>
            <p className="mt-2 text-sm leading-6 text-tealInk/60">{message}</p>
          </div>

          <label className="auth-field auth-otp-field">
            <KeyRound className="h-5 w-5 text-saffron" />
            <input
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="6 digit OTP"
              inputMode="numeric"
              required
            />
          </label>

          <p className="rounded-md bg-saffron/10 px-4 py-3 text-sm font-bold text-tealInk">
            Preview OTP: <span className="text-saffron">{sentOtp}</span>
          </p>
          {error ? <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p> : null}

          <Button variant="orange" disabled={loading || otp.length !== 6} className="h-12">
            {loading ? "Verifying..." : "Verify and login"}
          </Button>
          <button
            type="button"
            onClick={() => {
              setSentOtp("");
              setOtp("");
              setError("");
              setMessage("");
            }}
            className="text-sm font-black text-tealInk/70 hover:text-saffron"
          >
            Change email
          </button>
        </form>
      )}
    </div>
  );
}
