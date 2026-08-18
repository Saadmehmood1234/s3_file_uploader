"use client";
import { StoredFile } from "@/types/file";
import {
  Eye,
  Globe2,
  Grid2X2,
  Link,
  List,
  Lock,
  MoreVertical,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {  useMemo, useState } from "react";
import { FileBadge } from "./FileBadge";
import PrevieFile from "./PreviewFile";
import { calculateFileSize } from "@/lib/calculateFileSize";
import { fileApi } from "@/lib/api";
import { DeleteModal } from "./DeleteModal";
import { toast } from "sonner";
import { formatDate } from "@/lib/formatDate";
import { RenameModal } from "./RenameModal";
import FileActionsModal from "./FileActionsModal";
import { FileCard } from "./FileCard";
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
  const [preview, setPreview] = useState<StoredFile | null>(null);
  const [deleteFile, setDeleteFile] = useState<StoredFile | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [renameFile, setRenameFile] = useState<StoredFile | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [actionFile, setActionFile] = useState<StoredFile | null>(null);
  const [view, setView] = useState<"table" | "card">("table");
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
  const toggle = async (id: string, key: "important" | "visibility") => {
    const currentFile = files.find((file) => file.id === id);

    if (!currentFile) return;

    if (key === "important") {
      const newImportant = !currentFile.isImportant;
      onFilesChange((currentFiles) =>
        currentFiles.map((file) =>
          file.id === id ? { ...file, isImportant: newImportant } : file,
        ),
      );

      try {
        await fileApi.updateImportantFile(id, newImportant);
      } catch {
        toast.error(
          currentFile.isImportant
            ? "Failed to remove from important file."
            : "Failed to add to important file.",
        );
        onFilesChange((currentFiles) =>
          currentFiles.map((file) =>
            file.id === id
              ? { ...file, isImportant: currentFile.isImportant }
              : file,
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
      setDeleting(false);
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

      toast.success("Download started.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to download file.");
    }
  };
  const handleCopy = (id: string) => {
    navigator.clipboard?.writeText(`${location.origin}/files/public/${id}`);
    toast.success("Link copied!");
  };

  const handleRename = async (name: string) => {
    if (!renameFile) return;

    try {
      setRenaming(true);

      await fileApi.renameFile(renameFile.id, name);

      onFilesChange((currentFiles) =>
        currentFiles.map((file) =>
          file.id === renameFile.id ? { ...file, name } : file,
        ),
      );

      toast.success("File renamed successfully.");
      setRenameFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to rename file.");
    } finally {
      setRenaming(false);
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
            className="w-full rounded-xl border border-slate-200 bg-white  py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-300  focus:border-[#215c45] focus:ring-4 focus:ring-[#215c45]/10"
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
          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setView("table")}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                view === "table"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              title="Table view"
              aria-label="Table view"
            >
              <List size={17} />
            </button>

            <button
              onClick={() => setView("card")}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                view === "card"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              title="Card view"
              aria-label="Card view"
            >
              <Grid2X2 size={17} />
            </button>
          </div>
        </div>
      </div>
      {view === "table" && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 table-fixed text-left text-sm">
            <thead className="bg-slate-50/70 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Name</th>
                <th className="px-5 py-3.5 font-semibold">Owner</th>
                <th className="px-5 py-3.5 font-semibold">Size</th>
                <th className="px-5 py-3.5 font-semibold">Modified</th>
                <th className="px-5 py-3.5 font-semibold">Access</th>
                <th className="px-5 py-3.5 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-400">
              {visible.map((f) => (
                <tr key={f.id} className="group hover:bg-slate-50/60">
                  <td className="max-w-0 px-5 py-4">
                    <button
                      onClick={() => setPreview(f)}
                      className="flex w-full min-w-0 items-center gap-3 text-left"
                    >
                      <div className="shrink-0">
                        <FileBadge type={f.type} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate font-semibold text-slate-800"
                          title={f.name}
                        >
                          {f.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {f.type}
                        </p>
                      </div>
                    </button>
                  </td>
                  <td className="px-4 py-4 text-slate-500">{f.owner}</td>
                  <td className="px-4 py-4 text-slate-500">
                    {calculateFileSize(f.size)}
                  </td>
                  <td className="px-4 py-4 text-slate-500">
                    {formatDate(f.updatedAt)}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${f.visibility === "public" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      onClick={() => toggle(f.id, "visibility")}
                      title={
                        f.visibility === "public"
                          ? "Make Private"
                          : "Make Public"
                      }
                    >
                      {f.visibility === "public" ? (
                        <p className="inline-flex gap-1 items-center">
                          {" "}
                          <Globe2 size={13} /> public
                        </p>
                      ) : (
                        <p className="inline-flex gap-1 items-center">
                          {" "}
                          <Lock size={13} /> private{" "}
                        </p>
                      )}
                    </button>
                  </td>
                  <td className="relative px-5 py-4">
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="action-button"
                          onClick={() => setPreview(f)}
                          aria-label="Preview"
                          title="Preview"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleCopy(f.id)}
                          aria-label="Share"
                          className="action-button"
                          title="Copy Link"
                        >
                          <Link size={18} />
                        </button>

                        <button
                          className="action-button"
                          onClick={() => setActionFile(f)}
                          aria-label="More actions"
                          title="More actions"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
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
      )}
      {view === "card" && (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onPreview={() => setPreview(file)}
              onMore={() => setActionFile(file)}
            />
          ))}
        </div>
      )}
      {preview && <PrevieFile file={preview} close={() => setPreview(null)} />}
      <DeleteModal
        open={!!deleteFile}
        title="Delete file?"
        description={`Are you sure you want to delete "${deleteFile?.name}"? This action cannot be undone.`}
        loading={deleting}
        onDelete={handleDelete}
        onClose={() => setDeleteFile(null)}
      />
      <RenameModal
        open={!!renameFile}
        currentName={renameFile?.name ?? ""}
        loading={renaming}
        onClose={() => setRenameFile(null)}
        onRename={handleRename}
      />
      <FileActionsModal
        file={actionFile}
        onClose={() => setActionFile(null)}
        onPreview={(file) => {
          setPreview(file);
          setActionFile(null);
        }}
        onDownload={(file) => {
          handleDownload(file);
          setActionFile(null);
        }}
        onRename={(file) => {
          setRenameFile(file);
          setActionFile(null);
        }}
        onToggleImportant={(file) => {
          toggle(file.id, "important");
          setActionFile(null);
        }}
        onToggleVisibility={(file) => {
          toggle(file.id, "visibility");
          setActionFile(null);
        }}
        onCopyLink={(file) => {
          handleCopy(file.id);
          setActionFile(null);
        }}
        onDelete={(file) => {
          setDeleteFile(file);
          setActionFile(null);
        }}
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


