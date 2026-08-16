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
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setFiles([]);
    setProgress({});
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

  const uploadFiles = async (selectedFiles: File[]) => {
    try {
      setUploading(true);
      setSuccess(false);
      setError("");

      for (const selectedFile of selectedFiles) {
        const key = `${selectedFile.name}-${selectedFile.size}`;

        setProgress((current) => ({
          ...current,
          [key]: 0,
        }));

        const uploadResponse = await fileApi.createUploadUrl({
          fileName: selectedFile.name,
          mimeType: selectedFile.type,
          size: selectedFile.size,
        });

        const uploadedFile = uploadResponse.data.file;
        const uploadUrl = uploadResponse.data.uploadUrl;

        await fileApi.uploadToStorage(uploadUrl, selectedFile, (percent) => {
          setProgress((current) => ({
            ...current,
            [key]: percent,
          }));
        });

        await fileApi.completeUpload(uploadedFile.id);

        setProgress((current) => ({
          ...current,
          [key]: 100,
        }));
      }

      await fetchFiles();
      await onUploaded?.();

      setSuccess(true);

      setTimeout(() => {
        reset();
        onClose();
      }, 1200);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Some files failed to upload. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (fileList: FileList | null) => {
    if (!fileList?.length) return;

    const selectedFiles = Array.from(fileList);

    setFiles(selectedFiles);
    uploadFiles(selectedFiles);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const selectedFiles = Array.from(e.dataTransfer.files);

    if (!selectedFiles.length) return;

    setFiles(selectedFiles);
    uploadFiles(selectedFiles);
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
            multiple
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
        {files.length > 0 && (
          <div className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-1">
            {files.map((file) => {
              const key = `${file.name}-${file.size}`;
              const fileProgress = progress[key] ?? 0;
              const completed = fileProgress === 100;

              return (
                <div
                  key={key}
                  className="rounded-xl border border-slate-200 bg-white p-3.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#215c45]/10 text-[#215c45]">
                      <FileUp size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-800">
                            {file.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {(file.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>

                        <span
                          className={`shrink-0 text-xs font-medium ${
                            completed ? "text-emerald-600" : "text-[#215c45]"
                          }`}
                        >
                          {completed ? (
                            <CheckCircle2 size={17} />
                          ) : (
                            `${fileProgress}%`
                          )}
                        </span>
                      </div>

                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full transition-[width] duration-200 ${
                            completed ? "bg-emerald-500" : "bg-[#215c45]"
                          }`}
                          style={{
                            width: `${fileProgress}%`,
                          }}
                        />
                      </div>

                      <p className="mt-2 text-xs text-slate-400">
                        {completed
                          ? "Upload complete"
                          : fileProgress > 0
                            ? "Uploading..."
                            : "Preparing upload..."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {error && <p className="text-sm text-rose-600">{error}</p>}

            {success && (
              <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <CheckCircle2 size={16} />
                All files uploaded successfully.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
