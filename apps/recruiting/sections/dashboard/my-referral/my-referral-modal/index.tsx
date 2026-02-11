import React, { useState } from "react";
import { CustomModal, CustomTable } from "common";
import { Box, Button, Typography } from "@mui/material";
import { useGetDashboardMyReferralsQuery } from "@services/dashboard/company-goals-api";
import { useRouter } from "next/navigation";
import { ViewIcon } from "@assets/icons";

export function MyReferralModal({
  myReferralModal,
  setMyReferralModal,
}): React.JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const { data } = useGetDashboardMyReferralsQuery({
    limit: 10,
    offset: params?.offset,
  });
  const Router = useRouter();

  const handleSeeJobPage = (JobId: any) => {
    Router.push(`jobs/job-details/referrals?jobId=${JobId}`);
  };

  const columns = [
    {
      accessorFn: (row: any) => row.type,
      id: "type",
      cell: (info: any) => (
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {`${info.row.original?.nameAndCompany?.firstName} ${info.row.original?.nameAndCompany?.lastName}`}
          </Typography>
          <Typography variant="body2">
            {info.row.original?.nameAndCompany?.currentCompany}
          </Typography>
        </Box>
      ),
      header: () => (
        <Typography
          variant="body2"
          sx={{ fontWeight: "600", textAlign: "left" }}
        >
          Name
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.beingRefered,
      id: "beingRefered",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">
            {info?.row?.original?.detail?.beingRefered}
          </Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Being Referred
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.stage,
      id: "stage",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info?.row?.original?.stage}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Stage
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.jobId,
      id: "jobId",
      cell: (info: any) => (
        <Button
          onClick={() => {
            handleSeeJobPage(info?.row?.original?.jobId);
          }}
        >
          <ViewIcon />
        </Button>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Actions
        </Typography>
      ),
      isSortable: false,
    },
  ];

  return (
    <CustomModal
      isOpen={myReferralModal}
      onClose={() => {
        setMyReferralModal(false);
      }}
      headerLabel="My Referrals"
      rootSx={{
        width: { md: "40%", xs: "60%" },
        height: "50vh",
        overflowY: "auto",
      }}
      closeButtonProps={{
        onClick: () => {
          setMyReferralModal(false);
        },
      }}
    >
      <Box sx={{ mt: 1 }}>
        <CustomTable
          data={data?.data?.jobCandidate}
          columns={columns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination
          isSuccess
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setParams((prev) => {
              return {
                ...prev,
                offset: (onPageData - 1) * 10,
              };
            });
          }}
        />
      </Box>
    </CustomModal>
  );
}
