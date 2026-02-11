import { Box, Typography } from "@mui/material";
import React from "react";
import { applicationHistory } from "./application-history.data";

export function ApplicationHistory(): JSX.Element {
  return (
    <>
      {applicationHistory.map((item) => (
        <Box key={item.id} sx={{ mt: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ color: "primary.main", fontWeight: 600 }}
          >
            {item.title}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" sx={styles.keyValues}>
              <Typography
                variant="body2"
                component="span"
                sx={styles.keyTitles}
              >
                Applied: {""}
              </Typography>
              {item.applied}
            </Typography>
            <Typography variant="body2" sx={styles.keyValues}>
              <Typography
                variant="body2"
                component="span"
                sx={styles.keyTitles}
              >
                Recruiter: {""}
              </Typography>
              {item.recruiter}
            </Typography>
            <Typography variant="body2" sx={styles.keyValues}>
              <Typography
                variant="body2"
                component="span"
                sx={styles.keyTitles}
              >
                Stage: {""}
              </Typography>
              {item.stage}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
}

const styles = {
  keyValues: {
    mt: 0.5,
    color: "text.secondary",
  },
  keyTitles: {
    fontWeight: 600,
  },
};
