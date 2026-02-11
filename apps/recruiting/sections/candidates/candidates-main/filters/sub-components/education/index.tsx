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
import {
  degree,
  discipline,
  educationEndMonth,
  educationEndYear,
  educationStartMonth,
  educationStartYear,
  schoolName,
} from "../../filter.data";

export function Education(props: any): JSX.Element {
  const { params, changeHandler } = props;
  return (
    <Box width="100%" display="flex" flexDirection="column" gap={1}>
      <Typography
        variant="subtitle1"
        fontSize={14}
        fontWeight={400}
        sx={{ color: "neutral.400" }}
      >
        School Name
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="School Name"
        name="schoolName"
        value={params.schoolName}
        onChange={(e) => changeHandler(e, "select")}
      >
        {schoolName.map((data) => (
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
        Degree
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Degree"
        name="degree"
        value={params.degree}
        onChange={(e) => changeHandler(e, "select")}
      >
        {degree.map((data) => (
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
        Discipline
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Discipline"
        name="discipline"
        value={params.discipline}
        onChange={(e) => changeHandler(e, "select")}
      >
        {discipline.map((data) => (
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
        Education Start month
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Education Start month"
        name="eduStartMonth"
        value={params.eduStartMonth}
        onChange={(e) => changeHandler(e, "select")}
      >
        {educationStartMonth.map((data) => (
          <MenuItem key={data.value} value={data.value}>
            {data.label}
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
        Education end month
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Education end month"
        name="eduEndMonth"
        value={params.eduEndMonth}
        onChange={(e) => changeHandler(e, "select")}
      >
        {educationEndMonth.map((data) => (
          <MenuItem key={data.value} value={data.value}>
            {data.label}
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
        Education Start year
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Education Start year"
        name="eduStartYear"
        value={params.eduStartYear}
        onChange={(e) => changeHandler(e, "select")}
      >
        {educationStartYear.map((data) => (
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
        Education End year
      </Typography>
      <Divider variant="fullWidth" orientation="horizontal" />
      <TextField
        select
        variant="outlined"
        size="small"
        fullWidth
        label="Education End year"
        name="eduEndYear"
        value={params.eduEndYear}
        onChange={(e) => changeHandler(e, "select")}
      >
        {educationEndYear.map((data) => (
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        ))}
      </TextField>
      <Divider variant="fullWidth" orientation="horizontal" />
      <FormControlLabel
        control={<Checkbox />}
        label="Most Recent Education Only"
        name="mostRecentEdu"
        checked={params.mostRecentEducationOnly}
        onChange={(e) => changeHandler(e, "checkbox")}
      />
    </Box>
  );
}
