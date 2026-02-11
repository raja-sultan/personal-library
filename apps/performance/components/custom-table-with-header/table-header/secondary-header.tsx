import { SearchIcon } from "@assets/icons";
import { Box, InputAdornment, TextField } from "@mui/material";
import type { ChangeEvent } from "react";
import type { TableSecondaryHeaderProps } from "../custom-table.interface";
import { customTableStyles } from "../custom-table.styles";

let timer: ReturnType<typeof setTimeout>;

export function TableSecondaryHeader(
  props: TableSecondaryHeaderProps
): JSX.Element {
  const {
    handleSearch = () => {
      ("");
    },
    searchDelayTime = 1500,
    searchProps = {},
    actions,
  } = props;

  const styles = customTableStyles();

  function changeHandler({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSearch(value);
    }, searchDelayTime);
  }

  return (
    <Box sx={styles.tableSecondaryHeader}>
      <Box>
        <TextField
          variant="outlined"
          name="table_search_bar"
          placeholder="Search"
          onChange={changeHandler}
          sx={{ minWidth: "320px",'.MuiInputBase-input': { fontSize: '16px', fontWeight: 400 }, }}
          InputProps={{
            sx: { height: "44px" },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          {...searchProps}
        />
      </Box>
      <Box sx={styles.headerChildren}>{actions}</Box>
    </Box>
  );
}
