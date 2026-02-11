import { Box } from "@mui/system";
import { CustomModal, FormProvider, RHFTextField } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Typography } from "@mui/material";

export default function SectionHeaderModal(props): JSX.Element {
  const { open, onClose, submittedData } = props;

  const methods = useForm({
    resolver: yupResolver(
      Yup.object({
        sectionHeader: Yup.string().required("Section Header is required"),
      })
    ),
    defaultValues: { sectionHeader: "" },
  });
  const { handleSubmit } = methods;

  const onSubmit = (data): void => {
    submittedData(data);
    onClose(false);
  };
  return (
    <CustomModal
      isOpen={open}
      onClose={() => {
        onClose(false);
      }}
      rootSx={{ width: 700 }}
      headerLabel="Add Section Header"
      closeButtonProps={{
        onClick: () => {
          onClose(false);
        },
      }}
    >
      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={3}>
          Use Section Headers to group questions and to provide a break on
          longer forms.
        </Typography>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="sectionHeader" outerLabel="Section Header" />
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Button
            type="button"
            onClick={() => {
              onClose(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
