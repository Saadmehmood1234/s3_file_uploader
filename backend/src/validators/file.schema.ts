import { boolean, z } from "zod";

export const FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/mp4",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
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

export const updateFavoriteFileSchema = z.object({
  favorite: z.boolean(),
});

export const fileIdSchema = z.object({
  id: z.uuid("Invalid file ID"),
});
