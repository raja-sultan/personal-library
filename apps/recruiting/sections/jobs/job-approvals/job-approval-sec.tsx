import { useContext } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { fieldsInfo } from "./form-data";
import { FormProvider, IsFetching } from "common";
import { GenFormField } from "@components/form-fields-generator";
import { JobApprovalContext } from "./use-job-approval-context";
import StepperFormSkeleton from "../stepper-form-skeleton";
import { JobOpeningTable } from "./job-opening-table/job-opening-table";
import { JobOfferApprovals } from "./job-offer-approvals";
import Link from "next/link";

export function JobApprovalSec({ previousStepHandler }: any): JSX.Element {
  const { methods, isSubmitting, onSubmit, jobApprovalInfoCon } =
    useContext(JobApprovalContext);
  if (jobApprovalInfoCon.isLoading) return <StepperFormSkeleton />;
  return (
    <>
      <IsFetching isFetching={isSubmitting} />
      <Box
        sx={{
          height: { xs: "70%", sm: "90%" },
          position: "relative",
          overflowY: "auto",
        }}
      >
        <FormProvider methods={methods}>
          <Grid container justifyContent="center" sx={{ mt: "3em" }}>
            <Grid item xs={12} sx={{ padding: "0.5em" }}>
              <Typography variant="body2">
                Who needs to approve this job before it goes live, and who needs
                to approve offers to candidates.
              </Typography>
              <Typography variant="h4" sx={{ fontSize: "2rem" }}>
                Job Info
              </Typography>
            </Grid>
            <Grid container item xs={12} gap={1}>
              {/* Dynamically Generated Fields  */}
              {fieldsInfo.map((item: any, index: number) => {
                const props = item?.OuterConProps ? item?.OuterConProps : {};
                return (
                  <GenFormField
                    key={index}
                    item={item}
                    isSubmitting={isSubmitting}
                    {...props}
                  />
                );
              })}
            </Grid>
          </Grid>
        </FormProvider>
        <Grid item lg={12} sx={{ p: "0.5em" }}>
          <JobOpeningTable />
        </Grid>
        <Grid item lg={12} sx={{ p: "0.5em" }}>
          <JobOfferApprovals />
        </Grid>
      </Box>
      <Grid
        container
        alignItems="center"
        sx={{
          p: "0.5em",
          height: { xs: "30%", sm: "10%" },
          position: "relative",
        }}
        justifyContent="space-between"
      >
        <Grid
          item
          sx={{
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: "100%" }}
            onClick={previousStepHandler}
          >
            Back
          </Button>
        </Grid>
        <Grid
          item
          sx={{
            width: { xs: "100%", sm: "auto" },
            display: { xs: "flex" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Link href="/jobs">
            <Button
              variant="outlined"
              color="primary"
              onClick={onSubmit}
              sx={{
                m: { xs: "0.5em 0", sm: "0" },
                marginRight: { xs: "0", sm: "0.5em" },
              }}
            >
              Save & Finish Later
            </Button>
          </Link>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
