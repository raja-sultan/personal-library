import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import { useEffect } from "react";
import { useEmailTeamModal } from "./use-email-template";
import TemplatePreview from "./template-preview";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";

export function EmailTeamTemplate(props): JSX.Element {
  const { open, setOpen } = props;
  //Custom Hook
  const { handleSubmit, onSubmit, methods, reset, emailTeamDetails } =
    useEmailTeamModal();

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={() => {
        setOpen(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="Email Template"
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
        },
      }}
      isOpen={open}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 1 }}>
          <CustomHeaderTableTabs
            // headerProps={{
            //   title: "Updates Log",
            //   description: "View update log for your company",
            // }}
            tabsArray={["Edit", "Preview"]}
          >
            <Box sx={styles.innerCardWrapper}>
              <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "text.primary" }}
                  >
                    Template setup
                  </Typography>
                </Grid>
                {emailTeamDetails?.emailTeamDetail?.map((item) => (
                  <>
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
                  </>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "start", sm: "end" },
                  gap: 2,
                  my: { xs: 1, sm: 2 },
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
                <Button variant="contained" type="submit">
                  Save and Close
                </Button>
              </Box>
            </Box>
            {/* Template Preview Component */}
            <TemplatePreview />
          </CustomHeaderTableTabs>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 600 },
  },
  innerCardWrapper: {
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
