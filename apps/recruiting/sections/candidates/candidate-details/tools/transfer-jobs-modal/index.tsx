import { Box, Button, useTheme } from "@mui/material";
import { CustomModal } from "common";
import React, { useState } from "react";
import EastIcon from "@mui/icons-material/East";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { AddToAnotherJobModal } from "./add-another-job";
import { styles } from "./transfer-jobs-modal.styles";
import { DifferentJobTransfer } from "./different-job";
import { RemoveJobModal } from "./remove-job";

export function TransferJobModal(props): JSX.Element {
  const theme = useTheme();
  const { candidateJobs, setCandidateJobs, jobsName } = props;
  const [anotherJob, setAnotherJob] = useState<boolean>(false);
  const [differentJob, setDifferentJob] = useState<boolean>(false);
  const [removeJob, setRemoveJob] = useState<boolean>(false);

  return (
    <>
      <CustomModal
        onClose={() => {
          setCandidateJobs(false);
        }}
        rootSx={styles.modalStyling}
        headerLabel={`Add, Transfer or Remove Candidate's Jobs`}
        closeButtonProps={{
          onClick: () => {
            setCandidateJobs(false);
          },
        }}
        isOpen={candidateJobs}
      >
        <Box sx={styles.transferWrapper}>
          <Button
            variant="contained"
            onClick={() => {
              setAnotherJob(true);
            }}
            sx={{ mb: { xs: 1, sm: 0 }, minWidth: "220px" }}
          >
            Add to Another Job
          </Button>
          |
          <Box
            sx={{
              ...styles.jobOneStyling,
              backgroundColor: theme.palette.neutral[200],
            }}
          >
            Job 1
          </Box>
          <AddIcon sx={styles.arrowIcon} />
          <Box
            sx={{
              ...styles.jobTwoStyling,
            }}
          >
            Job 2
          </Box>
        </Box>
        <Box sx={styles.transferWrapper}>
          <Button
            onClick={() => {
              setDifferentJob(true);
            }}
            variant="contained"
            sx={{ mb: { xs: 1, sm: 0 }, minWidth: "220px" }}
          >
            Transfer to a Different Job
          </Button>
          |<Box sx={styles.jobOneStyling}>Job 1</Box>
          <EastIcon sx={styles.arrowIcon} />
          <Box sx={{ ...styles.jobTwoStyling }}>Job 2</Box>
        </Box>
        <Box sx={styles.transferWrapper}>
          <Button
            onClick={() => {
              setRemoveJob(true);
            }}
            variant="contained"
            sx={{ mb: { xs: 1, sm: 0 }, minWidth: "220px" }}
          >
            Remove Job
          </Button>
          |
          <Box
            sx={{
              ...styles.jobOneStyling,
              backgroundColor: "primary.lightest",
            }}
          >
            Job 1
          </Box>
          <CloseIcon sx={{ ...styles.arrowIcon, color: "error.main" }} />
          <Box
            sx={{ ...styles.jobTwoStyling, backgroundColor: "error.lightest" }}
          >
            Job 1
          </Box>
        </Box>
      </CustomModal>
      {/* Transfer to Different Job Modal */}
      {anotherJob && (
        <AddToAnotherJobModal
          anotherJob={anotherJob}
          setAnotherJob={setAnotherJob}
        />
      )}
      {/* Transfer to a Different Job Modal */}
      {differentJob && (
        <DifferentJobTransfer
          differentJob={differentJob}
          setDifferentJob={setDifferentJob}
          jobsName={jobsName}
        />
      )}
      {/* Remove Job Modal */}
      {removeJob && (
        <RemoveJobModal removeJob={removeJob} setRemoveJob={setRemoveJob} />
      )}
    </>
  );
}
