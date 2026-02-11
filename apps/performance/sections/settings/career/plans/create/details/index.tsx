"use client";
import React, { Fragment } from "react";
import { FormProvider } from "common";
import CustomCard from "@components/custom-card";
import { Typography, Box, Grid, Divider, type Theme, IconButton, Button, DialogActions } from "@mui/material";
import { detailsFormData } from "./details.data";
import { useDetails } from "./use-details";
import { AddOutlinedCircleIcon } from "@assets/icons/add-outlined-circle-icon";
import SelectEmployeesModal from "@components/select-employees-modal";

// ===================================================

function Details({ id, disabled }): React.JSX.Element {
  const { methods, handleSubmit, onSubmit, theme, handleAddAdminModal, isAddAdminModalOpen, handleGetAdminIds, getAdminIds } = useDetails({ id });

  return (
    <CustomCard>
      <Box mt="25px" pb="60px">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {detailsFormData.map(({ divider, fields, head, id: itemId, subText }) => (
            <Fragment key={itemId}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={4}>
                  <Typography variant="h6" sx={styles.heading(theme)}>
                    {head}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ pt: 0.8, color: theme.palette.neutral[500] }}>
                    {subText}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={8} xs={12}>
                  {itemId === "1" ? (
                    fields?.map((field) => <field.component key={field.id} disabled={disabled} fullWidth sx={{ mb: "20px" }} {...field.componentProps} />)
                  ) : (
                    <Box>
                      <Box sx={styles.btn}>
                        <IconButton disabled={disabled} sx={{ opacity: disabled ? 0.5 : 1 }} onClick={handleAddAdminModal}>
                          <AddOutlinedCircleIcon />
                        </IconButton>
                        <Typography variant="body2">Add Admin</Typography>
                      </Box>
                      {/* {(isSubmitting && !getAdminIds) && <Typography variant="caption" color='error.main' pl="15px">Required Admins</Typography>} */}
                    </Box>
                  )}
                </Grid>
              </Grid>
              {divider && <Divider sx={{ my: 3 }} />}
            </Fragment>
          ))}
          <DialogActions>
            <Button variant="outlined" type="submit" disabled={!getAdminIds}>
              Next
            </Button>
          </DialogActions>
        </FormProvider>
      </Box>

      {isAddAdminModalOpen && (
        <SelectEmployeesModal
          headerLabel="Add Admin"
          isOpen={isAddAdminModalOpen}
          setIsOpen={handleAddAdminModal}
          onAdd={(ids: string[]) => {
            handleGetAdminIds(ids);
          }}
        />
      )}
    </CustomCard>
  );
}
export default Details;

const styles = {
  heading: (theme: Theme) => ({ color: theme.palette.mode === "dark" ? theme.palette.neutral[300] : theme.palette.neutral[900] }),
  btn: { display: "flex", alignItems: "center", pt: 1.5, gap: 1.2 },
};
