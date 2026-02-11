import { Box, Button } from "@mui/material";
import { CustomChip, CustomTable } from "common";
// import { useSearchParams } from "next/navigation";
// import { useGetAprrovalDetailsHitoryQuery } from "@services/jobs/job-details/approvals/job-info-approvals-api";
import type { formsTypes } from "./types";
import { SendEmailModal } from "./send-form-modal";
import { useState } from "react";
import { SubmittedFormModal } from "./submitted-modal";
import { useSearchParams } from "next/navigation";
import { useGetApplicationCandidateFormListQuery } from "@services/candidate/application-candidate/application-candidate-api";

export const accordionData: formsTypes[] = [
  {
    id: 1,
    name: "Preliminary Screening From",
    stage: "Preliminary Phone Screen",
    requestStatus: "Sent - 12/11/2023",
  },
  {
    id: 2,
    name: "Background Check Form",
    stage: "Background Check",
    requestStatus: "Send",
  },
  {
    id: 3,
    name: "Final Interview Form",
    stage: "Face to Face Interview",
    requestStatus: "Submitted",
  },
];

// function getColorOnStatus(status: string, theme: Theme): any {
//     let  color;
//     switch (status) {
//       case "Sent":
//         color = theme.palette.success.main;
//         break;
//       case "Send":
//         color = theme.palette.warning.main;
//         break;
//       case "Submitted":
//         color = theme.palette.error.main;
//         break;
//       default:
//         color = theme.palette.primary.main;
//         break;
//     }

//     return { color };
//   }

export default function FormsApplications(): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const candidateId = searchParams.get("candidateID");

  const { data: formListData } = useGetApplicationCandidateFormListQuery({
    candidateId,
    jobId,
  });

  console.log(formListData);

  const [candidate, setCandidate] = useState<boolean>(false);
  const [markAsSent, setMarkAsSent] = useState<boolean>(false);

  // API HANDLERS
  //   const { data, isError, isFetching, isLoading, isSuccess } =
  //     useGetAprrovalDetailsHitoryQuery(
  //       {
  //         jobId,
  //       }
  //     );

  const applicationFormsListColumns = [
    {
      accessorFn: (row: any) => row?.name ?? "-",
      id: "name",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Name
        </Box>
      ),
    },

    {
      accessorFn: (row: any) => row?.stage ?? "-",
      id: "stage",
      cell: (info: any) => (
        <Box display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Stage
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.stage ?? "Sent",
      id: "requestStatus",
      cell: (info: any) => {
        const handleButtonClick = () => {
          const requestStatus = info.getValue();
          if (requestStatus === "Preliminary Phone Screen") {
            setMarkAsSent(true);
          } else {
            setCandidate(true);
          }
        };
        return (
          <Button
            onClick={handleButtonClick}
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
              ChipProps={{ label: `${info.getValue()}` }}
            />
          </Button>
        );
      },
      // {
      //   accessorFn: (row: any) => row?.requestStatus ?? "-",
      //   id: "requestStatus",
      //   cell: (info: any) => {
      //     return (
      //       <Button
      //         onClick={() => {
      //           setCandidate(true);
      //         }}
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
      header: () => (
        <Box width="100%" ml={2} display="flex" justifyContent="flex-start">
          Status
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <CustomTable
        data={accordionData}
        columns={applicationFormsListColumns}
        isLoading={false}
        isFetching={false}
        isError={false}
        isPagination={false}
        isSuccess
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
    </Box>
  );
}
