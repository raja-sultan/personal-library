import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import {
  usePostInterviewerTagsMutation,
  useUpdateInterviewerTagsMutation,
} from "@services/configuration/interviewer-tags-api/interviewer-tags-api";
import { CustomModal, FormProvider, RHFTextField } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function InterviewerTagsModalBox(props): JSX.Element {
  const {
    isEditModal,
    openEditModal,
    setOpenEditModal,
    idForUpdateDelete,
    getDataOnEdit,
  } = props;
  const [postInterviewerTag, { isLoading: isLoadingCreateTag }] =
    usePostInterviewerTagsMutation();
  const [updateInterviewerTags, { isLoading: isLoadingUpdateTag }] =
    useUpdateInterviewerTagsMutation();
  const methods = useForm({
    defaultValues: { interviewerTag: getDataOnEdit ?? "" },
    resolver: yupResolver(
      Yup.object({
        interviewerTag: Yup.string().required(
          "Interviewer Tag is a required field"
        ),
      })
    ),
  });

  const { handleSubmit } = methods;
  const onSubmit = async (formValues): Promise<void> => {
    if (!isEditModal) {
      try {
        await postInterviewerTag(formValues);
        toast.success(`Interviewer Tags created successfully!`);
        setOpenEditModal(false);
      } catch (error: any) {
        const errMsg = error?.data?.message;
        toast.error(errMsg ?? "Something Went Wrong!");
      }
    } else {
      try {
        await updateInterviewerTags({
          tagId: idForUpdateDelete,
          formValues,
        });
        toast.success(`Interviewer Tags Updated successfully!`);
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
        isEditModal ? "Edit Interviewer Tags" : "Create a New Interviewer Tags"
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
            name="interviewerTag"
            fullWidth
            placeholder="Write here...."
            size="small"
            outerLabel="Name of Interviewer Tag"
          />
          <Box display="flex" justifyContent="end" gap={2} mt={2}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setOpenEditModal(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isEditModal ? isLoadingUpdateTag : isLoadingCreateTag}
              size="small"
            >
              {isEditModal
                ? "Update Interviewer Tags"
                : "Create Interviewer Tags"}
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
