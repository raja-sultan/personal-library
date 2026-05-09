import React, { useState } from "react";
import Image from "next/image";
import { Box, Typography, Button, Grid, Stack, Divider } from "@mui/material";
import adp from "../../../assets/images/setting-integrations/adp.png";
import bamboo from "../../../assets/images/setting-integrations/bamboo.png";
import namely from "../../../assets/images/setting-integrations/namely.png";
import { BambooHrModal } from "./integrations-modal/bamboo-hr-modal";
import { NamelyModal } from "./integrations-modal/namely-modal";

const HumanResourceArray = [
  {
    id: 1,
    logo: adp,
    title: "ADP Workforce Now",
    subTitle:
      "HRIS software for small and medium sized businesses. Sync your employee data between Personnel Library Onboarding and APD Workforce Now using ADP’s HR + Payroll (System) Template.",
  },
  {
    id: 2,
    logo: bamboo,
    title: "BambooHR",
    subTitle:
      "HRIS software for small and medium sized businesses. Sync your employee data between Personnel Library Onboarding and BambooHR.",
  },
  {
    id: 3,
    logo: namely,
    title: "Namely",
    subTitle:
      "Seamlessly push new hire information to Namely from Personnel Library Onboarding.",
  },
];

export function HumanResourceManagement(): JSX.Element {
  const [bambooHrOpen, setBambooHrOpen] = useState<boolean>(false);
  const [namelyOpen, setNamelyOpen] = useState<boolean>(false);

  return (
    <Box>
      <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
        Human Resource Management
      </Typography>
      {HumanResourceArray.map((managementItems) => (
        <>
          <Grid container spacing={1} my={2} key={managementItems.id}>
            <Grid item xs={12} lg={3}>
              <Box>
                <Image
                  src={managementItems.logo}
                  alt="linkedIn logo"
                  // width={200}
                  // height={60}
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
              </Stack>
            </Grid>
            {managementItems.title === "ADP Workforce Now" ? (
              ""
            ) : (
              <Grid
                item
                xs={12}
                lg={2}
                sx={{ textAlign: { xs: "start", lg: "end" } }}
              >
                <Button
                  variant="contained"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    managementItems.title === "BambooHR"
                      ? setBambooHrOpen(true)
                      : setNamelyOpen(true);
                  }}
                >
                  Enable
                </Button>
              </Grid>
            )}
          </Grid>

          <Divider sx={{ my: 1, borderTop: "1px solid #D0D5DD" }} />
        </>
      ))}
      <BambooHrModal
        bambooHrOpen={bambooHrOpen}
        setBambooHrOpen={setBambooHrOpen}
      />
      <NamelyModal namelyOpen={namelyOpen} setNamelyOpen={setNamelyOpen} />
    </Box>
  );
}
