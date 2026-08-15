"use client";

import { Trash2, X } from "lucide-react";

interface DeleteModalProps {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onDelete: () => void | Promise<void>;
  onClose: () => void;
}

export const DeleteModal = ({
  open,
  title = "Delete item?",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  loading = false,
  onDelete,
  onClose,
}: DeleteModalProps) => {
  if (!open) return null;

  return (
    <div
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
      className="fixed inset-0 z-70 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-600">
            <Trash2 size={21} />
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};