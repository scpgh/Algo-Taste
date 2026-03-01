/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false, // defaults to true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      // TODO: Add your production Strapi domain after deploying backend
      // {
      //   protocol: "https",
      //   hostname: "your-app.onrender.com",
      // },
    ],
  },
};

export default nextConfig;
