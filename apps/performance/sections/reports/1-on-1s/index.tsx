"use client";
import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import CustomTimeRange from "@components/custom-time-range";
import { useOneOnOneReport } from "./use-one-on-one-table";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import CustomCard from "@components/custom-card";
import { CustomLoader } from "@components/loader";

// import { PERMISSIONS } from "@enums/permissions";
// import { PermissionProtected } from "@guards/permission-protected";

// const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.PEOPLE;


interface CardTypes {
  id: number;
  title: string;
  value: string | number;
}


export function OneOnOnes(): JSX.Element {
  const { tableData, handleSearch, handleDownloadCSV, handleTimeRangeChange, data, } = useOneOnOneReport();

  const cards: CardTypes[] = [
    {
      id: 1,
      title: "Total Meetings Conducted",
      value: data?.data?.total ?? "0"
    },
    {
      id: 2,
      title: "Average Meeting Frequency",
      value: data?.data?.averageFrequency !== 'N/A' ? data?.data?.averageFrequency : "0"
    },
    {
      id: 3,
      title: "Participation Rate",
      value: data?.data?.participationRate ?? "0"
    },
  ];


  return (
    <Box>
      {tableData?.isLoading && <CustomLoader />}
      <Box sx={{ textAlign: "end", marginBottom: "2rem" }}>
        <CustomTimeRange setStartAndEndDate={handleTimeRangeChange} />
      </Box>

      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {cards.map((item: CardTypes) => (
          <Grid key={item.id} item xl={3.5} lg={3.5} xs={12}>
            <CustomCard
              cardProps={{ sx: { height: '100%' } }}
            >
              <Typography sx={{ fontSize: "20px", fontWeight: 600, mb: "16px" }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: "48px", fontWeight: 600 }}>
                {item.value}
              </Typography>
            </CustomCard>
          </Grid>
        ))}
      </Grid>

      <CustomTableWithHeader
        secondaryHeader
        secondaryHeaderProps={{
          handleSearch,
          actions: (
            <>
              {/* <PermissionProtected permission={PERMISSION.VIEW}> */}
              <Button
                variant="outlined"
                startIcon={<DownloadCsvIcon />}
                onClick={handleDownloadCSV}
              >
                Download CSV
              </Button>
              {/* </PermissionProtected> */}
            </>
          ),
        }}
        tableProps={tableData}
      />
    </Box>
  );
}
