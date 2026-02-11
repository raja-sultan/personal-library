"use client"
import React from "react";
import { Button } from "@mui/material";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import { useCareer } from "./use-career";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { CustomPopover } from "@components/custom-popover";
import { CustomLoader } from "@components/loader";

export function Career(): React.JSX.Element {
  const { tableData, handleDownload, handleGroupBy, handleSearch ,title} = useCareer();
  
  return (
    <>
      {tableData?.isLoading && <CustomLoader />}
    <CustomTableWithHeader
      primaryHeader
      primaryHeaderProps={{
        title,
        actions: <CustomPopover
          btnText={title}
          options={['individual', 'department', 'career_plan']}
          handleChange={handleGroupBy}
        />
      }}
      secondaryHeader
      secondaryHeaderProps={{
        handleSearch,
        actions: (
          <Button variant="outlined" startIcon={<DownloadCsvIcon />} onClick={handleDownload}>Download CSV</Button>
        ),
      }}
      tableProps={tableData}
    />
    </>
  );
}