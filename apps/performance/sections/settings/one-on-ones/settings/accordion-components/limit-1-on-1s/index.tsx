import React from "react";
import {
  Radio,
  Stack,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
} from "@mui/material";
import useLimitOneOnOnesSection from "./use-limit-1-on-1s";

export function LimitOneOnOnes(): React.JSX.Element {
  const { selectedValue, handleRadioChange } = useLimitOneOnOnesSection();
  return (
    <Grid container spacing={2}>
      <Grid item xl={5}>
        <Typography variant="subtitle2" fontWeight={400} color='neutral.500'>
          Limit 1-on-1s to just managers and direct reporters or allow employees
          to have 1-on-1 with anyone.
        </Typography>
      </Grid>
      <Grid item xl={7}>
        <Stack>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={selectedValue}
              name="radio-buttons-group"
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Employees can only have 1-on-1s with their managers and/or direct reports"
                control={<Radio />}
                label={
                  <Typography  variant="subtitle2" fontWeight={400} color='neutral.500'>
                    Employees can only have 1-on-1s with their managers and/or
                    direct reports
                  </Typography>
                }
              />
              <FormControlLabel
                value="Employees can have 1-on-1 with anyone in the organization"
                control={<Radio />}
                label={
                  <Typography  variant="subtitle2" fontWeight={400} color='neutral.500'>
                    Employees can have 1-on-1 with anyone in the organization
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Grid>
    </Grid>
  );
}
