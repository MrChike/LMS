/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "utfs.io",
      "dev-to-uploads.s3.amazonaws.com"
    ]
  },
}

module.exports = nextConfig
