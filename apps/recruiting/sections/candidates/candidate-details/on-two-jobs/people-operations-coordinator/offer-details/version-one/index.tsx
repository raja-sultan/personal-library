import type { Theme } from "@mui/material";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { WarningPrompt } from "common";
import dayjs from "dayjs";
import { useState } from "react";
import { CandidateAsHired } from "../candidate-as-hired";
import { GenerateOfferDocumentModal } from "../generate-offer-modal";
import { MarkAsSentModal } from "../mark-as-sent";
import { MarkCandidateHiredModal } from "../mark-candidate-hired";
import { SendOfferDocumentModal } from "../send-offer-modal";
import { UpdateOfferDetailsModal } from "../update-details-modal";
import { UploadOfferDocumentModal } from "../upload-offer-modal";
import { OfferDetailsButtons } from "./data";
import { styles } from "./styles";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { usePostRequestOfferApprovalMutation } from "@services/candidate/candidate-details/on-two-jobs/offer-details/offer-details-api";

function getColorBasedOnStatus(status: string, theme: Theme): any {
  let color;
  switch (status) {
    case "Approval":
      color = "";
      break;
    case "Approved":
      color = theme.palette.success.main;
      break;
    case "Sent":
      color = theme.palette.success.main;
      break;
    default:
      color = theme.palette.primary.main;
      break;
  }

  return { color };
}

