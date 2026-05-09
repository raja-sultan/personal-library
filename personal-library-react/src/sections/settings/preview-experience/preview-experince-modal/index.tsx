import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFCheckbox,
  RHFCustomSelect,
  RHFTextField,
  RHFUploadSingleFileWithPreview,
  RHFUploadSingleFileWithoutPreview,
} from "common";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const FormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string().required("Middle Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  suffix: Yup.string().required("Suffix is required"),
  taskCategories: Yup.string().required("Task Categories is required"),
});

export function PreviewExperienceModal({
  isOpen,
  closeModel,
}: {
  isOpen: boolean;
  closeModel: () => void;
}): JSX.Element {
  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      preferredFirstName: "",
      preferredLastName: "",
      profileImage: null,
      details: "",
      taskCategories: "",
      dueDate: "",
      responsibleForTask: "",
      assign: "",
      attachment: null,
      requireAttachment: false,
      department: "",
      location: "",
      employmentStatus: "",
      otherCriteria: "",
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
      headerLabel="A Few Pieces of Information"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
        <Typography variant="body2">
          {`  We'll keep it simple, but we need a few details about you before you
          start! It's extremely important to submit your information as soon as
          possible, as delays may adversely impact your onboarding experience -
          specifically your system and software access during your first week in
          the office.`}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} mt={1}>
            <Typography variant="h5">Basic Information</Typography>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Typography variant="h6">Legal Name</Typography>
          </Grid>
          <Grid item xs={12} mt={1} md={6}>
            <RHFTextField
              name="firstName"
              placeholder="First Name"
              outerLabel="First Name"
            />
          </Grid>
          <Grid item xs={12} mt={1} md={6}>
            <RHFTextField
              name="middleName"
              placeholder="Middle Name"
              outerLabel="Middle Name"
            />
          </Grid>
          <Grid item xs={12} mt={1} md={6}>
            <RHFTextField
              name="lastName"
              placeholder="Last Name"
              outerLabel="Last Name"
            />
          </Grid>
          <Grid item xs={12} mt={1} md={6}>
            <RHFTextField
              name="suffix"
              placeholder="Suffix"
              outerLabel="Suffix"
            />
          </Grid>

          <Grid item xs={12} mt={1}>
            <Typography variant="h6">Preferred Name</Typography>
          </Grid>

          <Grid item xs={12} mt={1} md={6}>
            <RHFTextField
              name="preferredFirstName"
              placeholder="First Name"
              outerLabel="First Name"
            />
          </Grid>
          <Grid item xs={12} mt={1} md={6}>
            <RHFTextField
              name="preferredLastName"
              placeholder="Last Name"
              outerLabel="Last Name"
            />
          </Grid>

          <Grid item xs={12} mt={1}>
            <Typography variant="h6">Profile Name</Typography>
          </Grid>
          <Grid item xs={12} mt={1} md={6}>
            <RHFUploadSingleFileWithPreview name="profileImage" />
          </Grid>
          <Grid item xs={12} mt={1} md={6}></Grid>

          <Grid item xs={12} mt={1}>
            <RHFTextField
              name="details"
              placeholder="Write Here ...."
              outerLabel="Details / Notes"
              multiline="true"
              rows={4}
            />
          </Grid>
          <Grid item xs={12} mt={1} container>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="taskCategories"
                outerLabel="Task Categories"
                options={[
                  {
                    id: 1,
                    label: "Build Relationship",
                    value: "buildRelationship",
                  },
                  {
                    id: 2,
                    label: "Job Training",
                    value: "jobTraining",
                  },
                  {
                    id: 3,
                    label: "Know the Company",
                    value: "knowTheCompany",
                  },
                  {
                    id: 4,
                    label: "Logistics",
                    value: "logistics",
                  },
                ]}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1} container>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="dueDate"
                outerLabel="Due Date"
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
          <Grid item xs={12} mt={1} container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="responsibleForTask"
                outerLabel="Who is responsible for this task?"
                options={[
                  {
                    id: 1,
                    label: "New Hire",
                    value: "newHire",
                  },
                  {
                    id: 2,
                    label: "Manager",
                    value: "manager",
                  },
                  {
                    id: 3,
                    label: "Onboarding Coordinator",
                    value: "onboardingCoordinator",
                  },
                  {
                    id: 4,
                    label: "Employees",
                    value: "Employees",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFTextField
                name="assign"
                placeholder="Days Before Due Date"
                outerLabel="Assign"
              />
            </Grid>
          </Grid>

          <Grid item xs={12} mt={2}>
            <RHFUploadSingleFileWithoutPreview
              label="Add Attachment"
              name="attachment"
              accept="image/*"
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography variant="body2">
              Task Completion Requirements
            </Typography>
            <RHFCheckbox name="requireAttachment" label="Require Attachment" />
          </Grid>

          <Grid item xs={12} mt={1} container spacing={2}>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="department"
                outerLabel="Department"
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
                outerLabel="Location"
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
                outerLabel="Employment Status"
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
                outerLabel="Other Criteria"
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
