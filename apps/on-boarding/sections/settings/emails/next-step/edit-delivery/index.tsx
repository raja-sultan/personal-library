import { CustomModal, FormProvider, RHFSelect, RHFTextField } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./edit-delivery.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";

const EditDelivery = (props) => {
  const { setEditModal, editModal } = props;
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <CustomModal
        onClose={() => {
          setEditModal(false);
        }}
        rootSx={styles.modalStyling}
        headerLabel="Email Template"
        closeButtonProps={{
          onClick: () => {
            setEditModal(false);
          },
        }}
        isOpen={editModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} sx={{ mt: 1 }}>
              <RHFSelect size="medium" placeholder="Select" name="custom">
                <option value="custom">Custom</option>
                <option value="startDate">On start date</option>
                <option value="never">Never</option>
              </RHFSelect>
            </Grid>
            <Grid item xs={12} sm={2} sx={{ mt: 1 }}>
              <RHFTextField name="days" placeholder="Days" />
            </Grid>
            <Grid item xs={12} sm={5} sx={{ mt: 1 }}>
              <RHFSelect size="medium" placeholder="Select" name="before">
                <option value="before">Before</option>
                <option value="after">After</option>
              </RHFSelect>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: "end" }}>
            <Button
              variant="outlined"
              sx={{ marginRight: 2 }}
              onClick={() => {
                setEditModal(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained">Save and Close</Button>
          </Box>
        </FormProvider>
      </CustomModal>
    </>
  );
};

export default EditDelivery;

const styles = {
  modalStyling: {
    maxWidth: { xs: 350, sm: 600 },
  },
  innerCardWrapper: {
    mt: 2,
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
