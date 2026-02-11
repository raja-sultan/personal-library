import { Divider, MenuItem, TextField, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { Box } from "@mui/system";
import { type } from "../../filter.data";

export function ApplicationType(props: any): JSX.Element {
  const { params, changeHandler } = props;
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={1}>
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Type
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Type"
        name="candidateAndProspect"
        value={params.candidateAndProspect}
        onChange={(e) => changeHandler(e, "select")}
      >
        {type.map((data) => (
          <MenuItem key={data.name} value={data.value}>
            {data.name}
          </MenuItem>
        ))}
      </TextField>
      <Divider variant="fullWidth" orientation="horizontal" />

      <FormControlLabel
        disabled
        control={<Checkbox />}
        label="Prospects on No Jobs"
        name="prospectsOnNoJobs"
        checked={params.prospectsOnNoJobs}
        onChange={(e) => changeHandler(e, "checkbox")}
      />
    </Box>
  );
}
