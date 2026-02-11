import { type SetStateAction, type Dispatch } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, InputLabel, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { defaultValues, FormSchema } from "./reminder-modal.schema";
import type { reminderModalTypes } from "./reminder-modal.types";
import { useUpdateSendReminderMutation } from "@services/jobs/job-details/approvals/opening-approvals-api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";

export function SendReminderModal({
  openReminder,
  setOpenReminder,
  approvalsReminderData,
}: {
  openReminder: boolean;
  setOpenReminder: Dispatch<SetStateAction<boolean>>;
  approvalsReminderData: any;
}): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { email } = approvalsReminderData;

  const [sendReminder, { isLoading }] = useUpdateSendReminderMutation();
  const methods = useForm<reminderModalTypes>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  //Submit Function
  const onSubmit = async (data: any) => {
    const payload = {
      jobId,
      body: {
        email,
        details: data.detail,
      },
    };

    try {
      const { message } = await sendReminder(payload).unwrap();
      setOpenReminder(false);
      reset(defaultValues);
      toast.success(message || "job information edit  successfully");
    } catch (error) {
      toast.error(error.data.message || "error occur");
    }
  };

  //Close Modal
  const handleCancel = (): void => {
    setOpenReminder(false);
  };

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setOpenReminder}
      rootSx={{
        maxWidth: { xs: 350, sm: 500 },
      }}
      headerLabel="Send Reminder"
      closeButtonProps={{
        onClick: () => {
          setOpenReminder(false);
        },
      }}
      isOpen={openReminder}
    >
      <Typography variant="subtitle2" sx={{ py: 2 }}>
        We’ll include all the necessary approval details in the reminder email,
        but you can also type a message for Ruth
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column">
          <InputLabel sx={{ my: 1, color: "text.secondary" }}>
            <Typography variant="subtitle1">Detail</Typography>
          </InputLabel>
          <RHFTextField
            multiline
            fullWidth
            type="text"
            name="detail"
            placeHolder="Write Something.."
            sx={{ mb: 2 }}
            rows={3}
          />
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            Send
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
