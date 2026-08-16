import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { validationMiddleware } from "../middleware/validation.middleware.js";

import {
  completeUploaded,
  createUploadUrl,
  deleteFile,
  downloadFile,
  getFile,
  getFiles,
  updateImportantFile,
  updateFileVisibility,
} from "../controllers/file.controller.js";

import {
  createUploadUrlSchema,
  fileIdSchema,
  updateFileVisibilitySchema,
  updateImportantFileSchema,
} from "../validators/file.schema.js";

const router = Router();

router.use(protect);

router.post(
  "/upload-url",
  validationMiddleware(createUploadUrlSchema),
  createUploadUrl,
);

router.get("/", getFiles);

router.get("/:id", validationMiddleware(fileIdSchema, "params"), getFile);

router.patch(
  "/:id/visibility",
  validationMiddleware(fileIdSchema, "params"),
  validationMiddleware(updateFileVisibilitySchema),
  updateFileVisibility,
);

router.patch(
  "/:id/important",
  validationMiddleware(fileIdSchema, "params"),
  validationMiddleware(updateImportantFileSchema),
  updateImportantFile,
);

router.delete("/:id", validationMiddleware(fileIdSchema, "params"), deleteFile);

router.post(
  "/:id/complete",
  validationMiddleware(fileIdSchema, "params"),
  completeUploaded,
);

router.get(
  "/:id/download",
  validationMiddleware(fileIdSchema, "params"),
  downloadFile,
);

export default router;
