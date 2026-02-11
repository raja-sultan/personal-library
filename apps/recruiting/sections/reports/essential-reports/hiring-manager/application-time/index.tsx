import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { CustomBreadCrumbs, TableHeader } from "common";
//import SouthIcon from "@mui/icons-material/South";
//import { ShareModal } from "./share-modal";
import { breadcrumbs, creatingAreaOptions } from "./application-data";
import ReactApexChart from "react-apexcharts";
import useShareModal from "./use-application-time";

function ApplicationOverTimeSection(): JSX.Element {
  const {
    newSeries,
    //open,
    // setOpen,
    theme,
    setParams,
    departmentOptions,
    officeOptions,
    userList,
  } = useShareModal();

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
          Application Over Time
        </Typography>
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
        </Box> */}
      </Box>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="body1"
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          Apply Filters
        </Typography>
        <TableHeader
          showClearFilterButton
          gridProps={{
            lg: 2.2,
          }}
          onChanged={(e: any) => {
            setParams(e);
          }}
          tableHeaderData={[
            {
              type: "select",
              FieldProps: {
                name: "jobStatus",
                label: "Job Status",
              },
              options: [
                {
                  label: "Open",
                  value: "Open",
                },
                {
                  label: "Close",
                  value: "Close",
                },
                {
                  label: "Draft",
                  value: "Draft",
                },
              ],
            },
            {
              type: "multiselect",
              FieldProps: {
                name: "department",
                label: "Department",
              },
              options: departmentOptions ?? [
                {
                  id: 1,
                  label: "No Department Found",
                  value: "No Department Found",
                },
              ],
            },
            {
              type: "multiselect",
              FieldProps: {
                name: "office",
                label: "Office",
              },
              options: officeOptions ?? [
                {
                  id: 1,
                  label: "No Office Found",
                  value: "No Office Found",
                },
              ],
            },
            {
              type: "multiselect",
              FieldProps: {
                name: "user",
                label: "User",
              },
              options: userList ?? [
                {
                  id: 1,
                  label: "No User Found",
                  value: "No User Found",
                },
              ],
            },
            {
              type: "date",
              FieldProps: {
                name: "date",
                label: "Date Applied",
              },
            },
          ]}
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
                theme.palette.success.darkest
              ) as ApexCharts.ApexOptions
            }
            series={newSeries}
            type="area"
            height={280}
          />
        </Box>
      </Box>
      {/* Share Email Modal */}
      {/* <ShareModal open={open} setOpen={setOpen} /> */}
    </Card>
  );
}

export default ApplicationOverTimeSection;
