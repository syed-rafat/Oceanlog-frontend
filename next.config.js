/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // For now adding local db
    // BACKEND_URL: "https://oclogbackend.azurewebsites.net/content/",
    // BACKEND_ROOT: "https://oclogbackend.azurewebsites.net",
    BACKEND_ROOT: "http://localhost:8000",
    BACKEND_URL: "http://localhost:8000/content/",
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
