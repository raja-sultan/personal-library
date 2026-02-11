import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { cameraIcon } from "@assets/images";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AddFormData, DefValue } from "./welcome-name.data";
import { useForm } from "react-hook-form";
import { FormProvider } from "common";
import { useRouter } from "next/navigation";

function WelcomeNameFrom(): JSX.Element {
  const Router = useRouter();
  const [file, setFile] = useState<any>();
  const hiddenFileInput = useRef<any>(null);
  function handleChange(e): void {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const methods = useForm({
    defaultValues: DefValue,
    // resolver: yupResolver(EditFormSchemaModel),
  });
  const onSubmit = () => {
    Router.push("/tell-us-about-yourself-personal-information");
  };
  const { control, handleSubmit } = methods;
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" color="neutral.700">
        Profile Picture
      </Typography>

      <IconButton
        sx={(theme) => ({
          border: `2px dotted ${theme.palette.neutral[500]}`,
          borderRadius: "50%",
          width: 45,
          height: 45,
          p: 5,
        })}
        onClick={handleClick}
      >
        <Image src={cameraIcon} alt="Camera-Icon" />

        <input
          id="avatar-upload"
          type="file"
          ref={hiddenFileInput}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </IconButton>
      <Typography variant="h6" color="neutral.700">
        Name
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          {AddFormData.map((form: any) => {
            return (
              <Grid
                key={form.id}
                xs={12}
                sm={form.grid}
                sx={{ py: 1, pr: 1 }}
                item
              >
                <form.component control={control} {...form.RhfValue} />
              </Grid>
            );
          })}
          <Grid xs={12} item>
            <Box mt={1} display="flex">
              <Box
                ml="auto"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
                px={2}
              >
                <Button size="small" variant="outlined">
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

export default WelcomeNameFrom;
