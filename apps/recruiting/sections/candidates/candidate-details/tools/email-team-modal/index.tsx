import { Box, Button, Grid } from "@mui/material";
import { CustomModal, FormProvider, RHFAutocompleteAsync } from "common";
import { useEffect } from "react";
import { emailTeam } from "./email-modal.data";
import { useEmailTeamModal } from "./use-email-modal";

export function EmailTeamModal(props): JSX.Element {
  const { candidate, setCandidate } = props;

  //Custom Hook
  const { handleSubmit, onSubmit, methods, reset, emailTemplates } =
    useEmailTeamModal(setCandidate);

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={() => {
        setCandidate(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="Email Team"
      closeButtonProps={{
        onClick: () => {
          setCandidate(false);
        },
      }}
      isOpen={candidate}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.innerCardWrapper}>
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
            <Grid item xs={12}>
              <RHFAutocompleteAsync
                name="template"
                outerLabel="Templates"
                getOptionLabel={(option: any) => option?.template_name}
                disableCloseOnSelect={false}
                apiQuery={emailTemplates}
                placeholder="Select Template"
              />
            </Grid>
            {emailTeam()?.emailTeamDetails?.map((item) => (
              <Grid item xs={12} md={item?.md} key={item.id}>
                <item.component
                  {...item.componentProps}
                  fullWidth
                  sx={{ py: 0 }}
                >
                  {item?.componentProps?.options?.map((option: any) => (
                    <option key={option?.id} value={option?.value}>
                      {option?.name}
                    </option>
                  ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "start", sm: "end" },
              gap: 2,
              mt: { xs: 1, sm: 0 },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setCandidate(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Send Email
            </Button>
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
