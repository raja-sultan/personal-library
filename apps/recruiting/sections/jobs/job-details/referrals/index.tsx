import React, { useState } from "react";
import { Button, Card, Grid } from "@mui/material";
import { styles } from "./referrals.style";
import { CustomTable } from "common";
import { referralsColumn } from "./referrals.data";
import { AddReferrals } from "./add-referrals";
import { useReferral } from "./use-referral";
import { JobDetailsHeader } from "../job-details-header";

export function ReferralsSection(): JSX.Element {
  const [showAddReferrals, setShowAddReferrals] = useState(true);
  const {
    getReferralData,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    setParams,
  } = useReferral();

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <JobDetailsHeader mainTitle="Referrals" />
      <Grid container sx={styles}>
        {showAddReferrals ? (
          <>
            <Grid justifyContent="flex-end" display="flex" width="100%">
              <Button
                type="button"
                variant="contained"
                sx={{ width: 200, my: 2 }}
                onClick={() => {
                  setShowAddReferrals(false);
                }}
              >
                Add a Referral
              </Button>
            </Grid>
            <Grid item xs={12}>
              <CustomTable
                columns={referralsColumn}
                data={getReferralData?.data?.referals}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                isSuccess={isSuccess}
                isPagination
                totalPages={getReferralData?.data?.meta?.pages ?? 0}
                currentPage={getReferralData?.data?.meta?.page ?? 1}
                onPageChange={(onPageData: any) => {
                  setParams({
                    page: onPageData,
                    offset: (onPageData - 1) * 10,
                  });
                }}
              />
            </Grid>
          </>
        ) : (
          <AddReferrals setShowAddReferrals={setShowAddReferrals} />
        )}
      </Grid>
    </Card>
  );
}
