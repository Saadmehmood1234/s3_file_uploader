"use client";

import { StoredFile } from "@/types/file";
import { fileApi } from "@/lib/api";
import { FileBadge } from "./FileBadge";
import { FilePreviewContent } from "./FilePreviewContext";
import { Download, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

const PreviewFile = ({
  file,
  close,
}: {
  file: StoredFile;
  close: () => void;
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPreview = async () => {
      try {
        setError("");

        const response = await fileApi.downloadFile(file.id);

        setPreviewUrl(response.data.downloadUrl);
      } catch {
        setError("Unable to load file preview.");
      } finally {
        setLoading(false);
      }
    };

    void getPreview();
  }, [file.id]);

  return (
    <div
      className="fixed inset-0 z-70 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <FileBadge type={file.type} />

            <div className="min-w-0">
              <p className="max-w-md truncate font-semibold text-slate-800">
                {file.name}
              </p>

              <p className="text-xs text-slate-400">
                {file.sizeLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <Download size={19} />
              </a>
            )}

            <button
              type="button"
              onClick={close}
              className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div className="flex min-h-112.5 max-h-[75vh] items-center justify-center overflow-auto bg-slate-100">
          {loading && (
            <Loader2
              size={32}
              className="animate-spin text-[#215c45]"
            />
          )}

          {!loading && error && (
            <p className="text-sm text-rose-600">
              {error}
            </p>
          )}

          {!loading && !error && previewUrl && (
            <FilePreviewContent
              url={previewUrl}
              name={file.name}
              type={file.type}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewFile;