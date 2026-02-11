import React from "react";
import {
  ProfileData as ProfileForm,
  ProfileHeader,
} from "@components/my-profile";
import { FormProvider } from "common";
import { useProfileData } from "./use-profile-data";

import { Box, Card, Skeleton, Stack } from "@mui/material";

export function ProfileData(): JSX.Element {
  const {
    methods,
    handleSubmit,
    onSubmit,
    isError,
    isSuccess,
    isLoading,
    profilePicture,
    setProfilePicture,
    coverImage,
    setCoverImage,
    editFormState,
    setEditFormState,
    data,
    reset,
  } = useProfileData();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack rowGap={2}>
        <Box>
          <ProfileHeader
            editFormState={editFormState}
            setEditFormState={setEditFormState}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            coverImage={coverImage}
            setCoverImage={setCoverImage}
            data={data}
            reset={reset}
          />
        </Box>
        {data ? (
          <Card
            sx={{
              px: 3,
              py: 4,
              position: "relative",
              borderRadius: "1rem",
            }}
          >
            <ProfileForm
              editFormState={editFormState}
              setEditFormState={setEditFormState}
              isError={isError}
              isSuccess={isSuccess}
              isLoading={isLoading}
              reset={reset}
            />
          </Card>
        ) : (
          <Skeleton variant="rounded" width="100%" height={500} />
        )}
      </Stack>
    </FormProvider>
  );
}
