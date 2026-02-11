"use client";

import React from "react";
import CustomTimeRange from "@components/custom-time-range";
import { Box, Button, Card, Typography } from "@mui/material";
import { cards } from "./compensation.data";
import type { CardTypes } from "./compensation.data";
import { styles } from "./compensation.style";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import { CustomLoader } from "@components/loader";
import { useCompensation } from "./use-compensation";

export function Compensation(): React.JSX.Element {

  const { handleTimeRangeChange, data, tableData, handleSearch, handleDownloadCSV } = useCompensation();

  return (
    <>
      {tableData?.isLoading && <CustomLoader />}
      
      <Box sx={{ textAlign: "end", marginBottom: "2rem" }}>
        <CustomTimeRange setStartAndEndDate={handleTimeRangeChange} />
      </Box>
      <Box sx={styles.cardContainer}>
        {cards(data?.data).map((item: CardTypes) => (
          <Card key={item.id} sx={styles.card}>
            <Typography
              variant="h6"
              fontWeight="600"
              mb={1.6}
              color="text.primary"
            >
              {item.title}
            </Typography>
            <Typography variant="h2" fontWeight="600" color="text.primary">
              {item.value}
            </Typography>
          </Card>
        ))}
      </Box>
      <CustomTableWithHeader
        key="career-compensation-table"
        secondaryHeader
        secondaryHeaderProps={{
          handleSearch,
          actions: (
            <Button variant="outlined" startIcon={<DownloadCsvIcon />} onClick={handleDownloadCSV}>
              Download CSV
            </Button>
          ),
        }}
        tableProps={tableData}
      />
    </>
  );
}
