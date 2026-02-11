"use client";

import CustomCard from "@components/custom-card";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { Button, Card, Grid, Typography } from "@mui/material";
import { ExportCsvIcon } from "@assets/icons/export-csv-icon";
import CustomModal from "@components/custom-modal";
import { useCompensationBands } from "./use-compensation-bands";
import { ThemeModeColor } from "@root/utils";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.COMPENSATION.COMPENSATION_BANDS;
export function CompensationBands(): JSX.Element {
  const {
    selectedFilter,
    router,
    handleFilterBands,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    tableProps,
    handleSearch,
    departmentFilters,
    handleDownloadCSV,
    handleDeleteBand,
  } = useCompensationBands();

  return (
    <>
      <CustomCard
        cardProps={{ sx: { mb: "24px" } }}
        subHeader
        cardSubHeader={{
          title: "Compensation Bands",
          description:
            "Create your own compensation bands to manage payments for your employee roles.",
          actions: (
            <PermissionProtected permission={PERMISSION.CREATE}>
            <Button
              variant="contained"
              onClick={() => router.push("/settings/compensation/compensation-bands/create")}
            >
              Create Band
            </Button>
            </PermissionProtected>
          ),
        }}
      />
      <Grid container columnSpacing="24px">
        <Grid item xs={12} md={2.5}>
          <Card sx={{ minHeight: "calc(100vh - 230px)" }}>
            <Typography sx={{ p: "24px" }} variant="body1" fontWeight={600}>
              Departments
            </Typography>
            {departmentFilters?.map((item) => (
              <Button
                sx={{ width: "100%", justifyContent: "unset", px: "24px", borderRadius: 0 }}
                key={item?.id}
                onClick={() => {
                  handleFilterBands(item);
                }}
              >
                <Typography
                  color={ThemeModeColor("#344054", "#A0AEC0")}
                  fontWeight={selectedFilter === item?.id ? 600 : 400}
                >
                  {item?.departmentName}
                </Typography>
              </Button>
            ))}
          </Card>
        </Grid>
        <Grid item xs={12} md={9.5} sx={{
          "& .MuiTableContainer-root::-webkit-scrollbar-thumb": {
            display: "none",
          }
        }}>
          <CustomTableWithHeader
            secondaryHeader
            secondaryHeaderProps={{
              handleSearch,
              actions: (
                <PermissionProtected permission={PERMISSION.EXPORT}>
                <Button onClick={handleDownloadCSV} variant="outlined" startIcon={<ExportCsvIcon />}>
                  Export
                </Button>
                </PermissionProtected>
              ),
            }}
            tableProps={tableProps}
          />
        </Grid>
      </Grid>
      {isDeleteModalOpen && (
        <CustomModal
          title="Are you sure?"
          message="Are you sure you want to delete this compensation band?"
          open={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onAccept={handleDeleteBand}
        />
      )}
    </>
  );
}
