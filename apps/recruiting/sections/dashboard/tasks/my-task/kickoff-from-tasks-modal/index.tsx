import { type SetStateAction, type Dispatch } from "react";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";

export function KickoffFromTasksModal({
  kickoffForm,
  setKickoffForm,
}: {
  kickoffForm: boolean;
  setKickoffForm: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  // const theme = useTheme();
  const FormSchema = Yup.object().shape({
    name: Yup.array().required("Target Value is required."),
  });

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      // activity: [],
    },
  });

  const { handleSubmit } = methods;
  const onSubmit = (formData: any): any => {
    console.log(formData);
  };

  return (
    <CustomModal
      onClose={setKickoffForm}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, lg: 750, xl: 1000 },
        maxHeight: 500,
        overflow: "auto",
      }}
      headerLabel="Job Kickoff From Activity"
      closeButtonProps={{
        onClick: () => {
          setKickoffForm(false);
        },
      }}
      isOpen={kickoffForm}
    >
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Business Goals</Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          We want energetic, dependable, passionate individuals who have:
          Experience in a licensed childcare facility, leading a classroom,
          implementing lesson plans. College credits towards Early Childhood
          Education or Child Development degree preferred. The ability to meet
          state and/or accreditation requirements for education and experience.
          Able to work indoors or outdoors and engage in physical activity with
          children.
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="question1"
            outerLabel="What is the business need for opening this role? If you've hired for this position before, how has the role/team/scope of responsibilities changed since then?"
            placeholder="Answer here"
            sx={{ mb: 1.5 }}
          />
          <RHFTextField
            name="question2"
            outerLabel="What are the high-level objectives for this person?"
            placeholder="Answer here"
            sx={{ mb: 1.5 }}
          />
          <RHFTextField
            name="question3"
            outerLabel="What are the first 90 day goals for this person?"
            placeholder="Answer here"
            sx={{ mb: 1.5 }}
          />
          <RHFTextField
            name="question4"
            outerLabel="What goals need to be achieved a year from now for you to determine the hire is successful?"
            placeholder="Answer here"
            sx={{ mb: 1.5 }}
          />
          <RHFTextField
            name="question5"
            outerLabel="Who will this new hire report to?"
            placeholder="Answer here"
            sx={{ mb: 1.5 }}
          />
          <RHFTextField
            name="question6"
            outerLabel="Who will this new hire work most closely with? Who will they work with cross-departmentally? Please name key individuals."
            placeholder="Answer here"
            sx={{ mb: 1.5 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => {
                setKickoffForm(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
