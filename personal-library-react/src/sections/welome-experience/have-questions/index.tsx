import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { FormProvider, RHFUploadSingleFileWithPreview } from "common";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function HaveQuestions(): JSX.Element {
  const Router = useRouter();
  const methods = useForm({
    defaultValues: {
      upload: null,
    },
    // resolver: yupResolver(EditFormSchemaModel),
  });
  const onSubmit = (): void => {
    Router.push("/complete-your-tasks");
  };
  const { control, handleSubmit } = methods;
  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid xs={12} mt={1} item>
            <Box display="flex" gap={1}>
              <Box
                sx={(theme) => ({
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  background: theme?.palette?.primary?.main,
                  color: "white",
                })}
              >
                1
              </Box>
              <Box>
                <Typography variant="body1">ID Documents</Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight={500}
                  color="neutral.500"
                >
                  Provide your ID documents such as National ID card, academic
                  certificates and experience letter
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} mt={1} width="100%" item>
            <RHFUploadSingleFileWithPreview
              name="upload"
              accept={{ "image/*": [], "video/*": [] }}
              type="image"
              outerLabel="Attachment"
            />
          </Grid>
          <Grid xs={12} item>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              px={2}
            >
              <Box ml="auto" display="flex" gap={1}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 35,
                  }}
                >
                  Skip
                </Button>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    height: 35,
                  }}
                  type="submit"
                >
                  Next
                </LoadingButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
}

export default HaveQuestions;
