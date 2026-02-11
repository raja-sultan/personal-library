import { Divider, MenuItem, TextField, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { availabilityStatus, offer, testStatus } from "../../filter.data";

export function PipelineTasks(props: any): JSX.Element {
  const { params, changeHandler } = props;
  function check(): boolean {
    if (
      params.toBeScheduled &&
      params.scheduled &&
      params.scorecardsDue &&
      params.completedScorecards
    ) {
      return true;
    }
    return false;
  }
  const AllInterviewHandler = (event): void => {
    if (event.target.checked) {
      changeHandler(
        {
          target: {
            name: "toBeScheduled",
            checked: true,
          },
        },
        "checkbox"
      );
      changeHandler(
        {
          target: {
            name: "scheduled",
            checked: true,
          },
        },
        "checkbox"
      );
      changeHandler(
        {
          target: {
            name: "scorecardsDue",
            checked: true,
          },
        },
        "checkbox"
      );
      changeHandler(
        {
          target: {
            name: "completedScorecards",
            checked: true,
          },
        },
        "checkbox"
      );
    } else {
      changeHandler(
        {
          target: {
            name: "toBeScheduled",
            checked: false,
          },
        },
        "checkbox"
      );
      changeHandler(
        {
          target: {
            name: "scheduled",
            checked: false,
          },
        },
        "checkbox"
      );
      changeHandler(
        {
          target: {
            name: "scorecardsDue",
            checked: false,
          },
        },
        "checkbox"
      );
      changeHandler(
        {
          target: {
            name: "completedScorecards",
            checked: false,
          },
        },
        "checkbox"
      );
    }
  };
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={1}>
      <FormControlLabel
        control={<Checkbox />}
        label="Needs Decision"
        name="needsDecision"
        checked={params.needsDecision}
        onChange={(e) => changeHandler(e, "checkbox")}
      />
      <FormControlLabel
        control={<Checkbox />}
        checked={check()}
        label="All Interviews"
        onChange={(e) => {
          AllInterviewHandler(e);
        }}
      />
      <Box display="flex" flexDirection="column" gap={1} ml={1}>
        <FormControlLabel
          control={<Checkbox />}
          label="To Be Scheduled"
          name="toBeScheduled"
          checked={params.toBeScheduled}
          onChange={(e) => changeHandler(e, "checkbox")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Scheduled"
          name="scheduled"
          checked={params.scheduled}
          onChange={(e) => changeHandler(e, "checkbox")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Scorecards Due"
          name="scorecardsDue"
          checked={params.scorecardsDue}
          onChange={(e) => changeHandler(e, "checkbox")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Completed Scorecards"
          name="completedScorecards"
          checked={params.completedScorecards}
          onChange={(e) => changeHandler(e, "checkbox")}
        />
      </Box>
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Interview Date
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <DatePicker
          value={params.interviewDateFrom}
          onChange={(e) => {
            changeHandler(
              { target: { name: "interviewDateFrom", value: e } },
              "date"
            );
          }}
          slotProps={{
            textField: {
              size: "small",
              variant: "outlined",
              fullWidth: true,
              error: false,
              label: "From",
            },
          }}
        />
        <DatePicker
          value={params.interviewDateTo}
          onChange={(e) => {
            changeHandler(
              { target: { name: "interviewDateTo", value: e } },
              "date"
            );
          }}
          slotProps={{
            textField: {
              size: "small",
              variant: "outlined",
              fullWidth: true,
              error: false,
              label: "To",
            },
          }}
        />
      </Box>
      <Divider variant="fullWidth" orientation="horizontal" />
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Availability Status
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Availability Status"
        name="availabilityStatus"
        value={params.availabilityStatus}
        onChange={(e) => changeHandler(e, "select")}
      >
        {availabilityStatus.map((data) => (
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
        Test Status
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Test Status"
        name="testStatus"
        value={params.testStatus}
        onChange={(e) => changeHandler(e, "select")}
      >
        {testStatus.map((data) => (
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
        Offer
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Offer"
        name="offer"
        value={params.offer}
        onChange={(e) => changeHandler(e, "select")}
      >
        {offer.map((data) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </TextField>
      <Divider variant="fullWidth" orientation="horizontal" />
    </Box>
  );
}
