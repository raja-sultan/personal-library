import { Typography, Box } from "@mui/material";
import React from "react";

export function PipelineCard({ pipeline }): JSX.Element {
  const pipelineData = [
    {
      id: 1,
      title: "Needs Decision",
      value: pipeline?.needDecision ?? 0,
    },
    {
      id: 2,
      title: "Forms To Send",
      value: pipeline?.formsToSend ?? 0,
    },
    {
      id: 3,
      title: "Candidates to Schedule",
      value: pipeline?.candidateToSchedule ?? 0,
    },
    {
      id: 4,
      title: "Take Home Test to Send",
      value: pipeline?.takeHomeTest ?? 0,
    },
    {
      id: 5,
      title: "Offers",
      value: pipeline?.offers ?? 0,
    },
    {
      id: 6,
      title: "Kickoff Form Tasks",
      value: pipeline?.kickoffFromTask ?? 0,
    },
  ];

  return (
    <Box>
      <Typography mb={1} variant="body1" fontWeight={700}>
        Pipeline
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
