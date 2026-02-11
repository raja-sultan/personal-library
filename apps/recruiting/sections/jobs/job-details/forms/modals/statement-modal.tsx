import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CustomModal, FormProvider, RHFTextField } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function StatementModal(props): JSX.Element {
  const { open, onClose, submittedData } = props;

  const methods = useForm({
    resolver: yupResolver(
      Yup.object({ statement: Yup.string().required("Statement is required") })
    ),
    defaultValues: { statement: "" },
  });
  const onSubmit = (data): void => {
    submittedData(data);
    onClose(false);
  };

  const { handleSubmit } = methods;
  return (
    <CustomModal
      isOpen={open}
      onClose={() => {
        onClose(false);
      }}
      rootSx={{ width: 700 }}
      headerLabel="Add Statement"
      closeButtonProps={{
        onClick: () => {
          onClose(false);
        },
      }}
    >
      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={3}>
          Use Statement when you don`t require an answer from the candidate,
          whether you need to provide a disclaimer or introduce another section.
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="statement"
            outerLabel="Statement"
            multiline
            minRows={4}
          />

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
      </Box>
    </CustomModal>
  );
}
