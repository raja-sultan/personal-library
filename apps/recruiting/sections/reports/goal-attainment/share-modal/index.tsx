import { Box, Button } from "@mui/material";
import { CustomModal, FormProvider } from "common";
import React from "react";
import { useForm } from "react-hook-form";
import { fieldDataEmailReport } from "./data";

export default function ShareModal(props): JSX.Element {
  const { isOpen, setIsOpen } = props;

  const defaultValues = {};
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const onSubmit = (formValue): void => {
    console.log(formValue);
  };
  return (
    <CustomModal
      headerLabel="Email Report"
      closeButtonProps={{
        onClick: () => {
          setIsOpen(false);
        },
      }}
      isOpen={isOpen}
      rootSx={{
        maxWidth: { md: 600, xs: 350, sm: 450 },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {fieldDataEmailReport?.map((item) => (
          <Box my={1} key={item?.id}>
            <item.component {...item.componentProps} />
          </Box>
        ))}
        <Box display="flex" justifyContent="end" gap={2}>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" size="small">
            Email Report
          </Button>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
