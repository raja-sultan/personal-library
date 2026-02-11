import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import {
  CustomModal,
  FormProvider,
  RHFAutocompleteSync
} from "common";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { defaultValues, schema } from "./schema";

export function UpdateOfferDetailsModal(props): JSX.Element {
  const { updateOfferDetails, setUpdateOfferDetails } = props;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    data;
    console.log("data", data);
    setUpdateOfferDetails(false);
  };

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
    }));
  }, [reset]);

  return (
    <CustomModal
      onClose={() => {
        setUpdateOfferDetails(false);
      }}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Update Offer"
      closeButtonProps={{
        onClick: () => {
          setUpdateOfferDetails(false);
        },
      }}
      isOpen={updateOfferDetails}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ my: 2 }}>
          <RHFAutocompleteSync
            name="employmentType"
            outerLabel="Employment Type"
            options={[
              { id: 1, name: "Full Time", value: "Full Time" },
              { id: 2, name: "Part Time", value: "Part Time" },
              { id: 3, name: "Intern", value: "Intern" },
              { id: 4, name: "Contract", value: "Contract" },
              { id: 5, name: "Temporary", value: "Temporary" },
            ]}
          />
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
                setUpdateOfferDetails(false);
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
