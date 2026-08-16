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
console.log("Before user")
  if (!response.ok) {
    return null;
  }
  const result = await response.json();
  console.log("After user",result)
  return result.data;
};
