import { Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFUploadSingleFileWithPreview,
  WarningPrompt,
} from "common";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AddFormData, DefValue } from "./edit-task-data";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";

function EditTaskModel(): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const methods = useForm({
    defaultValues: DefValue,
    // resolver: yupResolver(EditFormSchemaModel),
  });
  const onSubmit = () => {};
  const { control, handleSubmit } = methods;
  return (
    <>
      <Button
        size="small"
        variant="contained"
        disableRipple
        disableElevation
        disableFocusRipple
        disableTouchRipple
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Edit Task
      </Button>
      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Edit detail"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: 500,
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.main",
                borderRadius: "6px",
              },
            }}
          >
            <Grid container>
              {AddFormData.map((form: any) => {
                if (form.RhfValue.name === "attachment") {
                  return (
                    <Grid
                      key={form.id}
                      xs={form.grid}
                      sx={{ py: 1, pr: 2, pl: 1 }}
                      item
                    >
                      <RHFUploadSingleFileWithPreview
                        outerLabel="Attachment"
                        name="attachment"
                        accept={{ "text/csv": [".csv"] }}
                        supportedFormats="CSV"
                        type="csv"
                      />
                    </Grid>
                  );
                } else if (form.RhfValue.name === "assignedTo") {
                  return (
                    <Grid
                      key={form.id}
                      xs={form.grid}
                      sx={{ py: 1, px: 2 }}
                      item
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Typography variant="subtitle1" color="initial">
                        1 Day
                      </Typography>
                      <form.component control={control} {...form.RhfValue} />
                      <Typography variant="subtitle1" color="initial">
                        Start Date
                      </Typography>
                    </Grid>
                  );
                }
                return (
                  <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 2 }} item>
                    <form.component control={control} {...form.RhfValue} />
                  </Grid>
                );
              })}
              <Grid xs={12} item>
                <Box mt={1} display="flex">
                  <WarningPrompt
                    mainColor="error.main"
                    heading="Warning"
                    subTitle="Are you sure you want to Delete Task?"
                    modelOpenLabel={
                      <Button size="small" color="error" variant="contained">
                        Delete
                      </Button>
                    }
                    acceptButtonLabel="Yes,sure!"
                    acceptButtonProps={{
                      variant: "contained",
                      color: "error",
                      sx: {
                        color: "white",
                      },
                    }}
                  />
                  <Box
                    ml="auto"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={1}
                    px={2}
                  >
                    <Button
                      onClick={() => {
                        setOpenModal(false);
                      }}
                      size="small"
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        height: 35,
                      }}
                      type="submit"
                    >
                      Edit
                    </LoadingButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </CustomModal>
    </>
  );
}

export default EditTaskModel;
