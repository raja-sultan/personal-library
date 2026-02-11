import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useContext } from "react";
import { useGetDropDownCloseReasonsListQuery } from "@services/jobs/job-details/job-setup/job-info/job-info-details-api";
import { IsFetching } from "common";
import { Box } from "@mui/system";
import { ManageOpeningsContext } from "../../approvals/openings/manage-opening-model/manage-opening-context";

export function JobOpeningTabs(): JSX.Element {
  const { openingIdsList, openingTabHan, addNewJobHan, manageOpeningInfoCon } =
    useContext(ManageOpeningsContext);
  const { data, isLoading } = useGetDropDownCloseReasonsListQuery({});

  if (isLoading)
    return (
      <Box position="relative">
        <IsFetching isFetching />
      </Box>
    );

  const randomIndex = Math.floor(
    Math.random() * data?.data?.closeReason.length
  );

  return (
    <>
      <Grid item sx={{ mb: "1em" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            addNewJobHan(data?.data?.closeReason[randomIndex]?._id);
          }}
        >
          Add New
        </Button>
      </Grid>
      <Grid item sx={{ overflow: "auto", height: "90%" }}>
        {openingIdsList.map(({ openingId, _id }, index) => (
          <Button
            key={_id}
            variant="contained"
            fullWidth
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: "0.2em",
              backgroundColor: "transparent",
              color: "text.primary",
              border: "1px solid transparent",
              borderColor: manageOpeningInfoCon?.activeOpeningTabIndex === index
                  ? "primary.main"
                  : "transparent",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "transparent",
                borderColor: "primary.main",
              },
            }}
            startIcon={<FiberManualRecordIcon sx={{ color: "primary.main" }} />}
            onClick={() => {
              openingTabHan(_id, index);
            }}
          >
            {openingId}
          </Button>
        ))}
      </Grid>
    </>
  );
}
