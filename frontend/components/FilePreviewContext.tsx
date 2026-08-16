"use client";

import { StoredFileType } from "@/types/file";
import { Archive, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface FilePreviewContentProps {
  url: string;
  name: string;
  type: StoredFileType;
}

export const FilePreviewContent = ({
  url,
  name,
  type,
}: FilePreviewContentProps) => {
  const isImage = ["JPG", "JPEG", "PNG", "WEBP", "GIF"].includes(type);
  const isVideo = ["MP4", "WEBM", "MOV", "AVI"].includes(type);
  const isAudio = ["MP3", "WAV", "OGG", "M4A"].includes(type);
  const isZip = type === "ZIP";
  const isPDF = type === "PDF";
  const isCSV = type === "CSV";
  const isText = type === "TXT";

  if (isImage) {
    return (
      <img
        src={url}
        alt={name}
        className="max-h-[75vh] max-w-full object-contain"
      />
    );
  }

  if (isVideo) {
    return (
      <video src={url} controls className="max-h-[75vh] w-full bg-black">
        Your browser does not support video playback.
      </video>
    );
  }

  if (isAudio) {
    return (
      <div className="w-full max-w-lg px-6">
        <audio src={url} controls className="w-full">
          Your browser does not support audio playback.
        </audio>
      </div>
    );
  }

  if (isPDF) {
    return (
      <iframe src={url} title={name} className="h-[70vh] w-full border-0" />
    );
  }
  if (isCSV) {
    return <CSVPreview url={url} />;
  }

  if (isText) {
    return <TextPreview url={url} />;
  }
  if (isZip) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <Archive size={32} />
        </div>

        <h3 className="text-base font-semibold text-slate-800">
          ZIP file cannot be previewed
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          ZIP archives cannot be opened directly in the browser. Download the
          file to view its contents.
        </p>
      </div>
    );
  }
  return (
    <div className="text-center text-slate-500">
      <FileText size={40} className="mx-auto mb-3" />

      <p className="font-medium">Preview not available</p>

      <p className="mt-1 text-sm text-slate-400">
        This file type cannot be previewed in the browser.
      </p>
    </div>
  );
};

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

    void loadText();
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


const CSVPreview = ({ url }: { url: string }) => {
  const [rows, setRows] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCSV = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to load CSV");
        }

        const text = await response.text();

        const parsedRows = text
          .trim()
          .split(/\r?\n/)
          .map((row) =>
            row.split(",").map((cell) => cell.trim()),
          );

        setRows(parsedRows);
      } catch {
        setError("Unable to preview CSV file.");
      } finally {
        setLoading(false);
      }
    };

    void loadCSV();
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2
          className="animate-spin text-indigo-600"
          size={28}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-16 text-center text-slate-500">
        <FileText size={40} className="mx-auto mb-3" />

        <p className="font-medium">CSV preview unavailable</p>

        <p className="mt-1 text-sm text-slate-400">
          {error}
        </p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="px-6 py-16 text-center text-slate-500">
        <FileText size={40} className="mx-auto mb-3" />
        <p className="font-medium">CSV file is empty</p>
      </div>
    );
  }

  const [headers, ...data] = rows;

  return (
    <div className="max-h-[70vh] w-full overflow-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="sticky top-0 z-10 bg-slate-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="whitespace-nowrap border-b border-r border-slate-200 px-4 py-3 font-semibold text-slate-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition hover:bg-slate-50"
            >
              {headers.map((_, columnIndex) => (
                <td
                  key={columnIndex}
                  className="whitespace-nowrap border-b border-r border-slate-100 px-4 py-3 text-slate-600"
                >
                  {row[columnIndex] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};