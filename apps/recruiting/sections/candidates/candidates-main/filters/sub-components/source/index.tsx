import { Divider, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";

export function Source(): JSX.Element {
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={1}>
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Source
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Source"
        // value={params[data.FieldProps.name]}
        // onChange={(e) => changeHandler(e, data.type)}
        // {...data.FieldProps}
      >
        {[
          "not specified",
          "agencies",
          "bubblesort",
          "hrmarket",
          "company marketing",
          "customer newsletter",
          "website",
        ].map((data) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </TextField>
      <Divider variant="fullWidth" orientation="horizontal" />
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Credited To
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Credited To"
        // value={params[data.FieldProps.name]}
        // onChange={(e) => changeHandler(e, data.type)}
        // {...data.FieldProps}
      >
        {[
          "no one",
          "faisal naeem",
          "kamran zafar",
          "faisal naeem",
          "faisal naeem",
        ].map((data) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
