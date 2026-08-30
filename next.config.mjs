/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/api/check-eligibility": ["./data/**/*.csv"],
  },
};

export default nextConfig;