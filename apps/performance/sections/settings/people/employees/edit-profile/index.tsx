"use client";
import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FormProvider } from "common";
import { ThemeModeColor } from "@root/utils";
import CustomCard from "@components/custom-card";
import { useEditProfile } from "./use-edit-profile";
import { useEditFormData } from "./edit-profile.data";
import { Typography, Box, Grid, Divider, MenuItem, Button } from "@mui/material";
import { useGetReferenceDataAddressLocationsByIdQuery, useLazyGetReferenceDataCitiesQuery } from "@services/reference-data/reference-api";

// ===================================================

function EditProfile(): React.JSX.Element {
  const { methods, router, handleSubmit, onSubmit,getEditProfileData } = useEditProfile();
  const { watch, setValue } = methods;

  // get cities
  const [getCitiesQuery] = useLazyGetReferenceDataCitiesQuery();
  const [cityOptions, setCityOptions] = useState<{ value: string, label: string }[]>([]);
  
  // get address location by id
  const { data: addressLine } = useGetReferenceDataAddressLocationsByIdQuery({ id: watch('asyncAddressLine')?.id });

  useEffect(() => {
    if (watch('state')) {
      void getCitiesByState();
    }
  }, [watch('state')])

  useEffect(() => {
    if (addressLine?.data) {
      const data = addressLine.data as {
        addressLine: string;
        city: string;
        country: string;
        state: string;
        zipCode: string;
      };
  
      setValue('addressLine', data.addressLine);
      setValue('city', data.city);
      setValue('country', data.country);
      setValue('state', data.state);
      setValue('zipCode', data.zipCode);
    }
  }, [addressLine, setValue]);

  async function getCitiesByState(): Promise<void> {
    const { data, isError, error } = await getCitiesQuery({ state: watch("state")});
    if (isError || !data?.data) {
      const { data: { message }, }: any = error;
      toast.error(message);
    }
    const citiesList = data?.data;
    if (citiesList?.length) {
      const options = citiesList?.map((val) => ({
        label: val,
        value: val,
      }));
      setCityOptions(options);
      setValue("city", options[0]?.value, { shouldValidate: true });
    }
  }
  const formData = useEditFormData(getEditProfileData?.data?.address);  

  return (
    <CustomCard
      header
      cardHeader={{
        title: "Edit Profile",
        divider: true,
        onBack: () => {
          router.push("/settings/employees");
        },
      }}
    >
      <Box mt="25px">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {formData.map(({ divider, fields, head, id, subText }) => (
            <Fragment key={id}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={4}>
                  <Typography variant="h6" sx={{ color: ThemeModeColor() }}>
                    {head}
                  </Typography>
                  <Typography variant="subtitle2" mt="16px" sx={{ color: ThemeModeColor() }}>
                    {subText}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={8} xs={12}>
                  {fields.map((field) => (
                    <field.component key={field.id} fullWidth sx={{ mb: "20px" }} {...field.componentProps}>
                      {field?.componentProps?.select && field?.options
                        ? field?.options?.map((option: { value?: string; label?: string }) => (
                          <MenuItem value={option.value} key={option.value}>
                            {option.label}
                          </MenuItem>
                        ))
                        : null}
                      {field?.componentProps.name === 'city' ? cityOptions?.map((option: { value?: string; label?: string }) => (
                        <MenuItem value={option.value} key={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                        : null}
                    </field.component>
                  ))}
                </Grid>
              </Grid>
              {divider && <Divider sx={{ my: 3 }} />}
            </Fragment>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                router.push("/settings/employees");
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
    </CustomCard>
  );
}
export default EditProfile;
