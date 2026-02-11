"use client";
import React from "react";
import { useAddField } from "./use-add-field";
import { Box, Button, Card, Divider, Grid, Typography } from "@mui/material";
import { FormProvider, IsFetching } from "common";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { LoadingButton } from "@mui/lab";

function AddFieldSection(): JSX.Element {
  const {
    handleSubmit,
    onSubmit,
    methods,
    newFieldDetail,
    reset,
    defaultValues,
    router,
    action,
    loading,
    isLoading,
  } = useAddField();
  if (loading) {
    return (
      <Box position="relative" height="50vh">
        <IsFetching isFetching />
      </Box>
    );
  }
  return (
    <Card sx={{ p: 2 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={{ xs: 2, sm: 2.5 }}>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                router.push("/settings/fields");
              }}
              startIcon={<KeyboardBackspaceRoundedIcon />}
              sx={{ pl: 0 }}
            >
              Back
            </Button>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <Typography variant="h6">
              {action === "Add" ? "Add" : "Edit"} New Field
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            {newFieldDetail.map((item, index) => (
              <Grid item xs={12} md={item?.md} key={index} sx={{ py: 1 }}>
                <item.component
                  {...item.componentProps}
                  fullWidth
                  sx={{ py: 0 }}
                  size="small"
                />

                {item.id === 4 && (
                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Personal Library Recruiting Field
                    </Typography>
                    <Typography variant="caption">
                      This field is handled automatically
                    </Typography>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
          {/* Edit Right Details */}
          {action === "edit" && (
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              lg={4}
              sx={{ textAlign: { xs: "start", md: "end" } }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Permanent ID
              </Typography>
              <Typography variant="caption">system.pronouns</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, mt: 1 }}>
                Access
              </Typography>
              <Typography variant="caption">
                Can Edit: Owner, Coordinator, All Employees
              </Typography>
              <Typography variant="caption">Can Only: View</Typography>
            </Grid>
          )}
          {/* <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} lg={4}>
            <Typography variant="h6">Rules</Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Field will be present for new hires whose
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} lg={4}>
            {newRulesDetail.map((item) => (
              <Grid item xs={12} md={item?.md} key={item.id} sx={{ py: 1 }}>
                <item.component
                  {...item.componentProps}
                  fullWidth
                  sx={{ py: 0 }}
                  size="small"
                />

                {item.id === 5 && (
                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Personal Library Recruiting Field
                    </Typography>
                    <Typography variant="caption">
                      This field is handled automatically
                    </Typography>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid> */}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => {
              reset(defaultValues);
              router.push("/settings/fields");
            }}
          >
            Cancel
          </Button>
          <LoadingButton loading={isLoading} variant="contained" type="submit">
          {action === "Add" ? "Save" : "Update"}  
          </LoadingButton>
        </Box>
      </FormProvider>
    </Card>
  );
}

export default AddFieldSection;
