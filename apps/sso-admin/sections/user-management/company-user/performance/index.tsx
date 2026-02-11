import React from "react";
import { defaultValues, schema } from "./schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { performanceData } from "./data";
import { Box, Grid, Typography } from "@mui/material";
import { FormProvider } from "common";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { LoadingButton } from "@mui/lab";

export function Performance({ performance }: any): JSX.Element {
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  console.log("performance", performance);

  const onSubmit = (data: any) => {
    console.log("Selected Values", data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container alignItems="center">
        {performanceData.map((item: any) => (
          <React.Fragment key={item.id}>
            <Grid item xs={12} sm={4}>
              <item.parentData.component
                sx={{ py: 1, pl: 1 }}
                {...item.parentData.otherOptions}
                label={
                  <Typography sx={{ pl: 1 }} variant="subtitle2">
                    {item.parentData.otherOptions.label}
                  </Typography>
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={7.5}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              {watch(item.parentData.otherOptions.name) &&
                item.childData.map((form) => (
                  <form.component
                    icon={
                      <CheckCircleIcon sx={{ color: "primary.lightest" }} />
                    }
                    checkedIcon={<CheckCircleIcon />}
                    sx={{ py: 1 }}
                    key={form.otherOptions.name}
                    {...form.otherOptions}
                    label={
                      <Typography variant="subtitle2">
                        {form.otherOptions.label}
                      </Typography>
                    }
                  />
                ))}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Box sx={{ textAlign: "end", mr: 1 }}>
        <LoadingButton variant="outlined" type="submit">
          Submit
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