export function OfferDetailsVersion({ data }: any): JSX.Element {
  const theme = useTheme();
  const [candidate, setCandidate] = useState<boolean>(false);
  const [uploadDocument, setUploadDocument] = useState<boolean>(false);
  const [generateDocument, setGenerateDocument] = useState<boolean>(false);
  const [updateOfferDetails, setUpdateOfferDetails] = useState<boolean>(false);
  const [markAsSent, setMarkAsSent] = useState<boolean>(false);
  const [markCandidateHired, setMarkCandidateHired] = useState<boolean>(false);
  const [offerId, setOfferId] = useState<any>("");
  const [showCandidateAsHired, setShowCandidateAsHired] =
    useState<boolean>(false);

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [postRequestOfferApproval] = usePostRequestOfferApprovalMutation();

  const handleRequestApproval = async (item: any) => {
    try {
      const res = await postRequestOfferApproval({
        offerId: item._id,
        openingId: item.opening,
        jobId,
      }).unwrap;
      toast.success("Request send successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (showCandidateAsHired) return <CandidateAsHired />;

  return (
    <Box>
      <Box sx={styles.mainCardStyling}>
        {data?.map((item: any) => (
          <Box key={item.id}>
            <Typography variant="subtitle1">
              {`Version ${item?.version}`}
            </Typography>
            <Grid container mt={2}>
              <Grid item xs={12} md={4}>
                <Typography>Created Date</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">
                  {dayjs(item?.createdAt).format("DD-MM-YYYY")}
                </Typography>
              </Grid>
            </Grid>
            <Grid container alignItems="center" my={0.5}>
              <Grid item xs={12} md={4}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mt: 1,
                    color: getColorBasedOnStatus(item?.offerStatus, theme),
                  }}
                >
                  Approval
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                {(() => {
                  switch (item?.offerStatus) {
                    case "TO_BE_CREATED":
                      return (
                        <Button
                          onClick={() => {
                            void handleRequestApproval(item);
                          }}
                          size="small"
                          sx={{ p: 0 }}
                        >
                          Request Approval
                        </Button>
                      );
                    case "CREATED":
                      return (
                        <Typography variant="subtitle2" color="error.main">
                          Created
                        </Typography>
                      );
                    case "PENDING":
                      return (
                        <Typography variant="subtitle2" color="error.main">
                          Pending
                        </Typography>
                      );
                    case "SENT":
                      return (
                        <Typography variant="subtitle2" color="success.main">
                          Approved
                        </Typography>
                      );
                    case "REJECTED":
                      return (
                        <Typography variant="subtitle2" color="error.main">
                          Rejected
                        </Typography>
                      );
                    default:
                      return null;
                  }
                })()}
              </Grid>
            </Grid>
            <Box sx={{ my: "auto" }}>
              {item?.offerStatus === "SENT" && (
                <Button
                  onClick={() => {
                    setOfferId(item?._id);
                    setMarkCandidateHired(true);
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  Mark Candidate as Hired
                </Button>
              )}
              <Button variant="contained" size="small">
                Candidate Declined
              </Button>
            </Box>
          </Box>
        ))}

        {/* Offer Details */}
        <Box>
          <Typography variant="subtitle1" sx={{ mt: 2, px: 0 }}>
            Offer Details
          </Typography>
          {OfferDetailsButtons.map((item: any) => (
            <Box key={item.id}>
              <Box display="flex" alignItems="center" mr={5}>
                <Button
                  onClick={() => {
                    setUpdateOfferDetails(true);
                  }}
                  size="small"
                  sx={{ px: 0 }}
                >
                  Update
                </Button>
                <Button
                  disableRipple
                  disableElevation
                  disableFocusRipple
                  disableTouchRipple
                  size="small"
                >
                  Download Offer Packet
                </Button>

                <WarningPrompt
                  modalOpenProps={{ display: "flex", alignItems: "center" }}
                  mainColor="error.main"
                  heading="Are you sure?"
                  subTitle="This will remove version 1 only."
                  modelOpenLabel={
                    <Button
                      disableRipple
                      disableElevation
                      disableFocusRipple
                      disableTouchRipple
                      size="small"
                    >
                      Delete
                    </Button>
                  }
                  acceptButtonLabel="Remove"
                  acceptButtonProps={{
                    onClick: () => {},
                    variant: "contained",
                    color: "error",
                    sx: {
                      bgcolor: "error.main",
                      color: "primary.contrastText",
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        {/* Offer Documents */}

        {data?.map((item: any) => (
          <Box key={item?.id}>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Start Date</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">
                  {dayjs(item.startDate).format("DD-MM-YYYY")}
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Employment Type</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">
                  {item.employmentType}
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Salary</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">{item.salary}</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Offer Documents</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">
                  {item.offerDocuments}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Offer Documents
            </Typography>
            <Box sx={{ mt: "-15px" }}>
              <Button
                onClick={() => {
                  setUploadDocument(true);
                }}
                size="small"
                sx={{ p: 0, mr: 2 }}
              >
                Upload
              </Button>
              <Button
                onClick={() => {
                  setGenerateDocument(true);
                }}
                size="small"
                sx={{ p: 0 }}
              >
                Generate
              </Button>
            </Box>
          </Box>
        ))}

        <Box sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => {
              setCandidate(true);
            }}
          >
            Send
          </Button>
          <Button
            onClick={() => {
              setMarkAsSent(true);
            }}
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
          >
            Mark as Sent
          </Button>
        </Box>
      </Box>

      <SendOfferDocumentModal
        setCandidate={setCandidate}
        candidate={candidate}
      />
      <UploadOfferDocumentModal
        setUploadDocument={setUploadDocument}
        uploadDocument={uploadDocument}
      />
      <GenerateOfferDocumentModal
        setGenerateDocument={setGenerateDocument}
        generateDocument={generateDocument}
      />
      <UpdateOfferDetailsModal
        setUpdateOfferDetails={setUpdateOfferDetails}
        updateOfferDetails={updateOfferDetails}
      />
      <MarkAsSentModal setMarkAsSent={setMarkAsSent} markAsSent={markAsSent} />
      <MarkCandidateHiredModal
        setShowCandidateAsHired={setShowCandidateAsHired}
        setMarkCandidateHired={setMarkCandidateHired}
        markCandidateHired={markCandidateHired}
        offerId={offerId}
      />
    </Box>
  );
}
