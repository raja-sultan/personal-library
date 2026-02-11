import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  useListFormDropDownQuery,
  usePutCopyFromMutation,
} from "@services/jobs/viewJobMain/view-job-main";
import toast from "react-hot-toast";

export function BulkCopyForm({
  setShowCopyForm,
  selectedRowJobs,
}: {
  setShowCopyForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRowJobs: any;
}): JSX.Element {
  const { data } = useListFormDropDownQuery({});
  const [copyFormData, setCopyFromData] = useState<any>({
    sameStageNameArray: [],
    NotASameSageName: [],
    allReadyJobsFilter: [],
    selectedValue: {},
  });
  const [eventOccur, setEventOccur] = useState(false);
  const [isDisabled, setisDisabled] = useState(false);
  const [PutCopyFrom, { isLoading }] = usePutCopyFromMutation({});
  const copyFormHandler = (): void => {
    if (
      copyFormData.sameStageNameArray &&
      copyFormData.sameStageNameArray.length > 0
    ) {
      const jobIds: any = copyFormData?.sameStageNameArray.map(
        (jobData) => jobData._id
      );

      PutCopyFrom({
        body: { jobIds },
        params: {
          formId: copyFormData?.selectedValue?._id,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("Form copy successfully");
          setShowCopyForm(false);
        })
        .catch((error: { data: { message: any } }) => {
          const errMsg = error?.data?.message;
          toast.error(`${errMsg}`);
        });
    }
  };

  const OnChangeHandler = (event): any => {
    const sameStageNameArray: any = [];
    setCopyFromData({});
    for (const keys in selectedRowJobs) {
      if (selectedRowJobs[keys].interviewPlan) {
        const filter = selectedRowJobs[keys].interviewPlan.filter(
          (list) => list.stageName === event.target.value.jobStage
        );

        if (filter.length > 0) {
          sameStageNameArray.push(selectedRowJobs[keys]);
        }
      }
    }
    const NotASameSageName = selectedRowJobs.filter((item) =>
      sameStageNameArray.some((firstItem) => firstItem._id !== item._id)
    );
    const allReadyJobsFilter = selectedRowJobs.filter((item) =>
      event.target.value.jobs.some((firstItem) => firstItem === item._id)
    );
    setCopyFromData({
      sameStageNameArray,
      NotASameSageName,
      allReadyJobsFilter,
      selectedValue: event.target.value,
    });
    setEventOccur(true);
  };
  useEffect(() => {
    if (
      copyFormData.sameStageNameArray.length > 0 &&
      copyFormData.allReadyJobsFilter.length === 0
    ) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, [
    copyFormData.allReadyJobsFilter.length,
    copyFormData.sameStageNameArray.length,
  ]);

  return (
    <>
      <Grid container>
        <Grid xs={12} mt={1} item>
          <TextField
            select
            variant="outlined"
            size="small"
            fullWidth
            label="Select a form to copy to selected job"
            onChange={OnChangeHandler}
          >
            {data?.data?.map((list: any) => (
              <MenuItem key={data._id} value={list}>
                {list?.formName ?? "-"}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container>
        {eventOccur && (
          <>
            {copyFormData?.allReadyJobsFilter.length > 0 && (
              <Grid mt={2} xs={12} item>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignContent="center"
                  gap={1}
                >
                  <InfoOutlinedIcon sx={{ color: "error.main" }} />
                  <Box>
                    <Box>
                      <Typography variant="h6" color="text.primary">
                        There are {copyFormData?.sameStageNameArray.length} job
                        that have a form with the same name.
                      </Typography>
                      <Typography variant="subtitle1" color="text.primary">
                        This form will not be copied to those jobs:
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap={0.5}
                      sx={{ overflowY: "auto", maxHeight: 100, py: 2 }}
                    >
                      {copyFormData?.sameStageNameArray.map((stageList) => (
                        <Typography
                          key={stageList._id}
                          variant="h6"
                          color="primary"
                        >
                          {stageList?.jobInfo?.jobName ?? "-"} (
                          {stageList?.requisitionId ?? "-"})
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}
            {copyFormData?.sameStageNameArray.length === 0 && (
              <Grid mt={2} xs={12} item>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignContent="center"
                  gap={1}
                >
                  <InfoOutlinedIcon sx={{ color: "error.main" }} />
                  <Box>
                    <Box display="flex" gap={0.4} flexWrap="wrap">
                      <Typography variant="subtitle1" color="text.primary">
                        There is no similar stage name in the form
                      </Typography>
                      <Typography variant="h6" color="text.primary">
                        {copyFormData?.selectedValue?.formName}
                      </Typography>
                      <Typography variant="subtitle1" color="text.primary">
                        form
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )}

            {copyFormData?.sameStageNameArray.length > 0 &&
            copyFormData?.allReadyJobsFilter.length === 0 ? (
              <Grid mt={2} xs={12} item>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignContent="center"
                  gap={1}
                >
                  <InfoOutlinedIcon sx={{ color: "error.main" }} />
                  <Box>
                    <Box display="flex" gap={0.4} flexWrap="wrap">
                      <Typography variant="subtitle1" color="text.primary">
                        You are about to copy form
                      </Typography>
                      <Typography variant="h6" color="text.primary">
                        {copyFormData?.selectedValue?.formName}
                      </Typography>
                      <Typography variant="subtitle1" color="text.primary">
                        to {copyFormData?.sameStageNameArray.length} job{" "}
                        {copyFormData?.NotASameSageName.length > 0 && (
                          <>out of {selectedRowJobs.length} job</>
                        )}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      gap={0.5}
                      sx={{
                        overflowY: "auto",
                        maxHeight: 100,
                        py: 2,
                        "&::-webkit-scrollbar": {
                          width: "5px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "#cacaca",
                          borderRadius: "10px",
                        },
                      }}
                    >
                      {copyFormData?.sameStageNameArray.map((stageList) => (
                        <Typography
                          key={stageList._id}
                          variant="h6"
                          color="primary"
                        >
                          {stageList?.jobInfo?.jobName ?? "-"} (
                          {stageList?.requisitionId ?? "-"})
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ) : null}
          </>
        )}
        <Grid xs={12} mt={2} item display="flex">
          <Box
            ml="auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Button
              onClick={() => {
                setShowCopyForm(false);
              }}
              size="small"
              variant="outlined"
            >
              Cancel
            </Button>
            <LoadingButton
              disabled={isDisabled}
              variant="contained"
              size="small"
              sx={{
                height: 35,
              }}
              type="submit"
              loading={isLoading}
              onClick={copyFormHandler}
            >
              Bulk Copy Form
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
