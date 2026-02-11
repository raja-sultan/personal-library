import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteSync,
  RHFDatePicker,
  RHFTextField,
} from "common";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAddFollowUpReminderMutation } from "@services/candidate/follow-up-reminder-api.tsx/follow-up-reminder-api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

export function FollowUpReminder({ reminderForList }: any): JSX.Element {
  const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
  const [addFollowUpReminder] = useAddFollowUpReminderMutation();
  const {
    user: { firstName, lastName },
  } = useSelector((state: any) => state.auth);
  const params = useSearchParams();
  const candidateId = params.get("candidateID");

  const closeModal = (): void => {
    setShowReminderModal(false);
  };
  const methods: any = useForm<any>({
    defaultValues: {
      dateAndTime: new Date(),
      reminderFor: null,
      note: "",
    },
    resolver: yupResolver(
      Yup.object().shape({
        note: Yup.string().required("Required Field"),
      })
    ),
  });

  const { handleSubmit } = methods;

  const submitHandler = async (data: any): Promise<void> => {
    const payload = {
      note: data?.note,
      createdBy: `${firstName} ${lastName}`,
      dateAndTime: data?.dateAndTime,
      reminderFor: [data?.reminderFor?.value],
    };
    try {
      const res: any = await addFollowUpReminder({
        payload,
        candidateId,
      });
      toast.success(res?.data?.message ?? "Note Added Successfully");
      setShowReminderModal(false);
    } catch (error) {
      toast.error(error.message ?? "Something Went wrong");
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h6">Follow-up Reminder</Typography>
        <Typography
          variant="h6"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={() => {
            setShowReminderModal(true);
          }}
        >
          Add
        </Typography>
      </Grid>

      <CustomModal
        isOpen={showReminderModal}
        rootSx={{ width: { xs: "90%", sm: "50%" } }}
        headerLabel="Add Follow-Up Reminder"
        onClose={closeModal}
        closeButtonProps={{ onClick: closeModal }}
      >
        <Typography variant="body2">
          This follow-up reminder will be emailed to the selected users below
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={6}>
              <RHFDatePicker name="dateAndTime" outerLabel="Select a date" />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFAutocompleteSync
                name="reminderFor"
                outerLabel="Who is this reminder for?"
                options={
                  reminderForList !== undefined
                    ? Object?.entries(reminderForList).map(
                        ([key, value], index) => {
                          return {
                            id: index + 1,
                            name: key,
                            value,
                          };
                        }
                      )
                    : []
                }
              />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField
                name="note"
                multiline
                rows={4}
                placeholder="Add a Note"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button type="button" variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ ml: 1 }}>
                Set Follow up
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomModal>
    </Grid>
  );
}
