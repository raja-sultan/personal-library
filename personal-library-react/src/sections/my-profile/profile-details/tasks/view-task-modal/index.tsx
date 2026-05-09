import {
  CustomModal,
  FormProvider,
  RHFSwitch,
  RHFUploadSingleFileWithPreview,
} from "common";
import React from "react";
import { useViewTaskModal } from "./use-task-modal";
import { Alert, Box, Button, Typography } from "@mui/material";
import { taskDetails } from "./task-modal.data";

function ViewTaskModal({ edit, setEdit }: any): JSX.Element {
  const { handleSubmit, onSubmit, methods } = useViewTaskModal();

  return (
    <CustomModal
      rootSx={styles.modalStyling}
      onClose={() => {
        setEdit(false);
      }}
      headerLabel="Add Document"
      closeButtonProps={{
        onClick: () => {
          setEdit(false);
        },
      }}
      isOpen={edit}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.innerCardWrapper}>
          <Alert
            severity="success"
            action={
              <Button color="inherit" size="small" sx={{ mt: -0.5 }}>
                Undo
              </Button>
            }
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Hurray! Martha Stewart completed this task on 3 Sep 2023.
            </Typography>
          </Alert>
          {taskDetails?.map((item) => (
            <Box key={item.id}>
              {item.id === 4 && (
                <Typography variant="body1" sx={{ mt: 3, fontWeight: 600 }}>
                  New Hire Information
                </Typography>
              )}
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1.5 }}>
                {item?.label}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                {item?.description}
              </Typography>
              {item?.list?.map((list) => (
                <Box component="ul" sx={styles.unorderedList} key={list.id}>
                  <li style={{ fontSize: "14px", margin: "-10px 0" }}>
                    {list.title}
                  </li>
                </Box>
              ))}
            </Box>
          ))}
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Attachment
            </Typography>
            <RHFUploadSingleFileWithPreview
              name="image"
              accept={{ "image/*": [], "video/*": [] }}
              type="image"
            />
          </Box>
          <Box sx={{ pl: 1.5, mt: 1 }}>
            <RHFSwitch name="attachment" label="Require Attachment" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Mark Complete
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

export default ViewTaskModal;

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
  unorderedList: {
    listStyleType: "disc",
    marginLeft: "10px",
    paddingLeft: "10px",
  },
};
