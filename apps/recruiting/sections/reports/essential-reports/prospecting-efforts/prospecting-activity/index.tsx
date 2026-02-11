import React from "react";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import { CustomBreadCrumbs, CustomTable, TableHeader } from "common";
import SouthIcon from "@mui/icons-material/South";
import { ShareModal } from "./share-modal";
import {
  breadcrumbs,
  creatingAreaOptions,
  filtersData,
} from "./prospecting-activity-data";
import ReactApexChart from "react-apexcharts";
import useProspectingActivity from "./use-prospecting-activity";

function ProspectActivitySection(): JSX.Element {
  const {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    stageLabels,
    newSeries,
    open,
    setOpen,
    theme,
  } = useProspectingActivity();

  const columns = [
    {
      accessorFn: (row: any) => row.hasScorecard ?? "-",
      id: "hasScorecard",
      header: () => <Box>Has Scorecard</Box>,
      cell: (info: any) => {
        return <Box>{Boolean(info?.row?.original?.hasScorecard)}</Box>;
      },
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.stage ?? "-",
      id: "stage",
      header: () => <Box>Stage</Box>,
      cell: (info: any) => {
        return <Box>{info?.row?.original?.stage ?? "-"}</Box>;
      },
      isSortable: false,
    },
  ];

  return (
    <Card
      sx={{
        p: "8px 25px 25px 25px",
        background: "background.default",
      }}
    >
      <Box sx={{ mt: 1.5 }}>
        <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ color: "text.primary", my: 3 }}>
          Prospecting Activity
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
          >
            Share
          </Button>
          <Avatar sx={{ backgroundColor: "primary.main" }}>
            <SouthIcon sx={{ color: "common.white" }} />
          </Avatar>
        </Box>
      </Box>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="body1"
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          Apply Filters
        </Typography>
        <TableHeader
          gridProps={{
            lg: 2.2,
          }}
          onChanged={() => {
            // setOtherParams(e);
          }}
          tableHeaderData={filtersData}
        />
      </Card>
      <Box sx={{ mt: 2 }}>
        {/* Chart to display data */}
        <Box
          sx={{
            my: 3,
            backgroundColor: "background.default",
            borderRadius: "8px",
            py: 2,
          }}
        >
          <ReactApexChart
            options={
              creatingAreaOptions(
                theme.palette.success.darkest,
                stageLabels
              ) as ApexCharts.ApexOptions
            }
            series={newSeries}
            type="area"
            height={220}
          />
        </Box>
        <CustomTable
          data={data?.data}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination
          isSuccess={isSuccess}
          showSerialNo
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          // onPageChange={(onPageData: any) => {
          //   setParams({
          //     page: onPageData,
          //     offset: (onPageData - 1) * 10,
          //   });
          // }}
        />
      </Box>
      {/* Share Email Modal */}
      <ShareModal open={open} setOpen={setOpen} />
    </Card>
  );
}

export default ProspectActivitySection;
