import Link from "next/link";
import { Files } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 font-semibold tracking-tight text-slate-950"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
        <Files size={24} />
      </span>
      {!compact && <span className="text-2xl">Vaultly</span>}
    </Link>
  );
}
