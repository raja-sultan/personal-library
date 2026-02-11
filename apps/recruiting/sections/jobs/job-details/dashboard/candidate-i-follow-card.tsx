import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export function CandidateFollowCard(): JSX.Element {
  return (
    <Box>
      <Typography my={2} variant="body1" fontWeight={700}>
        Candidate I Follow
      </Typography>
      <CandidateCard />
      <CandidateCard />
      <CandidateCard />
    </Box>
  );
}
function CandidateCard(): JSX.Element {
  return (
    <Box
      display="flex"
      alignItems="center"
      boxShadow={1}
      p={0.5}
      borderRadius={1}
      my={1}
    >
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ mr: 1 }}
      />
      <Box>
        <Typography variant="body2" fontWeight={600}>
          Ronald Richards
        </Typography>
        <Typography variant="subtitle1" color="GrayText">
          UI/UX Designer
        </Typography>
      </Box>
    </Box>
  );
}
