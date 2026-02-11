import { Button, Grid, Typography } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import React from "react";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { AddFormData } from "../other-criteria.data";
import { useAddCriteria } from "./use-add-criteria";

function AddCriteriaModal(): JSX.Element {
  const { methods, onSubmit, isLoading, openModal, setOpenModal, reset } =
    useAddCriteria();
  return (
    <>
      <Button
        size="medium"
        variant="contained"
        disableRipple
        disableElevation
        disableFocusRipple
        disableTouchRipple
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Add a Criteria
      </Button>
      <CustomModal
        onClose={() => {
          setOpenModal(false);
        }}
        rootSx={{
          maxWidth: 600,
        }}
        headerLabel="Criteria"
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={onSubmit}>
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
              <Grid xs={12} item my={1}>
                <Typography variant="subtitle2" color="neutral.500">
                  Use Statements when you don’t require an answer from the
                  candidate, whether you need to provide a disclaimer or
                  introduce another section.
                </Typography>
              </Grid>
              {AddFormData.map((form: any) => (
                <Grid key={form.id} xs={form.grid} sx={{ py: 1, px: 1 }} item>
                  <form.component {...form.RhfValue} />
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
                        reset();
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
                      loading={isLoading}
                    >
                      Save and Close
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

export default AddCriteriaModal;
