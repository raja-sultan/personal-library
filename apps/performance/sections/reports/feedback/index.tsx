"use client";
import { Button, Grid, Typography } from "@mui/material";
import { CustomPopover } from "@components/custom-popover";
import { useFeedback } from "./use-feedback";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import CustomCard from "@components/custom-card";
import { CustomLoader } from "@components/loader";
import CustomTimeRange from "@components/custom-time-range";



export function Feedback(): React.JSX.Element {
  const {
    tableData, handleDownload, handleGroupBy, handleSearch, handleTimeRange, filters,badgeData 
  } = useFeedback();
  const title = filters.groupBy


  return (
    <>
     <Grid container spacing={2} sx={{ mb: 2.5 }}>
        {badgeData.map((item) => (
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
    {tableData?.isLoading && <CustomLoader />}
    <CustomTableWithHeader
      key={title}
      primaryHeader
      primaryHeaderProps={{
        title,
        actions: <CustomPopover
          btnText={title}
          options={['Individual', 'Department', 'Manager', 'Role']}
          handleChange={handleGroupBy}
        />
      }}
      secondaryHeader
      secondaryHeaderProps={{
        handleSearch,
        actions: <>
          <CustomTimeRange setStartAndEndDate={handleTimeRange} />
          <Button variant="outlined" startIcon={<DownloadCsvIcon />} onClick={handleDownload}>Download CSV</Button>
        </>
      }}
      tableProps={tableData}
    />
  </>
  );
}
