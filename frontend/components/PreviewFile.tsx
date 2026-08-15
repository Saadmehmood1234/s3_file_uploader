"use client";

import { StoredFile } from "@/types/file";
import { fileApi } from "@/lib/api";
import { FileBadge } from "./FileBadge";
import { Download, FileText, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";

const PrevieFile = ({
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
        setLoading(true);
        setError("");

        const response = await fileApi.downloadFile(file.id);

        setPreviewUrl(response.data.downloadUrl);
      } catch {
        setError("Unable to load file preview.");
      } finally {
        setLoading(false);
      }
    };

    getPreview();
  }, [file.id]);

  const isImage = ["JPG", "JPEG", "PNG", "WEBP", "GIF"].includes(file.type);

  const isVideo = ["MP4", "WEBM", "MOV", "AVI"].includes(file.type);

  const isAudio = ["MP3", "WAV", "OGG", "M4A"].includes(file.type);

  const isPDF = file.type === "PDF";

  const isText = file.type === "TXT";

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
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <FileBadge type={file.type} />

            <div className="min-w-0">
              <p className="max-w-md truncate font-semibold text-slate-800">
                {file.name}
              </p>

              <p className="text-xs text-slate-400">{file.sizeLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Download"
              >
                <Download size={19} />
              </a>
            )}

            <button
              type="button"
              onClick={close}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div className="flex min-h-112.5 max-h-[75vh] items-center justify-center overflow-auto bg-slate-100">
          {loading && (
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <Loader2 size={32} className="animate-spin text-indigo-600" />

              <p className="text-sm">Loading preview...</p>
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-slate-500">
              <FileText size={36} className="mx-auto mb-3" />

              <p className="font-medium">Preview unavailable</p>

              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && previewUrl && (
            <>
              {/* Image */}
              {isImage && (
                <img
                  src={previewUrl}
                  alt={file.name}
                  className="max-h-[75vh] max-w-full object-contain"
                />
              )}

              {/* Video */}
              {isVideo && (
                <video
                  src={previewUrl}
                  controls
                  className="max-h-[75vh] w-full bg-black"
                >
                  Your browser does not support video playback.
                </video>
              )}

              {/* Audio */}
              {isAudio && (
                <div className="w-full max-w-lg px-6">
                  <audio src={previewUrl} controls className="w-full">
                    Your browser does not support audio playback.
                  </audio>
                </div>
              )}

              {/* PDF */}
              {isPDF && (
                <iframe
                  src={previewUrl}
                  title={file.name}
                  className="h-[70vh] w-full border-0"
                />
              )}

              {isText && <TextPreview url={previewUrl} />}

              {/* Unsupported formats */}
              {!isImage && !isVideo && !isAudio && !isPDF && !isText && (
                <div className="text-center text-slate-500">
                  <FileText size={40} className="mx-auto mb-3" />

                  <p className="font-medium">Preview not available</p>

                  <p className="mt-1 text-sm text-slate-400">
                    This file type cannot be previewed in the browser.
                  </p>

                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <Download size={17} />
                    Open file
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrevieFile;

const TextPreview = ({ url }: { url: string }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadText = async () => {
      try {
        const response = await fetch(url);
        const text = await response.text();

        setContent(text);
      } finally {
        setLoading(false);
      }
    };

    loadText();
  }, [url]);

  if (loading) {
    return <Loader2 className="animate-spin text-indigo-600" size={28} />;
  }

  return (
    <pre className="max-h-[70vh] w-full overflow-auto whitespace-pre-wrap p-6 text-sm text-slate-700">
      {content}
    </pre>
  );
};
