import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sin esto Turbopack sube buscando lockfiles y encuentra el de ~/.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
