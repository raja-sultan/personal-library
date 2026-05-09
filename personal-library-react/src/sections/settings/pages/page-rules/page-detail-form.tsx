import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import {
  RHFTextField,
  RHFUploadSingleFileWithPreview,
  SignaturePad,
} from "common";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Stack } from "@mui/system";

export function PageDetailForm({
  textFieldArray,
  urlFieldArray,
  eSignatureArray,
  imageArray,
}): JSX.Element {
  return (
    <>
      <Typography variant="h6" marginY={2}>
        Page Creation
      </Typography>
      <Grid container spacing={3}>
        {textFieldArray?.fields.map((field: any, index: number) => (
          <Grid item sm={12} md={12} lg={6} key={field?.id}>
            <RHFTextField
              name={`textField.${index}.textField`}
              outerLabel="First Name"
              placeholder="Write Something"
              EndIcon={
                <CancelIcon
                  onClick={() => {
                    textFieldArray.remove(index);
                  }}
                  sx={{
                    marginTop: "-70px",
                    marginRight: "-23px",
                    zIndex: "1",
                    cursor: "pointer",
                  }}
                />
              }
            />
          </Grid>
        ))}
        {urlFieldArray?.fields.map((field: any, index: number) => (
          <Grid item sm={12} md={12} lg={6} key={field?.id}>
            <RHFTextField
              name={`url.${index}.url`}
              outerLabel="Add URL"
              placeholder="Write Something"
              EndIcon={
                <CancelIcon
                  onClick={() => {
                    urlFieldArray?.remove(index);
                  }}
                  sx={{
                    marginTop: "-70px",
                    marginRight: "-23px",
                    zIndex: "1",
                    cursor: "pointer",
                  }}
                />
              }
            />
          </Grid>
        ))}

        {eSignatureArray?.fields.map((field: any, index: number) => (
          <Grid item sm={12} md={12} lg={6} key={field?.id}>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              marginBottom="7px"
            >
              <Typography variant="subtitle2">Type your Signature</Typography>
              <CancelIcon
                onClick={() => {
                  eSignatureArray?.remove(index);
                }}
                sx={{ cursor: "pointer" }}
              />
            </Stack>
            <div
              style={{
                border: "1px solid #000",
                borderRadius: "5px",
              }}
            >
              <SignaturePad
                name={`eSignature.[${index}]`}
                sx={{ height: 200 }}
              />
            </div>
          </Grid>
        ))}
        {imageArray?.fields.map((field: any, index: number) => (
          <Grid item md={6} key={field?.id}>
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  right: "-6px",
                  top: "13px",
                  zIndex: "1",
                }}
              >
                <CancelIcon
                  onClick={() => {
                    imageArray?.remove(index);
                  }}
                  sx={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
            <RHFUploadSingleFileWithPreview
              outerLabel="Add Attachment"
              name={`document.[${index}]`}
              accept=".jpg,.jpeg,.png,.pdf,"
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ my: 2 }}>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => textFieldArray?.append("textField")}
          >
            Text
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => urlFieldArray?.append("url")}
          >
            Add URL
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => eSignatureArray?.append("eSignature")}
          >
            E-Signatures
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => imageArray?.append("document")}
          >
            Attach Images
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
