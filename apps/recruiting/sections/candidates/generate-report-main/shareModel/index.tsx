import React, { useState } from "react";
import {
  CustomModal, FormProvider,
} from "common";
import { Box, Button, Grid} from "@mui/material";
import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import type { TasksTypes } from "../task.header.data";
import { useAddTasksMutation } from "@services/sourcing/tasks";
import { yupResolver } from "@hookform/resolvers/yup";
// import { AddTaskFormData, schema, taskInitialValue } from "./task-model.data";
// import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import { LoadingButton } from "@mui/lab";
import {  DownloadIcon } from "@assets/icons";
import { ShareFormData, schema, taskInitialValue } from "./share-model.data";
import toast from "react-hot-toast";
// import { ChangePasswordIcon, DownloadIcon } from "@assets/icons";
interface TaskModalProps {
  headerLabel: string;
  submitLabel?: string;
  apiData?: any;
}
export function TaskModal(props: TaskModalProps): JSX.Element {
  //PROPS
  const { headerLabel, apiData,  submitLabel } = props;
//   const rowId= apiData?._id
  //STATE AND FUNCTIONS
  const [model, setModel] = useState(false);
  //CONVERTS DATE INTO READABLE FORMAT
  const UpdateData: any = {};
  for (const key in apiData) {
    UpdateData[key] = apiData[key];
    if (key.includes("Date")) {
      UpdateData[key] = new Date(apiData[key]);
    }
  }
  // FORM CONTROLS
  const methods = useForm({
    defaultValues: taskInitialValue,
    resolver: yupResolver(schema),
  })
  const { handleSubmit, reset} = methods;
  
  //API HANDLERS
  const [addTasks, { isLoading }] = useAddTasksMutation()
  

  // FUNCTIONS
  async function FormSubmitHandler(submitData: any): Promise<any> {
  
      //Add api call
      try {
        const { message }:any = await addTasks(submitData).unwrap();
        toast.success(message?.data?.message ?? "Data Submit Successfully");
        reset();
        setModel(false);
      } catch (error) {
        toast.error(error.data.message);
      }
   
      //edit Api call
   
  }
  return (
    <>
    <Box display="flex" >
        <Button
          // variant="outlined"
          variant="outlined"
            color="primary"
          sx={{ whiteSpace: "nowrap", marginRight: "10px",height:"37px" }}
          onClick={() => {
            setModel(true);
          }}
        >
          Share
        </Button>
        {/* <Button variant="outlined" > */}
        <DownloadIcon />
                {/* </Button> */}
                </Box>
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
           {ShareFormData.map((form: any) => (
              <Grid item  key={form.id} sx={{ py: 1, px: 1 }} >
              {  <form.component  {...form?.componentProps} />}
             
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
