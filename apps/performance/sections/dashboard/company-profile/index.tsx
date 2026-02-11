"use client";
import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { companyProfileStyles} from "./company-profile.styles";
import { DashboardCard } from "@components/dashboard/dashboard-card";
import { useCompanyProfile } from "./use-company-profile";
import { awsBaseUrl } from "@root/config";
import Image from "next/image";

export function CompanyProfile(): JSX.Element {
  const { companyProfile, isLoading } = useCompanyProfile();

  const missionStatement =
    companyProfile?.missionStatement?.length > 120
      ? `${companyProfile?.missionStatement.substring(0, 120)}...`
      : companyProfile?.missionStatement ?? "N/A";

      const styles = companyProfileStyles()

  return (
    <DashboardCard>
      <Box sx={styles.companyWrapper}>
        {isLoading ? (
          <Skeleton variant="rectangular" height={40} />
        ) : (
          <Image
            src={`${awsBaseUrl}${companyProfile?.logo}`}
            alt="Company Logo"
            width={1000}
            height={1000}
            style={{
              width: '100%',
              height: '40px',
              objectFit: 'cover'
            }}
          />
        )}

        {isLoading ? <>
          <Skeleton variant="rectangular" height={20} sx={{ mt: '20px' }} />
          <Skeleton variant="rectangular" height={20} sx={{ mt: '12px' }} />
        </> :
          <>
            <Typography color="text.primary" sx={styles.title}>
              {companyProfile?.title ? companyProfile?.title : "N/A"}
            </Typography>
            <Typography color="text.primary" sx={styles.content}>
              {missionStatement}
            </Typography>
          </>}
      </Box>
    </DashboardCard>
  );
}
