import { Box, Button } from "@mui/material";
import { FeedbackModal } from "@sections/jobs/job-details/pipe-line/app-review/feedback-modal";
import { useState } from "react";
import { RejectedModals } from "./reject-modal";
import { AdvancedModal } from "./advance-modal";

export function ReviewButton(): JSX.Element {
  const [openFeedbackModal, setOpenFeedbackModal] = useState<boolean>(false);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);

  return (
    <Box sx={{ gap: 2 }}>
      <Button
      size="small"
      variant="outlined"
        onClick={() => {
          setOpenFeedbackModal(true);
        }}
        sx={{mr:"5px"}}
      >
        Leave a Feedback
      </Button>

      <Button
      size="small"
      variant="outlined"
      color="error"
      sx={{mr:"5px"}}
        // variant="contained"
        onClick={() => {
          setOpenRejectModal(true);
        }}
      >
        Reject
      </Button>

      <AdvancedModal />
      {openFeedbackModal && (
        <FeedbackModal
          feedback={openFeedbackModal}
          setFeedback={setOpenFeedbackModal}
        />
      )}
      {openRejectModal && (
        <RejectedModals
          reject={openRejectModal}
          setReject={setOpenRejectModal}
        />
      )}
    </Box>
  );
}
