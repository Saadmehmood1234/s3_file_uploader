"use client";

import { FileBadge } from "@/components/FileBadge";
import { PublicFileNotFound } from "@/components/FileNotFound";
import { FilePreviewContent } from "@/components/FilePreviewContext";
import { fileApi } from "@/lib/api";
import { getFileType } from "@/lib/getFileType";
import { DownloadData } from "@/types/file";
import {
  Download,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ParamsType = {
  id: string;
};

const PublicFiles = () => {
  const { id }: ParamsType = useParams();

  const [files, setFiles] = useState<DownloadData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFile() {
      try {
        const res = await fileApi.getPublicFile(id);
        setFiles(res.data);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load file.",
        );
      } finally {
        setLoading(false);
      }
    }

    void fetchFile();
  }, [id]);

  const handleDownload = () => {
    if (!files?.downloadUrl) return;

    const link = document.createElement("a");

    link.href = files.downloadUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Download started.");
  };

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2
            size={32}
            className="animate-spin text-indigo-600"
          />
          <p className="text-sm">Loading shared file...</p>
        </div>
      </div>
    );
  }

  if (!files?.downloadUrl) {
    return <PublicFileNotFound />;
  }

  const fileType = getFileType(files.mimeType);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex min-w-0 items-center gap-4">
              <FileBadge type={fileType} />

              <div className="min-w-0">
                <h1 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
                  {files.name}
                </h1>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <span>{fileType}</span>
                  <span>•</span>
                  <span>Public file</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center justify-between gap-1 bg-[#615FFF] text-white px-3 py-2 hover:bg-[#615FFF]/90 rounded-full"
            >
              <Download size={18} />
              Download
            </button>
          </div>

          <div className="flex min-h-125 items-center justify-center bg-slate-100">
            <FilePreviewContent
              url={files.downloadUrl}
              name={files.name}
              type={fileType}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default PublicFiles;