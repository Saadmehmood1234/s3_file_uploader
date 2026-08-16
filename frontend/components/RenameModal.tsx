"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

export const RenameModal = ({
  open,
  currentName,
  loading = false,
  onRename,
  onClose,
}: {
  open: boolean;
  currentName: string;
  loading?: boolean;
  onRename: (name: string) => void | Promise<void>;
  onClose: () => void;
}) => {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  if (!open) return null;

  const submit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const value = name.trim();

    if (!value || value === currentName) return;

    await onRename(value);
  };

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Rename file
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#215c45] focus:ring-4 focus:ring-[#215c45]/10"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#215c45] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Renaming..." : "Rename"}
          </button>
        </div>
      </form>
    </div>
  );
};