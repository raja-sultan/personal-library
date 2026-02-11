import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
} from "common";
import React from "react";
import {
  useLazyGetJobsDropdownQuery,
  useTransferCandidateToOtherJobMutation,
} from "@services/jobs/job-details/pipeline-api";
import { schema, defaultValues } from "./different-job.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export function DifferentJobTransfer(props): JSX.Element {
  const { differentJob, setDifferentJob, jobsName } = props;
  const params = useSearchParams();
  const apiQuery = useLazyGetJobsDropdownQuery();

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;
  const selectedValue = watch("jobName");

  const [moveCandidateToAnotherJob, movingJobStatus] =
    useTransferCandidateToOtherJobMutation();

  const onSubmit = async (data): Promise<any> => {
    const formData = {
      jobId: data.jobName._id,
      stage: data.jobStage.value,
    };
    try {
      const { message } = await moveCandidateToAnotherJob({
        body: formData,
        candidateId: params.get("candidateID"),
      }).unwrap();
      toast.success(message ?? "Job Transferred Successfully");
      setDifferentJob(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const stages = selectedValue?.stages?.map((stage: string) => {
    return { id: stage, name: stage, value: stage };
  });

  return (
    <CustomModal
      onClose={() => {
        setDifferentJob(false);
      }}
      rootSx={{ maxWidth: { xs: 350, sm: 600 } }}
      headerLabel="Transfer to Different Job"
      headerSubLabel="Transfer attachments, application questions and submitted scorecards"
      closeButtonProps={{
        onClick: () => {
          setDifferentJob(false);
        },
      }}
      isOpen={differentJob}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              sx={{ color: "text.secondary", mt: { xs: 2, sm: 3 } }}
            >
              Current Job:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
              {jobsName ?? "-"}
            </Typography>
            <RHFAutocompleteAsync
              name="jobName"
              outerLabel="Job Name"
              placeholder="Select Job"
              getOptionLabel={(option: any) => option.jobName}
              disableCloseOnSelect={false}
              apiQuery={apiQuery}
            />
          </Grid>
          <Grid item xs={12}>
            <RHFAutocompleteSync
              options={
                stages ?? [{ id: 1, name: "No Stages Found", value: undefined }]
              }
              getOptionLabel={(option: any) => option.name}
              outerLabel="Job Stage"
              placeholder="Select Stage"
              fullWidth
              name="jobStage"
              disableCloseOnSelect={false}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setDifferentJob(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={movingJobStatus?.isLoading}
          >
            Move to Job
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
