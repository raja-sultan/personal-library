import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFCheckbox,
} from "common";
import { Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAssignInterviewMutation } from "@services/candidate/stages/interview-stage";
import { useLazyGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import toast from "react-hot-toast";

export function AssignScoreCardModel({
  jobId,
  candidateId,
  interviewId,
}): JSX.Element {
  const [openScoreCard, setOpenScoreCard] = useState(false);
  const [assignInterview] = useAssignInterviewMutation();
  const getUsersListQuery = useLazyGetUsersListQuery();

  const method = useForm<any>({
    defaultValues: { assignedTo: null, notifyViaEmail: false },
  });
  const { handleSubmit } = method;

  async function formSubmitHandler(formData): Promise<void> {
    const payload = {
      jobId,
      body: {
        userId: formData?.assignedTo?._id,
        userName: formData?.assignedTo?.userName,
        interviewId,
        candidateId,
      },
    };
    try {
      const res = await assignInterview(payload).unwrap();
      toast.success(res?.message ?? "Assigned Successfully");
    } catch (error) {
      toast.error(error?.data?.message ?? "Some");
    }
  }

  return (
    <>
      <Button
        variant="text"
        onClick={() => {
          setOpenScoreCard(true);
        }}
      >
        Assign Scorecard
      </Button>
      <CustomModal
        onClose={() => {
          setOpenScoreCard(false);
        }}
        rootSx={{
          maxWidth: { xs: 350, sm: 600 },
        }}
        headerLabel="Assign Behavioral Phone Interview Scorecard"
        closeButtonProps={{
          onClick: () => {
            setOpenScoreCard(false);
          },
        }}
        isOpen={openScoreCard}
      >
        <FormProvider
          methods={method}
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <Stack spacing={2} pt={1}>
            <Typography variant="body2">
              Users with an assigned scorecard will be granted access to this
              interview kit & interview&apos;s scorecard.
            </Typography>
            <RHFAutocompleteAsync
              outerLabel="Assigned to"
              placeholder="Select"
              name="assignedTo"
              apiQuery={getUsersListQuery}
              getOptionLabel={(option: any) => option.userName}
            />

            <RHFCheckbox
              name="notifyViaEmail"
              label="Notify interviews via email"
            />
            <Stack direction="row" justifyContent="end" spacing={2}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </CustomModal>
    </>
  );
}
