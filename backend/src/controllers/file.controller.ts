import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import path from "path";
import {
  createFile,
  findOwnedFile,
  findPublicFile,
  getUserFile,
  markFileUpload,
  deleteFileRecord,
  updateImportant,
  updateVisibility,
  renameOwnedFile,
} from "../repositories/file.repository.js";
import { CreateFileProps } from "../utils/types.js";
import {
  deleteS3Object,
  generateDownloadUrl,
  generateUploadUrl,
  verifyObjectExists,
} from "../services/storage.service.js";
import ErrorResponse from "../utils/ApiError.js";
export const createUploadUrl = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const { fileName, mimeType, size } = req.body;
    const extension = path.extname(fileName).toLowerCase();
    const fileId = crypto.randomUUID();
    const storageKey = `users/${userId}/${fileId}${extension}`;
    const file: CreateFileProps = await createFile({
      ownerId: userId ?? "",
      originalName: fileName,
      storageKey,
      mimeType,
      size,
    });
    const uploadUrl = await generateUploadUrl(storageKey, mimeType);
    return res.status(201).json({
      success: true,
      messgae: "uploaded Successfully",
      data: {
        file,
        uploadUrl,
      },
    });
  },
);

export const completeUploaded = asyncHandler(
  async (req: Request, res: Response) => {
    const file = await findOwnedFile(req.params.id as string, req.userId!);
    if (file.status !== "pending") {
      ErrorResponse("FIle has already been processed", 409);
    }
    let metadata;
    try {
      metadata = await verifyObjectExists(file.storage_key);
    } catch {
      ErrorResponse("Uploaded file not found in storage", 400);
    }
    const completedFile = await markFileUpload(file.id);
    return res.status(200).json({
      success: true,
      message: "Upload completed",
      data: completedFile,
    });
  },
);

export const getFiles = asyncHandler(async (req: Request, res: Response) => {
  const file = await getUserFile(req.userId!);
  if (!file) {
    ErrorResponse("File not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "File fetched Successfully",
    data: file,
  });
});

export const getFile = asyncHandler(async (req: Request, res: Response) => {
  const file = await findOwnedFile(req.params.id as string, req.userId!);
  if (!file) {
    ErrorResponse("File not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "File fetched Successfully",
    data: file,
  });
});

export const updateFileVisibility = asyncHandler(
  async (req: Request, res: Response) => {
    const { visibility } = req.body;
    if (!["public", "private"].includes(visibility)) {
      ErrorResponse("Invalid Visibility", 400);
    }
    const file = await updateVisibility(
      req.params.id as string,
      req.userId!,
      visibility,
    );
    if (!file) {
      ErrorResponse("File not found", 404);
    }
    return res.status(200).json({
      success: true,
      message: "File updated successfully",
      data: file,
    });
  },
);

export const updateImportantFile = asyncHandler(
  async (req: Request, res: Response) => {
    const { important } = req.body;
    console.log("important",important)
    const file = await updateImportant(
      req.params.id as string,
      req.userId!,
      important,
    );
    if (!file) {
      ErrorResponse("File not found", 404);
    }
    return res.status(200).json({
      success: true,
      message: "File updated successfully",
      data: file,
    });
  },
);

export const downloadFile = asyncHandler(
  async (req: Request, res: Response) => {
    const file = await findOwnedFile(req.params.id as string, req.userId!);
    if (!file) {
      ErrorResponse("File not found", 404);
    }
    const downloadUrl = await generateDownloadUrl(
      file.storage_key,
      file.original_name,
    );
    return res.status(200).json({
      success: true,
      message: "Download link generated Successfully",
      data: {
        downloadUrl,
        expiredIn: 3000,
      },
    });
  },
);

export const getPublicFile = asyncHandler(
  async (req: Request, res: Response) => {
    const file = await findPublicFile(req.params.id as string);
    if (!file) {
      ErrorResponse("File not found", 404);
    }
    const downloadUrl = await generateDownloadUrl(
      file.storage_key,
      file.original_name,
    );
    return res.status(200).json({
      success: true,
      message: "Download link generated successfully",
      data: {
        id: file.id,
        name: file.original_name,
        mimeType: file.mime_type,
        size: file.size,
        downloadUrl,
      },
    });
  },
);

export const deleteFile = asyncHandler(async (req: Request, res: Response) => {
  const file = await findOwnedFile(req.params.id as string, req.userId!);
  if (!file) {
    ErrorResponse("File not found", 404);
  }
  if (file.status === "uploaded") {
    await deleteS3Object(file.storage_key);
  }
  await deleteFileRecord(file.id, req.userId!);
  return res.status(200).json({
    success: true,
    message: "File deleted successfully",
  });
});


export const renameFile = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const file = await renameOwnedFile(
      req.params.id as string,
      req.userId!,
      name,
    );

    if (!file) {
      ErrorResponse("File not found", 404);
    }

    return res.status(200).json({
      success: true,
      message: "File renamed successfully",
      data: file,
    });
  },
);