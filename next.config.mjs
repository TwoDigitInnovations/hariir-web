/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dwict4lwy/**", // allow all images under your Cloudinary folder
      },
    ],
  },
};

export default nextConfig;
