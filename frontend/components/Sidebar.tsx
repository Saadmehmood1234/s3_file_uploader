"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { NAVIGATION } from "@/config/navigation";
import Link from "next/link";
import { LogOut, Menu, Plus, X } from "lucide-react";
import { authApi } from "@/lib/api";
import { toast } from "sonner";

export const Sidebar = ({ onOpenUpload }: { onOpenUpload: () => void }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      setLoading(true);
      await authApi.logout();
      router.push("/login");
    } catch {
      toast.error("Error in loging out");
    } finally {
      setLoading(false);
    }
  };
  const nav = (
    <>
      <div className="px-3">
        <Logo />
      </div>
      <nav className="mt-9 flex-1 space-y-1">
        {NAVIGATION.map(({ label, path, icon: Icon }) => (
          <Link
            href={path}
            key={path}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rouned-xl px-3 py-2.5 text-sm font-medium transition ${path === pathname ? "bg-[#215c45]/5 text-[#215c45]" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
          >
            <Icon size={19} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex-col gap-4">
        <button
          onClick={onOpenUpload}
          className="w-full mb-2 rounded-full items-center flex-inline justify-center hover:bg-[#215c45]/10 border border-[#215c45] side-link disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus size={24} />
          Upload
        </button>
        <button
          type="button"
          className="w-full rounded-full items-center border border-slate-300 flex-inline justify-center hover:bg-[#215c45]/80 side-link bg-[#215c45] text-white disabled:cursor-not-allowed disabled:opacity-60"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut size={19} />
          {loading ? "Logging out..." : "Log out"}
        </button>
      </div>
    </>
  );
  return (
    <>
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 lg:hidden"
      >
        <Menu size={20} />
      </button>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white p-5 lg:flex">
        {nav}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          />
          <aside className="relative flex h-full w-72 flex-col bg-white p-5 shadow-2xl">
            <button
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-500"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
};
