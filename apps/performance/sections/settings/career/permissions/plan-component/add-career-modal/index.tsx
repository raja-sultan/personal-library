import CustomModal from "@components/custom-modal";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FormProvider, RHFSwitch, RHFTextField } from "common";
import { useAddCareerModal } from "./use-add-career-modal";
import { CircleDeleteIcon } from "@assets/icons";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.CAREER.CATEGORY;

export function AddCareerModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: any;

}): JSX.Element {

  const {
    handleSubmit,
    methods,
    onSubmit,
    handleOpenDeleteModal,
    openDeleteModal,
    handleDeleteCareerVision,
  } = useAddCareerModal({ data, onClose });
  return (
    <>
      <CustomModal
        open={open}
        onClose={onClose}
        headerIcon={false}
        message={false}
        title="Career Vision"
        hideFooter
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack px="10px" gap="2rem">
            <RHFTextField
              name="name"
              fullWidth
              outerLabel="Name"
              size="small"
              placeholder="Name"
            />
            <RHFTextField
              name="description"
              fullWidth
              outerLabel="Description"
              multiline
              minRows={3}
              placeholder="Enter a description..."
            />
            <RHFSwitch
              name="enabled"
              label="Enabled"
              size="small"
              sx={{ pl: 1, gap: "24px", "& ._label": { fontSize: "1.4rem" } }}
              classes={{ label: "_label" }}
            />
            <Typography color="neutral.500" variant="subtitle2">
              Disabling this question will hide it from the employee and manager
              view. Employees who have already answered this question will still
              see this question and their answer in their career vision.
            </Typography>

            <Box
              display="flex"
              justifyContent={data?._id ? "space-between" : "flex-end"}
            >
              <PermissionProtected permission={PERMISSION.DELETE}>
                {data?._id && (
                  <CircleDeleteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleOpenDeleteModal();
                    }}
                  />
                )}
              </PermissionProtected>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  {data?._id ? "Save" : "Create"}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </FormProvider>
      </CustomModal>
      {openDeleteModal && (
        <CustomModal
          message="Are you sure you want to delete this?"
          open={openDeleteModal}
          onClose={handleOpenDeleteModal}
          onAccept={handleDeleteCareerVision}
        />
      )}
    </>
  );
}