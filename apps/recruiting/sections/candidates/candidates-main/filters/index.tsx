import {
  Autocomplete,
  Checkbox,
  Chip,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { CustomPopoverAccording } from "common";
import React, { useEffect, useState } from "react";
import {
  ApplicationType,
  Crm,
  Education,
  Jobs,
  PipelineTasks,
  ProfileDetails,
  Responsibility,
} from "./sub-components";
import { Box } from "@mui/system";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";

const Icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CheckedIcon = <CheckBoxIcon fontSize="small" />;

const options = [
  { id: 1, label: "Application Type", value: "applicationType" },
  { id: 2, label: "Jobs", value: "Jobs" },
  { id: 3, label: "CRM", value: "CRM" },
  { id: 4, label: "Profile Details", value: "profileDetails" },
  { id: 5, label: "Responsibility", value: "responsibility" },
  { id: 6, label: "Pipeline Tasks", value: "pipelineTasks" },
  { id: 7, label: "Education", value: "Education" },
];

export function Filters(props: any): JSX.Element {
  const [searchMain, setSearchMain] = useState("");
  const { params, changeHandler, autocompleteValue, setAutocompleteValue } =
    props;

  useEffect(() => {
    if (params.search === "") {
      setSearchMain("");
    }
  }, [params.search]);
  const filterArray = [
    {
      title: "Application Type",
      component: ApplicationType,
      value: "applicationType",
    },
    {
      title: "Jobs",
      component: Jobs,
      value: "Jobs",
    },
    {
      title: "CRM",
      component: Crm,
      value: "CRM",
    },
    {
      title: "Profile Details",
      component: ProfileDetails,
      value: "profileDetails",
    },
    {
      title: "Responsibility",
      component: Responsibility,
      value: "responsibility",
    },
    {
      title: "Pipeline Tasks",
      component: PipelineTasks,
      value: "pipelineTasks",
    },
    {
      title: "Education",
      component: Education,
      value: "Education",
    },
  ];
  const filteredArray = filterArray.filter(
    (item) =>
      autocompleteValue?.some((firstItem) => firstItem.value === item.value)
  );

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
        <Box width="100%" maxWidth={{ sm: 300 }}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            placeholder="search"
            name="search"
            value={searchMain}
            onChange={(e) => {
              setSearchMain(e.target.value);
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
        </Box>
        <Box width="100%" maxWidth={{ sm: 300 }}>
          <Autocomplete
            multiple
            limitTags={1}
            size="small"
            fullWidth
            value={autocompleteValue}
            options={options}
            disableCloseOnSelect
            isOptionEqualToValue={(option: any, newValue: any) =>
              option.id === newValue.id
            }
            noOptionsText="No option"
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option: any, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={`chip${option.id}`}
                  label={option.label}
                />
              ));
            }}
            onChange={(e, value) => {
              setAutocompleteValue(value);
            }}
            renderOption={(prop, option, { selected }) => {
              return (
                <MenuItem {...prop} key={option.id} sx={{ fontSize: "1.5rem" }}>
                  <Checkbox
                    key={option.id}
                    icon={Icon}
                    checkedIcon={CheckedIcon}
                    sx={{ marginRight: 1 }}
                    checked={selected}
                  />
                  {option.label}
                </MenuItem>
              );
            }}
            renderInput={(param) => (
              <TextField {...param} variant="outlined" label="Filter" />
            )}
          />
        </Box>
      </Box>
      <Grid container gap={1}>
        {filteredArray.map((arrayData: any) => (
          <Grid key={arrayData.title} xs={12} lg={3} mt={2} item>
            <CustomPopoverAccording mainTitle={arrayData.title}>
              <arrayData.component {...props} />
            </CustomPopoverAccording>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
