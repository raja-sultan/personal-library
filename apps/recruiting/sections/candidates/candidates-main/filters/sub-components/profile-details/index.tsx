import {
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/x-date-pickers";
import { gdprStatus, rejectionReason, status } from "../../filter.data";

export function ProfileDetails(props: any): JSX.Element {
  const { params, changeHandler } = props;
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (params.search === "") {
      setSearch("");
    }
  }, [params.search]);

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={1}>
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Candidate Tag
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        variant="outlined"
        fullWidth
        size="small"
        placeholder="type to search"
        name="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          changeHandler(e, "search");
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Divider variant="fullWidth" orientation="horizontal" />
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Status
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="status"
        name="status"
        value={params.status}
        onChange={(e) => changeHandler(e, "select")}
      >
        {status.map((data) => (
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
        Rejection Reason
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Rejection Reason"
        name="rejectionReason"
        value={params.rejectionReason}
        onChange={(e) => changeHandler(e, "select")}
      >
        {rejectionReason.map((data) => (
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
        GDPR Status
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="GDPR Status"
        name="gdprStatus"
        value={params.gdprStatus}
        onChange={(e) => changeHandler(e, "select")}
      >
        {gdprStatus.map((data) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </TextField>
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        Last Activity
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <DatePicker
          value={params.lastActivityToDate}
          onChange={(e) => {
            changeHandler(
              { target: { name: "lastActivityToDate", value: e } },
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
          value={params.lastActivityFromDate}
          onChange={(e) => {
            changeHandler(
              { target: { name: "lastActivityFromDate", value: e } },
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
        Applied On
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <DatePicker
          value={params.appliedDateTo}
          onChange={(e) => {
            changeHandler(
              { target: { name: "appliedDateTo", value: e } },
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
          value={params.appliedDateFrom}
          onChange={(e) => {
            changeHandler(
              { target: { name: "appliedDateFrom", value: e } },
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
        Hired On
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <DatePicker
          value={params.HiredOnToDate}
          onChange={(e) => {
            changeHandler(
              { target: { name: "HiredOnToDate", value: e } },
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
          value={params.HiredOnFromDate}
          onChange={(e) => {
            changeHandler(
              { target: { name: "HiredOnFromDate", value: e } },
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
      <FormControlLabel
        control={<Checkbox />}
        label="Show potential duplicates"
        name="showPotentialDuplicates"
        checked={params.showPotentialDuplicates}
        onChange={(e) => changeHandler(e, "checkbox")}
      />
    </Box>
  );
}
