/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    runtime: 'experimental-edge',
    serverActions: {
      allowedOrigins: ["app.localhost:8888", "app.localhost:8888", "app.localhost:3000", "app.localhost:3000"],
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: "public.blob.vercel-storage.com" },
      { hostname: "*.public.blob.vercel-storage.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "abs.twimg.com" },
      { hostname: "pbs.twimg.com" },
      { hostname: "avatar.vercel.sh" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "www.google.com" },
      { hostname: "flag.vercel.app" },
      { hostname: "illustrations.popsy.co" },
      { hostname: "lh3.googleusercontent.com"},
      { hostname: "lh3.googleusercontent.com"},
    ]
  },
};
