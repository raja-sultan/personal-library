import { Box, Button, Grid } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFUploadSingleFileWithoutPreview,
} from "common";
import React, { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
import {
  useGetJobBoardsByIdQuery,
  usePostJobBoardsMutation,
  usePutJobBoardUpdateMutation,
} from "@services/configuration/job-boards/job-boards-api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues, schema } from "./create-job.schema";
import toast from "react-hot-toast";

export function CreateJobModal(props): JSX.Element {
  const { open, setOpen, jobBoardId, setJobBoardId } = props;

  //POST API to Add Prospect
  const [postJobBoard] = usePostJobBoardsMutation();

  //Job Boards GET BY ID API
  const { data, isLoading } = useGetJobBoardsByIdQuery(jobBoardId, {
    skip: jobBoardId === null,
  });

  const [putJobBoardUpdate] = usePutJobBoardUpdateMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...data?.data,
      logo: data?.data?.logo,
    }));
  }, [jobBoardId, reset, data?.data]);

  const onSubmit = async (payload) => {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("url", payload.url);
    formData.append("logo", payload.logo);
    if (jobBoardId === null) {
      try {
        const { message } = await postJobBoard(formData).unwrap();
        toast.success(message || "Job Board Added Successfully");
        reset(defaultValues);
        setOpen(false);
      } catch (error) {
        const errMsg = error?.data?.message;
        toast.error(errMsg || "Error Occurred");
        setOpen(false);
      } finally {
        setJobBoardId(null);
      }
    } else {
      try {
        const res: any = await putJobBoardUpdate({
          jobBoardId,
          body: formData,
        }).unwrap();
        toast.success(res?.message ?? `Job Board Updated Successfully!`);
        setOpen(false);
      } catch (error: any) {
        const errMsg = error?.data?.message;
        toast.error(errMsg ?? "Something Went Wrong!");
        setOpen(false);
      } finally {
        setJobBoardId(null);
      }
    }
  };

  //Showing Loader on Edit API
  if (isLoading) {
    return <StepperFormSkeleton />;
  }

  return (
    <CustomModal
      onClose={() => {
        setOpen(false);
        setJobBoardId(null);
      }}
      rootSx={{ maxWidth: { xs: 350, sm: 650 } }}
      headerLabel="Create Your Job Board"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
          setJobBoardId(null);
        },
      }}
      isOpen={open}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <RHFTextField
              name="name"
              placeholder="Board Name"
              outerLabel="Board Name"
            />
          </Grid>
          <Grid item xs={12}>
            <RHFUploadSingleFileWithoutPreview
              name="logo"
              label="Logo"
              accept=".jpg,.jpeg,.png"
            />
          </Grid>
          <Grid item xs={12}>
            <RHFEditor
              name="description"
              label="Description"
              outerLabel="Description"
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name="url" placeholder="Enter URL" outerLabel="URL" />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
              reset(defaultValues);
              setJobBoardId(null);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
