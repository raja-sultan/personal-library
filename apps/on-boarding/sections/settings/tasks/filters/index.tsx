"use client";

import { useState } from "react";
import {
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Button,
  Box,
  FormLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const getDefaultParams: any = ({ filterHeaderData }: any) => {
  const defaultParams: any = {};
  filterHeaderData.forEach((data: any) => {
    defaultParams[data.FieldProps.name] = "";
  });
  return defaultParams;
};

// ----------------------------------------------------------------------
let timer: ReturnType<typeof setTimeout>;

export function TaskFilters(props: any): JSX.Element {
  const {
    filterHeaderData,
    onChanged = () => {
      return null;
    },
    debounceTimeout = 1000,
    filterButtonShow,
    gridProps,
    onlyFilters = false,
  } = props;

  const [params, setParams] = useState<any>(
    getDefaultParams({ filterHeaderData })
  );
  const [searchParams, setSearchParams] = useState<string>("");
  const [show, setShow] = useState(!filterButtonShow);

  function searchHandler(e): void {
    setSearchParams(e.target.value);
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, search: e.target.value };

      // Use debounce if search is updated
      clearTimeout(timer);

      timer = setTimeout(() => {
        onChanged(updatedParams);
      }, debounceTimeout);

      return updatedParams;
    });
  }
  function changeHandler({ target: { name, value } }: any): any {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: value };

      onChanged(updatedParams);

      return updatedParams;
    });
  }

  function onClear(): void {
    const defaultParams = getDefaultParams({ filterHeaderData });
    setParams(defaultParams);
    onChanged(defaultParams);
    setSearchParams("");
  }

  return (
    <Box my={2}>
      {!onlyFilters && (
        <Box
          sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}
        >
          <Button
            startIcon={<FilterAltIcon />}
            endIcon={show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            variant="contained"
            sx={{ mr: { md: 1, xs: 0 }, mb: { md: 0, xs: 1 } }}
            onClick={() => {
              show ? setShow(false) : setShow(true);
            }}
          >
            Filter
          </Button>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Search..."
            value={searchParams}
            onChange={(e) => {
              searchHandler(e);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              ".MuiInputBase-input.MuiOutlinedInput-input": { height: "30px" },
            }}
          />
        </Box>
      )}
      {(show || onlyFilters) && (
        <Grid container mt={1} gap={2}>
          {filterHeaderData.map((data: any) => {
            return (
              <Grid
                key={data.FieldProps.name}
                xs={12}
                md={4}
                lg={2.2}
                flexWrap="wrap"
                justifyContent="center"
                item
                {...gridProps}
              >
                <FormLabel>{data?.outerLabel}</FormLabel>
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={params[data.FieldProps.name]}
                  onChange={(e) => changeHandler(e)}
                  {...data.FieldProps}
                >
                  {data.options.map(({ label, value, id }: any) => (
                    <MenuItem
                      key={id}
                      value={value}
                      sx={{ fontSize: "1.5rem" }}
                    >
                      {label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            );
          })}
          <Grid
            xs={12}
            lg={2}
            display="flex"
            flexWrap="wrap"
            justifyContent={{ xs: "flex-start", sm: "flex-end" }}
            item
            ml="auto"
            mr={1}
          >
            <Button
              onClick={onClear}
              sx={{ color: "primary.main" }}
              variant="text"
              disableFocusRipple
              disableRipple
              disableTouchRipple
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
