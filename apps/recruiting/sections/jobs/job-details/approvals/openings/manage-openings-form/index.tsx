// import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import { FormProvider } from "common";
import { GenFormField } from "@components/form-fields-generator";
import {
  FormSchema,
  fieldsInfo,
  defaultValues,
} from "./manage-opening-form.schema";

export function ManageOpeningsForm(): JSX.Element {
  // const theme: any = useTheme();
  //   const [disabled, setDisabled] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const methods: any = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = (data: any) => {
    data
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        {/* Dynamically Generated Fields  */}
        {fieldsInfo.map((item: any, index: number) => {
          const props = item?.OuterConProps ? item?.OuterConProps : {};
          return (
            <GenFormField
              key={index}
              item={item}
              isSubmitting={isSubmitting}
              {...props}
            />
          );
        })}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
        {/* <Button variant="outlined" onClick={handleCancel}> */}
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>
    </FormProvider>
  );
}
