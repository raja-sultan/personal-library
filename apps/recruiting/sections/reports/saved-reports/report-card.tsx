import { Box, Grid, Typography } from "@mui/material";
import { IsFetching } from "common";
import dayjs from "dayjs";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
function ReportCard({ ReportCardData, isLoading }): React.JSX.Element {
  if (isLoading) {
    return <IsFetching isFetching />;
  }
  return (
    <Box>
      {ReportCardData.map((item: any) => {
        const date = dayjs(item?.createdAt).fromNow();
        return (
          <Grid
            key={item.id}
            container
            sx={{
              bgcolor: "background.default",
              p: 1,
              borderRadius: 1,
              my: 1,
              alignItems: "center",
            }}
          >
            <Grid item xs={6}>
              <Typography
                variant="body2"
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                {item?.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "text.main" }}>
                {item?.reportType}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: "text.main" }}>
                {`${date} `}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
}

export default ReportCard;
