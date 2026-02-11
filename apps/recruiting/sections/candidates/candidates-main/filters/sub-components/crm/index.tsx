import { Divider, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import { event, prospectOwner } from "../../filter.data";
import {
  useFilterCrmDropDownAllProspectPoolQuery,
  useFilterCrmPoolStageListQuery,
} from "@services/candidate/candidate-main/candidate-main-api";

export function Crm(props: any): JSX.Element {
  const { params, changeHandler } = props;
  const { data: prospectPoolStage, isError: prospectPoolStageError } =
    useFilterCrmPoolStageListQuery({});
  const { data: prospectPool, isError: prospectPoolError } =
    useFilterCrmDropDownAllProspectPoolQuery({});

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={1}>
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Prospect Pool
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Prospect Pool"
        name="prospectPoolId"
        value={params.prospectPoolId}
        onChange={(e) => changeHandler(e, "select")}
        disabled={prospectPoolError}
      >
        {prospectPool?.data.map((data) => (
          <MenuItem key={data._id} value={data._id}>
            {data.name}
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
        Prospect Pool Stage
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Prospect Pool Stage"
        name="prospectPoolStageId"
        value={params.prospectPoolStageId}
        onChange={(e) => changeHandler(e, "select")}
        disabled={prospectPoolStageError}
      >
        {prospectPoolStage?.data.map((data) => (
          <MenuItem key={data._id} value={data._id}>
            {data.name}
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
        Prospect Owner
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Prospect Owner"
        name="prospectOwner"
        value={params.prospectOwner}
        onChange={(e) => changeHandler(e, "select")}
      >
        {prospectOwner.map((data) => (
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
        Event
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Event"
        name="event"
        value={params.event}
        onChange={(e) => changeHandler(e, "select")}
      >
        {event.map((data) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
