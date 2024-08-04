import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
      },
      {
        protocol: 'https',
        hostname: 'tova-e-cirk-medusa-s3.s3.eu-west-3.amazonaws.com',
      },
    ],
  },
}

export default withPayload(nextConfig)
