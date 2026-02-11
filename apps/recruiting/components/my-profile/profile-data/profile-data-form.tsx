import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Image from "next/image";
import { profileInfo } from "@assets/images";
import { LoadingButton } from "@mui/lab";

export function ProfileDataForm(props: any): JSX.Element {
  const {
    editFormState,
    setEditFormState,
    isLoading,
    updateProfileFormData,
    reset,
  } = props;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "9%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src={profileInfo} alt="profileInfo" />
          <Typography variant="h6" sx={{ ml: 1 }}>
            Personal Info
          </Typography>
        </Box>
        {editFormState && (
          <Button
            variant="contained"
            onClick={() => {
              setEditFormState(false);
              reset();
            }}
          >
            Back
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 1 }} />

      <Grid
        container
        rowGap={1}
        sx={{
          height: "85%",
          overflow: "scroll",
          "::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      >
        <Grid item md={3} xs={12}>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Personal Information
          </Typography>
          <Typography variant="caption" sx={{ ml: 1 }} color="text.disabled">
            Update your the details that will be visible on your profile.
          </Typography>
        </Grid>
        <Grid item md={4} xs={12} container rowGap={4}>
          {updateProfileFormData.PersonalInformation?.map((item) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Address Details
          </Typography>
          <Typography variant="caption" sx={{ ml: 1 }} color="text.disabled">
            Add your address details.
          </Typography>
        </Grid>
        <Grid item md={4} xs={12} container rowGap={4}>
          {updateProfileFormData.address?.map((item) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Work Information
          </Typography>
          <Typography variant="caption" sx={{ ml: 1 }} color="text.disabled">
            Add your work information.
          </Typography>
        </Grid>
        <Grid item md={4} xs={12} container rowGap={4}>
          {updateProfileFormData.workInformation?.map((item) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item md={3} xs={12}>
          <Typography variant="h6" sx={{ ml: 1 }}>
            Emergency Contact (Optional)
          </Typography>
          <Typography variant="caption" sx={{ ml: 1 }} color="text.disabled">
            Add your next of kin information.
          </Typography>
        </Grid>
        <Grid item md={4} xs={12} container rowGap={4}>
          {updateProfileFormData.emergencyContact?.map((item) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} />
            </Grid>
          ))}
        </Grid>
        {editFormState && (
          <Grid item xs={12} textAlign="right" sx={{ mb: 2 }}>
            <Stack
              spacing={{ md: 2, xs: 1 }}
              direction={{ md: "row-reverse", xs: "column" }}
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
                variant="outlined"
                onClick={() => {
                  setEditFormState(false);
                  reset();
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
}
