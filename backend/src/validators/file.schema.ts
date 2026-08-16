import { z } from "zod";

export const FILE_TYPES = [
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/json",
  "application/xml",
  "text/xml",
  "text/markdown",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
  "image/x-icon",
  "application/zip",
  "application/x-rar-compressed",
  "application/vnd.rar",
  "application/x-7z-compressed",
  "application/x-tar",
  "application/gzip",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/mp4",
  "audio/aac",
  "audio/flac",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
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