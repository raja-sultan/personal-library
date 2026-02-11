import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { CustomModal, FormProvider, RHFDatePicker } from "common";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./schema";
import { useEffect } from "react";

export function MarkAsSentModal(props): JSX.Element {
  const { markAsSent, setMarkAsSent } = props;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    data;
    // console.log("data", data);
    setMarkAsSent(false);
  };
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={() => {
        setMarkAsSent(false);
      }}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Where did you send the offer?"
      closeButtonProps={{
        onClick: () => {
          setMarkAsSent(false);
        },
      }}
      isOpen={markAsSent}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ my: 2 }}>
          <RHFDatePicker name="datePicker" label="Select Date" />
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "start", sm: "end" },
              gap: 2,
              mt: { xs: 1, sm: 2 },
              mb: 0.5,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setMarkAsSent(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Mark Sent
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </CustomModal>
  );
}
