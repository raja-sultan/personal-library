import { useState } from "react";
import { Card, Grid, Button } from "@mui/material";
import { Stack } from "@mui/system";
import ButtonGroup from "@mui/material/ButtonGroup";
import { MoveStageModel } from "./move-stage";
// import { RejectCandidateModel } from "./reject-candidate";
import { tabsButtons } from "./data";
import { Application } from "./application";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { OfferDetails } from "./offer-details";
import { CoordinatorScoreCard } from "./score-card";
import { StageComponent } from "./stage";
import {
  // ConvertCandidateModal,
  StopConsideringProspectModal,
} from "../prospect/prospect-modals/modals";
import { useGetJobCandidateQuery } from "@services/jobs/job-details/pipeline-api";
import { useSearchParams } from "next/navigation";

export function PeopleOperationsCoordinator(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openMoveStage, setOpenMoveStage] = useState<boolean>(false);
  const [rejectCandidate, setRejectCandidate] = useState<boolean>(false);

  const params = useSearchParams();

  const { data } = useGetJobCandidateQuery({
    candidateId: params.get("candidateID"),
  });

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <Stack spacing={1} direction="column">
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12} md={2.4}>
          <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 1 }}>
            <Button
              color="inherit"
              variant="contained"
              size="small"
              sx={{
                p: "7px 5px",
              }}
              onClick={() => {
                setOpenMoveStage(true);
              }}
            >
              Move Stage
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              sx={{ p: "7px 5px" }}
              onClick={() => {
                setRejectCandidate(true);
              }}
            >
              Reject
            </Button>
          </Stack>

          <Card sx={{ p: 1 }}>
            {tabsButtons.map((button, index) => (
              <ButtonGroup
                sx={{
                  width: "100%",
                  backgroundColor: "transparent",
                  // display: "flex",
                  my: 0.5,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                  display: "flex",
                }}
                key={index}
                onClick={() => {
                  handleTabClick(index);
                }}
                variant={selectedTab === index ? "contained" : "text"}
                orientation="vertical"
                aria-label="vertical contained button group"
              >
                <Button size="small"
                  endIcon={selectedTab === index && <KeyboardArrowRightIcon />}
                >
                  {button}
                </Button>
              </ButtonGroup>
            ))}
          </Card>
        </Grid>
        <Grid item xs={12} md={9.6} pl={2}>
          <Card>
            {selectedTab === 0 && (
              <h1>
                <Application />
              </h1>
            )}
            {selectedTab === 1 && <StageComponent />}
            {selectedTab === 2 && <CoordinatorScoreCard />}
            {selectedTab === 3 && (
              <h1>
                <OfferDetails />
              </h1>
            )}
          </Card>
        </Grid>
      </Grid>
      {openMoveStage && (
        <MoveStageModel
          setOpenMoveStage={setOpenMoveStage}
          openMoveStage={openMoveStage}
        />
      )}
      {/* <RejectCandidateModel
        rejectCandidate={rejectCandidate}
        setRejectCandidate={setRejectCandidate}
      /> */}
      {rejectCandidate && (
        <StopConsideringProspectModal
          open={rejectCandidate}
          isOpen={setRejectCandidate}
          candidateName={`${data?.data?.nameAndCompany.firstName ?? "-"} ${
            data?.data?.nameAndCompany.lastName ?? "-"
          }`}
          candidateEmail={data?.data?.info?.email?.emailAddress ?? ""}
        />
      )}
    </Stack>
  );
}
