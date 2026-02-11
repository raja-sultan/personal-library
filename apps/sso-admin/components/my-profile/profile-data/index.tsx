import { Typography, Grid, Button, Stack } from "@mui/material";
import React from "react";
import { myProfileData } from "./profile.data";
import { LoadingButton } from "@mui/lab";

export function ProfileData(props: any): JSX.Element {
  const { editFormState, setEditFormState, isLoading, reset } = props;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5">User Information</Typography>
      </Grid>
      {myProfileData.userInformation?.map((item) => (
        <Grid item xs={12} md={item?.md} key={item?.id}>
          <item.component
            disabled={item.componentProps.readonly || !editFormState}
            {...item.componentProps}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Typography variant="h5">Address Detail</Typography>
      </Grid>
      {myProfileData.addressDetails?.map((item) => (
        <Grid item xs={12} md={item?.md} key={item?.id}>
          <item.component disabled={!editFormState} {...item.componentProps} />
        </Grid>
      ))}
      {editFormState && (
        <Grid item xs={12} textAlign="right">
          <Stack
            spacing={{ md: 2, xs: 1 }}
            direction={{ md: "row", xs: "column" }}
            justifyContent="right"
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Save
            </LoadingButton>
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                setEditFormState(false);
                reset();
              }}
            >
              Back
            </Button>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}
