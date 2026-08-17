"use client";

import { StoredFileType } from "@/types/file";
import {
  Archive,
  FileText,
  Loader2,
  Video,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface FilePreviewContentProps {
  url: string;
  name: string;
  type: StoredFileType;
}

const IMAGE_TYPES: StoredFileType[] = [
  "JPG",
  "JPEG",
  "PNG",
  "WEBP",
  "AVIF",
  "GIF",
  "SVG",
  "BMP",
  "TIFF",
  "ICO",
  "HEIC",
  "HEIF",
];

const VIDEO_TYPES: StoredFileType[] = [
  "MP4",
  "WEBM",
  "MOV",
  "AVI",
  "MKV",
  "M4V",
  "MPEG",
  "MPG",
  "3GP",
  "3G2",
  "FLV",
  "WMV",
  "TS",
  "M2TS",
  "MTS",
  "OGV",
];

const BROWSER_PREVIEWABLE_VIDEO_TYPES: StoredFileType[] = [
  "MP4",
  "WEBM",
  "MOV",
  "M4V",
  "OGV",
];

const AUDIO_TYPES: StoredFileType[] = [
  "MP3",
  "WAV",
  "OGG",
  "M4A",
  "AAC",
  "FLAC",
  "OPUS",
  "WMA",
  "AMR",
];

const BROWSER_PREVIEWABLE_AUDIO_TYPES: StoredFileType[] = [
  "MP3",
  "WAV",
  "OGG",
  "M4A",
  "AAC",
  "FLAC",
  "OPUS",
];

const ARCHIVE_TYPES: StoredFileType[] = [
  "ZIP",
  "RAR",
  "7Z",
  "TAR",
  "GZ",
  "BZ2",
];

export const FilePreviewContent = ({
  url,
  name,
  type,
}: FilePreviewContentProps) => {
  const isImage = IMAGE_TYPES.includes(type);
  const isVideo = VIDEO_TYPES.includes(type);
  const isPreviewableVideo =
    BROWSER_PREVIEWABLE_VIDEO_TYPES.includes(type);

  const isAudio = AUDIO_TYPES.includes(type);
  const isPreviewableAudio =
    BROWSER_PREVIEWABLE_AUDIO_TYPES.includes(type);

  const isArchive = ARCHIVE_TYPES.includes(type);

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

  if (isVideo && isPreviewableVideo) {
    return <VideoPreview url={url} name={name} type={type} />;
  }

  if (isVideo) {
    return (
      <UnsupportedVideoPreview
        name={name}
        type={type}
      />
    );
  }

  if (isAudio && isPreviewableAudio) {
    return (
      <div className="flex w-full flex-col items-center justify-center px-6 py-10">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
          <Volume2 size={30} />
        </div>

        <p className="mb-5 max-w-md truncate text-sm font-medium text-slate-700">
          {name}
        </p>

        <audio
          src={url}
          controls
          preload="metadata"
          className="w-full max-w-xl"
        >
          Your browser does not support audio playback.
        </audio>
      </div>
    );
  }

  if (isAudio) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <Volume2 size={42} className="mb-4 text-slate-400" />

        <h3 className="text-base font-semibold text-slate-800">
          Audio preview unavailable
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {type} audio files are supported for storage, but your browser may
          not be able to play this format directly.
        </p>
      </div>
    );
  }

  if (isPDF) {
    return (
      <iframe
        src={url}
        title={name}
        className="h-[70vh] w-full border-0"
      />
    );
  }

  if (isCSV) {
    return <CSVPreview url={url} />;
  }

  if (isText) {
    return <TextPreview url={url} />;
  }

  if (isArchive) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <Archive size={32} />
        </div>

        <h3 className="text-base font-semibold text-slate-800">
          Archive cannot be previewed
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {type} archives cannot be opened directly in the browser. Download
          the file to view its contents.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-16 text-center text-slate-500">
      <FileText size={40} className="mx-auto mb-3" />

      <p className="font-medium">Preview not available</p>

      <p className="mt-1 text-sm text-slate-400">
        This file type cannot be previewed in the browser.
      </p>
    </div>
  );
};

interface VideoPreviewProps {
  url: string;
  name: string;
  type: StoredFileType;
}

const VideoPreview = ({
  url,
  name,
  type,
}: VideoPreviewProps) => {
  const [loading, setLoading] = useState(true);
  const [playbackError, setPlaybackError] = useState(false);

  if (playbackError) {
    return (
      <UnsupportedVideoPreview
        name={name}
        type={type}
        playbackFailed
      />
    );
  }

  return (
    <div className="relative flex w-full items-center justify-center bg-black">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <Loader2
            size={32}
            className="animate-spin text-white"
          />
        </div>
      )}

      <video
        src={url}
        controls
        preload="metadata"
        playsInline
        onLoadedMetadata={() => setLoading(false)}
        onCanPlay={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setPlaybackError(true);
        }}
        className="max-h-[75vh] w-full object-contain"
      >
        Your browser does not support video playback.
      </video>
    </div>
  );
};

interface UnsupportedVideoPreviewProps {
  name: string;
  type: StoredFileType;
  playbackFailed?: boolean;
}

const UnsupportedVideoPreview = ({
  name,
  type,
  playbackFailed = false,
}: UnsupportedVideoPreviewProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
        <Video size={32} />
      </div>

      <h3 className="text-base font-semibold text-slate-800">
        Video preview unavailable
      </h3>

      <p className="mt-2 max-w-md break-all text-sm font-medium text-slate-600">
        {name}
      </p>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {playbackFailed
          ? `Your browser could not play this ${type} video. The codec used inside the file may not be supported.`
          : `${type} videos can be stored, but this format is not reliably supported for browser playback.`}
      </p>
    </div>
  );
};

const TextPreview = ({ url }: { url: string }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadText = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to load text file");
        }

        const text = await response.text();

        setContent(text);
      } catch {
        setError("Unable to preview text file.");
      } finally {
        setLoading(false);
      }
    };

    void loadText();
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2
          className="animate-spin text-[#215c45]"
          size={28}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-16 text-center text-slate-500">
        <FileText size={40} className="mx-auto mb-3" />

        <p className="font-medium">Text preview unavailable</p>

        <p className="mt-1 text-sm text-slate-400">
          {error}
        </p>
      </div>
    );
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
          className="animate-spin text-[#215c45]"
          size={28}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-16 text-center text-slate-500">
        <FileText size={40} className="mx-auto mb-3" />

        <p className="font-medium">
          CSV preview unavailable
        </p>

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

        <p className="font-medium">
          CSV file is empty
        </p>
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