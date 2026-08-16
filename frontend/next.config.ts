import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL;
console.log()
if (!backendUrl) {
  throw new Error("BACKEND_URL environment variable is not defined");
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;