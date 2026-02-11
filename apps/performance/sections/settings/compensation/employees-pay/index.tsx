"use client";

import { KeyboardArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Card,
} from "@mui/material";

import { styles } from "./employeepay-styles";
import CustomModal from "@components/custom-modal";
import { CloseIcon } from "@assets/icons/close-icon";
import { useEmployeesPay } from "./use-employees-pay";
import { EmployeePayTable } from "./employee-pay-table";
import { SelectedFileIcon } from "@assets/icons/file-icon";
import { ExportCsvIcon } from "@assets/icons/export-csv-icon";
import { FilterComponent } from "@components/drawer-filter-component";
import { FormProvider, RHFUploadSingleFileWithPreview } from "common";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { ViewDepartmentsNoDataIcon } from "@assets/icons/view-departments-no-data";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.COMPENSATION.EMPLOYEE_PAY;

export function EmployeesPay(): JSX.Element {
  const {
    isModalOpen,
    isDeleteModalOpen,
    handleToggleModal,
    uploadEmployeePayHandler,
    handleDeleteEmployeePay,
    handleDeleteEmployee,
    handleSearch,
    filterDrawer,
    filterValues,
    handleFilterDrawer,
    handleExportCSV,
    methods,
    tableData,
    filterData,
    handleApplyFilter,
    handleClearAllFilters,
  } = useEmployeesPay();

  const { watch, reset } = methods;
  const selectedFile: any = watch("csv");

  // Keys to exclude from the check
  const excludeKeys = ["limit", "offset"];

  // Check if any of the specified fields have values
  const hasFilterValues = Object.entries(filterValues).some(([key, value]) => {
    return !excludeKeys.includes(key) && value !== undefined && value !== null;
  });

  return (
    <>
      {tableData?.isLoading ? (
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
          }}
        >
          <CircularProgress />
        </Card>
      ) : (
        <CustomTableWithHeader
          primaryHeader
          primaryHeaderProps={{
            title: "Employee Pay",
            description: "Organize employees pay data",
            actions: (
              <PermissionProtected permission={PERMISSION.UPLOAD}>
              <Button variant="contained" onClick={handleToggleModal}>
                Upload Pay Data
              </Button>
              </PermissionProtected>
            ),
          }}
          hideTable
          secondaryHeader={hasFilterValues || tableData?.data?.length > 0}
          secondaryHeaderProps={{
            handleSearch,
            actions: (
              <>
                <Button
                  variant="outlined"
                  onClick={handleFilterDrawer}
                  endIcon={<KeyboardArrowRight />}
                >
                  Filter
                </Button>
                <PermissionProtected permission={PERMISSION.EXPORT}>
                <Button
                  variant="outlined"
                  onClick={handleExportCSV}
                  startIcon={<ExportCsvIcon />}
                >
                  Export CSV
                </Button>
                </PermissionProtected>
              </>
            ),
          }}
        >
          {!hasFilterValues && !tableData?.data?.length ? (
            <NoData />
          ) : (
            <EmployeePayTable {...tableData} />
          )}
        </CustomTableWithHeader>
      )}
      {isModalOpen && (
        <CustomModal
          open={isModalOpen}
          title="Upload from CSV"
          headerIcon={false}
          message=""
          acceptText="Save"
          acceptButtonProps={{
            color: "primary",
            disabled: !selectedFile,
            onClick: uploadEmployeePayHandler,
          }}
          onClose={handleToggleModal}
        >
          <Box display="flex" gap="16px">
            <Box sx={styles.bulletPointStyle}>
              <Typography color="primary">1</Typography>
            </Box>
            <Box>
              <Typography fontWeight={600}>
                Download the &nbsp;
                <Typography
                  component="span"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Employee pay CSV template
                </Typography>
              </Typography>
              <Typography variant="body2">
                The CSV must include fields for Employee Email, Base Pay Amount,
                Variable Pay Amount. Effective Date & Currency.
              </Typography>
            </Box>
          </Box>

          <Box display="flex" gap="16px" mt={5}>
            <Box sx={styles.bulletPointStyle}>
              <Typography color="primary">2</Typography>
            </Box>
            <Typography variant="body2">Upload the updated CSV</Typography>
          </Box>
          <Box mt={5}>
            <FormProvider methods={methods}>
              <RHFUploadSingleFileWithPreview
                name="csv"
                outerLabel="Upload File"
                accept={{ "text/csv": [".csv"] }}
                supportedFormats="CSV"
                type="csv"
              />
            </FormProvider>
          </Box>
          {selectedFile && (
            <Box sx={styles.filePreviewStyle}>
              <Box display="flex" gap="15px" alignItems="center">
                <Box sx={styles.iconStyle}>
                  <SelectedFileIcon />
                </Box>
                <Stack>
                  <Typography variant="body2" color="neutral.900">
                    {selectedFile?.name}
                  </Typography>
                  <Typography variant="caption" color="neutral.400">
                    {`${(selectedFile?.size / 1024).toFixed(1)}KB`}
                  </Typography>
                </Stack>
              </Box>
              <Box
                sx={{ cursor: "pointer", mt: "8px" }}
                onClick={(): void => {
                  reset();
                }}
              >
                <CloseIcon />
              </Box>
            </Box>
          )}
        </CustomModal>
      )}

      {isDeleteModalOpen && (
        <CustomModal
          title="Are you sure?"
          message="Are you sure you want to delete this employee pay data?"
          open={isDeleteModalOpen}
          onClose={() => {
            handleDeleteEmployee(null);
          }}
          acceptButtonProps={{ onClick: handleDeleteEmployeePay }}
        />
      )}

      {filterDrawer && (
        <FilterComponent
          key="employeePay"
          open={filterDrawer}
          onClose={handleFilterDrawer}
          data={filterData}
          handleApplyFilter={handleApplyFilter}
          handleClearAllFilters={handleClearAllFilters}
        />
      )}
    </>
  );
}

function NoData(): JSX.Element {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ViewDepartmentsNoDataIcon />
      <Typography variant="h5" fontWeight={600} mt={1}>
        No employees have been added yet
      </Typography>
      <Typography
        variant="body2"
        mt={1.5}
        pb={2}
        sx={{
          width: { lg: "34%", md: "100%" },
          mx: "auto",
          textAlign: "center",
        }}
      >
        Upload your employee pay data to create compensation cycles for your
        employees.
      </Typography>
    </Box>
  );
}
