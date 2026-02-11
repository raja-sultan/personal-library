import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Button,
  Card,
  Box,
  Typography,
  CardContent,
} from "@mui/material";
import { Stack } from "@mui/system";
import { CustomModal, FormProvider, RHFTextField } from "common";
import React from "react";
import { useSocialLinkModal } from "./use-social-link-modal";
import Image from "next/image";
import linkedinLogo from "@assets/images/linkedIn_logo.svg";

export function SocialLinkModal({
  openSocialModal,
  setOpenSocialModal,
}: any): React.JSX.Element {
  const { methods, onSubmit, handleSubmit } = useSocialLinkModal({
    openSocialModal,
    setOpenSocialModal,
  });

  return (
    <CustomModal
      isOpen={openSocialModal}
      onClose={() => {
        setOpenSocialModal(false);
      }}
      rootSx={{ width: { md: "40%", lg: "40%", xs: "60%" } }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ m: { md: 2, lg: 5 } }}>
          <CardContent>
            <Box textAlign="center">
              <Box>
                <Image
                  src={linkedinLogo}
                  alt="linkedIn logo"
                  width={200}
                  height={60}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 600, marginY: "15px" }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "neutral.500" }}
              >
                Don’t miss your next opportunity. Sign in to stay updated on
                your professional world.
              </Typography>
            </Box>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="email"
                  type="email"
                  placeholder="Email or Phone"
                  mb="1rem"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <RHFTextField
                  name="password"
                  type="password"
                  placeholder="Password"
                  mb="1rem"
                />
              </Grid>
            </Grid>
            <Stack
              justifyContent="center"
              direction={{ md: "row-reverse", xs: "column" }}
              rowGap={1}
              columnGap={1}
              marginTop="30px"
            >
              <LoadingButton type="submit" variant="contained" fullWidth>
                Sign in
              </LoadingButton>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setOpenSocialModal(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
            <Box sx={{ textAlign: "center", marginTop:"20px" }}>
              <Button variant="text" sx={{ fontsize: "20px" }}>Forgot password?</Button>
              <Box>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ fontWeight:"600" }}
                >
                  New to LinkedIn?
                </Typography>
                <Button variant="text" sx={{ fontsize: "16px" }}>
                  Join now
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </FormProvider>
    </CustomModal>
  );
}
