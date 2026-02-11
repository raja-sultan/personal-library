import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFEditor,
  RHFTextField,
} from "common";
import { Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { useLazyGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useSendFormMutation } from "@services/candidate/stages/interview-stage";
import toast from "react-hot-toast";

export function SendFormModel({
  jobId,
  candidateId,
  interviewId,
  stageId,
}): JSX.Element {
  const [formSend, setFormSend] = useState(false);
  const getUsersListQuery = useLazyGetUsersListQuery();
  const [sendForm] = useSendFormMutation();
  const method = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        from: Yup.object().required("From field is required"),
        to: Yup.object().test(
          "notSameAsFrom",
          "To field cannot be the same as From field",
          function isUnique(value) {
            const { from } = this.parent;
            return !from || value !== from;
          }
        ),
      })
    ),
    defaultValues: { from: null, to: null, subject: "", body: "" },
  });
  const { handleSubmit } = method;

  async function formSubmitHandler(formData): Promise<void> {
    const payload = {
      jobId,
      body: {
        ...formData,
        from: formData?.from?.email,
        to: formData?.to?.email,
        candidateId,
        stageId,
        interviewId,
      },
    };
    try {
      const res = await sendForm(payload).unwrap();
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
          setFormSend(true);
        }}
      >
        Send
      </Button>

      <CustomModal
        onClose={() => {
          setFormSend(false);
        }}
        rootSx={{
          maxWidth: { xs: 350, sm: 600 },
        }}
        headerLabel="Send Form"
        closeButtonProps={{
          onClick: () => {
            setFormSend(false);
          },
        }}
        isOpen={formSend}
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
              outerLabel="From"
              placeholder="From"
              name="from"
              apiQuery={getUsersListQuery}
              getOptionLabel={(option: any) => option.email}
            />
            <RHFAutocompleteAsync
              outerLabel="To"
              placeholder="To"
              name="to"
              apiQuery={getUsersListQuery}
              getOptionLabel={(option: any) => option.email}
            />
            <RHFTextField
              outerLabel="Subject"
              fullWidth
              name="subject"
              placeholder="Subject"
            />
            <RHFEditor name="body" outerLabel="Body" />
            <Stack direction="row" justifyContent="end" spacing={2}>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained" type="submit">
                Send Form
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </CustomModal>
    </>
  );
}
