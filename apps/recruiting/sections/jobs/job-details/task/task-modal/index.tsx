import React, { useState } from "react";
import { CustomModal, FormProvider } from "common";
import { Box, Button, Grid, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { TasksTypes } from "../task.header.data";
import {
  useAddTasksMutation,
  useUpdateTaskMutation,
} from "@services/sourcing/tasks";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddTaskFormData, schema, taskInitialValue } from "./task-model.data";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "next/navigation";
import { useLazyGetAllUsersQuery } from "@services/jobs/job-details/forms/forms-api";
import { omit } from "lodash";
interface TaskModalProps {
  headerLabel: string;
  submitLabel?: string;
  apiData?: any;
  action: "add" | "edit" | "view";
}
export function TaskModal(props: TaskModalProps): JSX.Element {
  //PROPS
  const { headerLabel, apiData, action, submitLabel } = props;
  // const rowId = apiData?._id;
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  //STATE AND FUNCTIONS
  const [model, setModel] = useState(false);
  //API HANDLERS
  const [addTasks, { isLoading }] = useAddTasksMutation();
  const [updateTask] = useUpdateTaskMutation();
  const getAllUsersQuery = useLazyGetAllUsersQuery();
  //CONVERTS DATE INTO READABLE FORMAT
  // const getData = (apiData) => {};
  const UpdateData: any = {};
  for (const key in apiData) {
    UpdateData[key] = apiData[key];

    if (key.includes("Date")) {
      UpdateData[key] = new Date(apiData[key]);
    }
  }
  UpdateData.assignee = {
    userName: apiData?.assigneeName,
    _id: apiData?.assigneeId,
  };

  // FORM CONTROLS
  const methods = useForm<TasksTypes>({
    defaultValues:
      action === "edit" || action === "view" ? UpdateData : taskInitialValue,
    resolver: yupResolver(schema),
  });
  const { handleSubmit, reset } = methods;

  // FUNCTIONS
  // : Promise<any>
  async function FormSubmitHandler(submitData: any): Promise<any> {
    const updateData: any = { ...submitData };
    updateData.assigneeId = submitData.assignee._id;
    updateData.assigneeName = submitData.assignee.userName;

    if (action === "add") {
      //Add api call
      try {
        const { message }: any = await addTasks({
          ...omit(updateData, "assignee"),
          jobId,
        }).unwrap();
        toast.success(message?.data?.message ?? "Task created successfully");
        reset();
        setModel(false);
      } catch (error) {
        toast.error(error.data.message);
      }
    } else if (action === "edit") {
      //edit Api call
      try {
        const respon = await updateTask({
          body: {
            ...omit(updateData, [
              "_id",
              "updatedAt",
              "assignee",
              "createdBy",
              "createdAt",
              "companyId",
            ]),
          },
          params: {
            id: updateData._id,
          },
        }).unwrap();
        toast.success("Task edited successfully");
        reset();
        setModel(false);
      } catch (error) {
        toast.error(error.data.message ?? "SomeThing Went Wrong");
      }
    } else return null;
  }
  return (
    <>
      {action === "add" && (
        <Button
          variant="contained"
          sx={{ whiteSpace: "nowrap", marginRight: "10px" }}
          onClick={() => {
            setModel(true);
          }}
        >
          Create Task
        </Button>
      )}
      {action === "edit" && (
        <MenuItem
          onClick={() => {
            setModel(true);
          }}
        >
          Edit
        </MenuItem>
      )}
      {action === "view" && (
        <MenuItem
          onClick={() => {
            setModel(true);
          }}
        >
          View
        </MenuItem>
      )}
      <CustomModal
        onClose={() => {
          setModel(false);
        }}
        rootSx={{
          maxWidth: 600,
        }}
        closeButtonProps={{
          onClick: () => {
            setModel(false);
          },
        }}
        headerLabel={headerLabel}
        isOpen={model}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(FormSubmitHandler)}
        >
          {AddTaskFormData(getAllUsersQuery).map((form: any) => (
            <Grid item key={form.id} sx={{ py: 1, px: 1 }}>
              {action === "view" ? (
                <form.component disabled {...form?.componentProps} />
              ) : (
                <form.component {...form?.componentProps} />
              )}
            </Grid>
          ))}
          <Box
            mt={2}
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setModel(false);
              }}
            >
              Cancel
            </Button>
            {submitLabel && (
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{ borderRadius: "8px" }}
                loading={isLoading}
              >
                {submitLabel}
              </LoadingButton>
            )}
          </Box>
        </FormProvider>
      </CustomModal>
    </>
  );
}
