// FileActionsModal.tsx

"use client";

import { StoredFile } from "@/types/file";
import {
  CircleAlert,
  Download,
  Eye,
  Globe,
  Link,
  Lock,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

type Props = {
  file: StoredFile | null;
  onClose: () => void;
  onPreview: (file: StoredFile) => void;
  onDownload: (file: StoredFile) => void;
  onRename: (file: StoredFile) => void;
  onToggleImportant: (file: StoredFile) => void;
  onToggleVisibility: (file: StoredFile) => void;
  onCopyLink: (file: StoredFile) => void;
  onDelete: (file: StoredFile) => void;
};

const FileActionsModal = ({
  file,
  onClose,
  onPreview,
  onDownload,
  onRename,
  onToggleImportant,
  onToggleVisibility,
  onCopyLink,
  onDelete,
}: Props) => {
  if (!file) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-black/30 p-3 backdrop-blur-[2px] sm:items-center"
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-md
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-2xl
          sm:rounded-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 p-4">
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-slate-800">
              {file.name}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              {file.type}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-2">
          <ActionButton
            icon={<Eye size={18} />}
            label="Preview"
            onClick={() => onPreview(file)}
          />

          <ActionButton
            icon={<Download size={18} />}
            label="Download"
            onClick={() => onDownload(file)}
          />

          <ActionButton
            icon={<Pencil size={18} />}
            label="Rename"
            onClick={() => onRename(file)}
          />

          <div className="my-2 border-t border-slate-100" />

          <ActionButton
            icon={<CircleAlert size={18} />}
            label={
              file.isImportant
                ? "Remove from Important"
                : "Add to Important"
            }
            onClick={() => onToggleImportant(file)}
          />

          <ActionButton
            icon={
              file.visibility === "public" ? (
                <Lock size={18} />
              ) : (
                <Globe size={18} />
              )
            }
            label={
              file.visibility === "public"
                ? "Make Private"
                : "Make Public"
            }
            onClick={() => onToggleVisibility(file)}
          />

          <ActionButton
            icon={<Link size={18} />}
            label="Copy Link"
            // disabled={file.visibility === "private"}
            onClick={() => onCopyLink(file)}
          />

          <div className="my-2 border-t border-slate-100" />

          <ActionButton
            icon={<Trash2 size={18} />}
            label="Delete File"
            destructive
            onClick={() => onDelete(file)}
          />
        </div>
      </div>
    </div>
  );
};

export default FileActionsModal;

function ActionButton({
  icon,
  label,
  onClick,
  destructive = false,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  destructive?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex w-full items-center gap-3 rounded-xl px-3 py-3
        text-left text-sm font-medium transition-colors
        disabled:cursor-not-allowed disabled:opacity-40
        ${
          destructive
            ? "text-rose-600 hover:bg-rose-50"
            : "text-slate-700 hover:bg-slate-50"
        }
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
}