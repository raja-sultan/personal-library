import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFCustomSelect,
  RHFTextField,
} from "common";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const FormSchema = Yup.object().shape({
  questionsToAsk: Yup.string().required("Field is required"),
  whenToAskQuestions: Yup.string().required("Field is required"),
});

export function AddFeedbackQuestionModal({
  isOpen,
  closeModel,
}: {
  isOpen: boolean;
  closeModel: () => void;
}): JSX.Element {
  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      questionsToAsk: "",
      whenToAskQuestions: "",
      department: "",
      location: "",
      employmentStatus: "",
      otherCriteria: "",
      notifiedTo: "",
    },
  });

  const { handleSubmit } = methods;
  const submitHandler = (data: any) => {
    console.log(data);
  };
  return (
    <CustomModal
      isOpen={isOpen}
      rootSx={{
        width: { xs: "90%", sm: "50%" },
        mt: 2,
        maxHeight: { xs: 500, sm: 600, lg: 700 },
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "6px",
        },
      }}
      onClose={closeModel}
      closeButtonProps={{ onClick: closeModel }}
      headerLabel="New Feedback Question"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
        <Grid container>
          <Typography variant="body2">
            To Ensure accurate reporting this be a YES / NO question and the
            desired answer should be yes. New Hires will be able to add comments
            to their answers as well
          </Typography>

          <Grid item xs={12} mt={1}>
            <RHFTextField
              name="questionsToAsk"
              placeholder="Write Here ...."
              outerLabel="Question to ask new hire"
              multiline="true"
              rows={4}
            />
          </Grid>
          <Grid item xs={12} mt={1} container>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="whenToAskQuestions"
                outerLabel="When should this question be asked?"
                options={[
                  {
                    id: 1,
                    label: "On Start Date",
                    value: "onStartDate",
                  },
                  {
                    id: 2,
                    label: "On Due Date",
                    value: "onDueDate",
                  },
                  {
                    id: 3,
                    label: "Custom",
                    value: "custom",
                  },
                ]}
              />
            </Grid>
          </Grid>
          <Typography variant="body2" mt={2}>
            Applies to new hires whose:
          </Typography>
          <Grid item xs={12} mt={1} container spacing={1}>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="department"
                outerLabel="Department Matches"
                placeholder="Any Department"
                options={[
                  {
                    id: 1,
                    label: "Business Analysis",
                    value: "businessAnalysis",
                  },
                  {
                    id: 2,
                    label: "Human Resources",
                    value: "humanResources",
                  },
                  {
                    id: 3,
                    label: "Sales & Marketing",
                    value: "sales&Marketing",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="location"
                outerLabel="Location Matches"
                placeholder="Any Location"
                options={[
                  {
                    id: 1,
                    label: "Dublin Office",
                    value: "dublinOffice",
                  },
                  {
                    id: 2,
                    label: "Glasgow Office",
                    value: "glasgowOffice",
                  },
                  {
                    id: 3,
                    label: "London Office",
                    value: "londonOffice",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="employmentStatus"
                outerLabel="Employment Status Matches"
                placeholder="Any Employment Status"
                options={[
                  {
                    id: 1,
                    label: "Contact",
                    value: "Contact",
                  },
                  {
                    id: 2,
                    label: "Full-time",
                    value: "full-time",
                  },
                  {
                    id: 3,
                    label: "Intern",
                    value: "intern",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="otherCriteria"
                outerLabel="Other Criteria Matches"
                placeholder="Any Criteria"
                options={[
                  {
                    id: 1,
                    label: "Welcome Email",
                    value: "welcomeEmail",
                  },
                ]}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1}>
            <RHFTextField
              name="notifiedTo"
              outerLabel="Who should be notified when this is answered?"
            />
          </Grid>
          <Grid item xs={12} mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" type="button">
              Cancel
            </Button>
            <Button variant="contained" type="submit" sx={{ ml: 1 }}>
              Save and Close
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}
