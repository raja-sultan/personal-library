"use client";

import CustomCard from "@components/custom-card";
import { Box, Typography, useTheme, FormLabel, DialogActions, Button } from "@mui/material";
import { viewDepartmentsHeader } from "./edit-departments-header.styles";
import { useRouter } from "next/navigation";
import CustomModal from "@components/custom-modal";
import { UseEditDepartmentHeader } from "./use-edit-departments-header";
import { EditIcon } from "@assets/icons/edit-icon";
import { SetDepartmentHeadsModal } from "../modals/set-headers-modal";
import { AddMembersModal } from "../modals/add-members-modal";
import { FormProvider, RHFTextField } from "common";
import { LoadingButton } from "@mui/lab";

export function EditDepartmentsHeader(): JSX.Element {
  const {
    mutationLoading,
    onEditModalHandler,
    isOpenEditModal,
    setIsOpenEditModal,
    methods,
    handleSubmit,
    onSubmit,
    getDepartment,
  } = UseEditDepartmentHeader();
  const styles = viewDepartmentsHeader();
  const router = useRouter();
  const theme = useTheme();
  return (
    <CustomCard
      header
      cardHeader={{
        title: "Departments",
        divider: true,
        onBack: () => {
          router.push("/settings/departments");
        },
      }}
    >
      <Box mt={2.4} gap={2} sx={styles.viewDepartmentWrapper}>
        <Box>
          <Box sx={styles.textWrapIcon}>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {getDepartment?.data?.departmentName ?? "N/A"}
            </Typography>
            <EditIcon
              onClick={onEditModalHandler}
              sx={{ cursor: "pointer", color: theme.palette.primary.main }}
            />
          </Box>

          <Typography variant="subtitle2" fontWeight={400} color="text.secondary" paddingTop="5px">
            {getDepartment?.data?.description}
          </Typography>
        </Box>
        <Box gap={1} sx={styles.buttonWrap}>
          <SetDepartmentHeadsModal getDepartment={getDepartment} />
          <AddMembersModal />
        </Box>
      </Box>

      {/* edit modal */}
      <Box>
        <CustomModal
          open={isOpenEditModal}
          onClose={() => {
            setIsOpenEditModal(false);
          }}
          title="Edit Department"
          headerIcon=""
          acceptText="Update"
          message=""
          hideFooter
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              name="name"
              outerLabel="Name"
              type="text"
              placeholder="Enter name"
              sx={{ mb: 2 }}
            />
            <RHFTextField
              name="description"
              outerLabel={
                <Box>
                  <FormLabel>Description </FormLabel>
                  <FormLabel sx={{ color: "#98A2B3" }}>(Optional)</FormLabel>
                </Box>
              }
              type="text"
              placeholder="Enter a description..."
              sx={{ mb: 2 }}
              maxRows={4}
              minRows={4}
              multiline
            />
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsOpenEditModal(false);
                }}
              >
                Cancel
              </Button>
              <LoadingButton loading={mutationLoading} variant="contained" type="submit">
                Update
              </LoadingButton>
            </DialogActions>
          </FormProvider>
        </CustomModal>
      </Box>
    </CustomCard>
  );
}
