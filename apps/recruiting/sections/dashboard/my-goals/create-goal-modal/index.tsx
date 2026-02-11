import { type SetStateAction, type Dispatch } from "react";
import {
  CustomModal,
  FormProvider,
  RHFCustomSelect,
  RHFTextField,
} from "common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button } from "@mui/material";
import toast from "react-hot-toast";
import { usePostMyGoalMutation } from "@services/dashboard/my-goals/my-goals-api";

export function CreateGoalModal({
  createNewGoal,
  setCreateNewGoal,
}: {
  createNewGoal: boolean;
  setCreateNewGoal: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  // const theme = useTheme();
  const [postMyGoal] = usePostMyGoalMutation();
  const FormSchema = Yup.object().shape({
    activity: Yup.string().required("Activity is required."),
    frequency: Yup.string().required("Frequency is required."),
    targetValue: Yup.number().required("Target Value is required."),
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      activity: "",
      frequency: "",
    },
  });

  const { handleSubmit, reset } = methods;
  const onSubmit = async (formData: any) => {
    try {
      const res = await postMyGoal({
        params: {
          timePeriod: new Date().toISOString(),
          activity: formData?.activity,
          frequency: formData?.frequency,
          targetValue: formData?.targetValue,
          progress: 0,
          flag: true,
        },
      }).unwrap();

      const successMessage = res.data
        ? `Goal created successfully`
        : "Goal created Successfully";

      toast.success(successMessage); // Pass a string to toast.success
      setCreateNewGoal(false);
      reset();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <CustomModal
      onClose={setCreateNewGoal}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, lg: 750, xl: 1000 },
      }}
      headerLabel="Create Goal"
      closeButtonProps={{
        onClick: () => {
          setCreateNewGoal(false);
        },
      }}
      isOpen={createNewGoal}
    >
      <Box sx={{ mt: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFCustomSelect
            name="activity"
            outerLabel="Activity"
            placeholder="Activity"
            options={[
              { id: 1, label: "Candidates Added", value: "CANDIDATES_ADDED" },
              { id: 2, label: "Prospects Added", value: "PROSPECTS_ADDED" },
              {
                id: 3,
                label: "Candidates Referred",
                value: "CANDIDATES_REFEERED",
              },
              { id: 4, label: "Candidates Hired", value: "CANDIDATES_HIRED" },
            ]}
            sx={{ mb: 2 }}
          />
          <RHFCustomSelect
            name="frequency"
            outerLabel="Frequency"
            placeholder="Frequency"
            options={[
              { id: 1, label: "Daily", value: "DAILY" },
              { id: 2, label: "Weekly", value: "WEEKLY" },
              { id: 3, label: "Monthly", value: "MONTHLY" },
              { id: 4, label: "Quarterly", value: "QUARTERLY" },
            ]}
            sx={{ mb: 2 }}
          />
          <RHFTextField
            type="number"
            name="targetValue"
            outerLabel="Target Value"
            placeholder="Target Value"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => {
                setCreateNewGoal(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Create Goal
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
