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
    domains: [
      `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
    ],
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
