import Link from "next/link";
import {
  ArrowRight,
  Check,
  CloudUpload,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Logo } from "./Logo";

const features = [
  {
    icon: ShieldCheck,
    title: "Private by default",
    copy: "Every file stays private until you choose to share it.",
  },
  {
    icon: CloudUpload,
    title: "Effortless uploads",
    copy: "Drag, drop, and keep moving while uploads finish in the background.",
  },
  {
    icon: FileCheck2,
    title: "Always organized",
    copy: "Search, filter, favorite, and find any file in seconds.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f9fc] text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="hover:text-slate-950">
            Features
          </a>
          <a href="#security" className="hover:text-slate-950">
            Security
          </a>
          <a href="#pricing" className="hover:text-slate-950">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
          >
            Start free
          </Link>
        </div>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:pb-32 lg:pt-24">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3.5 py-2 text-xs font-semibold text-indigo-700 shadow-sm">
            <Sparkles size={14} /> Secure storage, beautifully simple
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-tighter sm:text-6xl lg:text-7xl">
            Your files.
            <br />
            <span className="text-indigo-600">Securely yours.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Store, organize, and share your most important files with privacy
            that never gets in your way.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-500"
            >
              Create your vault <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm hover:border-slate-300"
            >
              View demo
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check size={15} className="text-emerald-500" /> 2 GB free
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={15} className="text-emerald-500" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={15} className="text-emerald-500" /> Cancel anytime
            </span>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section
        id="features"
        className="border-y border-slate-200/80 bg-white py-24"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">
              Built for clarity
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need. Nothing you don’t.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200 bg-[#fafbfe] p-7"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="security" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="rounded-4xl bg-slate-950 px-7 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <LockKeyhole className="mb-5 text-indigo-400" size={34} />
            <h2 className="text-3xl font-semibold tracking-tight">
              Security is part of the architecture.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">
              HTTP-only cookie authentication, private-by-default visibility,
              and time-limited sharing help keep access in your control.
            </p>
          </div>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 lg:mt-0"
          >
            Get started <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <footer id="pricing" className="border-t border-slate-200 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-sm text-slate-500 sm:flex-row lg:px-8">
          <Logo compact />
          <p>© 2026 Vaultly. Built for private work.</p>
        </div>
      </footer>
    </main>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-10 -z-10 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="rotate-[1.5deg] rounded-4xl border border-white/70 bg-white/80 p-4 shadow-2xl shadow-indigo-950/15 backdrop-blur-xl">
        <div className="rounded-[1.4rem] bg-slate-950 p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Vault storage</p>
              <p className="mt-1 text-2xl font-semibold">
                18.4 GB{" "}
                <span className="text-sm font-normal text-slate-500">
                  of 100 GB
                </span>
              </p>
            </div>
            <div className="rounded-2xl bg-indigo-500/20 p-3 text-indigo-300">
              <CloudUpload />
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[36%] rounded-full bg-linear-to-r from-indigo-500 to-violet-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3">
          {[
            ["Q3 Product plan", "PDF", "2.8 MB"],
            ["Brand assets", "ZIP", "14.6 MB"],
            ["Team offsite", "JPG", "5.2 MB"],
          ].map(([name, type, size], i) => (
            <div
              key={name}
              className={`rounded-2xl border border-slate-100 p-4 ${i === 2 ? "hidden sm:block" : ""}`}
            >
              <div
                className={`mb-7 flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold ${i === 0 ? "bg-rose-50 text-rose-500" : i === 1 ? "bg-amber-50 text-amber-600" : "bg-sky-50 text-sky-600"}`}
              >
                {type}
              </div>
              <p className="truncate text-sm font-semibold text-slate-800">
                {name}
              </p>
              <p className="mt-1 text-xs text-slate-400">{size}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-7 -left-5 flex items-center gap-3 rounded-2xl border border-white bg-white p-3 pr-5 shadow-xl">
        <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
          <ShieldCheck size={21} />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">
            Upload complete
          </p>
          <p className="text-[11px] text-slate-400">Encrypted and secured</p>
        </div>
      </div>
    </div>
  );
}
