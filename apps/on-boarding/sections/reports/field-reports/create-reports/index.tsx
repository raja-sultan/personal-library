import React, { useState } from "react";
import { Stack } from "@mui/system";
import { CustomTable } from "common";

import { Typography, Button, Grid } from "@mui/material";
import { FilterModal } from "./filter-modal";
import { ColumnsModal } from "./columns-modal";
import { SaveReportModal } from "./save-report-modal";

export function CreateReports(): JSX.Element {
  const [storeData, setStoreData] = useState<any>("");
  const [addFilter, setAddFilter] = useState(false);
  const [addColumns, setAddColumns] = useState(false);
  const [columnsForFilter, setColumnsForFilter] = useState([]);
  const [filtersForColumn, setFiltersForColumn] = useState([]);

  const col: any = {};
  for (const key of storeData) {
    for (const value in key) {
      col[value] = true;
    }
  }
  if (col?._id) {
    delete col._id;
  }
  const AllColumns = Object.entries(col).map(([key]) => ({
    accessorFn: (row: any) => row?.[key] ?? "-",
    id: key,
    cell: (info: any) => {
      return (
        <Typography variant="body2" fontWeight={500}>
          {info.getValue() ?? "-"}
        </Typography>
      );
    },
    header: () => <span>{key}</span>,
    isSortable: false,
  }));

  const columnData = (columns): void => {
    setColumnsForFilter(columns);
  };
  const filtersData = (filters): void => {
    setFiltersForColumn(filters);
  };

  return (
    <>
      <Typography variant="h5" mb={2}>
        Field Reports
      </Typography>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={3}
      >
        <Typography variant="body1">Create New Report</Typography>

        <SaveReportModal
          filtersForColumn={filtersForColumn}
          columnsForFilter={columnsForFilter}
          isSaveModal
        />
      </Stack>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={4} sx={{ mb: 1 }}>
          <Button
            size="large"
            onClick={() => {
              setAddColumns(true);
            }}
            variant="outlined"
            sx={{
              color: "neutral.700",
              borderColor: "neutral.300",
              "&:hover": {
                borderColor: "neutral.300",
              },
              width: "100%",
              justifyContent: "start",
            }}
          >
            Add Columns
          </Button>
        </Grid>
        <Grid item xs={12} md={4} sx={{ mb: 1 }}>
          <Button
            size="large"
            onClick={() => {
              setAddFilter(true);
            }}
            variant="outlined"
            sx={{
              color: "neutral.700",
              borderColor: "neutral.300",
              "&:hover": {
                borderColor: "neutral.300",
              },
              width: "100%",
              justifyContent: "start",
            }}
          >
            Add Filter
          </Button>
        </Grid>
      </Grid>
      <FilterModal
        addFilter={addFilter}
        setAddFilter={setAddFilter}
        setStoreData={setStoreData}
        columnsForFilter={columnsForFilter}
        filtersDataListFunction={filtersData}
      />
      <ColumnsModal
        addColumns={addColumns}
        setAddColumns={setAddColumns}
        setStoreData={setStoreData}
        filtersForColumn={filtersForColumn}
        columnDataListFunction={columnData}
      />
      <CustomTable
        columns={AllColumns}
        data={storeData}
        isSuccess
        isError={false}
        isLoading={false}
        isFetching={false}
        isPagination={false}
      />
    </>
  );
}
