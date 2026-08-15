import { StoredFileType } from "@/types/file";
import {
  File,
  FileArchive,
  FileAudio,
  FileImage,
  FileText,
  Film,
} from "lucide-react";


export const FileBadge=({ type }: { type: StoredFileType })=> {
  const isImage = ["JPG", "JPEG", "PNG", "WEBP", "GIF"].includes(type);
  const isVideo = ["MP4", "WEBM", "MOV", "AVI"].includes(type);
  const isAudio = ["MP3", "WAV", "OGG", "M4A"].includes(type);

  const Icon = isImage
    ? FileImage
    : isVideo
      ? Film
      : isAudio
        ? FileAudio
        : type === "ZIP"
          ? FileArchive
          : type === "PDF" || type === "TXT"
            ? FileText
            : File;

  const colors = isImage
    ? "bg-sky-50 text-sky-600"
    : isVideo
      ? "bg-violet-50 text-violet-600"
      : isAudio
        ? "bg-emerald-50 text-emerald-600"
        : type === "PDF"
          ? "bg-rose-50 text-rose-500"
          : type === "ZIP"
            ? "bg-orange-50 text-orange-600"
            : "bg-amber-50 text-amber-600";

  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors}`}
    >
      <Icon size={19} />
    </span>
  );
}