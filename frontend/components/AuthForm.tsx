"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { Logo } from "./Logo";
import { authApi } from "@/lib/api";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    try {
      if (signup) {
        await authApi.register({
          name: String(formData.get("name")),
          email,
          password,
        });
      } else {
        await authApi.login({
          email,
          password,
        });
      }

      router.push("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14">
        <Logo />
        <div className="mx-auto my-auto w-full max-w-md py-12">
          <p className="text-sm font-semibold text-indigo-600">
            {signup ? "START YOUR VAULT" : "WELCOME BACK"}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-.04em] text-slate-950">
            {signup ? "Create your account" : "Sign in to Vaultly"}
          </h1>
          <p className="mt-3 text-slate-500">
            {signup
              ? "Secure storage is only a minute away."
              : "Your secure workspace is ready when you are."}
          </p>
          <form onSubmit={submit} className="mt-9 space-y-5">
            {signup && (
              <Field
                label="Full name"
                name="name"
                icon={<User size={18} />}
                placeholder="Saad Mehmood"
              />
            )}
            <Field
              label="Email address"
              name="email"
              type="email"
              icon={<Mail size={18} />}
              placeholder="saad@gmail.com"
            />
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  className="text-sm font-semibold text-slate-700"
                  htmlFor="password"
                >
                  Password
                </label>
                {!signup && (
                  <Link
                    className="text-xs font-semibold text-indigo-600"
                    href="#"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <LockKeyhole
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  id="password"
                  name="password"
                  required
                  minLength={8}
                  type={show ? "text" : "password"}
                  placeholder="At least 8 characters"
                  className="field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label="Toggle password visibility"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {signup ? "Creating account..." : "Signing in..."}
                </>
              ) : (
                <>
                  {signup ? "Create account" : "Sign in"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          <p className="mt-7 text-center text-sm text-slate-500">
            {signup ? "Already have an account?" : "New to Vaultly?"}{" "}
            <Link
              className="font-semibold text-indigo-600"
              href={signup ? "/login" : "/signup"}
            >
              {signup ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="mb-2 block text-sm font-semibold text-slate-700"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          id={name}
          name={name}
          type={type}
          required
          placeholder={placeholder}
          className="field pl-11"
        />
      </div>
    </div>
  );
}
