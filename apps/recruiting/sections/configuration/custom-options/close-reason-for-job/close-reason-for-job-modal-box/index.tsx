import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import {
  usePostCloseReasonForJobMutation,
  useUpdateCloseReasonForJobMutation,
} from "@services/configuration/close-reason-for-job-api/close-reason-for-job-api";
import { CustomModal, FormProvider, RHFTextField } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function CloseReasonsForJobModalBox(props): JSX.Element {
  const {
    isEditModal,
    openEditModal,
    setOpenEditModal,
    idForUpdateDelete,
    getDataOnEdit,
  } = props;
  const [postCloseReason, { isLoading: isLoadingCreateCloseReason }] =
    usePostCloseReasonForJobMutation();
  const [updateCloseReason, { isLoading: isLoadingUpdateCloseReason }] =
    useUpdateCloseReasonForJobMutation();
  const methods = useForm({
    defaultValues: { closeReason: getDataOnEdit ?? "" },
    resolver: yupResolver(
      Yup.object({
        closeReason: Yup.string().required("Close Reason is a required field"),
      })
    ),
  });

  const { handleSubmit } = methods;
  const onSubmit = async (formValues): Promise<void> => {
    if (!isEditModal) {
      try {
        await postCloseReason(formValues);
        toast.success(`Close Reason created successfully!`);
        setOpenEditModal(false);
      } catch (error: any) {
        const errMsg = error?.data?.message;
        toast.error(errMsg ?? "Something Went Wrong!");
      }
    } else {
      try {
        await updateCloseReason({
          reasonId: idForUpdateDelete,
          formValues,
        });
        toast.success(`Close Reason Updated successfully!`);
        setOpenEditModal(false);
      } catch (error: any) {
        const errMsg = error?.data?.message;
        toast.error(errMsg ?? "Something Went Wrong!");
      }
    }
  };

  return (
    <CustomModal
      isOpen={openEditModal}
      onClose={setOpenEditModal}
      closeButtonProps={{
        onClick: () => {
          setOpenEditModal(false);
        },
      }}
      headerLabel={
        isEditModal ? "Edit Close Reason" : "Create a New Close Reason"
      }
      rootSx={{
        maxWidth: { md: 700, xs: 350, sm: 450 },
        pb: 1,
        px: 3,
        borderRadius: 1,
        overflow: "scroll",
        "::-webkit-scrollbar": {
          width: "0px",
        },
      }}
    >
      <Box sx={{ mt: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="closeReason"
            fullWidth
            placeholder="Write here...."
            size="small"
            outerLabel="Name of Close Reason"
          />
          <Box display="flex" justifyContent="end" gap={1.5} mt={3}>
            <Button variant="outlined" onClick={() => setOpenEditModal(false)}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={
                isEditModal
                  ? isLoadingUpdateCloseReason
                  : isLoadingCreateCloseReason
              }
              size="small"
            >
              {isEditModal ? "Update Close Reason" : "Create Close Reason"}
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
