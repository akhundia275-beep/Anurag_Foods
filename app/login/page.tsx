import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <section className="auth-page container-pad grid min-h-[70vh] place-items-center py-14">
      <LoginForm />
    </section>
  );
}
