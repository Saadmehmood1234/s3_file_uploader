import "dotenv/config";

const requiredEnvVariables = [
  "DATABASE_URL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "FRONTEND_URL",
  "RESEND_API_KEY",
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_S3_BUCKET"
] as const;
for (const key of requiredEnvVariables) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  PORT: Number(process.env.PORT) || 5000,

  NODE_ENV: process.env.NODE_ENV || "development",

  DATABASE_URL: process.env.DATABASE_URL as string,

  JWT_SECRET: process.env.JWT_SECRET as string,

  WT_EXPIRES_IN: process.env.WT_EXPIRES_IN || "1h",

  FRONTEND_URL: process.env.FRONTEND_URL as string,

  RESEND_API_KEY: process.env.RESEND_API_KEY as string,

  EMAIL_FROM: process.env.EMAIL_FROM as string,

  AWS_REGION: process.env.AWS_REGION as string,

  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID as string,

  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,

  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET as string,
} as const;
