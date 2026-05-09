import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFCheckbox,
  RHFCustomSelect,
  RHFTextField,
  RHFUploadSingleFileWithoutPreview,
} from "common";
import useAddTask from "./use-add-task";
import { LoadingButton } from "@mui/lab";

export function AddTaskModal({ open, setOpen }): JSX.Element {
  const {
    submitHandler,
    handleSubmit,
    methods,
    departmentList,
    getOfficeListQuery,
    booleanValue,
    data,
  } = useAddTask(setOpen);

  return (
    <CustomModal
      isOpen={open}
      rootSx={{
        width: "35%",
        mt: 2,
      }}
      headerLabel="Add Task"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
        <Box
          sx={{
            maxHeight: { xs: 500, sm: 600, lg: 700 },
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "6px",
            },
            pr: 2,
          }}
        >
          <Grid container spacing={1.5}>
            <Grid item xs={12} mt={1}>
              <RHFTextField
                name="name"
                placeholder="Task Name"
                outerLabel="Name"
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <RHFTextField
                name="details"
                placeholder="Write Here ...."
                outerLabel="Details / Notes"
                multiline="true"
                rows={4}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="taskCategory"
                outerLabel="Task Categories"
                options={[
                  {
                    id: 1,
                    label: "Build Relationship",
                    value: "build_relationships",
                  },
                  {
                    id: 2,
                    label: "Job Training",
                    value: "job_training",
                  },
                  {
                    id: 3,
                    label: "Know the Company",
                    value: "know_the_company",
                  },
                  {
                    id: 4,
                    label: "Logistics",
                    value: "logistics",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RHFCustomSelect
                name="date"
                outerLabel="Due Date"
                options={[
                  {
                    id: 1,
                    label: "On Start Date",
                    value: "on_start_date",
                  },
                  {
                    id: 2,
                    label: "On Due Date",
                    value: "on_due_date",
                  },
                  {
                    id: 3,
                    label: "Custom",
                    value: "custom",
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} container spacing={2}>
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
              <Grid item xs={12} md={2}>
                <RHFTextField
                  name="assign"
                  placeholder="7"
                  outerLabel="Assign"
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  days before due date
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
              <RHFUploadSingleFileWithoutPreview
                disabled={!booleanValue}
                label="Add Attachment"
                name="attachment"
                accept=".doc, .docx, .pdf, .rtf"
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <Typography variant="body2">
                Task Completion Requirements
              </Typography>
              <RHFCheckbox name="required" label="Require Attachment" />
            </Grid>
            <Grid item xs={12} mt={1} container spacing={2}>
              <Grid item xs={12} md={6}>
                <RHFAutocompleteAsync
                  outerLabel="Select Documents"
                  name="departmentId"
                  getOptionLabel={(option: any) => option?.departmentName}
                  disableCloseOnSelect={false}
                  apiQuery={departmentList}
                  placeholder="Any Department"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutocompleteAsync
                  outerLabel="Location"
                  name="locationId"
                  getOptionLabel={(option: any) => option?.officeName}
                  disableCloseOnSelect={false}
                  apiQuery={getOfficeListQuery}
                  placeholder="Any Location"
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
                      label: "Full Time",
                      value: "Full Time",
                    },
                    {
                      id: 3,
                      label: "Part Time",
                      value: "Part Time",
                    },
                    {
                      id: 4,
                      label: "Temporary",
                      value: "Temporary",
                    },
                    {
                      id: 5,
                      label: "Intern",
                      value: "intern",
                    },
                    {
                      id: 6,
                      label: "Terminated",
                      value: "terminated",
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFAutocompleteSync
                  name="criteriaId"
                  outerLabel="Other Criteria"
                  placeholder="Any Criteria"
                  options={
                    data?.data?.criteria.length
                      ? data?.data?.criteria?.map((item) => {
                          return {
                            id: item._id,
                            name: item.criteriaName,
                            value: item._id,
                          };
                        })
                      : []
                  }
                />
              </Grid>
            </Grid>

            <Grid item xs={12} mt={2} display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <LoadingButton variant="contained" type="submit" sx={{ ml: 1 }}>
                Save and Close
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
