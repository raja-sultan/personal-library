module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ig-s3-public-dev-001.s3.eu-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["ig-s3-public-dev-001.s3.eu-west-2.amazonaws.com"],
  },
  reactStrictMode: true,
  transpilePackages: ["common"],
  env: {
    BASE_URL: "https://gateway-dev.personnellibrary.co.uk/",
  },
  webpack: (config, { isServer }) => {
    // Exclude .node files from being processed by Webpack
    config.module.rules.push({
      test: /\.node$/,
      use: "ignore-loader", // or 'null-loader' depending on your webpack version
    });

    // Important: return the modified config
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: true,
      },
    ];
  },
};
