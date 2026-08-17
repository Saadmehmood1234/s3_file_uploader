import { z } from "zod";

export const FILE_TYPES = [
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/json",
  "application/xml",
  "text/xml",
  "text/markdown",
  "text/rtf",
  "application/rtf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
  "image/x-icon",
  "image/vnd.microsoft.icon",
  "image/heic",
  "image/heif",
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "application/vnd.rar",
  "application/x-7z-compressed",
  "application/x-tar",
  "application/gzip",
  "application/x-gzip",
  "application/x-bzip2",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
  "audio/ogg",
  "audio/mp4",
  "audio/x-m4a",
  "audio/aac",
  "audio/flac",
  "audio/x-flac",
  "audio/opus",
  "audio/x-ms-wma",
  "audio/amr",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
  "video/avi",
  "video/x-matroska",
  "video/x-m4v",
  "video/m4v",
  "video/mpeg",
  "video/3gpp",
  "video/3gpp2",
  "video/x-flv",
  "video/x-ms-wmv",
  "video/mp2t",
  "video/vnd.dlna.mpeg-tts",
  "video/ogg",
] as const;

const MAX_FILE_SIZE = 400 * 1024 * 1024;

export const createUploadUrlSchema = z.object({
  fileName: z
    .string()
    .trim()
    .min(1, "File name is required")
    .max(255, "File name is too long"),

  mimeType: z.enum(FILE_TYPES, {
    message: "Unsupported file type",
  }),

  size: z
    .number()
    .int()
    .positive("File size must be greater than 0")
    .max(MAX_FILE_SIZE, "File size cannot exceed 400 MB"),
});

export const updateFileVisibilitySchema = z.object({
  visibility: z.enum(["public", "private"]),
});

export const updateImportantFileSchema = z.object({
  important: z.boolean(),
});

export const fileIdSchema = z.object({
  id: z.uuid("Invalid file ID"),
});


export const renameFileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "File name is required")
    .max(255, "File name is too long"),
});