module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pl-s3-public-dev-001.s3.eu-west-2.amazonaws.com/",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pl-stg.s3.eu-west-2.amazonaws.com/",
        port: "",
        pathname: "/**",
      },
    ],
    domains: [
      "ig-s3-public-dev-001.s3.eu-west-2.amazonaws.com",
      "pl-s3-public-dev-001.s3.eu-west-2.amazonaws.com",
      "pl-dev-001.s3.eu-west-2.amazonaws.com",
      "pl-stg.s3.eu-west-2.amazonaws.com"
    ],
  },
  reactStrictMode: true,
  transpilePackages: ["common"],
  env: {
    BASE_URL: "https://gateway-dev.personnellibrary.co.uk/",
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
