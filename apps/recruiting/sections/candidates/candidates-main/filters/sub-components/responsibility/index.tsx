import {
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { coordinator, recruiter } from "../../filter.data";


export function Responsibility(props: any): JSX.Element {
  const { params, changeHandler } = props;
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={1}>
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Recruiter
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Recruiter"
        name="recruiter"
        value={params.recruiter}
        onChange={(e) => changeHandler(e, "select")}
      >
        {recruiter.map((data) => (
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
        Coordinator
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Coordinator"
        name="coordinator"
        value={params.coordinator}
        onChange={(e) => changeHandler(e, "select")}
      >
        {coordinator.map((data) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </TextField>
      <Divider variant="fullWidth" orientation="horizontal" />
      <FormControlLabel
        name="whoIAmFollowing"
        checked={params.whoIAmFollowing}
        onChange={(e) => changeHandler(e, "checkbox")}
        control={<Checkbox />}
        label="Who I’m Following"
      />
    </Box>
  );
}
