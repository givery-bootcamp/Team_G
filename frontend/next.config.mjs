/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dena-training-2024-team7.s3.ap-northeast-1.amazonaws.com"],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
