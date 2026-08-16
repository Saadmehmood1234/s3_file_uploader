import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  CloudUpload,
  FileCheck2,
  FolderLock,
  Link2,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "./Logo";

const features = [
  {
    icon: CloudUpload,
    title: "Upload without the friction",
    copy: "Upload one or many files with clear progress, useful errors, and direct cloud storage.",
  },
  {
    icon: FolderLock,
    title: "Private until you say otherwise",
    copy: "New files stay private by default. You choose exactly what becomes shareable.",
  },
  {
    icon: FileCheck2,
    title: "Find files without digging",
    copy: "Search, filter, favorite, and sort your files from one clean workspace.",
  },
];

const securityItems = [
  {
    icon: LockKeyhole,
    title: "HTTP-only authentication",
    copy: "Authentication cookies stay inaccessible to client-side JavaScript.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    copy: "A file is not public unless you explicitly change its visibility.",
  },
  {
    icon: Link2,
    title: "Controlled sharing",
    copy: "Public access is exposed only through files you intentionally share.",
  },
  {
    icon: Clock3,
    title: "Temporary storage access",
    copy: "Signed storage URLs expire automatically instead of remaining permanent.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#17211b]">
      <header className="border-b border-[#dfe3dc] bg-[#f7f7f4]/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo />

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#667069] md:flex">
            <a
              href="#features"
              className="transition-colors hover:text-[#17211b]"
            >
              Features
            </a>
            <a
              href="#security"
              className="transition-colors hover:text-[#17211b]"
            >
              Security
            </a>
            <a href="#about" className="transition-colors hover:text-[#17211b]">
              About
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-lg px-3.5 py-2.5 text-sm font-semibold text-[#4d5851] transition hover:bg-[#eceee9] sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-[#215c45] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#184a37]"
            >
              Create account
            </Link>
          </div>
        </div>
      </header>

      <section className="overflow-hidden border-b border-[#dfe3dc]">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-5 text-sm font-semibold text-[#215c45]">
              Secure file storage, minus the clutter
            </p>

            <h1 className="text-4xl font-semibold leading-[1.03] tracking-[-0.045em] text-[#17211b] sm:text-6xl lg:text-6xl">
              Manage files, and organized.
              <span className="lg:text-5xl mt-2 block text-[#68736b]">
                Your data, protected.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-[#667069] sm:text-lg sm:leading-8">
              FileKeeper gives you one straightforward place to upload,
              organize, preview, and share files while keeping everything
              private by default.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#215c45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#184a37]"
              >
                Start for free
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-lg border border-[#cfd5cd] bg-white px-5 py-3 text-sm font-semibold text-[#26312a] transition hover:bg-[#f0f2ed]"
              >
                Open demo
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6f7972]">
              {["2 GB free", "No credit card", "Private by default"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check size={15} className="text-[#215c45]" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative lg:pl-4">
            <div className="rounded-[22px] border border-[#ccd2ca] bg-[#e9ece6] p-2 shadow-[0_24px_70px_rgba(37,52,43,0.14)]">
              <div className="overflow-hidden rounded-2xl border border-[#d5dad3] bg-white">
                <div className="flex items-center gap-1.5 border-b border-[#e5e8e2] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d9ddd7]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d9ddd7]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#d9ddd7]" />
                  <span className="ml-3 text-[11px] font-medium text-[#929a94]">
                    app.filekeeper
                  </span>
                </div>
                <img
                  src="/background.png"
                  alt="FileKeeper dashboard showing stored files"
                  className="block w-full"
                />
              </div>
            </div>

            <div className="absolute -bottom-5 left-0 hidden rounded-xl border border-[#d6dbd3] bg-white px-4 py-3 shadow-lg lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f0ea] text-[#215c45]">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#26312a]">
                    Private by default
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#7b847e]">
                    You control what gets shared
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="max-w-md">
              <p className="text-sm font-semibold text-[#215c45]">
                Built for everyday use
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#17211b] sm:text-4xl">
                File management without a learning curve.
              </h2>
              <p className="mt-5 text-base leading-7 text-[#6a746d]">
                The important actions stay obvious. The rest stays out of your
                way.
              </p>
            </div>

            <div className="border-t border-[#dde2da]">
              {features.map(({ icon: Icon, title, copy }, index) => (
                <div
                  key={title}
                  className="grid gap-4 border-b border-[#dde2da] py-7 sm:grid-cols-[52px_1fr] sm:gap-6"
                >
                  <div className="flex items-start justify-between sm:block">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf2ee] text-[#215c45]">
                      <Icon size={19} />
                    </div>
                    <span className="text-xs font-medium text-[#a1a8a2] sm:hidden">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-[1fr_1.2fr] sm:gap-8">
                    <h3 className="font-semibold text-[#273129]">{title}</h3>
                    <p className="text-sm leading-6 text-[#6c756f] sm:text-base">
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-y border-[#dfe3dc] bg-[#eef0eb] py-16 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-3 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-[#215c45]">
              Designed around one principle
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#17211b]">
              You stay in control.
            </h2>
          </div>

          <p className="text-base leading-7 text-[#626d65] lg:col-span-2 lg:max-w-2xl">
            FileKeeper is intentionally simple: your files start private,
            sharing is deliberate, and the interface focuses on the actions you
            actually use—upload, find, preview, organize, and share.
          </p>
        </div>
      </section>

      <section id="security" className="bg-[#17251e] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div className="max-w-md">
              <p className="text-sm font-semibold text-[#91c5aa]">Security</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Sensible protection, built into the product.
              </h2>
              <p className="mt-5 text-base leading-7 text-[#b5c1b9]">
                Security should not depend on you remembering to turn it on.
                FileKeeper starts from restricted access and lets you open
                things up intentionally.
              </p>

              <Link
                href="/signup"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#f1f4ef] px-5 py-3 text-sm font-semibold text-[#17251e] transition hover:bg-white"
              >
                Create your account
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="grid border-t border-white/15 sm:grid-cols-2">
              {securityItems.map(({ icon: Icon, title, copy }, index) => (
                <div
                  key={title}
                  className={`border-b border-white/15 py-7 sm:p-7 ${
                    index % 2 === 0 ? "sm:border-r" : ""
                  }`}
                >
                  <Icon size={20} className="text-[#91c5aa]" />
                  <h3 className="mt-5 font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#aebbb2]">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f4] py-18 sm:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-end lg:px-8">
          <div>
            <p className="text-sm font-semibold text-[#215c45]">
              Ready when you are
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-[#17211b] sm:text-4xl">
              Put your files somewhere you can actually find them again.
            </h2>
          </div>
          <Link
            href="/signup"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#215c45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#184a37]"
          >
            Get started free
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#dfe3dc] bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div className="max-w-sm">
              <Logo />
              <p className="mt-4 text-sm leading-6 text-[#6d766f]">
                Simple, secure file storage for keeping your work organized and
                under your control.
              </p>
            </div>

            <FooterGroup
              title="Product"
              links={[
                ["Features", "#features"],
                ["Security", "#security"],
                ["Dashboard", "/dashboard"],
              ]}
            />
            <FooterGroup
              title="Account"
              links={[
                ["Log in", "/login"],
                ["Create account", "/signup"],
              ]}
            />
            <FooterGroup
              title="Resources"
              links={[
                ["Privacy", "#security"],
                ["Contact", "mailto:support@filekeeper.com"],
              ]}
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-[#e3e6e1] py-5 text-xs text-[#879088] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} FileKeeper. All rights reserved.</p>
            <p>Built for secure file storage.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#26312a]">{title}</p>
      <div className="mt-4 flex flex-col gap-3 text-sm text-[#737d75]">
        {links.map(([label, href]) =>
          href.startsWith("/") ? (
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-[#215c45]"
            >
              {label}
            </Link>
          ) : (
            <a
              key={label}
              href={href}
              className="transition-colors hover:text-[#215c45]"
            >
              {label}
            </a>
          ),
        )}
      </div>
    </div>
  );
}
