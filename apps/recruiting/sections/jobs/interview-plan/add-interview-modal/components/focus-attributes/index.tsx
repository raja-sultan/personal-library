import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { RHFMultiCheckbox } from "common";

export function FocusAttribute(props: any): JSX.Element {
  const { scoreCardAttributes, loadingAttr, successAttr, errorAttr } = props;
  const theme = useTheme();

  return (
    <>
      {loadingAttr && (
        <Typography
          variant="h5"
          align="center"
          sx={{ py: 10 }}
          color={theme.palette.text.secondary}
        >
          Loading...{" "}
        </Typography>
      )}
      {errorAttr && (
        <Typography
          variant="h5"
          align="center"
          sx={{ py: 10 }}
          color={theme.palette.error.main}
        >
          Something Went Wrong{" "}
        </Typography>
      )}
      {successAttr && (
        <Grid container>
          {scoreCardAttributes?.map((ele) => (
            <Grid key={ele?._id} item lg={3} md={6} xs={12}>
              <Typography variant="body2" fontWeight={600}>
                {ele?.category}
              </Typography>
              <RHFMultiCheckbox
                name="focusAttributes"
                options={
                  ele?.attributes?.map((attribute) => ({
                    value: attribute,
                    label: attribute,
                  })) || []
                }
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
