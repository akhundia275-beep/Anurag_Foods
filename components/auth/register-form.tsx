"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";

export function RegisterForm() {
  const router = useRouter();
  const { user, ready, hydrate, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => hydrate(), [hydrate]);

  useEffect(() => {
    if (ready && user) {
      router.replace("/products");
    }
  }, [ready, router, user]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ name, email, mobile, password });
      router.replace("/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="auth-card">
      <div className="auth-icon">
        <UserRound className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron">Join Anurag Foods</p>
        <h1 className="mt-2 text-3xl font-black text-tealInk">Create your account</h1>
        <p className="mt-2 text-sm leading-6 text-tealInk/60">Save your local session and make repeat orders faster.</p>
      </div>

      <label className="auth-field">
        <UserRound className="h-5 w-5 text-saffron" />
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" required />
      </label>
      <label className="auth-field">
        <Mail className="h-5 w-5 text-saffron" />
        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" type="email" required />
      </label>
      <label className="auth-field">
        <Phone className="h-5 w-5 text-saffron" />
        <input value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="Mobile number optional" />
      </label>
      <label className="auth-field">
        <LockKeyhole className="h-5 w-5 text-saffron" />
        <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password min 6 chars" type="password" required />
      </label>

      {error ? <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p> : null}

      <Button variant="orange" disabled={loading} className="h-12">
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-tealInk/70">
        Already registered?{" "}
        <Link href="/login" className="font-black text-saffron hover:text-tealInk">
          Login
        </Link>
      </p>
    </form>
  );
}
