import { Card, Grid } from "@mui/material";
import React from "react";
import { styles } from "./styles";
import { Box } from "@mui/system";
import { JobInformation } from "./job-information";
import { OpeningsApproval } from "./openings";
import { OfferApprovalsHistory } from "./offer-approvals-history";
import { JobApprovals } from "./job-approvals";
import { OfferApprovals } from "./offer-approvals";
import { useSearchParams } from "next/navigation";
import { useGetApprovalDetailsHistoryQuery } from "@services/jobs/job-details/approvals/job-info-approvals-api";
import { JobDetailsHeader } from "../job-details-header";

export function ApprovalDetails(): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  // API HANDLERS
  const { data, isError, isFetching, isLoading, isSuccess, refetch } =
    useGetApprovalDetailsHistoryQuery({
      jobId,
    });

  return (
    <Box>
      <JobDetailsHeader mainTitle="Approvals" />
      <Card sx={styles.innerCardStyling}>
        <JobInformation />
      </Card>
      <Card sx={styles.innerCardStyling}>
        <OpeningsApproval />
      </Card>
      <Grid container spacing={1}>
        <Grid container justifyContent="center">
          <Grid item lg={5.5}>
            <Box>
              <JobApprovals />
            </Box>
          </Grid>
          <Grid item lg={5.5}>
            <Box>
              <OfferApprovals refetch={refetch} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Card sx={styles.innerCardStyling}>
        {isLoading ? (
          <>Loading</>
        ) : (
          <OfferApprovalsHistory
            data={data}
            isError={isError}
            isFetching={isFetching}
            isSuccess={isSuccess}
            isLoading={isLoading}
          />
        )}
      </Card>
    </Box>
  );
}
