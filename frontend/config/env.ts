const requiredEnvs = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
} as const;

export const validateEnv = () => {
  const missing = Object.entries(requiredEnvs)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `Missing environment variables: ${missing.join(", ")}`,
      );
    }

    console.error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
};

validateEnv();

export const env = {
  apiBaseUrl:
    requiredEnvs.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api/v1",
};