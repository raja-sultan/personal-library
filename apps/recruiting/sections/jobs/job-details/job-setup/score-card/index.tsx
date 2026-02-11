import { Box, Typography } from "@mui/material";
import { ScoreCardSection } from "@sections/jobs/score-card";
import React from "react";
import { FocusAttributes } from "./focus-attributes";
import { JobDetailsHeader } from "../../job-details-header";

export function JobSetUpScoreCard(): JSX.Element {
  return (
    <Box>
      <JobDetailsHeader mainTitle="Scorecard" />
      <Typography
        variant="body1"
        sx={{ mb: 0.3, fontWeight: 600, mt: 2, px: 0.5 }}
      >
        Candidate Scorecard
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 500, color: "text.secondary", px: 0.5, mb: 1.5 }}
      >
        Determine which attributes will be used to assess the candidates and in
        which stages it is most crucial.
      </Typography>
      {/* ScoreCard Component */}
      <ScoreCardSection
        nextStepHandler={undefined}
        previousStepHandler={undefined}
        editButtons={false}
        title
      />
      {/* Focus Attributes Component */}
      <FocusAttributes />
    </Box>
  );
}
