import { Box, Button, Grid } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import { useEffect } from "react";
import { emailTeam } from "./department.data";
import { useEmailTeamModal } from "./use-department-modal";

export function EmailDepartmentModal(props): JSX.Element {
  const { email, setEmail } = props;

  //Custom Hook
  const { handleSubmit, onSubmit, methods, reset } =
    useEmailTeamModal(setEmail);

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={() => {
        setEmail(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="Email Team"
      closeButtonProps={{
        onClick: () => {
          setEmail(false);
        },
      }}
      isOpen={email}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.innerCardWrapper}>
          <Grid container spacing={{ xs: 2, sm: 2.5 }}>
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
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setEmail(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 650 },
  },
  innerCardWrapper: {
    mt: 2,
    maxHeight: { xs: 500, sm: 600, lg: 650 },
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
