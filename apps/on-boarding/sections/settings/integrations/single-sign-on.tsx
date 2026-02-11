import React from "react";
import Image from "next/image";
import { Box, Typography, Grid, Stack, Divider } from "@mui/material";
import saml from "../../../assets/images/setting-integrations/saml.png";
import okta from "../../../assets/images/setting-integrations/okta.png";

const HumanResourceArray = [
  {
    id: 1,
    logo: saml,
    title: "Generic SAML",
    subTitle: "Sign in to Personnel Library using an identity provider (IdP).",
  },
  {
    id: 2,
    logo: okta,
    title: "Okta",
    subTitle: "Sign in to Personnel Library using single sign-on from Okta.",
  },
];

export function SingleSignOn(): JSX.Element {
  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
        Single Sign-on
      </Typography>
      {HumanResourceArray.map((managementItems) => (
        <>
          <Grid container spacing={1} my={2} key={managementItems.id}>
            <Grid item xs={12} lg={3}>
              <Box>
                <Image
                  src={managementItems.logo}
                  alt="linkedIn logo"
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={7}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    color="primary.900"
                    m={0}
                  >
                    {managementItems.title}
                  </Typography>
                  <Typography variant="caption" color="primary.900">
                    {managementItems.subTitle}
                  </Typography>
                </Box>

                {/* <Button
                  variant="contained"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  Edit
                </Button> */}
              </Stack>
            </Grid>
            <Grid item xs={12} lg={2}></Grid>
          </Grid>
          <Divider sx={{ my: 1, borderTop: "1px solid #D0D5DD" }} />
        </>
      ))}
    </Box>
  );
}
