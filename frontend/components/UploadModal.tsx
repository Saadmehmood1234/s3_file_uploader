"use client";

import { useFiles } from "@/context/FilesProvider";
import { fileApi } from "@/lib/api";
import { calculateFileSize } from "@/lib/calculateFileSize";
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
      className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-4"
    >
      <section className="flex max-h-[calc(100dvh-24px)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-32px)] sm:rounded-[1.75rem]">
        <div className="shrink-0 p-4 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold sm:text-xl">Upload files</h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Add files securely to your vault.
              </p>
            </div>

            <button
              disabled={uploading}
              onClick={closeModal}
              className="shrink-0 rounded-xl bg-slate-100 p-2 text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
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
            className={`mt-5 rounded-2xl border-2 border-dashed border-[#215c45]/20 bg-[#215c45]/5 px-3 py-6 text-center transition sm:mt-6 sm:px-6 sm:py-10 ${
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

            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#215c45] shadow-sm sm:h-14 sm:w-14">
              <UploadCloud size={25} />
            </span>

            <p className="mt-3 text-sm font-semibold text-slate-800 sm:mt-4 sm:text-base">
              Drop a file here, or{" "}
              <span className="text-[#215c45]">browse</span>
            </p>

            <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
              PDF, images, video, documents or ZIP
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100 px-4 pb-4 pt-4 sm:px-7 sm:pb-7">
            <div className="space-y-3">
              {files.map((file) => {
                const key = `${file.name}-${file.size}`;
                const fileProgress = progress[key] ?? 0;
                const completed = fileProgress === 100;

                return (
                  <div
                    key={key}
                    className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 sm:p-3.5"
                  >
                    <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#215c45]/10 text-[#215c45] sm:h-10 sm:w-10">
                        <FileUp size={19} />
                      </div>

                      <div className="min-w-0 flex-1 overflow-hidden">
                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <p
                              title={file.name}
                              className="block max-w-full truncate text-xs font-medium text-slate-800 sm:text-sm"
                            >
                              {file.name}
                            </p>

                            <p className="mt-0.5 text-[11px] text-slate-400 sm:text-xs">
                              {calculateFileSize(file.size)}
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

                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full transition-[width] duration-200 ${
                              completed ? "bg-emerald-500" : "bg-[#215c45]"
                            }`}
                            style={{
                              width: `${Math.min(fileProgress, 100)}%`,
                            }}
                          />
                        </div>

                        <p className="mt-2 text-[11px] text-slate-400 sm:text-xs">
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

              {error && (
                <p className="wrap-words text-xs text-rose-600 sm:text-sm">
                  {error}
                </p>
              )}

              {success && (
                <p className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 sm:text-sm">
                  <CheckCircle2 size={16} className="shrink-0" />
                  All files uploaded successfully.
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
