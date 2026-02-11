import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { jobInfoData } from "./job-info.data";
import { useGetJobInfoDataApiQuery } from "@services/jobs/job-details/job-setup/job-overview/job-info/job-info-api";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { EditJobInfoModal } from "../edit-job-info-modal";
import { IsFetching } from "common";

export function JobInfo(): JSX.Element {
  const [jobInfo, setJobInfo] = useState<boolean>(false);

  const id = useSearchParams();

  const {
    data: dataJobInfo,
    isLoading,
    isFetching,
  } = useGetJobInfoDataApiQuery({
    jobId: id.get("jobId"),
  });

  const department = dataJobInfo?.data?.department?.departmentName;
  const office = dataJobInfo?.data?.office?.officeName;
  const openingIdS = dataJobInfo?.data?.openingIds.map((i) => `${i}, `);
  const openDates = dataJobInfo?.data?.openDates.map(
    (i) => `${dayjs(i).format("MM/DD/YYYY")}, `
  );

  const showDesc = (item: any) => {
    if (item.id === 2) {
      return department;
    } else if (item.id === 3) {
      return office;
    } else if (item.id === 4) {
      return openDates;
    } else if (item.id === 7) {
      return openingIdS;
    }
    return dataJobInfo?.data?.[item?.description];
  };
  if (isLoading || isFetching) {
    return (
      <Box position="relative" height="50vh">
        <IsFetching isFetching />
      </Box>
    );
  }
  return (
    <Box>
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f2f4f7",
              pb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Job Info
            </Typography>
            <Button
              onClick={() => {
                setJobInfo(true);
              }}
              variant="outlined"
              sx={{ padding: "10px 0px" }}
            >
              Edit
            </Button>
          </Box>
          <Grid container spacing={2}>
            {!isLoading &&
              jobInfoData.map((item: any) => {
                return (
                  <Grid key={item.id} item xs={2.4}>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {showDesc(item) ?? "---"}
                    </Typography>
                  </Grid>
                );
              })}
          </Grid>
        </CardContent>
      </Card>

      <EditJobInfoModal
        jobInfo={jobInfo}
        setJobInfo={setJobInfo}
        dataOfJobInfo={dataJobInfo}
      />
    </Box>
  );
}
