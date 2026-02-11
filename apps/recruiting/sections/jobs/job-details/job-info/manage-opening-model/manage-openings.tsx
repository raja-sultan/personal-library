import { Grid, Box } from "@mui/material";
import { JobOpeningTabs } from "./job-opening-ids-tabs";
import { useContext } from "react";
import { IsFetching } from "common";
import { ManageOpeningFormCon } from "../../approvals/openings/manage-opening-model/manage-opening-form-container/manage-opening-form-con";
import { ManageOpeningsContext } from "../../approvals/openings/manage-opening-model/manage-opening-context";

export function ManageOpenings({ closeModel }): JSX.Element {
  const { isLoading, isFetching, openingIdsList, manageOpeningInfoCon } =
    useContext(ManageOpeningsContext);
  return (
    <Grid
      container
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        width: { xs: "90%", sm: "50%" },
        height: { xs: "90%", sm: "80%" },
      }}
    >
      {isLoading && <IsFetching isFetching={isFetching} />}
      {!isLoading && (
        <>
          <IsFetching isFetching={isFetching} />
          <Grid item container sx={{ p: "0.6em", height: "100%" }}>
            <Grid
              item
              xs={4}
              sx={{
                p: "0.4em",
                height: "100%",
              }}
            >
              <JobOpeningTabs />
            </Grid>
            <Grid item xs={8} sx={{ height: "100%" }}>
              {openingIdsList.map((list, index) => (
                <Box key={index}>
                  {index === manageOpeningInfoCon?.activeOpeningTabIndex && (
                    <ManageOpeningFormCon
                      openingId={list._id}
                      closeModel={closeModel}
                    />
                  )}
                </Box>
              ))}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
