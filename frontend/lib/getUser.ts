import { env } from "@/config/env";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const response = await fetch(`${env.apiBaseUrl}/auth/me`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    return null;
  }
  const result = await response.json();
  return result.data;
};
