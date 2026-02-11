import {
  ProfileData as ProfileForm,
  ProfileHeader,
} from "@components/my-profile";
import { Card, Skeleton, Stack } from "@mui/material";
import React from "react";
import { useProfileData } from "./use-profile-data";
import { ProfileDataForm } from "@components/my-profile/profile-data/profile-data-form";
import { FormProvider } from "common";

export function ProfileData(): JSX.Element {
  const {
    methods,
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
    updateProfileFormData,
    reset,
  } = useProfileData();

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack rowGap={2}>
        <ProfileHeader
          editFormState={editFormState}
          setEditFormState={setEditFormState}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          coverImage={coverImage}
          setCoverImage={setCoverImage}
          data={data}
        />
        {data ? (
          <Card
            sx={{
              p: 2,
              position: "relative",
              borderRadius: "1rem",
              height: "48vh",
              overflow: "scroll",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {!editFormState ? (
              <ProfileForm data={data} />
            ) : (
              <ProfileDataForm
                editFormState={editFormState}
                setEditFormState={setEditFormState}
                isError={isError}
                isSuccess={isSuccess}
                isLoading={isLoading}
                updateProfileFormData={updateProfileFormData}
                reset={reset}
              />
            )}
          </Card>
        ) : (
          <Skeleton variant="rounded" width="100%" height={500} />
        )}
      </Stack>
    </FormProvider>
  );
}
