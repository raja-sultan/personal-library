import { Button } from "@mui/material";
import { useEmployees } from "./use-employees";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import { FilterComponent } from "@components/drawer-filter-component";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.FEEDBACK.FEEDBACK_LOG;

// ========================================================================

export function Employees(): JSX.Element {
  const {
    handleOpenFilterDrawer, openFilterDrawer, tableData, handleDownloadCSV, filterData, handleDateRange, handleApplyFilter, handleClearAllFilters, handleRadioChange, handleSearch
  } = useEmployees();
  return (
    <>
      <CustomHeaderTableTabs
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            handleSearch,
            actions: (
              <>
                <PermissionProtected permission={PERMISSION.DOWNLOAD} disabled>
                  <Button variant="outlined" onClick={handleDownloadCSV} startIcon={<DownloadCsvIcon />}>Download CSV</Button>
                </PermissionProtected>
                <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />} onClick={handleOpenFilterDrawer}>Filter</Button>
              </>
            ),
          },
          tableProps: tableData,
        }}
      />
      {
        openFilterDrawer &&
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
      }
    </>
  );
}
