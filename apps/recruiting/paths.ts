export const paths = {
  index: "/",
  checkout: "/checkout",
  contact: "/contact",
  pricing: "/pricing",
  auth: {
    jwt: {
      login: "/sign-in",
      register: "/auth/jwt/register",
    },
    slack: {
      login: "/auth/slack/login",
      register: "/auth/slack/register",
    },
  },
  dashboard: {
    index: "/dashboard",
    jobs: {
      index: "/dashboard/jobs",
      create: "/dashboard/jobs/create",
      companies: {
        details: "/dashboard/jobs/companies/:companyId",
      },
    },
    social: {
      index: "/dashboard/social",
      profile: "/dashboard/social/profile",
      feed: "/dashboard/social/feed",
    },
  },
  components: {
    index: "/components",
    dataDisplay: {
      detailLists: "/components/data-display/detail-lists",
      tables: "/components/data-display/tables",
      quickStats: "/components/data-display/quick-stats",
    },
    forms: "/components/forms",
  },
  notAuthorized: "/errors/401",
  notFound: "/errors/404",
  serverError: "/errors/500",
};
