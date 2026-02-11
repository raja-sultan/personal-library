import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { CustomAccordion } from "common";
import React, { useState } from "react";
import { accordionData, detailsMenu } from "./app-review.data";
import { AdvanceModal } from "./advance-modal";
import { RejectModal } from "./reject-modal";
import { FeedbackModal } from "./feedback-modal";
import { TagsModal } from "./tags-modal";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styles } from "./app-review.styles";
import { TransferCandidateModal } from "./transfer-Candidate-modal";
import { EmailModal } from "./email-modal";
import ReplayIcon from "@mui/icons-material/Replay";
import { CandidateDetails } from "./candidate-details";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetJobCandidateQuery,
  useRejectCandidateMutation,
} from "@services/jobs/job-details/pipeline-api";
import toast from "react-hot-toast";

export function AppReviewSection(props): JSX.Element {
  const { stagesData } = props;
  //States
  const [open, setOpen] = useState<boolean>(false);
  const [openRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [openFeedbackModal, setOpenFeedbackModal] = useState<boolean>(false);
  const [openTagsModal, setOpenTagsModal] = useState<boolean>(false);
  const [job, setJob] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [submitData, setSubmitData] = useState<boolean>(false);
  // const [toggleProspect, setToggleProspect] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  //constants
  const params = useSearchParams();
  const menu = Boolean(anchorEl);
  const router = useRouter();
  //APIs
  const { data } = useGetJobCandidateQuery({
    candidateId: params.get("candidateId"),
  });
  const [rejectionHandler] = useRejectCandidateMutation();
  const candidateData = data?.data;

  //functions
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleModal = (item: any): void => {
    if (item.modal === "reject") {
      setOpenRejectModal(true);
    } else if (item.modal === "differentJob") {
      setJob(true);
    } else if (item.modal === "sendEmail") {
      setEmail(true);
    }
  };

  const unRejectHandler = async (): Promise<any> => {
    const body = {
      rejected: false,
      rejectionReason: "",
      rejectionNote: "",
    };
    try {
      await rejectionHandler({
        body,
        candidateId: params.get("candidateId"),
      }).unwrap();
      toast.success("Candidate un-rejected");
    } catch (error) {
      // toast.error(error.data.message);
      toast.error("Something went wrong!");
    }
  };
  const count = stagesData?.find((i) => i.stage === candidateData?.stage);
  return (
    <>
      <Box sx={styles.mainWrapper}>
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {`${candidateData?.nameAndCompany?.firstName} ${candidateData?.nameAndCompany?.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {count?.count} Applications in queue!
          </Typography>
        </Box>
        <Box sx={styles.feedBackWrapper}>
          <Button
            variant="contained"
            onClick={() => {
              setOpenFeedbackModal(true);
            }}
          >
            Leave a Feedback
          </Button>
          {candidateData?.rejected ? (
            <>
              {candidateData?.prospect ? (
                <Button
                  variant="contained"
                  onClick={(): void => {
                    router.push(
                      `/candidates?candidateId=${params.get("candidateId")}`
                    );
                  }}
                >
                  Add As Prospect
                </Button>
              ) : (
                ""
              )}
              <Button
                variant="outlined"
                startIcon={<ReplayIcon />}
                onClick={
                  () => unRejectHandler()
                  // setSubmitData(false);
                }
              >
                Un Reject
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setOpenRejectModal(true);
              }}
            >
              Reject
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Advance
          </Button>
        </Box>
      </Box>
      <Grid container columnSpacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8}>
          {accordionData.map((item: any) => (
            <CustomAccordion title={item.title} key={item.id}>
              {item.component}
            </CustomAccordion>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ mt: { xs: 0, sm: 2 } }}>
            <CardContent sx={{ py: 1 }}>
              <Box sx={styles.candidateWrapper}>
                <Typography
                  variant="h5"
                  sx={{ color: "text.primary", fontWeight: 600 }}
                >
                  Candidate Details
                </Typography>
                <IconButton
                  aria-controls={menu ? "long-menu" : undefined}
                  aria-expanded={menu ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreHorizIcon
                    sx={{ color: "primary.main", fontSize: "35px" }}
                  />
                </IconButton>
                {/* Menu Drop Down */}
                <Menu
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  anchorEl={anchorEl}
                  open={menu}
                  onClose={() => {
                    setAnchorEl(null);
                  }}
                >
                  {detailsMenu.map((option) => (
                    <MenuItem
                      key={option.id}
                      onClick={() => {
                        setAnchorEl(null);
                        handleModal(option);
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.primary" }}
                      >
                        {option.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              {/* Candidate Details Component */}
              <CandidateDetails
                submitData={submitData}
                setTags={setOpenTagsModal}
                cardData={{
                  appliedDate: candidateData?.createdAt,
                  referredBy: candidateData?.detail?.whoGetsCredit,
                  tags: candidateData?.nameAndCompany?.candidateTags,
                  resume: candidateData?.resume,
                  coverLetter: candidateData?.coverLetter,
                  rejected: candidateData?.rejected,
                  rejectionReason: candidateData?.rejectionReason,
                  rejectionNote: candidateData?.rejectionNote,
                  rejectedBy: candidateData?.rejectedBy,

                  notes: candidateData?.notes,
                }}
              />
            </CardContent>
            {/* Advance Modal */}
            <AdvanceModal
              open={open}
              setOpen={setOpen}
              candidateData={{
                stage: candidateData?.stage,
                job: candidateData?.job?.jobInfo?.jobName,
                details: stagesData,
              }}
            />
            {/* Reject Modal */}
            {openRejectModal && (
              <RejectModal
                reject={openRejectModal}
                setReject={setOpenRejectModal}
                setSubmitData={setSubmitData}
                // setToggleProspect={setToggleProspect}
              />
            )}
            {/* Feedback Modal */}
            {openFeedbackModal && (
              <FeedbackModal
                feedback={openFeedbackModal}
                setFeedback={setOpenFeedbackModal}
              />
            )}
            {/* Tags Modals */}
            {openTagsModal && (
              <TagsModal tags={openTagsModal} setTags={setOpenTagsModal} />
            )}
            {/* Transfer Candidate Modal */}
            {job && <TransferCandidateModal job={job} setJob={setJob} />}
            {/* Email Modal */}
            {email && <EmailModal email={email} setEmail={setEmail} />}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
