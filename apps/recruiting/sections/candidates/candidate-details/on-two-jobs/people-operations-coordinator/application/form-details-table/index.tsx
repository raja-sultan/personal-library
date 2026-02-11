import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useGetFormListForTableQuery } from "@services/jobs/job-details/forms/forms-api";
import { CustomChip, CustomTable } from "common";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { SendEmailModal } from "../send-form-modal";
import { SubmittedFormModal } from "../submitted-modal";
import dayjs from "dayjs";
// import type { Theme } from "@mui/material";

// function getColorOnStatus(status: string, theme: Theme): any {
//   let  color;
//   switch (status) {
//     case "Sent":
//       color = theme.palette.success.main;
//       break;
//     case "Send":
//       color = theme.palette.warning.main;
//       break;
//     case "Submitted":
//       color = theme.palette.error.main;
//       break;
//     default:
//       color = theme.palette.primary.main;
//       break;
//   }

//   return { color };
// }

export default function FormDetailsTable(): JSX.Element {
  // const theme = useTheme();
  const [candidate, setCandidate] = useState<boolean>(false);
  const [markAsSent, setMarkAsSent] = useState<boolean>(false);
  const [params, setParams] = useState({
    limit: "10",
    offset: "0",
  });
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  // const candidateId = searchParams.get("candidateID");

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetFormListForTableQuery({
      jobId,
      params,
    });

  // const { data: formListData } = useGetApplicationCandidateFormListQuery({
  //   candidateId,
  //   jobId,
  // });

  const formColumns = [
    {
      accessorFn: (row: any) => row?.formName,
      id: "formName",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start" pl={2}>
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" pl={2} display="flex" justifyContent="flex-start">
          Form Name
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.jobStage,
      id: "jobStage",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start" pl={2}>
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" pl={2} display="flex" justifyContent="flex-start">
          Form Stage
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.createdAt ?? "-",
      id: "createdAt",
      cell: (info: any) => {
        // const handleButtonClick = () => {
        //   const requestStatus = info.getValue();
        //   if (requestStatus === "Phone Interview") {
        //     setMarkAsSent(true);
        //   } else if (requestStatus === "Application Review") {
        //     setCandidate(true);
        //   }
        // };

        return (
          <Button
            // onClick={handleButtonClick}
            disableElevation
            disableFocusRipple
            disableTouchRipple
            disableRipple
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
              },
            }}
          >
            <CustomChip
              variant="started"
              ChipProps={{
                label: `Sent - ${dayjs(info.getValue()).format("DD/MM/YYYY")}`,
              }}
            />
          </Button>
        );
      },
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Status
        </Box>
      ),
    },
    // {
    //   accessorFn: (row: any) => row?.requestStatus ?? "-",
    //   id: "requestStatus",
    //   cell: (info: any) => {
    //     const handleButtonClick = () => {
    //       const requestStatus = info.getValue();
    //       if (requestStatus === "Submitted") {
    //         setMarkAsSent(true);
    //       } else if (requestStatus === "Send") {
    //         setCandidate(true);
    //       }
    //     };

    //     return (
    //       <Button
    //         onClick={handleButtonClick}
    //         disableElevation
    //         disableFocusRipple
    //         disableTouchRipple
    //         disableRipple
    //         sx={{
    //           "&.MuiButtonBase-root:hover": {
    //             bgcolor: "transparent",
    //           },
    //         }}
    //       >
    //         <CustomChip
    //           variant="started"
    //           ChipProps={{ label: `${info.getValue()}` }}
    //         />
    //       </Button>
    //     );
    //   },
    //   header: () => (
    //     <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
    //       Status
    //     </Box>
    //   ),
    // },
  ];
  return (
    <Grid>
      <CustomTable
        data={data?.data?.forms || []}
        columns={formColumns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        onPageChange={(offset) => {
          setParams((prev) => ({ ...prev, offset }));
        }}
      />
      <SendEmailModal
        // apiData={info.row.original}
        setCandidate={setCandidate}
        candidate={candidate}
      />
      <SubmittedFormModal
        setMarkAsSent={setMarkAsSent}
        markAsSent={markAsSent}
      />
    </Grid>
  );
}
