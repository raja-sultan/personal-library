import { HeadingSecBgImg1, HeadingSecImg1 } from "@assets/dashboard";

export const cardsData = [
  {
    id: 1,
    heading: "Manage Admin",
    activeUsers: 2,
    inActiveUsers: 32,
    isCompanyCard: false,
    HeadingIcon: (
      <HeadingSecBgImg1
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
          fontSize: "9rem",
          opacity: "0.2",
        }}
      />
    ),
    BgIcon: (
      <HeadingSecImg1 sx={{ color: "primary.main", fontSize: "4.5rem" }} />
    ),
    navigationLink: "/user-management",
  },
  {
    id: 2,
    heading: "Manage Company",
    activeUsers: 2,
    inActiveUsers: 322,
    isCompanyCard: true,
    HeadingIcon: (
      <HeadingSecBgImg1
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
          fontSize: "9rem",
          opacity: "0.2",
        }}
      />
    ),
    BgIcon: (
      <HeadingSecImg1 sx={{ color: "primary.main", fontSize: "4.5rem" }} />
    ),
    navigationLink: "/company-management",
  },
];
