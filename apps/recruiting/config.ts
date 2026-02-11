export const enableDevTools =
  process.env.NEXT_PUBLIC_ENABLE_REDUX_DEV_TOOLS === "true";

// API
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_BASE_URL;
// URL

export const ssoAdminUrl = process.env.NEXT_PUBLIC_SSO_ADMIN_URL
  ? process.env.NEXT_PUBLIC_SSO_ADMIN_URL
  : "http://localhost:3000";
export const recruitingUrl = process.env.NEXT_PUBLIC_RECRUITING_URL
  ? process.env.NEXT_PUBLIC_RECRUITING_URL
  : "http://localhost:3002";
export const onBoardingUrl = process.env.NEXT_PUBLIC_ON_BOARDING_URL
  ? process.env.NEXT_PUBLIC_ON_BOARDING_URL
  : "http://localhost:3003";
export const performanceUrl = process.env.NEXT_PUBLIC_PERFORMANCE_URL
  ? process.env.NEXT_PUBLIC_PERFORMANCE_URL
  : "http://localhost:3001";
