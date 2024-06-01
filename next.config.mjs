/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,   
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com", "aiartshop.com", "th.bing.com", "i.ibb.co", "img-cdn.pixlr.com"],
  },
};

export default nextConfig;
