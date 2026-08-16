"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { RefreshCw, Search, Upload } from "lucide-react";
import { UploadModal } from "./UploadModal";
import { useRouter } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [upload, setUpload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  const handleRefresh = () => {
    setRefreshing(true);

    router.refresh();

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  return (
    <div className="min-h-screen">
      <Sidebar onOpenUpload={() => setUpload(true)} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-slate-100 bg-white/90 px-4 pl-16 backdrop-blur-xl sm:px-7 sm:pl-20 lg:pl-8">
          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />

            <input
              className="w-full rounded-xl bg-slate-100 py-2.5 pl-10 pr-4 text-sm outline-none ring-[#215c45] focus:ring-2"
              placeholder="Search anything…"
            />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Refresh"
            >
              <RefreshCw
                size={18}
                className={refreshing ? "animate-spin" : ""}
              />
            </button>

            <button
              type="button"
              onClick={() => setUpload(true)}
              className="flex h-10 items-center gap-2 rounded-full bg-[#215c45] px-3.5 text-sm font-semibold text-white shadow-md shadow-[#215c45]/15 hover:bg-[#215c45]/90"
            >
              <Upload size={18} />
              <span className="hidden sm:inline">Upload Files</span>
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-7 lg:p-8">{children}</main>
      </div>

      <UploadModal open={upload} onClose={() => setUpload(false)} />
    </div>
  );
};
