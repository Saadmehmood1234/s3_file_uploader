"use client";
import { FolderOpen, HardDrive, Users } from "lucide-react";
import { PageHeading } from "@/components/PageHeading";
import FileTable from "@/components/FileTable";
import { useAuth } from "@/context/AuthProvider";
import { calculateFileSize } from "@/lib/calculateFileSize";
import { useFiles } from "@/context/FilesProvider";
import { useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();

  const { files, setFiles } = useFiles();
  const [currentDate] = useState(() =>
    new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  );

  const totalSize = files.reduce((total, file) => total + file.size, 0);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeading
        eyebrow={currentDate}
        title={`Hello, ${user.name}`}
        description="Here’s what’s happening in your vault today."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Stat
          icon={<HardDrive />}
          label="Storage used"
          value={calculateFileSize(totalSize)}
          detail="of 2 GB"
          accent="indigo"
        />

        <Stat
          icon={<FolderOpen />}
          label="Total files"
          value={String(files.length)}
          detail="Files in your vault"
          accent="sky"
        />

        <Stat
          icon={<Users />}
          label="Shared items"
          value={String(
            files.filter((file) => file.visibility === "public").length,
          )}
          detail="Publicly shared files"
          accent="emerald"
        />
      </div>

      <div className="mt-7">
        <FileTable
          files={files}
          title="All files"
          onFilesChange={setFiles}
        />
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  detail,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
  accent: string;
}) {
  const cls =
    accent === "sky"
      ? "bg-sky-50 text-sky-600"
      : accent === "emerald"
        ? "bg-emerald-50 text-emerald-600"
        : "bg-indigo-50 text-indigo-600";
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-5 inline-flex rounded-xl p-2.5 ${cls}`}>{icon}</div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </div>
  );
}
