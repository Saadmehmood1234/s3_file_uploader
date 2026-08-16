import { StoredFileType } from "@/types/file";

export const getFileType = (mimeType: string): StoredFileType => {
  const types: Record<string, StoredFileType> = {
    "application/pdf": "PDF",
    "text/plain": "TXT",
    "text/csv": "CSV",
    "application/json": "JSON",
    "application/xml": "XML",
    "text/xml": "XML",
    "text/markdown": "MD",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    "application/vnd.ms-powerpoint": "PPT",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PPTX",
    "application/zip": "ZIP",
    "application/x-zip-compressed": "ZIP",
    "application/x-rar-compressed": "RAR",
    "application/vnd.rar": "RAR",
    "application/x-7z-compressed": "7Z",
    "application/x-tar": "TAR",
    "application/gzip": "GZ",
    "application/x-gzip": "GZ",
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "image/webp": "WEBP",
    "image/avif": "AVIF",
    "image/gif": "GIF",
    "image/svg+xml": "SVG",
    "image/bmp": "BMP",
    "image/tiff": "TIFF",
    "image/x-icon": "ICO",
    "image/vnd.microsoft.icon": "ICO",
    "audio/mpeg": "MP3",
    "audio/wav": "WAV",
    "audio/x-wav": "WAV",
    "audio/ogg": "OGG",
    "audio/mp4": "M4A",
    "audio/x-m4a": "M4A",
    "audio/aac": "AAC",
    "audio/flac": "FLAC",
    "video/mp4": "MP4",
    "video/webm": "WEBM",
    "video/quicktime": "MOV",
    "video/x-msvideo": "AVI",
    "video/x-matroska": "MKV",
  };

  return types[mimeType.toLowerCase()] ?? "OTHER";
};