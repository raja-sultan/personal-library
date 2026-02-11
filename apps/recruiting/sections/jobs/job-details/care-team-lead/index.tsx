import React from "react";
import { Stack, Button, Box } from "@mui/material";
import { BasicInformation } from "./basic-information";
import { CareTeamSeeJob } from "./care-team-see-job";
import { style } from "./style";
import { useSearchParams } from "next/navigation";
import {
  useGetHiringTeamQuery,
  useLazyDownloadHiringTeamQuery,
} from "@services/jobs/create-jobs/hiring-team/hiring-team-api";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
// import { downloadCSVFile } from "@root/utils/download-csv";
import { DownloadCsv } from "@root/utils";
import { LoadingButton } from "@mui/lab";
// import { BASE_URL } from "@root/config";

export function CareTeamLead(): JSX.Element {
  // const router = useRouter();
  const [downloadHiringTeam, { isLoading: isLoadingDownload }] =
    useLazyDownloadHiringTeamQuery();

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  // const limit = { limit: 10, offset: 0 };
  const { data, isLoading, isSuccess }: any = useGetHiringTeamQuery(
    {
      jobId,
    },
    { skip: jobId === null }
  );

  if (isLoading) {
    return <StepperFormSkeleton />;
  }

  const handleDownloadCSV = (): Promise<void> => {
    return DownloadCsv(downloadHiringTeam, "hiringTeam", { jobId });
  };

  // function handleDownloadCSV(): void {
  //   downloadCSVFile(`jobs/hiring-team/export/${jobId}`, "hiringTeam", {
  //     limit,
  //   });
  // }

  return (
    <Box sx={{ p: 2 }}>
      <Stack sx={style.headerStyle}>
        <LoadingButton
          size="small"
          variant="contained"
          onClick={handleDownloadCSV}
          loading={isLoadingDownload}
          disableRipple
          disableFocusRipple
          disableTouchRipple
        >
          Export Hiring Team to Excel
        </LoadingButton>
      </Stack>
      <Box>
        {isSuccess && (
          <>
            <BasicInformation hiringTeamData={data?.data?.hiringTeam} />
            <CareTeamSeeJob />
          </>
        )}
      </Box>
    </Box>
  );
}
