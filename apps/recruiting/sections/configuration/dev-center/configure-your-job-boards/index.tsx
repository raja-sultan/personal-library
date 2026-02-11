import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { CustomBreadCrumbs } from "common";
import React from "react";
import { breadcrumbs } from "./data";
import { useGetJobBoardsQuery } from "@services/configuration/job-boards/job-boards-api";

export function ConfigureYourJobBoardsSec(): React.JSX.Element {
  //Job Boards GET List API
  const { data, isLoading } = useGetJobBoardsQuery({});

  return (
    <>
      <Box sx={{ a: { color: "text.primary" } }}>
        <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "start", sm: "space-between" },
          alignItems: "center",
          my: 3,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography variant="h6">Configuring Your Job Boards</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "rgba(247, 144, 9, 0.08)",
          p: 1.5,
          borderRadius: "8px",
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "warning.main" }}>
          HOW TO CONFIGURE YOUR JOB BOARD
        </Typography>
      </Box>

      <Grid container sx={{ my: 1 }} spacing={2}>
        {data?.data?.map(
          (item) =>
            item.type === "internal" && (
              <Grid item xs={12} sm={6} key={item._id}>
                {isLoading ? (
                  <Skeleton variant="rectangular" width={210} height={40} />
                ) : (
                  <>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Internal Job Board URL
                    </Typography>
                    <Button
                      sx={{ p: 0 }}
                      onClick={() => {
                        window.open(`/careers?companyName=${item?.name}`);
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        {`careers?companyName=${item?.name}`}
                      </Typography>
                    </Button>
                  </>
                )}
              </Grid>
            )
        )}

        {/* External Job Posts */}
        {data?.data?.slice(0, 2)?.map(
          (item) =>
            item.type === "external" && (
              <Grid item xs={12} sm={6} key={item._id}>
                {isLoading ? (
                  <Skeleton variant="rectangular" width={210} height={40} />
                ) : (
                  <>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      External Job Posts URL
                    </Typography>
                    <Button
                      sx={{ p: 0 }}
                      onClick={() => {
                        window.open(
                          `/configuration/job-boards/job-posts?jobBoardId=${item._id}`
                        );
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        configuration/job-boards/job-posts
                      </Typography>
                    </Button>
                  </>
                )}
              </Grid>
            )
        )}
      </Grid>
    </>
  );
}
