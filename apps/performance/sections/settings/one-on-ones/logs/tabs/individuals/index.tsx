"use client";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Button, useTheme } from "@mui/material";
import { useIndividual } from "./use-individual";
import { FilterComponent } from "@components/drawer-filter-component";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING._1_ON_1S._1_ON_1_LOGS;

export function Individuals(): JSX.Element {
  const {
    tableData,
    openFilterDrawer,
    handleDownloadCSV,
    handleSearch,
    filterData,
    handleDateRange, handleApplyFilter, handleClearAllFilters, handleRadioChange, handleOpenFilterDrawer
  } = useIndividual();
  const theme = useTheme()
  return (
    <>
      {/* <CustomHeaderTableTabs
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            handleSearch,
            actions: (
              <>
                <Button
                  variant="outlined"
                  startIcon={<DownloadCsvIcon sx={{color: theme.palette.primary.main}}/>}
                  onClick={handleDownloadCSV}
                >
                  Download CSV
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<KeyboardArrowRight />}
                  onClick={handleOpenFilterDrawer}
                >
                  Filter
                </Button>
              </>
            ),
          },
          tableProps: tableData,
        }}
      /> */}
      <CustomHeaderTableTabs
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            handleSearch,
            actions: (
              <>
                <PermissionProtected permission={PERMISSION.DOWNLOAD_INDIVIDUAL}>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadCsvIcon sx={{ color: theme.palette.primary.main }} />}
                    onClick={handleDownloadCSV}
                  >
                    Download CSV
                  </Button>
                </PermissionProtected>
                <Button
                  variant="outlined"
                  endIcon={<KeyboardArrowRight />}
                  onClick={handleOpenFilterDrawer}
                >
                  Filter
                </Button>
              </>
            ),
          },
          tableProps: tableData,
        }}
      />
      {openFilterDrawer && (
        <FilterComponent
          data={filterData}
          key='employees-filter'
          open={openFilterDrawer}
          onClose={handleOpenFilterDrawer}
          handleDateRange={handleDateRange}
          getRadioBtnOption={handleRadioChange}
          handleApplyFilter={handleApplyFilter}
          handleClearAllFilters={handleClearAllFilters}
        />
      )}
    </>
  );
}
