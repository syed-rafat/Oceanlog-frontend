/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: "http://oclogbackend.azurewebsites.net/content/",
    BACKEND_ROOT: "http://oclogbackend.azurewebsites.net",
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
