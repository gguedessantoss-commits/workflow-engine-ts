import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const appDirectory = fileURLToPath(new URL("./", import.meta.url));
const workspaceRoot = path.resolve(appDirectory, "../..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  transpilePackages: ["@workflow-engine/core", "@workflow-engine/ui"],
  turbopack: {
    root: workspaceRoot,
  },
  typedRoutes: true,
};

export default nextConfig;
