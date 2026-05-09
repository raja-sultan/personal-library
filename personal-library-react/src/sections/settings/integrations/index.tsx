import React, { useState } from "react";
import Image from "next/image";
import { Box, Typography, Button, Card, Grid, Stack } from "@mui/material";
import personnelLogo from "../../../assets/images/setting-integrations/personnelLogo.png";
import { ApplicantTrackingModal } from "./integrations-modal/applicant-tracking-modal";
import { HumanResourceManagement } from "./human-resource";
import { SingleSignOn } from "./single-sign-on";
import { FilterSelectFields } from "./select-filter";

export function IntegrationsSection(): JSX.Element {
  const [applicantTack, setApplicantTrack] = useState<boolean>(false);
  return (
    <Box>
      <Typography variant="h5">Integrations</Typography>
      <Typography variant="subtitle2" sx={{ mb: 2,mt:.5, }}>
        To add integrations, submit request through the Support Center
        <Button
          onClick={() => {}}
          sx={{ justifyContent: "start", p: "0px 5px" }}
        >
          here
        </Button>
      </Typography>
      <Box sx={{ my: 3 }}>
        <FilterSelectFields />
      </Box>
      <Card sx={{ borderRadius: "10px", p: 2 }}>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
          Applicant Tracking
        </Typography>
        <Grid container spacing={1} mt={2}>
          <Grid item xs={12} lg={3}>
            <Box>
              <Image src={personnelLogo} alt="linkedIn logo" />
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
                  component="h5"
                  color="primary.900"
                  m={0}
                >
                  Personnel Library
                </Typography>
                <Typography variant="caption" color="primary.900">
                  Importing: All Departments, All Locations, 1Employment Status,
                  All Other Criteria
                </Typography>
              </Box>
            </Stack>
          </Grid>
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
                setApplicantTrack(true);
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ borderRadius: "10px", p: 2, mt: 1 }}>
        <HumanResourceManagement />
      </Card>
      <Card sx={{ borderRadius: "10px", p: 2, mt: 1 }}>
        <SingleSignOn />
      </Card>

      <ApplicantTrackingModal
        applicantTack={applicantTack}
        setApplicantTrack={setApplicantTrack}
      />
    </Box>
  );
}
