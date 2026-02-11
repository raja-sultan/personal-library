import React from "react";
import { Box, Grid, Stack, Typography, Paper } from "@mui/material";
import dayjs from "dayjs";

function RowComponent(props: any): JSX.Element {
  const { feedType, createdBy, content, jobName, createdAt } = props;

  return (
    <Grid container>
      <Grid xs={8} pr={0.4} py={0.5} item>
        <Paper
          variant="elevation"
          sx={{
            p: 1,
            borderRadius: 0.5,
            Height: "100%",
          }}
          elevation={2}
        >
          <Stack>
            <Typography variant="body2" fontWeight={600} color="neutral.700">
              {feedType}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.5}>
              <Typography variant="subtitle2" color="primary.main">
                {createdBy}{" "}
                <Box component="span" color="neutral.500">
                  {content}
                </Box>{" "}
                {jobName}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid xs={4} py={0.5} item>
        <Paper
          variant="elevation"
          elevation={2}
          sx={{
            p: 1,
            borderRadius: 0.5,
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box px={1} py={1.2}>
            <Typography variant="subtitle2" color="neutral.500">
              {dayjs(new Date(createdAt)).format("MMMM DD, YYYY hh:mm A")}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default RowComponent;
