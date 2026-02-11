import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { ProfilePicture } from "@components/profile-picture";
import { FormProvider, RHFTextField } from "common";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function PreviewWelcomeStepOne(props): JSX.Element {
  const {
    profilePicture,
    setProfilePicture,
    onProfileImageDelete,
    onSubmitProfileImage,
    nextStepHandler,
  } = props;
  const router = useRouter();
  const methods = useForm({
    defaultValues: { firstName: "", secondName: "", lastName: "" },
  });
  const { handleSubmit } = methods;
  const onSubmit = (formValues) => {
    console.log(formValues);
    nextStepHandler();
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={5} py={2}>
        <Typography variant="h4" pb={1}>
          Welcome to Personnel Library
        </Typography>
        <Typography variant="body1" my={1} fontWeight={500}>
          Join your team by sharing information about yourself
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid my={3}>
            <Typography mb={2} mx={0.5} variant="subtitle1" fontWeight={600}>
              Profile Picture
            </Typography>
            <ProfilePicture
              editFormState
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
              onProfileImageDelete={onProfileImageDelete}
              onSubmitProfileImage={onSubmitProfileImage}
            />
          </Grid>
          <Grid container gap={2}>
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight={600}>
                Name
              </Typography>
            </Grid>
            <RHFTextField variant="standard" name="firstName" />
            <RHFTextField variant="standard" name="secondName" />
            <RHFTextField variant="standard" name="lastName" />
          </Grid>

          <Grid container justifyContent="end" gap={1} my={3} px={2}>
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
        </FormProvider>
      </Grid>
    </Grid>
  );
}
