import * as yup from "yup";
import { Box, Button, Grid } from "@mui/material";
import {
  usePatchAllTasksMutation,
  usePatchReassignTasksMutation,
} from "@services/settings/tasks/tasks-api";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomModal, FormProvider, RHFCustomSelect } from "common";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

/**********************
    Resign Modal 
 *********************/
export function ResignModal({
  reAssignModal,
  setReAssignModal,
  rowsIds,
}): JSX.Element {
  const schema = yup.object().shape({
    assign: yup.string().required("Required"),
  });
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      assign: "",
    },
  });

  const [putReassignTasks] = usePatchReassignTasksMutation();

  const { handleSubmit } = methods;

  const submitHandler = async (data: any) => {
    try {
      await putReassignTasks({
        tasksIds: rowsIds,
        responsibleForTaskId: data?.assign,
      }).unwrap();
      toast.success(`Task Updated Successfully!`);
      setReAssignModal(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
      setReAssignModal(false);
    }
  };

  return (
    <CustomModal
      isOpen={reAssignModal}
      rootSx={{
        width: "35%",
        mt: 2,
      }}
      headerLabel="Reassign Tasks"
      closeButtonProps={{
        onClick: () => {
          setReAssignModal(false);
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} mt={1}>
            <RHFCustomSelect
              name="assign"
              outerLabel="Select an assignee for 1 task"
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
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              setReAssignModal(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" sx={{ ml: 1 }}>
            Reassign
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

export function CategoryModal({
  categoryModal,
  setCategoryModal,
  selectedRowJobs,
  rowsIds,
}): JSX.Element {
  const newSchema = yup.object().shape({
    taskCategory: yup.string().required("Required"),
  });

  const methods = useForm<any>({
    resolver: yupResolver(newSchema),
    defaultValues: {
      taskCategory: "",
    },
  });

  console.log("selectedRowJobs", selectedRowJobs);

  const [patchAllActions] = usePatchAllTasksMutation();

  const { handleSubmit } = methods;

  const submitHandler = async (data: any) => {
    const formData = new FormData();
    formData.append("taskCategory", data.taskCategory);
    try {
      await patchAllActions({
        body: formData,
        taskId: { tasksId: rowsIds },
      }).unwrap();
      toast.success(`Task Updated Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  };

  return (
    <CustomModal
      isOpen={categoryModal}
      rootSx={{
        width: "35%",
        mt: 2,
      }}
      headerLabel="Update Tasks"
      closeButtonProps={{
        onClick: () => {
          setCategoryModal(false);
        },
      }}
    >
      <Box
        sx={{
          maxWidth: { md: 650, xs: 350, sm: 450 },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
          pr: 2,
          mt: 1.5,
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} mt={1}>
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
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                setCategoryModal(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" sx={{ ml: 1 }}>
              Reassign
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
