import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { CustomTable } from "common";
import { Edit } from "@assets/common";

export default function AddJobPermissions() {
  return (
    <Box>
      <Button
        sx={{ fontSize: 12 }}
        onClick={() => {
          console.log("bring back");
        }}
      >
        Back to All Users
      </Button>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Add Job Permissions</Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="Notify user of new permissions via email"
        />
      </Box>

      {/* -------------------------Filters------------------------- */}
      <Box sx={{ bgcolor: "neutral.50", p: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={1}
        >
          <OutlinedInput
            type="text"
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          <Box>
            <FormControlLabel
              control={<Checkbox />}
              label="Include closed jobs"
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                console.log("Bulk");
              }}
            >
              Bulk{" "}
            </Button>
          </Box>
        </Box>
        <Grid container justifyContent="space-evenly" spacing={2}>
          <Grid item md={4}>
            <Autocomplete
              options={["1", "2", "3"]}
              renderInput={(params) => (
                <TextField {...params} label="All permissions" />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              options={["1", "2", "3"]}
              renderInput={(params) => (
                <TextField {...params} label="All Offers" />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Autocomplete
              options={["1", "2", "3"]}
              renderInput={(params) => (
                <TextField {...params} label="All Departments" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box my={1}>
        <JobsTable isFeaturedJobs />
      </Box>
      <Box my={1}>
        <JobsTable />
      </Box>
    </Box>
  );
}

function JobsTable(props) {
  const [isEditing, setIsEditing] = useState(null);

  const dummyJobs = [
    {
      _id: 1,
      jobName: "Associate Copywriter (San Francisco , Denver ,  NewYork)(35)",
      permissions: "Job Admin:Private",
    },
    { _id: 2, jobName: "Job 2", permissions: "Job Admin:Private" },
    { _id: 3, jobName: "Job 3", permissions: "Job Admin:Private" },
  ];
  const { isFeaturedJobs } = props;
  const formColumns = [
    {
      accessorFn: (row: any) => row?.jobName,
      id: "jobName",
      cell: (info: any) => (
        <Box
          display="flex"
          justifyContent="flex-start"
          pl={2}
          width="100%"
          //   border={1}
        >
          {info.getValue()}
        </Box>
      ),
      header: () => (
        <Box width="200%" pl={2} display="flex" justifyContent="flex-start">
          {isFeaturedJobs ? "Featured Job" : "Jobs"}
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?.permissions,
      id: "permissions",
      cell: (info: any) => {
        const editModeContent = (
          <Autocomplete
            sx={{ minWidth: 200 }}
            options={[
              "None",
              "Job Admin:Approver",
              "Job Admin:Hiring Manager",
              "Job Admin:Standard",
            ]}
            renderInput={(params) => (
              <TextField {...params} label="All permissions" />
            )}
          />
        );

        const viewModeContent = info.getValue();

        return (
          <Box display="flex" justifyContent="flex-start" width="50%">
            {isEditing === info.row.original._id
              ? editModeContent
              : viewModeContent}
          </Box>
        );
      },
      header: () => (
        <Box width="50%" display="flex" justifyContent="flex-start">
          Permissions
        </Box>
      ),
    },
    {
      accessorFn: (row: any) => row?._id,
      id: "actions",
      cell: (info) => (
        <Box display="flex" justifyContent="center" width="50%">
          {isEditing === info.row.original._id ? (
            <Button
              onClick={() => handleEditClick(null)}
              variant="contained"
            >
              Save
            </Button>
          ) : (
            <IconButton onClick={() => handleEditClick(info.row.original._id)}>
              <Edit />
            </IconButton>
          )}
        </Box>
      ),
      header: () => (
        <Box width="50%" display="flex" justifyContent="center">
          Action
        </Box>
      ),
    },
  ];
  const handleEditClick = (row: any) => {
    // Toggle the editing state for the clicked row
    setIsEditing(row);
  };
  return (
    <CustomTable
      data={dummyJobs}
      columns={formColumns}
      isLoading={false}
      isFetching={false}
      isError={false}
      isSuccess={true}
      onPageChange={console.log}
    />
  );
}
