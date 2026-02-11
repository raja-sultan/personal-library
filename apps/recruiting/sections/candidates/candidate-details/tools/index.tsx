import React, { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { EmailCandidateModal } from "./email-candidate-modal";
import { EmailTeamModal } from "./email-team-modal";
import { AddProspectModal } from "./add-prospect-modal";
import { TransferJobModal } from "./transfer-jobs-modal";
import { FormProvider } from "common";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./tools.schema";
import { TransferIcon } from "@assets/candidates/tools";
import { useGetJobCandidateQuery } from "@services/candidate/candidate-tags/candidate-tags-api";
import { useSearchParams } from "next/navigation";

function Tools(): JSX.Element {
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateID");
  const [email, setEmail] = useState<boolean>(false);
  const [candidate, setCandidate] = useState<boolean>(false);
  const [prospect, setProspect] = useState<boolean>(false);
  const [candidateJobs, setCandidateJobs] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { data } = useGetJobCandidateQuery({
    candidateId,
  });
  //Job Name
  const jobName = data?.data?.job?.jobInfo?.jobName;

  const [jobsName, setJobsName] = useState(null);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleCheckboxChange = (event: any) => {
    const { checked } = event.target;
    setIsChecked(checked);
    const payload = {
      notEmail: !isChecked,
    };
    console.log("isChecked", payload);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Tools
      </Typography>
      <FormProvider methods={methods}>
        <Box sx={styles.mainWrapper}>
          <Button
            sx={styles.commonButton}
            variant="outlined"
            startIcon={<EmailOutlinedIcon />}
            onClick={() => {
              setEmail(true);
            }}
          >
            Email Candidate
          </Button>
          <Button
            sx={styles.commonButton}
            variant="outlined"
            startIcon={<EmailOutlinedIcon />}
            onClick={() => {
              setCandidate(true);
            }}
          >
            Email the Team
          </Button>
        </Box>
        <Box sx={{ my: 1.5 }}>
          {/* Check Box */}
          <FormControlLabel
            control={
              <Checkbox onChange={handleCheckboxChange} name="notEmail" />
            }
            label="Do not Email"
          />
        </Box>
        <Button
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
          variant="outlined"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            setProspect(true);
          }}
        >
          Add as Prospect to...
        </Button>
        <Box sx={{ my: { xs: 1, sm: 2 } }}>
          <Button
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
            variant="outlined"
            startIcon={<TransferIcon />}
            onClick={() => {
              setCandidateJobs(true);
              setJobsName(jobName);
            }}
          >
            Add, Transfer or Remove Candidate Jobs
          </Button>
        </Box>
        {/* Email Candidate */}
        {email && <EmailCandidateModal email={email} setEmail={setEmail} />}
        {/* Email Team */}
        {candidate && (
          <EmailTeamModal setCandidate={setCandidate} candidate={candidate} />
        )}
        {/* Prospect Modal */}
        {prospect && (
          <AddProspectModal prospect={prospect} setProspect={setProspect} />
        )}
        {/* Transfer Jobs Modal */}
        {candidateJobs && (
          <TransferJobModal
            candidateJobs={candidateJobs}
            setCandidateJobs={setCandidateJobs}
            jobsName={jobsName}
          />
        )}
      </FormProvider>
    </Box>
  );
}

export default Tools;

const styles = {
  mainWrapper: {
    display: "flex",
    justifyContent: { xs: "start", lg: "space-between" },
    alignItems: { xs: "start", xxl: "center" },
    flexDirection: { xs: "column", xxl: "row" },
    gap: { xs: 1, sm: 3, lg: 1.5, xxl: 0 },
  },
  commonButton: {
    width: {
      xs: "100%",
      sm: "auto",
    },
    py: 0.4,
    color: "text.secondary",
    borderColor: "#98A2B3",
    "&:hover": {
      borderColor: "#98A2B3",
    },
  },
};
