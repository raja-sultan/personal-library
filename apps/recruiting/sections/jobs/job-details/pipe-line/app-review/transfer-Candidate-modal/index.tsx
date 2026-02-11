import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
} from "common";
import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./transfer-job.schema";
import { styles } from "./transfer-job.styles";
import {
  useLazyGetJobsDropdownQuery,
  useTransferCandidateToOtherJobMutation,
} from "@services/jobs/job-details/pipeline-api";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingButton } from "@mui/lab";

export function TransferCandidateModal({
  job,
  setJob,
}: {
  job: boolean;
  setJob: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const [transferJob, setTransferJob] = useState<boolean>(false);
  return (
    <>
      <CustomModal
        onClose={setJob}
        rootSx={{
          maxWidth: { xs: 350, sm: 700 },
        }}
        headerLabel={`Transfer Candidate's Jobs`}
        closeButtonProps={{
          onClick: () => {
            setJob(false);
          },
        }}
        isOpen={job}
      >
        <Box sx={styles.transferWrapper}>
          <Button
            variant="contained"
            onClick={() => {
              setTransferJob(true);
            }}
            sx={{ mb: { xs: 1, sm: 0 } }}
          >
            Transfer to a Different Job
          </Button>
          |<Box sx={styles.jobOneStyling}>Job 1</Box>
          <EastIcon sx={styles.arrowIcon} />
          <Box sx={styles.jobTwoStyling}>Job 2</Box>
        </Box>
      </CustomModal>
      <TransferJobsModal
        transferJob={transferJob}
        setTransferJob={setTransferJob}
        setJob={setJob}
      />
    </>
  );
}

/* Transfer Jobs Modal*/

export function TransferJobsModal({
  transferJob,
  setTransferJob,
  setJob,
}: {
  transferJob: boolean;
  setTransferJob: Dispatch<SetStateAction<boolean>>;
  setJob: (state: boolean) => void;
}): JSX.Element {
  const params = useSearchParams();
  const router = useRouter();

  const apiQuery = useLazyGetJobsDropdownQuery();

  const [moveCandidateToAnotherJob, movingJobStatus] =
    useTransferCandidateToOtherJobMutation();

  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = async (data): Promise<any> => {
    const formData = {
      jobId: data.jobName._id,
      stage: data.jobStage.value,
    };

    try {
      await moveCandidateToAnotherJob({
        body: formData,
        candidateId: params.get("candidateId"),
      }).unwrap();
      toast.success("Feedback Submitted");
      setTransferJob(false);
      setJob(false);
      router.push(`/candidates?candidateId=${params.get("candidateId")}`);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const selectedValue = watch("jobName");

  const stages = selectedValue?.stages?.map((stage: string) => {
    return { id: stage, name: stage, value: stage };
  });

  return (
    <CustomModal
      onClose={setTransferJob}
      rootSx={{
        maxWidth: { xs: 350, sm: 500 },
        px: { xs: 1, sm: 2 },
      }}
      headerLabel="Transfer to Different Job"
      closeButtonProps={{
        onClick: () => {
          setTransferJob(false);
        },
      }}
      isOpen={transferJob}
    >
      <Typography variant="subtitle2" sx={{ mt: 1, color: "text.secondary" }}>
        Transfer attachments, application questions and submitted scorecards
      </Typography>
      <Typography variant="subtitle2" sx={{ mt: 2, color: "text.secondary" }}>
        Current Job:
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: "text.primary", mb: 2, fontWeight: 600, mt: "-2px" }}
      >
        People Operations Coordinator
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
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
              outerLabel="Job"
              placeholder="Select Stage"
              fullWidth
              disabled={!stages?.length}
              name="jobStage"
              disableCloseOnSelect={false}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setTransferJob(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={movingJobStatus?.isLoading}
          >
            Move Job
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
