import React from "react";
import * as yup from "yup";
import { Box, Grid, Typography, Card } from "@mui/material";
import {
  FormProvider,
  RHFDatePicker,
  RHFTextField,
  RHFUploadSingleFileWithPreview,
} from "common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { useCreateBrandedAssetMutation } from "@services/settings/brand-assets/brand-assets-api";
import toast from "react-hot-toast";

const imageDataArray = [
  {
    id: 1,
    title: "Department",
    subTitle: "A square version of your logo works best.",
  },
];

const FormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  dateFounded: yup.string(),
  primaryColorHex: yup.string(),
});
export function BrandedAssetsSection(): JSX.Element {
  const methods = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: "",
      dateFounded: "",
      primaryColorHex: "",
      attachment: {},
    },
  });

  const [postBranded] = useCreateBrandedAssetMutation();

  const { handleSubmit } = methods;
  async function onSubmit(formData): Promise<void> {
    const newData = new FormData();
    newData.append("name", formData.name);
    newData.append("dateFounded", formData.dateFounded);
    newData.append("primaryColorHex", formData.primaryColorHex);
    newData.append("attachment", formData.attachment);
    
    await postBranded({ body: newData })
      .unwrap()
      .then(() => {
        toast.success("Branded Assets Added Successfully");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Branded Assets
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={1}>
          <Grid item lg={5.5} xs={12}>
            <Card
              sx={{
                borderRadius: "10px",
                p: 2,
              }}
            >
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                Basic Information
              </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <RHFTextField
                    name="name"
                    placeholder="Enter Name"
                    outerLabel="Name"
                  />
                </Grid>
                <Grid item xs={12} mt={2}>
                  <RHFDatePicker name="dateFounded" outerLabel="Date Founded" />
                </Grid>
              </Grid>
              <Grid item xs={12} mt={2}>
                <RHFTextField
                  fullWidth="false"
                  name="primaryColorHex"
                  placeholder="Enter Name"
                  outerLabel="Primary Color Hex"
                  type="color"
                  sx={{ width: "50%" }}
                />
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                <LoadingButton type="submit" variant="contained">
                  Save
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
          <Grid item lg={5.5} xs={12}>
            <Card
              sx={{
                borderRadius: "10px",
                p: 2,
              }}
            >
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 600 }}>
                Images
              </Typography>
              <Box>
                {imageDataArray.map((item) => (
                  <Box key={item.id}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {item.subTitle}
                    </Typography>
                  </Box>
                ))}
                  <RHFUploadSingleFileWithPreview
                    label="Add Attachment"
                    name="attachment"
                    accept=".jpg,.jpeg,.png,.pdf,"
                  />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
}
