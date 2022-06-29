/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["shmack-app.s3.us-east-2.amazonaws.com"],
  },
};

module.exports = nextConfig;
