import { useState } from "react";
import type { TitleListItem, UseFilterReturnType } from "./employee-filter-types";
import dayjs from "dayjs";

export function useFilter(setSelectedFilter, toggleDrawer): UseFilterReturnType {
  const [expanded, setExpanded] = useState<string | boolean>(false);
  const [filterData, setFilterData] = useState({});
  const [selectedDate, setSelectedDate] = useState<any>();
  const [selectedFilters, setSelectedFilters] = useState<TitleListItem[]>([]);

  const handleDateChange = (date): void => {
    setSelectedDate(date);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCheckboxChange = (
    name: string,
    checked: boolean,
    value: string,
    key: string
  ): void => {
    const itemArray = filterData[key] || [];
    const index = itemArray.indexOf(value);
    if (index !== -1) itemArray.splice(index, 1);
    else itemArray.push(value);
    setFilterData({ ...filterData, [key]: itemArray });
  };

  const applyFilters = (): void => {
    const appliedFilters = Object.keys(filterData)?.map((key) => ({
      name: key,
      value: filterData[key].join(","),
    }));

    if (selectedDate) {
      appliedFilters.push({
        name: "employmentStartDate",
        value: selectedDate
          ? dayjs(selectedDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]").toString()
          : "",
      });
    }
    setSelectedFilters(appliedFilters);
    setSelectedFilter(appliedFilters);
    toggleDrawer(false);
  };

  // console.log(selectedFilters,'selectedFilters');

  const resetFilters = (): void => {
    setSelectedFilters([]);
    setFilterData({});
    setSelectedDate("");
    setSelectedFilter([]);
    toggleDrawer(false);
  };
  return {
    handleChange,
    handleCheckboxChange,
    applyFilters,
    expanded,
    filterData,
    selectedFilters,
    resetFilters,
    handleDateChange,
    setSelectedFilters,
    selectedDate,
  };
}
