import { Button, Grid } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { AddFormData, DefValue } from "../api-management.data";

function AddApiManagementModal(): JSX.Element {
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
        Create a New API Key
      </Button>
      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Create a new API Key"
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
              {AddFormData.map((form: any) => (
                <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 1 }} item>
                  <form.component control={control} {...form.RhfValue} />
                </Grid>
              ))}
              <Grid xs={12} item>
                <Box mt={1} display="flex">
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
                      
                      type="submit"
                    >
                      Create
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

export default AddApiManagementModal;
