"use client"
import React from "react";
import { Button } from "@mui/material";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { useGoals } from "./use-goals";

import { CustomPopover } from "@components/custom-popover";
import CustomTimeRange from "@components/custom-time-range";
import { CustomLoader } from "@components/loader";

export function Goals(): JSX.Element {
  const { tableData, handleDownload, handleGroupBy, handleSearch, handleTimeRange, filters } = useGoals();

  const title = filters.goalType === 'All' ? 'All Goals' : filters.goalType

  return (
    <>
      {tableData?.isLoading && <CustomLoader />}
      <CustomTableWithHeader
        key={title}
        primaryHeader
        primaryHeaderProps={{
          title,
          actions: <CustomPopover
            btnText={title}
            options={['All', 'My Goals', 'Direct Reports', 'Department', 'Company']}
            handleChange={handleGroupBy}
          />
        }}
        secondaryHeader
        secondaryHeaderProps={{
          handleSearch,
          actions: <>
            {(title === 'All Goals' || title === 'Company') && <CustomTimeRange setStartAndEndDate={handleTimeRange} />}
            <Button variant="outlined" startIcon={<DownloadCsvIcon />} onClick={handleDownload}>Download CSV</Button>
          </>
        }}
        tableProps={tableData}
      />
    </>
  );
}