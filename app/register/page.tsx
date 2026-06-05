import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <section className="auth-page container-pad grid min-h-[70vh] place-items-center py-14">
      <RegisterForm />
    </section>
  );
}
