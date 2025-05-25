import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: isProd ? "/<REPO_NAME>" : "",
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
