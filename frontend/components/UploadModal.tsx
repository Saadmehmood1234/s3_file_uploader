"use client";

import { useFiles } from "@/context/FilesProvider";
import { fileApi } from "@/lib/api";
import { CheckCircle2, FileUp, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";

export const UploadModal = ({
  open,
  onClose,
  onUploaded,
}: {
  open: boolean;
  onClose: () => void;
  onUploaded?: () => void | Promise<void>;
}) => {
  const input = useRef<HTMLInputElement>(null);
  const { fetchFiles } = useFiles();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
    setSuccess(false);
    setError("");

    if (input.current) {
      input.current.value = "";
    }
  };

  const closeModal = () => {
    if (uploading) return;

    reset();
    onClose();
  };

  const uploadFile = async (selectedFile: File) => {
    try {
      setFile(selectedFile);
      setProgress(0);
      setUploading(true);
      setSuccess(false);
      setError("");
      const uploadResponse = await fileApi.createUploadUrl({
        fileName: selectedFile.name,
        mimeType: selectedFile.type,
        size: selectedFile.size,
      });

      const uploadedFile = uploadResponse.data.file;
      const uploadUrl = uploadResponse.data.uploadUrl;

      await fileApi.uploadToStorage(uploadUrl, selectedFile, (percent) => {
        setProgress(percent);
      });

      await fileApi.completeUpload(uploadedFile.id);
      await fetchFiles();
      setProgress(100);
      setSuccess(true);
      setUploading(false);
      await onUploaded?.();
      setTimeout(() => {
        reset();
        onClose();
      }, 1000);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "File upload failed. Please try again.",
      );
      setUploading(false);
      setSuccess(false);
    }
  };

  const handleFileChange = (files: FileList | null) => {
    const selectedFile = files?.[0];

    if (!selectedFile) return;

    uploadFile(selectedFile);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files?.[0];

    if (!selectedFile) return;

    uploadFile(selectedFile);
  };

  if (!open) return null;

  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
      className="fixed inset-0 z-60 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"
    >
      <section className="w-full max-w-xl rounded-[1.75rem] bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Upload files</h2>

            <p className="mt-1 text-sm text-slate-500">
              Add files securely to your vault.
            </p>
          </div>

          <button
            disabled={uploading}
            onClick={closeModal}
            className="rounded-xl bg-slate-100 p-2 text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleOnDrop}
          onClick={() => {
            if (!uploading) {
              input.current?.click();
            }
          }}
          className={`mt-6 rounded-2xl border-2 border-dashed border-[#215c45]/20 bg-[#215c45]/5 px-6 py-10 text-center transition ${
            uploading
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:border-[#215c45]/20 hover:bg-[#215c45]/5"
          }`}
        >
          <input
            ref={input}
            type="file"
            disabled={uploading}
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
          />

          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#215c45] shadow-sm">
            <UploadCloud size={27} />
          </span>

          <p className="mt-4 font-semibold text-slate-800">
            Drop a file here, or <span className="text-[#215c45]">browse</span>
          </p>

          <p className="mt-1 text-xs text-slate-400">
            PDF, images, video, documents or ZIP
          </p>
        </div>

        {file && (
          <div className="mt-5 rounded-2xl border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-[#215c45]/5 p-2 text-[#215c45]">
                <FileUp size={28} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-800">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {(file.size / 1048576).toFixed(1)} MB
                    </p>
                  </div>

                  {uploading && (
                    <span className="text-xs font-medium text-[#215c45]">
                      {progress}%
                    </span>
                  )}
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    style={{
                      width: `${progress}%`,
                    }}
                    className="h-full rounded-full bg-[#215c45] transition-all"
                  />
                </div>

                <div className="mt-2 text-xs">
                  {uploading && (
                    <span className="text-slate-400">
                      Uploading · {progress}%
                    </span>
                  )}

                  {success && (
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 size={13} />
                      Upload complete
                    </span>
                  )}

                  {error && <span className="text-rose-600">{error}</span>}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
