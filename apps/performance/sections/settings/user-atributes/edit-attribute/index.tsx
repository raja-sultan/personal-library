"use client";
import React, { Fragment } from "react";
import CustomCard from "@components/custom-card";
import {
  Typography,
  Box,
  Grid,
  Divider,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { FormProvider, RHFTextField } from "common";
import { styles } from "../attribute-form.styles";
import { createFormData } from "../attribute-form.data";
import { EditMultipleChoiceOptions } from "../multiple-choice-options/edit";
import { useEditAttribute } from "./use-edit-attribute";
import { EditRangeOptions } from "../range-options/edit";

export function EditAttribute(): JSX.Element {
  const {
    onSubmit,
    methods,
    handleSubmit,
    router,
    attributeType,
    setAttributeType,
    isLoading,
    attributeDetails,
    checked,
    handleChange
  } = useEditAttribute();


  return (
    <CustomCard
      header
      cardHeader={{
        title: "Edit attribute",
        divider: true,
        onBack: () => {
          router.push("/settings/user-attributes");
        },
      }}
      cardProps={{ sx: { minHeight: `calc(100vh - 230px)` } }}
    >
      <Box mt="25px">
        <FormProvider
          methods={{ ...methods }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={4}>
              <Typography variant="h6" fontWeight={600} color="neutral.700">
                Attribute type
              </Typography>
              <Typography variant="subtitle2" mt="16px" color="neutral.500">
                Select the attribute type which consists of multiple choice and
                number.
              </Typography>
            </Grid>
            <Grid item lg={4} md={8} xs={12}>
              <RHFTextField
                fullWidth
                disabled
                select
                value={attributeType}
                sx={{ mb: "20px" }}
                name="type"
                outerLabel="Attribute Type"
                onChange={(e: React.ChangeEvent<{ value: string }>) => {
                  setAttributeType(e.target.value);
                  methods.setValue("type", e.target.value);
                }}
              >
                <MenuItem value="Multiple Choice">Multiple choice</MenuItem>
                <MenuItem value="Number">Number</MenuItem>
              </RHFTextField>
            </Grid>
          </Grid>
          {attributeType && <Divider sx={{ my: 3 }} />}
          {attributeType &&
            createFormData.map(({ divider, fields, head, id, subText }) => (
              <Fragment key={id}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4} lg={4}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color="neutral.700"
                    >
                      {head}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      mt="16px"
                      color="neutral.500"
                    >
                      {subText}
                    </Typography>
                  </Grid>
                  <Grid item lg={4} md={8} xs={12}>
                    {fields?.map((field) => (
                      <field.component
                        key={field.id}
                        fullWidth
                        sx={{ mb: "20px" }}
                        {...field.componentProps}
                      >
                        {field.componentProps.select
                          ? field?.options?.map(
                              (option: { value?: string; label?: string }) => (
                                <MenuItem
                                  value={option.value}
                                  key={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              )
                            )
                          : null}
                      </field.component>
                    ))}
                     {attributeType === "Number" &&
                      <Box display="flex" flexDirection="column" mt="1rem">
                        <FormControlLabel control={<Switch   checked={checked} onChange={handleChange}/>} label={<Typography variant="subtitle1" color="neutral.800" fontWeight="400" ml="1rem">Range</Typography>} />
                        
                            <Typography variant="caption" mt="1rem" color="neutral.500" fontWeight="400">
                              Toggle the button to switch between adding a single numeric text field or a range field to the user profile
                            </Typography>
                       </Box>
                      }
                  </Grid>
                </Grid>
                {divider && <Divider sx={{ my: 3 }} />}
            
          {attributeType === "Multiple Choice" ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8} lg={4}>
                      <Typography variant="h6" fontWeight={600} color="neutral.700">
                        Options
                      </Typography>
                      <Typography variant="subtitle2" mt="16px" color="neutral.500">
                        List all available valid options for this attribute
                      </Typography>
                    </Grid>
                    <Grid item xl={4.4413} lg={4} md={8} xs={12}>
                    <EditMultipleChoiceOptions
                          options={attributeDetails?.data?.options}
                        />
                    </Grid>
                  </Grid>
                ):
                (
                    <>
                      {checked && (
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={8} lg={4}>
                              <Typography variant="h6" fontWeight={600} color="neutral.700">
                                Range
                              </Typography>
                              <Typography variant="subtitle2" mt="16px" color="neutral.500">
                                Configure ranges for visualizations and filtering. The numeric value attributed to the employee will determine which range they will be bucketed
                              </Typography>
                            </Grid>
                            <Grid item xl={4.4413} lg={4} md={8} xs={12}>
                            <EditRangeOptions options={attributeDetails?.data?.options}/>
                            </Grid>
                          </Grid>
                      )}
                  </>
                )
                }
              </Fragment>
            ))}

          {attributeType && (
            <Box sx={styles.btnContainerBox}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => {
                  router.push("/settings/user-attributes");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {isLoading ? "loading..." : "Save"}
              </Button>
            </Box>
          )}
        </FormProvider>
      </Box>
    </CustomCard>
  );
}
