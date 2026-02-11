"use client";
import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { DateRangePicker } from "react-date-range";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem, Box } from "@mui/material";
import type { Theme } from "@mui/material";
import dayjs from "dayjs";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { CustomPopover } from "@components/custom-popover";

interface Props {
  setStartAndEndDate?: any;
}

interface Range {
  startDate: Date;
  endDate: Date;
  key: string;
}

export default function CustomTimeRange(props: Props): JSX.Element {
  const { setStartAndEndDate } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [timeRanges, setTimeRanges] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const timeRangeData = [
    {
      title: "All Time",
      value: {},
    },
    {
      title: "Last 30 days",
      value: {
        startDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD"),
      },
    },
    {
      title: "Last 90 days",
      value: {
        startDate: dayjs().subtract(90, "day").format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD"),
      },
    },
    {
      title: "Last 365 days",
      value: {
        startDate: dayjs().subtract(365, "day").format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD"),
      },
    },
    {
      title: "Custom",
    },
  ];

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleDateRange = (ranges): void => {
    setTimeRanges([ranges.selection]);
    if (ranges?.selection?.endDate !== ranges?.selection?.startDate) {
      setStartAndEndDate({
        startDate: dayjs(ranges?.selection?.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(ranges?.selection?.endDate).format("YYYY-MM-DD"),
      });
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover-custom" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="outlined"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        Time Range
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {timeRangeData.map((item: any) =>
          item.title !== "Custom" ? (
            <MenuItem
              key={item.title}
              sx={styles.menuItem}
              onClick={() => {
                item.title !== "Custom" && setAnchorEl(null);
                setStartAndEndDate(item?.value);
              }}
            >
              {item.title}
            </MenuItem>
          ) : (
            <CustomPopover
              key={item?.title}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              customActionComponent={<MenuItem sx={styles.menuItem}>{item.title}</MenuItem>}
              customComponent={
                <Box sx={styles.datePickerWrapper}>
                  <DateRangePicker
                    onChange={handleDateRange}
                    months={2}
                    ranges={timeRanges}
                    direction="horizontal"
                    showMonthArrow
                  />
                </Box>
              }
            />
          )
        )}
      </Popover>
    </div>
  );
}

const styles = {
  menuItem: (theme: Theme) => ({
    fontSize: "16px",
    color: theme.palette.mode === "dark" ? theme.palette.neutral[200] : theme.palette.neutral[900],
    lineHeight: "25px",
  }),
  datePickerWrapper: {
    "& .rdrDefinedRangesWrapper": { display: "none !important" },
    "& .rdrDateDisplayWrapper": { display: "none !important" },
  },
};
