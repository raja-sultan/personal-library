import { Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { ProfilePicture } from "@components/profile-picture";
import { useRouter } from "next/navigation";

export default function PreviewWelcomeStepFour(props): JSX.Element {
  const {
    previousStepHandler,
    profilePicture,
    setProfilePicture,
    onProfileImageDelete,
    onSubmitProfileImage,
  } = props;
  const theme = useTheme();
  const router = useRouter();
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={5} py={2}>
        <Typography variant="h4" pb={1.5}>
          Have Questions? We&apos;re here to help
        </Typography>
        <Typography variant="body2" fontWeight={500}>
          We understand you may have some questions leading up to day one,
          <br /> and we want to make sure you get the answer you need.
        </Typography>

        <Grid container my={3}>
          <Typography mb={3} variant="subtitle1" fontWeight={600}>
            Your Onboarding Coordinator
          </Typography>
          <Grid container gap={2} alignItems="center">
            <ProfilePicture
              editFormState
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
              onProfileImageDelete={onProfileImageDelete}
              onSubmitProfileImage={onSubmitProfileImage}
            />
            <Grid>
              <Typography variant="body2" fontWeight={600}>
                Martha Stewart
              </Typography>
              <Typography variant="caption" color={theme.palette.grey[600]}>
                Marketing Manager
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent="end" gap={1} my={2} px={2.5}>
          <Button variant="outlined" size="small" onClick={previousStepHandler}>
            Back
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              router.push("/home");
            }}
          >
            Skip
          </Button>
          <Button variant="contained" size="small" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
