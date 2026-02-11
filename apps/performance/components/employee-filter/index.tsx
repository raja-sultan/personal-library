// @ mui imports
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
  IconButton,
  Checkbox,
  InputAdornment,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// @ components import files
import { employeeFilterStyles } from "./employee-filter.styles";
// import { filterList } from "./employee-filter-data";
import { EmployeeSearchIcon } from "@assets/icons/employee-search-icon";

import type { TitleListItem } from "./employee-filter-types";
import { useFilter } from "./use-employee-filter";
import type { ChangeEvent } from "react";
import { useState } from "react";

interface EmployeeFilterProps {
  open?: boolean;
  toggleDrawer?: () => void;
  selectedFilter?: TitleListItem[];
  setSelectedFilter?: (value: string) => void;
  filterList: any;
  searchValue: string;
  changeHandler: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  requiredRadio?: boolean;
  showRadioOnValue?: string;
}

export function EmployeeFilter({
  open,
  changeHandler,
  searchValue,
  toggleDrawer,
  setSelectedFilter,
  filterList,
  requiredRadio,
  showRadioOnValue,
}: EmployeeFilterProps): JSX.Element {
  const {
    handleChange,
    handleCheckboxChange,
    applyFilters,
    expanded,
    resetFilters,
    filterData,
    selectedDate,
    handleDateChange,
  } = useFilter(setSelectedFilter, toggleDrawer);
  const styles = employeeFilterStyles();
  const [isCustom, setIsCustom] = useState<boolean>(false);

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer} sx={{ zIndex: "99999" }}>
      <Box sx={styles.wrap_drawer}>
        <Box sx={styles.wrap_employee_filters}>
          <Typography variant="h5" fontWeight={600}>
            Filters
          </Typography>
          <IconButton sx={styles.drawer_icon_button} onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          {filterList?.map(({ key, title, titleList, startDate, custom }) => (
            <Accordion
              sx={{ ...styles.warp_Accordion(expanded, key) }}
              key={key}
              expanded={expanded === key}
              onChange={handleChange(key)}
            >
              <AccordionSummary
                sx={styles.accordionSummary}
                aria-controls={`${key}-content`}
                id={`${key}-header`}
                expandIcon={expanded === key ? <RemoveIcon /> : <AddIcon />}
              >
                <Typography variant="subtitle2" fontWeight="600" sx={styles.filter_title}>
                  {title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "0px 0px 0px 20px" }}>
                {key !== "Status" && key !== "StartDate" && key !== "Time_Range" && (
                  <Box sx={styles.search_field}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      size="small"
                      name={key}
                      value={searchValue}
                      onChange={changeHandler}
                      InputProps={{
                        placeholder: "Search",
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmployeeSearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                )}
                {startDate ? (
                  <Box sx={styles.calander}>
                    <DateCalendar onChange={handleDateChange} value={selectedDate} />
                  </Box>
                ) : (
                  <Box sx={styles.wrap_filter_options}>
                    {titleList?.map((item) => (
                      <Box key={item?.value} sx={styles.filter_checkbox}>
                        <FormGroup>
                          {requiredRadio && showRadioOnValue === title ? (
                            <FormControl>
                              <RadioGroup>
                                <FormControlLabel
                                  value={item?.value}
                                  control={<Radio />}
                                  label={
                                    <Typography variant="body2" sx={styles.filter_label}>
                                      {item?.name}
                                    </Typography>
                                  }
                                />
                              </RadioGroup>
                            </FormControl>
                          ) : (
                            <FormControlLabel
                              // sx={{ marginTop: "0.5rem" }}
                              control={
                                <Checkbox
                                  name={item.name}
                                  value={item.value}
                                  checked={filterData?.[key]?.includes(item?.value) || false}
                                />
                              }
                              label={
                                <Typography variant="body2" sx={styles.filter_label}>
                                  {item?.name}
                                </Typography>
                              }
                              value={item?.value}
                              onChange={(event: any) => {
                                handleCheckboxChange(
                                  item?.name,
                                  event?.target?.checked,
                                  item?.value,
                                  key
                                );
                              }}
                            />
                          )}
                        </FormGroup>
                      </Box>
                    ))}
                    {custom && (
                      <Typography
                        onClick={() => {
                          setIsCustom(!isCustom);
                        }}
                        sx={{
                          paddingLeft: "3rem",
                          py: "1rem",
                          cursor: "pointer",
                        }}
                        variant="body2"
                      >
                        Custom
                      </Typography>
                    )}
                    {isCustom && (
                      <Box sx={styles.calander}>
                        <DateCalendar onChange={handleDateChange} value={selectedDate} />
                      </Box>
                    )}
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box display="flex" gap="1rem" p={2}>
          <Button variant="outlined" fullWidth onClick={resetFilters}>
            Clear
          </Button>
          <Button variant="contained" fullWidth onClick={applyFilters}>
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
