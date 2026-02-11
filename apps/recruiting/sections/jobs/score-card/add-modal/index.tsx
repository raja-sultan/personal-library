import type { SetStateAction, Dispatch } from "react";
import { Box, Button, InputLabel } from "@mui/material";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { useAddModal } from "./use-add-modal";
import { LoadingButton } from "@mui/lab";

export function AddCategoryModal({
  openCategory,
  setOpenCategory,
}: {
  openCategory: boolean;
  setOpenCategory: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const { handleSubmit, onSubmit, methods, handleCancel, isSubmitting } =
    useAddModal({
      setOpenCategory,
    });

  return (
    /*Custom Modal*/
    <CustomModal
      onClose={setOpenCategory}
      rootSx={{
        maxWidth: { xs: 350, sm: 500 },
      }}
      headerLabel="Add Category"
      closeButtonProps={{
        onClick: () => {
          setOpenCategory(false);
        },
      }}
      isOpen={openCategory}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <InputLabel sx={{ mt: 2, mb: 1, color: "text.secondary" }}>
          Category Name
        </InputLabel>
        <RHFTextField
          fullWidth
          type="text"
          name="category"
          id="category"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
