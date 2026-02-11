import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Stack } from "@mui/material";
import { CustomModal, FormProvider, RHFTextField } from "common";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetLocationListQuery,
  usePostLocationDataMutation,
  useUpdateLocationListMutation,
} from "@services/settings/location/location-api";
import toast from "react-hot-toast";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  officeName: yup.string().required("This field is required"),
});

export function LocationsModal(props: any): JSX.Element {
  const { addField, setAddField } = props;

  const { data: getLocationList } = useGetLocationListQuery({
    limit: 10,
    offset: 0,
  });
  const locationData = getLocationList?.data?.office;
  const matchedObject = locationData?.find((obj) => obj._id === addField.id);

  const methods = useForm<any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      officeName: "",
      externalId: "",
      location: "",
    },
  });

  const [postLocation] = usePostLocationDataMutation();
  const [updateLocation] = useUpdateLocationListMutation();

  const { handleSubmit, reset } = methods;

  async function onSubmit(formData): Promise<void> {
    setAddField(false);
    const body = {
      ...reset,
      officeName: formData?.officeName,
      location: formData?.location,
    };
    if (addField.id) {
      await updateLocation({ id: addField.id, body })
        .unwrap()
        .then(() => {
          toast.success("Location update Successfully");
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    } else {
      await postLocation({ body })
        .unwrap()
        .then(() => {
          toast.success("Location Added Successfully");
        })
        .catch((error) => {
          toast.error(error.data.message);
        });
    }
    reset();
  }
  
  useEffect(() => {
    reset({
      officeName: matchedObject?.officeName,
      location: matchedObject?.location,
    });
  }, [matchedObject?.officeName, matchedObject?.location, reset]);

  return (
    <CustomModal
      isOpen={addField.open}
      onClose={() => {
        setAddField({ open: false, id: null });
      }}
      closeButtonProps={{
        onClick: () => {
          setAddField({ open: false, id: null });
        },
      }}
      headerLabel={`${addField.id ? "Edit" : "Add"} Locations`}
      rootSx={{
        width: { md: "40%", xs: "60%" },
        mt: 2,
        maxHeight: { xs: 500, sm: 600, lg: 700 },
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "6px",
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowGap={2} sx={{ my: 2 }}>
          <Grid item xs={12}>
            <RHFTextField name="officeName" size="small" outerLabel="Name" />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField
              size="small"
              name="externalId"
              outerLabel="External ID"
            />
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name="location" size="small" outerLabel="Address" />
          </Grid>

          <Grid item xs={12}>
            <Stack
              direction={{ md: "row", xs: "column" }}
              justifyContent="end"
              sx={{ mt: 2 }}
            >
              <Box>
                <Button
                  sx={{
                    color: "neutral.700",
                    borderColor: "neutral.300",
                    mr: "10px",
                  }}
                  variant="outlined"
                  onClick={() => {
                    setAddField({ open: false, id: null });
                  }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{
                    ml: "10px",
                  }}
                >
                  {addField.id ? "Update" : "Save and Close"}
                </LoadingButton>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </CustomModal>
  );
}
