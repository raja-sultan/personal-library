"use client";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { PersonTwo } from "@assets/common";


function CompleteYourTasks(): JSX.Element {
  const Router = useRouter();

  return (
    <Box
      maxWidth={800}
      textAlign="start"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="start"
      gap={1}
    >
      <Typography variant="h3">Have Questions? We’re here to help</Typography>
      <Typography variant="h5" fontWeight={500} color="neutral.900">
        Have Questions? We’re here to help
      </Typography>
      <Box mt={1}>
        <Typography variant="h6" fontWeight={500} color="neutral.500">
          Your Onboarding Coordinator
        </Typography>
      </Box>
      <Box display="flex" gap={2} alignItems="center">
        <Image
          src={PersonTwo}
          alt="Person"
          style={{
            width: "80px",
            height: "auto",
          }}
        />
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Martha Stewart
          </Typography>
          <Typography variant="body2" color="neutral.500">
            Marketing Manager
          </Typography>
        </Box>
      </Box>
      <Box ml="auto">
        <LoadingButton
          variant="contained"
          color="primary"
          size="small"
          sx={{
            height: 35,
          }}
          type="submit"
          onClick={() => {Router.push("/home")}}
        >
          Next
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default CompleteYourTasks;
