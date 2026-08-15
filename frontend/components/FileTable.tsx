"use client";
import { StoredFile } from "@/types/file";
import {
  Download,
  Eye,
  Globe2,
  Heart,
  Link,
  Lock,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { FileBadge } from "./FileBadge";
import PrevieFile from "./PreviewFile";
import { calculateFileSize } from "@/lib/calculateFileSize";
import { fileApi } from "@/lib/api";
import { DeleteModal } from "./DeleteModal";
import { toast } from "sonner";
import { createPortal } from "react-dom";
const FileTable = ({
  files,
  title = "Your files",
  onFilesChange,
}: {
  files: StoredFile[];
  title?: string;
  onFilesChange: React.Dispatch<React.SetStateAction<StoredFile[]>>;
}) => {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState("all");
  const [time, setTime] = useState("all");
  const [now] = useState(() => Date.now());
  const [menu, setMenu] = useState<{
    id: string;
    top: number;
    right: number;
  } | null>(null);
  const [preview, setPreview] = useState<StoredFile | null>(null);
  const [deleteFile, setDeleteFile] = useState<StoredFile | null>(null);
  const [deleting, setDeleting] = useState(false);

  const visible = useMemo(() => {
    const MB = 1024 * 1024;
    return files
      .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
      .filter((f) => {
        if (size === "all") {
          return true;
        }
        if (size === "small") {
          return f.size < 10 * MB;
        }
        if (size === "medium") {
          return f.size >= 10 * MB && f.size < 100 * MB;
        }
        return f.size >= 100 * MB;
      })
      .filter((f) => {
        if (time === "all") {
          return true;
        }
        const updatedAt = new Date(f.updatedAt).getTime();
        if (time === "week") {
          return now - updatedAt <= 7 * 24 * 60 * 60 * 1000;
        }
        if (time === "month") {
          return now - updatedAt <= 30 * 24 * 60 * 60 * 1000;
        }
        return true;
      });
  }, [files, query, size, time, now]);
  const toggle = async (id: string, key: "favorite" | "visibility") => {
    const currentFile = files.find((file) => file.id === id);

    if (!currentFile) return;

    if (key === "favorite") {
      const newFavorite = !currentFile.favorite;
      onFilesChange((currentFiles) =>
        currentFiles.map((file) =>
          file.id === id ? { ...file, favorite: newFavorite } : file,
        ),
      );

      try {
        await fileApi.updateFavoriteFile(id, newFavorite);
      } catch {
        toast.error(
          currentFile.favorite
            ? "Failed to remove from favorites."
            : "Failed to add to favorites.",
        );
        onFilesChange((currentFiles) =>
          currentFiles.map((file) =>
            file.id === id ? { ...file, favorite: currentFile.favorite } : file,
          ),
        );
      }

      return;
    }

    if (key === "visibility") {
      const newVisibility =
        currentFile.visibility === "private" ? "public" : "private";
      onFilesChange((currentFiles) =>
        currentFiles.map((file) =>
          file.id === id ? { ...file, visibility: newVisibility } : file,
        ),
      );

      try {
        await fileApi.updateFileVisibility(id, newVisibility);
      } catch {
        toast.error("Failed to update visibility. Please try again.");
        onFilesChange((currentFiles) =>
          currentFiles.map((file) =>
            file.id === id
              ? {
                  ...file,
                  visibility: currentFile.visibility,
                }
              : file,
          ),
        );
      }
    }
  };
  const handleDelete = async () => {
    if (!deleteFile) {
      return;
    }
    try {
      setDeleting(true);
      await fileApi.deleteFile(deleteFile.id);
      onFilesChange((currentFiles) =>
        currentFiles.filter((file) => file.id !== deleteFile.id),
      );
      toast.success("File deleted successfully");
      setDeleteFile(null);
      setDeleting(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete the file");
      setDeleting(false);
    }
  };
  const handleDownload = async (file: StoredFile) => {
    try {
      const response = await fileApi.downloadFile(file.id);

      const downloadUrl = response.data.downloadUrl;

      if (!downloadUrl) {
        toast.error("Download link could not be generated.");
        return;
      }

      const link = document.createElement("a");

      link.href = downloadUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setMenu(null);
      toast.success("Download started.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to download file.");
    }
  };
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-sky-200/40">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
        <h2 className="mr-auto font-semibold">
          {title}
          <span className="ml-1 text-sm font-normal text-slate-400">
            {visible.length}
          </span>
        </h2>
        <div className="relative sm:w-64">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search files"
            className="w-full rounded-xl border border-slate-200 bg-white  py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300  focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
        <div className="flex gap-2">
          <Select
            label="Size"
            value={size}
            set={setSize}
            options={[
              ["all", "Any size"],
              ["small", "Under 10 MB"],
              ["medium", "10–100 MB"],
              ["large", "100 MB+"],
            ]}
          />
          <Select
            label="Time"
            value={time}
            set={setTime}
            options={[
              ["all", "Any time"],
              ["week", "This week"],
              ["month", "This month"],
            ]}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-200 text-left text-sm">
          <thead className="bg-slate-50/70 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Name</th>
              <th className="px-5 py-3.5 font-semibold">Owner</th>
              <th className="px-5 py-3.5 font-semibold">Size</th>
              <th className="px-5 py-3.5 font-semibold">Modified</th>
              <th className="px-5 py-3.5 font-semibold">Access</th>
              <th className="px-5 py-3.5 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-400">
            {visible.map((f) => (
              <tr key={f.id} className="group hover:bg-slate-50/60">
                <td className="px-5 py-4">
                  <button
                    onClick={() => setPreview(f)}
                    className="flex items-center gap-3 text-left"
                  >
                    <FileBadge type={f.type} />
                    <div>
                      <p className="max-w-62.5 truncate font-semibold text-slate-800">
                        {f.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">{f.type}</p>
                    </div>
                  </button>
                </td>
                <td className="px-4 py-4 text-slate-500">{f.owner}</td>
                <td className="px-4 py-4 text-slate-500">
                  {calculateFileSize(f.size)}
                </td>
                <td className="px-4 py-4 text-slate-500">{f.name}</td>
                <td className="px-4 py-4">
                  <button
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${f.visibility === "public" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                    onClick={() => toggle(f.id, "visibility")}
                  >
                    {f.visibility === "public" ? (
                      <Globe2 size={13} />
                    ) : (
                      <Lock size={13} />
                    )}
                  </button>
                </td>
                <td className="relative px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      className="action-button"
                      onClick={() => setPreview(f)}
                      aria-label="Preview"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => toggle(f.id, "favorite")}
                      className={`action-button ${f.favorite ? "text-rose-500" : ""}`}
                      aria-label="favorite"
                    >
                      <Heart
                        size={18}
                        className={
                          f.favorite ? "text-rose-500" : "text-slate-400"
                        }
                        fill={f.favorite ? "currentColor" : "none"}
                      />
                    </button>
                    <button
                      onClick={() =>
                        navigator.clipboard?.writeText(
                          `${location.origin}/files/public/${f.id}`,
                        )
                      }
                      aria-label="Share"
                      className="action-button"
                    >
                      <Link size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        if (menu?.id === f.id) {
                          setMenu(null);
                          return;
                        }

                        const rect = e.currentTarget.getBoundingClientRect();

                        setMenu({
                          id: f.id,
                          top: rect.bottom + 6,
                          right: window.innerWidth - rect.right,
                        });
                      }}
                      className="action-button"
                      aria-label="More actions"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                  {menu &&
                    createPortal(
                      <div
                        style={{
                          top: menu.top,
                          right: menu.right,
                        }}
                        className="fixed z-9999 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl"
                      >
                        <button
                          className="menu-button"
                          onClick={() => {
                            const file = files.find(
                              (file) => file.id === menu.id,
                            );

                            if (!file) return;

                            handleDownload(file);
                          }}
                        >
                          <Download size={18} />
                          Download
                        </button>

                        <button
                          onClick={() => {
                            const file = files.find(
                              (file) => file.id === menu.id,
                            );

                            if (!file) return;

                            setDeleteFile(file);
                            setMenu(null);
                          }}
                          className="menu-button text-rose-600"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>,
                      document.body,
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && (
          <div className="py-16 text-center text-sm text-slate-400">
            No files match your filters.
          </div>
        )}
      </div>
      {preview && <PrevieFile file={preview} close={() => setPreview(null)} />}
      <DeleteModal
        open={!!deleteFile}
        title="Delete file?"
        description={`Are you sure you want to delete "${deleteFile?.name}"? This action cannot be undone.`}
        loading={deleting}
        onDelete={handleDelete}
        onClose={() => setDeleteFile(null)}
      />
    </section>
  );
};

export default FileTable;

function Select({
  label,
  value,
  set,
  options,
}: {
  label: string;
  value: string;
  set: (v: string) => void;
  options: string[][];
}) {
  return (
    <label className="relative">
      <SlidersHorizontal
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={15}
      />
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => set(e.target.value)}
        className="rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-600 outline-none"
      >
        {options.map(([v, l]) => (
          <option value={v} key={v}>
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}
