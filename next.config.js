const nextConfig = {
  images: {
    domains: [
      'cdn3.iconfinder.com',
      'www.figma.com',
      'www.freeiconspng.com',
      'pentillo-dev.s3.amazonaws.com',
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin allow-popups",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
