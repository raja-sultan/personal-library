import React from "react";
import { BriefcaseIcon } from "@assets/icons/briefcase-icon";
// import { HeadIcon } from "@assets/icons/head-icon";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";

const HelpfulLinksData = [
  {
    id: 1,
    image: <BriefcaseIcon sx={{ height: "28px", width: "28px" }} />,
    title: "Wondering what roles are open at your company?",
    description: "View Internal Jobs",
    link: "/configuration/job-boards",
  },
  // {
  //   id: 2,
  //   image: <HeadIcon sx={{ height: "28px", width: "28px" }} />,
  //   title: "Question about jobs or permissions?",
  //   description: "Email your In-house contacts",
  //   link: "",
  // },
];

export function HelpfulLinks(): React.JSX.Element {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Typography variant="h6">Helpful Links</Typography>
      {HelpfulLinksData.map((item: any) => {
        return (
          <Box
            key={item?.id}
            sx={{
              display: "flex",
              py: 1,
              borderBottom: "1px solid #EAECF0",
              "&:last-child": { borderBottom: "0" },
            }}
          >
            <Box sx={{ mr: 1 }}>
              <IconButton sx={{ p: 0 }}>{item?.image}</IconButton>
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item?.title}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                <Link href={item?.link}>{item?.description}</Link>
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
