import { fileApi } from "@/lib/api";
import { calculateFileSize } from "@/lib/calculateFileSize";
import { formatDate } from "@/lib/formatDate";
import { getFileTypeImage } from "@/lib/getFileTypeImage";
import { StoredFile } from "@/types/file";
import { Globe2, Loader2, Lock, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

export function FileCard({
  file,
  onPreview,
  onMore,
}: {
  file: StoredFile;
  onPreview: () => void;
  onMore: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const isImage = ["JPG", "JPEG", "PNG", "WEBP", "GIF"].includes(
      file.type.toUpperCase(),
    );

    if (!isImage) return;

    async function fetchPreviewUrl() {
      try {
        setLoading(true);

        const response = await fileApi.getPreviewUrl(file.id);

        setPreviewUrl(response.data.previewUrl);
      } catch {
        setPreviewUrl(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPreviewUrl();
  }, [file.id, file.type]);
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 size={32} className="animate-spin text-[#215c45]" />
          <p className="text-sm">Loading shared file...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50">
      <FileThumbnail file={file} previewUrl={previewUrl} onClick={onPreview} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMore();
        }}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-slate-900"
        aria-label="More actions"
      >
        <MoreVertical size={17} />
      </button>
      <div className="p-4">
        <button onClick={onPreview} className="block w-full text-left">
          <p
            className="truncate text-sm font-semibold text-slate-800"
            title={file.name}
          >
            {file.name}
          </p>
        </button>

        <p className="mt-1 text-xs text-slate-400">
          {file.type} · {calculateFileSize(file.size)}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              file.visibility === "public"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {file.visibility === "public" ? (
              <>
                <Globe2 size={12} />
                Public
              </>
            ) : (
              <>
                <Lock size={12} />
                Private
              </>
            )}
          </span>

          <span className="text-xs text-slate-400">
            {formatDate(file.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

function FileThumbnail({
  file,
  onClick,
  previewUrl,
}: {
  file: StoredFile;
  onClick: () => void;
  previewUrl: string | null;
}) {
  const type = file.type.toUpperCase();

  const isImage = ["JPG", "JPEG", "PNG", "WEBP", "GIF"].includes(type);

  return (
    <button
      onClick={onClick}
      className="relative flex h-44 w-full items-center justify-center overflow-hidden bg-slate-50"
    >
      {isImage && previewUrl ? (
        <img
          src={previewUrl}
          alt={file.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6">
          <img
            src={getFileTypeImage(type)}
            alt={`${type} file`}
            loading="lazy"
            className="h-40 w-40 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
    </button>
  );
}
