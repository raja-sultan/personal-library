import React, { useState } from "react";
import {
  Divider,
  Box,
  Grid,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import { EditIcon } from "@assets/jobs";
import { CustomChip, TableIconActions } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
// import { LinkedInIcon } from "@assets/icons/linkedin-icon";
// import { WebsiteIcon } from "@assets/icons/website-icon";
// import person from "@assets/common/person.png";
// import Image from "next/image";
import { EmailModal } from "../email-modal";
import { TransferCandidateModal } from "../transfer-Candidate-modal";
import { TagsModal } from "../tags-modal";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dayjs from "dayjs";
import { awsBaseUrl } from "@root/config";
import { renderUserImage } from "./image-profile";

export function CandidateDetailsSection({ candidateData }): JSX.Element {
  console.log("🚀 ~ CandidateDetailsSection ~ candidateData:", candidateData);
  const [openTagsModal, setOpenTagsModal] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [job, setJob] = useState<boolean>(false);

  function downloadFile(url: any, name: any): void {
    const link = document?.createElement("a");
    link?.setAttribute("href", url);
    link?.setAttribute("target", "_blank");
    link?.setAttribute("download", name);
    document?.body?.appendChild(link);
    link?.click();
    window?.URL?.revokeObjectURL?.(url);
    link?.remove();
  }

  return (
    <>
      <Box textAlign="center">
        {/* <Avatar src={person} alt="person" height={80} width={80} /> */}
        {/* <Image src={person} alt="person" height={80} width={80} /> */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {" "}
          {renderUserImage({
            profileImage: candidateData?.profile ?? "",
            firstName: candidateData?.nameAndCompany?.firstName ?? "-",
            lastName: candidateData?.nameAndCompany?.lastName ?? "-",
          })}
        </Box>
        <Typography variant="body1" fontWeight={600} sx={{ py: 1 }}>
          {`${candidateData?.nameAndCompany?.firstName ?? "-"} ${candidateData?.nameAndCompany?.lastName ?? "-"}`}
        </Typography>
      </Box>
      <Box>
      {Boolean(candidateData?.resume ) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2">Resume :</Typography>
          <IconButton
            disabled={!candidateData?.resume}
            onClick={() => {
              downloadFile(`${awsBaseUrl}${candidateData?.resume}`, "Resume");
            }}
            sx={{
              color: candidateData?.resume ? "primary.main" : "disabled",
              "&:disabled": {
                color: "disabled",
              },
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
 )}
        {Boolean(candidateData?.coverLetter ) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2">Cover Letter :</Typography>
          <IconButton
            disabled={!candidateData?.coverLetter}
            onClick={() => {
              downloadFile(
                `${awsBaseUrl}${candidateData?.coverLetter}`,
                "Cover Letter"
              );
            }}
            sx={{
              color: candidateData?.coverLetter ? "primary.main" : "disabled",
              "&:disabled": {
                color: "disabled",
              },
            }}
          >
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
        )}
      </Box>

      {/* <Box sx={{mt:1,}}>
          <LinkedInIcon sx={{ height: 32, width: 32, mr: 3 }} />
          <WebsiteIcon sx={{ height: 32, width: 32 }} />
        </Box> */}

      <Divider sx={{ my: 2, borderTop: "1px solid #D0D5DD" }} />

      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item md={6} xs={12}>
          <Typography variant="body2" fontWeight={600}>
            Candidate Details
          </Typography>
        </Grid>
        <Grid item container justifyContent="end" xs={12} md={6}>
          <TableIconActions icon={<TableActionsIcon />}>
            <MenuItem
              onClick={() => {
                setJob(true);
              }}
            >
              <Typography variant="subtitle2">
                Transfer to a different job
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setEmail(true);
              }}
            >
              <Typography variant="subtitle2">Send email</Typography>
            </MenuItem>
            {/* <MenuItem>
              <Typography variant="subtitle2">Reject as spam</Typography>
            </MenuItem> */}
          </TableIconActions>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ mb: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Applied Date
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mb: 1, textAlign: "end" }}>
          <Typography variant="subtitle2" fontWeight={400}>
            {dayjs(candidateData?.createdAt).format("MM/DD/YYYY") ?? "---"}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} sx={{ mb: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Source
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mb: 1, textAlign: "end" }}>
          <Typography variant="subtitle2" fontWeight={400}>
            {/* Applied through your website’s jobs page */}
            {candidateData?.detail?.source ?? "---"}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} sx={{ mb: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Jobs Posted
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mb: 1, textAlign: "end" }}>
          <Typography variant="subtitle2" fontWeight={400}>
            {candidateData?.job?.jobInfo?.jobName ?? "---"}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} sx={{ mt: 1, alignItems: "center" }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Tags
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mb: 1, textAlign: "end" }}>
          <IconButton
            onClick={() => {
              setOpenTagsModal(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Grid>
        {candidateData?.nameAndCompany?.candidateTags?.map((item) => (
          <CustomChip
            key={item}
            rootSx={{ mt: 1, mr: 1 }}
            ChipProps={{ label: item }}
            variant="success"
          />
        ))}
      </Grid>

      {/* Tags Modals */}
      {openTagsModal && (
        <TagsModal tags={openTagsModal} setTags={setOpenTagsModal} />
      )}
      {/* Transfer Candidate Modal */}
      {job && <TransferCandidateModal job={job} setJob={setJob} />}
      {/* Email Modal */}
      {email && <EmailModal email={email} setEmail={setEmail} />}
    </>
  );
}
