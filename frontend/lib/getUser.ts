import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  try {
    const cookieStore = await cookies();

    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      throw new Error("BACKEND_URL is not configured");
    }

    const response = await fetch(
      `${backendUrl}/api/v1/auth/me`,
      {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("getCurrentUser failed:", error);
    return null;
  }
};