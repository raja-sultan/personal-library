"use client";
import { Close } from "@mui/icons-material";
import { FilterAccordion } from "./filter-accordion";
import { useState, type SyntheticEvent, type ChangeEvent } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  type SxProps,
} from "@mui/material";
import dayjs from "dayjs";

interface SelectedOptions {
  name: string;
  optionsIds: string[];
}

interface Props {
  open?: boolean;
  onClose: () => void;
  data: {
    title: string;
    hideSearchBar?: boolean;
    radio?: boolean;
    requireSingleDatePicker?: boolean;
    options: { id: string; name: string; value?: number }[];
  }[];
  getRadioBtnOption?: (obj: { startDate?: string; endDate?: string } | { id?: string, value: string, title: string }) => void;
  handleDateRange?: (obj: { startDate: string; endDate: string }) => void;
  handleApplyFilter?: (options: SelectedOptions[]) => void;
  handleClearAllFilters?: () => void;
  handleSingleDatePickerChange?: (date: string) => void;
  heading?: string;
  rootSxTitle?: SxProps;
  radioOptionsForSingleVal?: string[];
}

export function FilterComponent(props: Props): JSX.Element {
  const {
    open,
    onClose = () => { },
    data,
    getRadioBtnOption = () => { },
    handleDateRange = () => { },
    handleApplyFilter = () => { },
    handleClearAllFilters = () => { },
    handleSingleDatePickerChange = () => { },
    rootSxTitle,
    radioOptionsForSingleVal,
    heading = "Filter",
  } = props;

  const [expanded, setExpanded] = useState<string | false>(false);
  const [finalArr, setFinalArr] = useState<SelectedOptions[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [openPicker, setOpenPicker] = useState<boolean>(false);

  const handleAccordionChange =
    (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const updateFinalArr = (
    accordionTitle: string,
    optionId: string,
    checked: boolean
  ): void => {
    setFinalArr((prevArr) => {
      const existingIndex = prevArr.findIndex(
        (obj) => obj.name === accordionTitle
      );
      if (existingIndex === -1) {
        return [
          ...prevArr,
          {
            name: accordionTitle,
            optionsIds: checked ? [optionId] : [],
          },
        ];
      }
      return prevArr.map((obj, index) =>
        index === existingIndex
          ? {
            ...obj,
            optionsIds: checked
              ? [...obj.optionsIds, optionId]
              : obj.optionsIds.filter((id) => id !== optionId),
          }
          : obj
      );
    });
    if (checked) setSelectedOptions([...selectedOptions, optionId]);
    else setSelectedOptions(selectedOptions?.filter((id) => id !== optionId));
  };

  const handleRadioBtnChange =
    (option: { id: string; name: string; value?: number }, title: string) =>
      (_: ChangeEvent<HTMLInputElement>): void => {
        if (radioOptionsForSingleVal?.includes(title)) {
          getRadioBtnOption({ id: option.id, title, value: option.name })
        }
        if (option?.name.toLowerCase() === "custom") {
          setOpenPicker(true);
        }
        if (option?.name.toLowerCase() === "all time") {
          getRadioBtnOption({});
        } else if (option?.value) {
          const startDate = dayjs()
            .subtract(option?.value, "day")
            .format("YYYY-MM-DD");
          const endDate = dayjs().format("YYYY-MM-DD");
          getRadioBtnOption({ startDate, endDate });
          setOpenPicker(false);
        }
      };

  const handleFormatDateRange = (values: {
    startDate: Date;
    endDate: Date;
  }): void => {
    const { startDate, endDate } = values;
    handleDateRange({
      startDate: dayjs(startDate).format("YYYY/MM/DD"),
      endDate: dayjs(endDate).format("YYYY/MM/DD"),
    });
  };

  const handleClearAll = (): void => {
    setFinalArr([]);
    setOpenPicker(false);
    setSelectedOptions([]);
    setExpanded(false);
    handleClearAllFilters();
    onClose();
  };

  const handleApply = (): void => {
    handleApplyFilter(finalArr);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box width={{ xs: "280px", lg: "340px" }}>
        <Box display="flex" alignItems="center" p="17px">
          <Typography variant="h5" fontWeight={600} flex={1} pl="5px">
            {heading}
          </Typography>
          <IconButton onClick={onClose}>
            <Close sx={{ opacity: 0.8 }} />
          </IconButton>
        </Box>
        {data?.map((obj) => (
          <FilterAccordion
            key={obj.title}
            selectedOptions={selectedOptions}
            title={obj.title}
            options={obj.options}
            radio={obj.radio}
            hideSearchBar={obj.hideSearchBar}
            updateFinalArr={updateFinalArr}
            expanded={expanded === obj.title}
            onAccordionChange={handleAccordionChange(obj.title)}
            handleRadioBtnChange={handleRadioBtnChange}
            handleDateRange={handleFormatDateRange}
            openPicker={openPicker}
            handleSingleDatePickerChange={handleSingleDatePickerChange}
            requireSingleDatePicker={obj?.requireSingleDatePicker}
            rootSxTitle={rootSxTitle}
          />
        ))}
        <Box display="flex" gap="1rem" p={2}>
          <Button variant="outlined" fullWidth onClick={handleClearAll}>
            Clear
          </Button>
          <Button variant="contained" fullWidth onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
