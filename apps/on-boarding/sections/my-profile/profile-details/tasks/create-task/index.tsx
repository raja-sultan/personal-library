import {
  CustomModal,
  FormProvider,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFileWithPreview,
} from "common";
import React from "react";
import { useCreateTaskModal } from "./use-task-modal";
import { Box, Button, Grid, Typography } from "@mui/material";
import { createTaskDetails } from "./create-task-data";

function CreateTaskModal({ open, setOpen }: any): JSX.Element {
  const { handleSubmit, onSubmit, methods } = useCreateTaskModal();

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
        <Box sx={styles.innerCardWrapper}>
          {createTaskDetails()?.taskDetails?.map((item) => (
            <item.component {...item.componentProps} sx={{ mb: 1.5 }} key={item.id}>
              {item?.componentProps?.options?.map((option: any) => (
                <option key={option?.id} value={option?.value}>
                  {option?.name}
                </option>
              ))}
            </item.component>
          ))}
          <Typography variant="subtitle1">Task Assignment Notification (Optional)</Typography>
          <Grid container alignItems="center" columnGap={1} sx={{ my: 1.5 }}>
            <Typography variant="subtitle2" sx={{ my: 1, color: "text.secondary" }}>
              Send email
            </Typography>
            <Grid item xs={12} sm={1.5}>
              <RHFTextField name="days" placeholder="01" />
            </Grid>
            <Typography variant="subtitle2" sx={{ my: 1, color: "text.secondary" }}>
              day before due date
            </Typography>
          </Grid>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Attachment (Optional)
            </Typography>
            <RHFUploadSingleFileWithPreview
              name="attachment"
              accept={{ "image/*": [], "video/*": [] }}
              type="image"
            />
          </Box>
          <Box sx={{ pl: 1, mt: 1 }}>
            <RHFSwitch name="attachment" label="Require Attachment" />
          </Box>
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
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

export default CreateTaskModal;

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 600, md: 650 },
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
