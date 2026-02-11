import { Box, Button, Typography } from "@mui/material";
import { useGetDashboardMyReferralsQuery } from "@services/dashboard/company-goals-api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MyReferralModal } from "./my-referral-modal";

export function MyReferral(): React.JSX.Element {
  const [myReferralModal, setMyReferralModal] = useState<boolean>(false);
  const { data } = useGetDashboardMyReferralsQuery({
    limit: 3,
    offset: 0,
  });
  const Router = useRouter();
  const handleSeeJobPage = (JobId: any) => {
    Router.push(`jobs/job-details/referrals?jobId=${JobId}`);
  };

  return (
    <Box
      sx={{
        mt: 2,
        py: 1,
        px: 2,
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">My Referral</Typography>
        </Box>
        <Button
          onClick={() => {
            setMyReferralModal(true);
          }}
          variant="outlined"
        >
          See All
        </Button>
      </Box>
      {!data?.data?.jobCandidate ? (
        <Typography>You have No Referral</Typography>
      ) : (
        data?.data?.jobCandidate?.map((item: any) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #EAECF0",
                "&:last-child": { borderBottom: "0" },
                py: 1,
                mt: 2,
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {`${item?.nameAndCompany?.firstName 
                    } ${ 
                    item?.nameAndCompany?.lastName}`}
                </Typography>
                <Typography variant="body2">
                  {item?.nameAndCompany?.currentCompany}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {item?.detail?.beingRefered ?? "---"}
                </Typography>
              </Box>
              <Button
                onClick={() => {
                  handleSeeJobPage(item?.jobId);
                }}
              >
                <Typography
                  sx={{ color: "#6938ef", textTransform: "capitalize" }}
                >
                  {item?.stage}
                </Typography>
              </Button>
            </Box>
          );
        })
      )}

      <MyReferralModal
        myReferralModal={myReferralModal}
        setMyReferralModal={setMyReferralModal}
      />
    </Box>
  );
}
