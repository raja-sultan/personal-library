import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";
import { CustomModal, FormProvider, RHFAutocompleteAsync } from "common";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./email-modal.schema";
import { AddCandidateFormData } from "./email-modal.data";
import { useSendEmailMutation } from "@services/send-email-api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useLazyGetEmailTemplatesQuery } from "@services/candidate/candidate-details/tools/email-team-api";
import { useGetJobCandidateQuery } from "@services/jobs/job-details/pipeline-api";
import { useSearchParams } from "next/navigation";

export function EmailModal(props): JSX.Element {
  const { email, setEmail, initialData } = props;
  const params = useSearchParams();
  //Email Templates GET Api
  const emailTemplates = useLazyGetEmailTemplatesQuery();
  const [sendEmailHandler] = useSendEmailMutation();
  //candidate GET API
  const { data: jobDetails } = useGetJobCandidateQuery({
    candidateId: params.get("candidateID"),
  });

  const candidateEmail = jobDetails?.data?.info?.email?.emailAddress;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues, recipients: candidateEmail },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const extendedCC = data.ccMe
      ? [...data.ccRecipients, data.from]
      : [...data.ccRecipients];
    const body = {
      template: data.template.template_name,
      recipients: data.recipients,
      ccRecipients: extendedCC,
      subject: data.subject,
      html: data.html,
    };
    try {
      const res = await sendEmailHandler({
        body,
        emailSendAt: dayjs(data.emailSendAt),
      }).unwrap();
      toast.success(res.message ?? "Email Sent Successfully");
      setEmail(false);
      reset();
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong!");
    }
  };

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...initialData,
    }));
  }, [initialData, reset]);

  return (
    <CustomModal
      onClose={() => {
        setEmail(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="Email Candidate"
      closeButtonProps={{
        onClick: () => {
          setEmail(false);
        },
      }}
      isOpen={email}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.innerCardWrapper}>
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                name="template"
                outerLabel="Templates"
                getOptionLabel={(option: any) =>
                  option?.template_name === null ||
                  option?.template_name === undefined
                    ? ""
                    : option?.template_name
                }
                disableCloseOnSelect={false}
                apiQuery={emailTemplates}
                placeholder="Select Template"
              />
            </Grid>
            {AddCandidateFormData()?.jobCandidateInitialDetails?.map((item) => (
              <Grid item xs={12} md={item?.md} key={item.id}>
                <item.component {...item.componentProps} fullWidth>
                  {item?.componentProps?.options?.map((option: any) => (
                    <option key={option?.id} value={option?.value}>
                      {option?.name}
                    </option>
                  ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setEmail(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Send Email
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 700 },
  },
  innerCardWrapper: {
    mt: 2,
    maxHeight: { xs: 500, sm: 600, lg: 650, xxl: 700 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    pr: 2,
  },
};
