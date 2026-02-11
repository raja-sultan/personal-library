import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import {
  usePostCandidateTagMutation,
  useUpdateCandidateTagMutation,
} from "@services/configuration/candidate-tags-api/candidate-tags-api";
import { CustomModal, FormProvider, RHFTextField } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function CandidateTagsForModalBox(props): JSX.Element {
  const {
    isEditModal,
    openEditModal,
    setOpenEditModal,
    idForUpdateDelete,
    getDataOnEdit,
  } = props;
  const [postCandidateTag, { isLoading: isLoadingCreateCandidateTag }] =
    usePostCandidateTagMutation();
  const [updateCandidateTag, { isLoading: isLoadingUpdateCandidateTag }] =
    useUpdateCandidateTagMutation();
  const methods = useForm({
    defaultValues: { candidateTag: getDataOnEdit ?? "" },
    resolver: yupResolver(
      Yup.object({
        candidateTag: Yup.string().required(
          "Candidate Tag is a required field"
        ),
      })
    ),
  });
  const { handleSubmit } = methods;
  const onSubmit = async (formValues): Promise<void> => {
    if (!isEditModal) {
      try {
        await postCandidateTag(formValues);
        toast.success(`Candidate Tag created successfully!`);
        setOpenEditModal(false);
      } catch (error: any) {
        const errMsg = error?.data?.message;
        toast.error(errMsg ?? "Something Went Wrong!");
      }
    } else {
      try {
        await updateCandidateTag({
          tagId: idForUpdateDelete,
          formValues,
        });
        toast.success(`Candidate Tag Updated successfully!`);
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
        isEditModal ? "Edit Candidate Tag" : "Create a New Candidate Tag"
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
            name="candidateTag"
            fullWidth
            placeholder="Write here...."
            size="small"
            outerLabel="Name of Candidate Tag"
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
                  ? isLoadingUpdateCandidateTag
                  : isLoadingCreateCandidateTag
              }
              size="small"
            >
              {isEditModal ? "Update Candidate Tag" : "Create Candidate Tag"}
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
