import {
  Grid,
  Typography,
  Paper,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { CustomBreadCrumbs } from "common";
import React, { useState } from "react";
import ReportCard from "./report-card";
import { useGetOverviewSavedReportQuery } from "@services/reports/overview/overview-report-api";

export default function SavedReports(): React.JSX.Element {
  const [params, setParams] = useState(0);
  const breadcrumbs = [
    { key: "1", value: "Home", link: "/dashboard" },
    { key: "2", value: "Reports", link: "/reports" },
    { key: "3", value: "Saved Reports", link: "" },
  ];

  const { data, isLoading } = useGetOverviewSavedReportQuery({
    params: {
      offset: params,
      limit: 10,
    },
  });

  return (
    <Paper variant="elevation" elevation={1}>
      <Box p={2} sx={{ a: { color: "text.primary" } }}>
        <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
        <Typography variant="h5" sx={{ my: 2 }}>
          Saved Reports
        </Typography>
        <Grid
          container
          sx={{ bgcolor: "background.default", p: 2, borderRadius: 1 }}
        >
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              Name
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              Saved
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            maxHeight: "50vh",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "10px",
            },
            pr: 2,
            mt: 2,
          }}
        >
          <ReportCard
            isLoading={isLoading}
            ReportCardData={data?.data?.report}
          />
        </Box>
        <Box display="flex" mt={1}>
          <Box ml="auto">
            <Pagination
              sx={(theme: any) => ({
                ".Mui-selected": {
                  backgroundColor: `${theme.palette.primary.main} !important`,
                  color: "#FFFFFF",
                },
              })}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: () => <>Previous</>,
                    next: () => <>Next</>,
                  }}
                  {...item}
                />
              )}
              size="small"
              variant="outlined"
              shape="rounded"
              count={data?.meta?.pages}
              page={data?.meta?.page}
              onChange={(e, page) => {
                setParams((page - 1) * 10);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
