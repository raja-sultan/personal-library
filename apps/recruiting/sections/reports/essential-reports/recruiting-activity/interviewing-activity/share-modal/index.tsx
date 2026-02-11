import { Box, Button, Grid, Typography } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteAsync,
  RHFEditor,
  RHFTextField,
} from "common";
import { useLazyGetEmailTemplatesQuery } from "@services/candidate/candidate-details/tools/email-team-api";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
//import { yupResolver } from "@hookform/resolvers/yup";

export function ShareModal(props): JSX.Element {
  const { open, setOpen } = props;
  //Email Templates GET Api
  const emailTemplates = useLazyGetEmailTemplatesQuery();
  const methods = useForm({
    // resolver: yupResolver(schema),
    //defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log(data, "data");
  };

  return (
    <CustomModal
      onClose={() => {
        setOpen(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="Email Report"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
      isOpen={open}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.innerCardWrapper}>
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                name="template"
                outerLabel="Email To"
                getOptionLabel={(option: any) => option?.template_name}
                disableCloseOnSelect={false}
                apiQuery={emailTemplates}
                placeholder="Select Template"
              />
            </Grid>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", mt: 0.5 }}
            >
              Only users with the necessary permissions will see the full
              report.
            </Typography>
            <Grid item xs={12}>
              <RHFTextField
                name="subject"
                outerLabel="Subject"
                placeholder="Subject"
              />
            </Grid>
            <Grid item xs={12}>
              <RHFEditor name="editor" outerLabel="Paragraph" placeholder="" />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "start", sm: "end" },
              gap: 2,
              mt: { xs: 1, sm: 2 },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isSubmitting}
            >
              Email Report
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 700 },
  },
  innerCardWrapper: {
    mt: 2,
    maxHeight: { xs: 500, sm: 600, lg: 650, xxl: 700 },
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
