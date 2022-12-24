/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: "https://oclogbackend.azurewebsites.net/content/",
    BACKEND_ROOT: "https://oclogbackend.azurewebsites.net",
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
