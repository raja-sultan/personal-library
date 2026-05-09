import React, { useState } from "react";
import { BuildRelationships } from "./build-relationships";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { JobTraining } from "./job-training";
import { KnowCompany } from "./know-company";
import { Logistics } from "./logistics";
import { ESignatureRequests } from "./e-signature-requests";
import { Emails } from "./emails";
import { FeedbackQuestions } from "./feedback-questions";
import { EditPreview } from "./edit-preview";

export function PreviewSection(): JSX.Element {
  const [showEditPreview, setShowEditPreview] = useState(false);
  const data = [
    { id: 1, name: "Department:", value: "None" },
    { id: 2, name: "Location:", value: "None" },
    { id: 3, name: "Employment Status:", value: "None" },
    { id: 4, name: "Other criteria:", value: "None" },
  ];
  return (
    <Stack rowGap={!showEditPreview ? 3 : 2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Preview an Onboarding Plan</Typography>
        {showEditPreview && (
          <Button
            variant="contained"
            onClick={() => {
              setShowEditPreview(false);
            }}
            sx={{ height: 50 }}
          >
            Preview Plan
          </Button>
        )}
      </Stack>
      {!showEditPreview ? (
        <>
          <Grid container>
            <Grid item xs={6} container rowGap={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  This plan is based on the following onboarding criteria
                </Typography>
              </Grid>
              {data.map((items) => {
                return (
                  <Grid item md={6} xs={12} key={items?.id}>
                    <Typography variant="subtitle2" component="span">
                      {items?.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="span"
                      color="text.secondary"
                      mx={1}
                    >
                      {items?.value}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
            <Grid item xs={6} textAlign="right" my="auto">
              <Button
                variant="outlined"
                onClick={() => {
                  setShowEditPreview(true);
                }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <BuildRelationships />
          <JobTraining />
          <KnowCompany />
          <Logistics />
          <ESignatureRequests />
          <Emails />
          <FeedbackQuestions />
        </>
      ) : (
        <EditPreview />
      )}
    </Stack>
  );
}
