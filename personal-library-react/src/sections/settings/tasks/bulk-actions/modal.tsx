import { CustomModal, WarningPrompt } from "common";
import React from "react";
import { Button, Grid, Typography } from "@mui/material";

export default function BulkActionModalBox(props): JSX.Element {
  const {
    isOpen,
    setIsOpen,
    setIsReassignOpen,
    setIsChangeTaskOpen,
    setIsUpdateRulesOpen,
    setIsEditTaskDateOpen,
  } = props;
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={setIsOpen}
      rootSx={{
        maxWidth: { xs: 350, md: 550 },
      }}
      headerLabel="Bulk Actions"
      closeButtonProps={{
        onClick: () => {
          setIsOpen(false);
        },
      }}
    >
      <Grid container py={1}>
        <Typography variant="subtitle2">Edit</Typography>
        <Grid container gap={1} py={1}>
          <Button
            variant="contained"
            onClick={() => {
              setIsReassignOpen(true);
            }}
            sx={{ fontSize: 11 }}
            size="small"
          >
            {" "}
            Reassign
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsChangeTaskOpen(true);
            }}
            sx={{ fontSize: 11 }}
            size="small"
          >
            {" "}
            Change Task Category
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsUpdateRulesOpen(true);
            }}
            sx={{ fontSize: 11 }}
            size="small"
          >
            {" "}
            Update Rules
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsEditTaskDateOpen(true);
            }}
            sx={{ fontSize: 11 }}
            size="small"
          >
            {" "}
            Update Task Due Date
          </Button>
        </Grid>
        <Grid py={1} direction="column">
          <Typography variant="subtitle2" mb={1}>
            Actions
          </Typography>
          <WarningPrompt
            mainColor="error.main"
            heading="Alert"
            subTitle="Are you sure you want to delete task?"
            modelOpenLabel={
              <Button
                variant="contained"
                sx={{ px: 3, fontSize: 11 }}
                color="error"
                size="small"
              >
                {" "}
                Delete
              </Button>
            }
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {},
            }}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}
