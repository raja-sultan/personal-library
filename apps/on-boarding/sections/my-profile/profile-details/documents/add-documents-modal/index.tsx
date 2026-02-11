import {
  CustomModal,
  FormProvider,
  RHFUploadSingleFileWithPreview,
} from "common";
import React from "react";
import { useAddDocumentsModal } from "./use-documents-modal";
import { Box, Button, Typography } from "@mui/material";

function AddDocumentsModal({ open, setOpen }: any): JSX.Element {
  const { handleSubmit, onSubmit, methods } = useAddDocumentsModal();
  return (
    <CustomModal
      rootSx={styles.modalStyling}
      onClose={() => {
        setOpen(false);
      }}
      headerLabel="Add Document"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
      isOpen={open}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="subtitle1" sx={{ my: 1 }}>
          Upload
        </Typography>
        <RHFUploadSingleFileWithPreview
          name="image"
          accept={{ "image/*": [], "video/*": [] }}
          type="image"
        />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

export default AddDocumentsModal;

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 600 },
  },
  innerCardWrapper: {
    mt: 2,
    maxHeight: { xs: 500, sm: 600, xxl: 700 },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "6px",
    },
    pr: 2,
  },
};
