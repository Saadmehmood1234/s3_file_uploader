import Link from "next/link";
import {
  Home,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export function PublicFileNotFound() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#f8f9fc]">
      <header className="mx-auto flex w-full max-w-7xl items-center px-5 py-6 sm:px-8">
        <Logo />
      </header>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-200/30 blur-3xl" />

      <section className="relative z-10 flex flex-1 items-center justify-center px-5 pb-20">
        <div className="w-full max-w-lg text-center">

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            File unavailable
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            This file can&apos;t be accessed.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-500">
            The shared link may no longer be valid.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
            >
              <Home size={18} />
              Go to Vaultly
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}