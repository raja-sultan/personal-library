import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFileWithPreview,
} from "common";
import React from "react";
import { useForm } from "react-hook-form";
import { addNewTaskFieldData, defaultValues, schema } from "./data";
import { yupResolver } from "@hookform/resolvers/yup";

export default function NewHireAddNewTask(props): JSX.Element {
  const { openTaskModal, setOpenTaskModal } = props;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  const requiredValue: any = watch("requireAttachments");

  const onSubmit = (formData: any): any => {
    console.log(formData);
  };

  return (
    <CustomModal
      onClose={setOpenTaskModal}
      rootSx={{
        maxWidth: { xs: 350, sm: 600, md: 650 },
      }}
      headerLabel="Task"
      closeButtonProps={{
        onClick: () => {
          setOpenTaskModal(false);
        },
      }}
      isOpen={openTaskModal}
    >
      <Box
        sx={{
          mt: 2,
          maxHeight: { xs: 500, sm: 600, xxl: 650 },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
          pr: 2,
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2.5}>
            {addNewTaskFieldData?.map((item) => (
              <React.Fragment key={item?.id}>
                <Grid item md={item?.md} xs={12}>
                  <item.component {...item?.componentProps} />
                </Grid>
                {item.id === 5 && (
                  <>
                    <Grid
                      item
                      xs={12}
                      md={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        Send email
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={1.9}>
                      <RHFTextField name="taskNotification" placeholder="01" />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        day before due date
                      </Typography>
                    </Grid>
                  </>
                )}
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Attachment<span style={{ opacity: 0.7 }}> (optional)</span>
              </Typography>
              <RHFUploadSingleFileWithPreview
                disabled={!requiredValue}
                name="file"
              />
            </Grid>

            <Grid item xs={12} sx={{ ml: 1.5 }}>
              <RHFSwitch
                name="requireAttachments"
                label={
                  <>
                    <Typography
                      sx={{
                        ml: 1,
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "text.secondary",
                      }}
                    >
                      Require Attachment
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        ml: 1,
                        color: "text.secondary",
                      }}
                    >
                      Task completion requirement
                    </Typography>
                  </>
                }
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              size="medium"
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => {
                setOpenTaskModal(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" size="medium">
              Save
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </CustomModal>
  );
}
