import { Box, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { createJob } from "./create-job.data";
import { styles } from "./create-job.styles";

export function JobTypesSection(): JSX.Element {
  return (
    <Card sx={styles.mainCardStyling}>
      <Box sx={styles.textWrapper}>
        <Typography variant="h6" sx={styles.topText}>
          Create a Job
        </Typography>
        <Typography variant="subtitle1" sx={styles.topSubText}>
          Choose a starting point
        </Typography>
      </Box>
      <CardContent sx={styles.mainCardContent}>
        {createJob.map((item) => (
          <Card key={item.id} sx={styles.mappedCardStyling}>
            <Link href={item.route} style={{ textDecoration: "none" }}>
              <CardContent sx={styles.mappedCardContent}>
                <Box>{item.icon}</Box>
                <Box>
                  <Typography variant="h6" sx={styles.cardTitle}>
                    {item.title}
                  </Typography>
                  <Typography variant="subtitle2" sx={styles.cardDescription}>
                    {item.description}
                  </Typography>
                </Box>
              </CardContent>
            </Link>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
