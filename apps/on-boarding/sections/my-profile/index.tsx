import React from "react";
import { ProfileHeader } from "@components/my-profile";
import { FormProvider } from "common";
import { useProfileData } from "./use-profile-data";

import { Box, Stack } from "@mui/material";
import ProfileDetails from "./profile-details";

export function MyProfileSection(): JSX.Element {
  const {
    methods,
    handleSubmit,
    onSubmit,
    // isError,
    // isSuccess,
    // isLoading,
    profilePicture,
    setProfilePicture,
    coverImage,
    setCoverImage,
    firstName,
    lastName,
    employeeTitle,
    editFormState,
    setEditFormState,
    data,
  } = useProfileData();

  return (
    <>
      {/* <IsFetching isFetching={!data} /> */}

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
              firstName={firstName}
              lastName={lastName}
              employeeTitle={employeeTitle}
            />
          </Box>
          {/* <Card
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
            />
          </Card> */}

          <ProfileDetails data={data} />
        </Stack>
      </FormProvider>
    </>
  );
}
