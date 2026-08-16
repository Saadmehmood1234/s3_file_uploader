import Link from "next/link";
import { Files } from "lucide-react";
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 font-semibold tracking-tight text-slate-950"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#215c45] text-white shadow-md shadow-[#215c45]/20">
        <Files size={24} />
      </span>
      {!compact && <span className="text-2xl">FileKeeper</span>}
    </Link>
  );
}
