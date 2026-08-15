import { Router } from "express";
import { getPublicFile } from "../controllers/file.controller.js";

const router = Router();

router.get("/files/:id", getPublicFile);

export default router;
