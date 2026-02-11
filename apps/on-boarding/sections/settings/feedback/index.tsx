import React, { useState } from "react";

import { Box, Button, Typography, Paper, Grid, Switch } from "@mui/material";
import { AddFeedbackQuestionModal } from "./add-question-modal";
import { FeedbackFilter } from "./feedback-filter";

export function FeedbackSection(): JSX.Element {
  const [isBulkSelected, setIsBulkSelected] = useState<boolean>(false);
  const [questionModal, setQuestionModal] = useState<boolean>(false);

  const closeQuestionModalHandler = () => {
    setQuestionModal(false);
  };
  return (
    <Box>
      <Box>
        <Box
          sx={{ mt: 1 }}
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <Box>
            <Typography variant="h5">Onboarding Feedback</Typography>
          </Box>

          <Box ml={{ xs: "unset", lg: "auto" }}>
            <AddFeedbackQuestionModal
              isOpen={questionModal}
              closeModel={closeQuestionModalHandler}
            />
            <Button
              variant="contained"
              onClick={() => {
                setQuestionModal(true);
              }}
            >
              Add Question
            </Button>
          </Box>
        </Box>
        <Box maxWidth={800} mt={1}>
          <Typography variant="subtitle2">
            Gathering feedback from your new hires helps measure how effective
            your organization’s onboarding plan is. If a new hire can answer
            ‘yes’ to all of those questions, you are on the right track.
          </Typography>
        </Box>
      </Box>
      <Box py={2}>
        <Paper variant="elevation" elevation={2}>
          <Box p={1} pb={0}>
            <Typography variant="subtitle2">Settings</Typography>
          </Box>
          <Grid container>
            <Grid
              xs={12}
              lg={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              item
            >
              <Switch />
            </Grid>
            <Grid xs={12} lg={11} p={1} item>
              <Typography variant="subtitle1">
                Feedback from your new hires
              </Typography>{" "}
              <Typography variant="subtitle2">
                While turned off, no feedback will be assigned to any new hires.
                Already assigned feedback questions will still be available to
                be answered and reported on.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {!isBulkSelected && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setIsBulkSelected(true);
          }}
        >
          Bulk Select
        </Button>
      )}
      {isBulkSelected && (
        <Box display="flex" gap={1}>
          <Button variant="contained" size="small">
            {" "}
            Export to CSV
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setIsBulkSelected(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
      <FeedbackFilter />
    </Box>
  );
}
