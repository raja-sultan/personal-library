import CustomModal from "@components/custom-modal";
import { Box, Button, DialogActions } from "@mui/material";
import { FormProvider, RHFAutocompleteSync, RHFTextField } from "common";
import React from "react";
// import { styles } from "@sections/settings/career/skills/tabs/skill/new-skill-modal/new-skill-styles";
// import { useNewSkillModal } from "@sections/settings/career/skills/tabs/skill/new-skill-modal/use-new-skill-modal";
import { LoadingButton } from "@mui/lab";
import { useNewSkillModal } from "./use-new-skill-modal";
import { skillModalStyles } from "./new-skill-styles";

function NewSkillModal(props): JSX.Element {
  const { open, onClose, handleClose, isEdit, getCareerSkillsId ,} = props;
  const { methods, handleSubmit, onSubmit, getCareerPlanData, isCreateLoading,
    isUpdateLoading, } = useNewSkillModal(isEdit, getCareerSkillsId,onClose);

    const styles = skillModalStyles

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      headerIcon={false}
      title={isEdit ? "Edit Skill" : "Create Skill"}
      acceptText=""
      message=""
      hideFooter
    >
      <Box sx={styles.modalInnerContentWrap}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <RHFTextField
              name="name"
              outerLabel="Name"
              placeholder="Skill Name"
              fullWidth
              size="small"
            />
          </Box>

          <Box sx={{ marginY: 3 }}>
            <RHFTextField
              name="description"
              outerLabel="Description (Optional)"
              placeholder="Enter a description..."
              multiline
              minRows={3}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <RHFAutocompleteSync
              multiple
              name="plans"
              outerLabel="Plans (Optional)"
              placeholder="Select"
              size="small"
              options={
                getCareerPlanData?.data?.length
                  ? getCareerPlanData?.data?.map((items) => {
                    return {
                      id: items?.value,
                      name: items?.text,
                    };
                  })
                  : []
              }
            />
          </Box>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton loading={isCreateLoading || isUpdateLoading} type="submit" variant="contained">
              Save
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}

export default NewSkillModal;
