import { Box, Button, Grid } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFUploadSingleFileWithPreview,
} from "common";
import React from "react";
//import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

export function LogoModal(props): JSX.Element {
  const { open, setOpen } = props;
  const methods = useForm<any>({
    // resolver: yupResolver(schema),
    defaultValues: {
      logo: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <CustomModal
      onClose={() => {
        setOpen(false);
      }}
      rootSx={{ maxWidth: { xs: 350, sm: 600 } }}
      headerLabel="Edit Logo"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
      isOpen={open}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <RHFUploadSingleFileWithPreview
              label="Add Logo"
              name="logo"
              accept=".jpg,.jpeg,.png,.pdf,"
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton fullWidth variant="contained" type="submit">
            Upload
          </LoadingButton>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
