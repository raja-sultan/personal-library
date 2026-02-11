import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import {
  ConvertCandidateModal,
  EditProspectModal,
  StopConsideringProspectModal,
} from "./prospect-modals/modals";
import { EditIcon } from "@assets/jobs";
import { useGetJobCandidateQuery } from "@services/jobs/job-details/pipeline-api";
import { useSearchParams } from "next/navigation";

export default function CandidatesDetailsProspect(): JSX.Element {
  const params = useSearchParams();

  const [isProspectModalOpen, setIsProspectModalOpen] = useState(false);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [isConvertCandidateModalOpen, setIsConvertCandidateModalOpen] =
    useState(false);
  const { data , refetch } = useGetJobCandidateQuery({
    candidateId: params.get("candidateID"),
  });
  return (
    <Grid sx={{ bgcolor: "background.default", borderRadius: 2 }}>
      <Box p={1} position="relative">
        <Box textAlign="end" position="absolute" right={5} top={5}>
          <IconButton
            onClick={() => {
              setIsProspectModalOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
        {Boolean(data?.data?.detail?.source) && (
          <Typography p={1} variant="body2">
            Applied Through {data?.data?.detail?.source}
          </Typography>
        )}
        {Boolean(data?.data?.prospectPool) && (
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "background.paper",
              p: 1,
              borderRadius: 1,
            }}
          >
            {data?.data?.prospectPool?.poolName} {">"}{" "}
            {data?.data?.prospectStage?.stageName}
          </Typography>
        )}
        <Box py={1}>
          {data?.data?.prospect ? (
            <Box>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", py: 1 }}
              >
                Prospect For
              </Typography>
              {data?.data?.specificJobs?.map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", py: 1, gap: 1 }}
                >
                  <FiberManualRecordIcon sx={{ fontSize: "7px" }} />
                  {item}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: "primary.main" }}>
              No Jobs added{" "}
            </Typography>
          )}
          {Boolean(data?.data?.detail) && (
            <>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", py: 1 }}
              >
                Prospect Owner
              </Typography>
              <Typography variant="body2">
                {" "}
                {data?.data?.detail?.whoGetsCredit}
              </Typography>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Button
              variant="contained"
              sx={{ fontSize: 13, minWidth: 250 }}
              onClick={() => {
                setIsConvertCandidateModalOpen(true);
              }}
            >
              <CheckIcon /> Convert to Candidate{" "}
            </Button>
            <Button
              variant="outlined"
              sx={{ fontSize: 13, minWidth: 250 }}
              onClick={() => {
                setIsRejectionModalOpen(true);
              }}
            >
              <CloseIcon color="error" /> Stop Considering as Prospect{" "}
            </Button>
          </Box>
        </Box>
      </Box>
      {isConvertCandidateModalOpen && (
        <ConvertCandidateModal
          open={isConvertCandidateModalOpen}
          isOpen={setIsConvertCandidateModalOpen}
        />
      )}
      {isRejectionModalOpen && (
        <StopConsideringProspectModal
          open={isRejectionModalOpen}
          refetch={refetch}
          isOpen={setIsRejectionModalOpen}
          candidateName={`${data?.data?.nameAndCompany.firstName ?? "-"} ${
            data?.data?.nameAndCompany.lastName ?? "-"
          }`}
          candidateEmail={data?.data?.info?.email?.emailAddress ?? ""}
        />
      )}
      {isProspectModalOpen && (
        <EditProspectModal
          refetch={refetch}
          prospectOwner={data?.data?.prospectOwner}
          candidateName={`${data?.data?.nameAndCompany.firstName ?? "-"} ${
            data?.data?.nameAndCompany.lastName ?? "-"
          }`}
          open={isProspectModalOpen}
          isOpen={setIsProspectModalOpen}
        />
      )}
    </Grid>
  );
}
