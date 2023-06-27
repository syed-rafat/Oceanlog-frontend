/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // For now adding local db
    // BACKEND_URL: "https://oclogbackend.azurewebsites.net/content/",
    // BACKEND_ROOT: "https://oclogbackend.azurewebsites.net",
    BACKEND_ROOT: "https://ocean-log-backend.vercel.app/",
    BACKEND_URL: "https://ocean-log-backend.vercel.app/content/",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'res.cloudinary.com'
    ],
},
}

module.exports = nextConfig