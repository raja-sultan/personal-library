"use client";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { Button } from "@mui/material";
import { useIndividualLogTable } from "./use-individuals";
import { FilterComponent } from "@components/drawer-filter-component";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomModal from "@components/custom-modal";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import toast from "react-hot-toast";

export function IndividualLogTable(): JSX.Element {
  const {
    tableData,
    handleOpenFilterDrawer,
    openFilterDrawer,
    filterData,
    handleDateRange,
    handleApplyFilter,
    handleClearAllFilters,
    handleRadioChange,
    handleSearch,
    handleTurnOnForAll,
    isOpenTurnOnModal,
    setIsOpenTurnOnModal,
    handleDownloadCSV,
    individualStatus,
  } = useIndividualLogTable();
  return (
    <>
      <CustomHeaderTableTabs
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            handleSearch,
            actions: (
              <>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsOpenTurnOnModal(!isOpenTurnOnModal);
                  }}
                >
                  Turn On For All
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadCsvIcon />}
                  onClick={handleDownloadCSV}
                >
                  Download CSV
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<KeyboardArrowDownIcon />}
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
          key="employees-filter"
          open={openFilterDrawer}
          onClose={handleOpenFilterDrawer}
          handleDateRange={handleDateRange}
          getRadioBtnOption={handleRadioChange}
          handleApplyFilter={handleApplyFilter}
          handleClearAllFilters={handleClearAllFilters}
        />
      )}
      <CustomModal
        open={isOpenTurnOnModal}
        onClose={handleTurnOnForAll}
        title="Are you sure?"
        message="This will turn on updates for employees with a manager"
        acceptText="Confirm"
        onAccept={async () => {
          try {
            await individualStatus({
              status: true,
            });
            toast.success("Status updated successfully.");
            setIsOpenTurnOnModal(false);
          } catch (error) {
            toast.error("Something went wrong!");
            setIsOpenTurnOnModal(false);
          }
        }}
      />
    </>
  );
}
