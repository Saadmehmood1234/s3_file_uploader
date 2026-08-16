import express from "express";
import cors from "cors";
import pool from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import publicFileRoutes from "./routes/public.routes.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware.js";
const app = express();
app.set("trust proxy", 1);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://s3-file-uploader-fl7k-one.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/files", fileRoutes);
app.use("/api/v1/public", publicFileRoutes);

app.use(errorMiddleware);

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "server is running",
  });
});

app.get("/api/v1/db-health", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({
      success: true,
      message: "PostgreSQL connected",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default app;
