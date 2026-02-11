import { Typography, Box } from "@mui/material";
import React from "react";

export function JobSetupCard(): JSX.Element {
  return (
    <Box>
      <Typography mb={1} variant="body1" fontWeight={700}>
        Job Setup
      </Typography>
      {pipelineData.map((data) => (
        <Box
          display="flex"
          justifyContent="space-between"
          py={0.7}
          key={data.id}
          alignItems="center"
        >
          <Typography fontWeight={600} variant="subtitle2">
            {data.title}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {data.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

const pipelineData = [
  {
    id: 1,
    title: "Needs Decision",
    value: 1,
  },
  {
    id: 2,
    title: "Forms To Send",
    value: 2,
  },
  {
    id: 3,
    title: "Candidates to Schedule",
    value: 4,
  },
  {
    id: 4,
    title: "Take Home Test to Send",
    value: 8,
  },
  {
    id: 5,
    title: "Offers",
    value: 3,
  },
  {
    id: 6,
    title: "Kickoff Form Tasks",
    value: 4,
  },
];
