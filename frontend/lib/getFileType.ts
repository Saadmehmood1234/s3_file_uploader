import { StoredFileType } from "@/types/file";

export const getFileType = (mimeType: string): StoredFileType => {
  const types: Record<string, StoredFileType> = {
    "application/pdf": "PDF",
    "text/plain": "TXT",
    "application/zip": "ZIP",
    "application/x-zip-compressed": "ZIP",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "image/webp": "WEBP",
    "image/gif": "GIF",
    "audio/mpeg": "MP3",
    "audio/wav": "WAV",
    "audio/ogg": "OGG",
    "audio/mp4": "M4A",
    "text/csv": "CSV",
    "video/mp4": "MP4",
    "video/webm": "WEBM",
    "video/quicktime": "MOV",
    "video/x-msvideo": "AVI",
  };

  return types[mimeType] ?? "TXT";
};
