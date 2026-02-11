import { Card, Box, Typography, CardContent, Grid } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import React from "react";
import Image from "next/image";
import twitterIcon from "@assets/images/twitter-Icon.svg";
import { useTwitterModal } from "./use-twitter-modal";

export function TwitterModal({
  openTwitterModal,
  setOpenTwitterModal,
}: any): React.JSX.Element {
  const { methods, onSubmit, handleSubmit } = useTwitterModal({
    openTwitterModal,
    setOpenTwitterModal,
  });

  return (
    <CustomModal
      isOpen={openTwitterModal}
      onClose={() => {
        setOpenTwitterModal(false);
      }}
      rootSx={{ width: { md: "40%", lg: "40%", xs: "60%" } }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ m: { md: 2, lg: 2 } }}>
          <CardContent>
            <Grid container spacing={1} mt={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ marginY: "15px" }}>
                  Welcome Back
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Image
                    src={twitterIcon}
                    alt="linkedIn logo"
                    width={200}
                    height={60}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ marginY: "15px" }}
                >
                  Welcome Back
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </FormProvider>
    </CustomModal>
  );
}
