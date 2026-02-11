"use client";

import React from "react";
import { reportsListViewData } from "./data";
import { Box, Divider, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { CustomBreadCrumbs } from "common";

const breadcrumbs = [
  { key: "1", value: "Home", link: "/dashboard" },
  { key: "2", value: "Reports", link: "/reports" },
  { key: "3", value: "Essential Reports", link: "" },
];

function EssentialReports(): JSX.Element {
  return (
    <Paper
      sx={{
        p: "8px 25px 25px 25px",
        background: "background.default",
      }}
    >
      <Box sx={{ mt: 1.5, a: { color: "text.primary" } }}>
        <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      </Box>
      {reportsListViewData.map((items) => (
        <Box key={items.id}>
          <Typography variant="h6" sx={{ color: "text.primary", mt: 2.5 }}>
            {items.title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ color: "text.secondary", mt: 0.5, mb: 1.5 }}
          >
            {items.description}
          </Typography>
          {items?.list?.map((list) => (
            <React.Fragment key={list.id}>
              <Box
                sx={{
                  py: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Link href={list.route} style={{ textDecoration: "none" }}>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {list.list}
                  </Typography>
                </Link>
                <Box>{list.icon}</Box>
              </Box>
              <Divider />
            </React.Fragment>
          ))}
        </Box>
      ))}
    </Paper>
  );
}

export default EssentialReports;
