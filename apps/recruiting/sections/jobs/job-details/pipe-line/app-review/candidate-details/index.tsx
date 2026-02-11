import React from "react";
import { CustomChip } from "common";
import { Box } from "@mui/system";
import { Divider, IconButton, Typography } from "@mui/material";
import { EditIcon } from "@assets/jobs";
import { styles } from "./candidate-details.styles";
import dayjs from "dayjs";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { awsBaseUrl } from "@root/config";
// import { BASE_URL } from "@root/config";

export function CandidateDetails(props): JSX.Element {
  const { setTags, cardData } = props;

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
  //Status Function
  // function getColorBasedOnStatus(
  //   item: any
  // ): "success" | "warning" | "danger" | "Started" {
  //   if (item.status === "Referral") {
  //     return "success";
  //   } else if (item.status === "Inprogress") {
  //     return "warning";
  //   } else if (item.status === "Interrupted") {
  //     return "danger";
  //   }
  //   return "Started";
  // }
  return (
    <div>
      {/* candidateDetails Mock Data */}
      {/* {candidateDetails.map((item) => ( */}
      <Box>
        <CustomChip
          ChipProps={{ label: "Referral" }}
          // ChipProps={{ label: item.status }}
          variant="success"
          // variant={getColorBasedOnStatus(item)}
        />
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", mt: 3, fontWeight: 600 }}
        >
          Applied Date:{" "}
          <Typography variant="subtitle1" component="span">
            {dayjs(cardData.appliedDate).format("MMMM DD ,YYYY")}
          </Typography>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", mt: 1, fontWeight: 600 }}
        >
          Source:{" "}
          <Typography variant="subtitle1" component="span">
            Referred by {cardData.referredBy}
          </Typography>
        </Typography>
      </Box>
      {/*  ))} */}
      {/* Reject Reason Mock Data To Be Shown */}
      {cardData?.rejected && (
        <Box>
          {Boolean(cardData?.rejectedBy) && (
            <Typography
              variant="subtitle1"
              sx={{ color: "text.secondary", mt: 1, fontWeight: 600 }}
            >
              Reject By:{" "}
              <Typography variant="subtitle1" component="span">
                {cardData?.rejectedBy}
              </Typography>
            </Typography>
          )}
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", mt: 1, fontWeight: 600 }}
          >
            Reason:{" "}
            <Typography variant="subtitle1" component="span">
              {cardData?.rejectionReason}
            </Typography>
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", mt: 1, fontWeight: 600 }}
          >
            Notes:{" "}
            <Typography variant="subtitle1" component="span">
              {cardData?.rejectionNote ? cardData?.rejectionNote : "--"}
            </Typography>
          </Typography>
        </Box>
      )}{" "}
      <Box sx={{ display: "flex", alignItems: "center", mt: 1.5, gap: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary", fontWeight: 600 }}
        >
          Tags:
        </Typography>
        <IconButton
          onClick={() => {
            setTags(true);
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
      {/* Tags Mock Data */}
      {cardData?.tags?.map((item) => (
        <CustomChip
          key={item}
          rootSx={{ mt: 1, mr: 1 }}
          ChipProps={{ label: item }}
          variant="success"
        />
      ))}
      <Divider sx={{ mt: 3, mb: 1 }} />
      {/* Files Mock Data */}
      {/* {filesData.map((item) => ( */}
      <Box>
        <Box sx={styles.resumeWrapper}>
          <Typography variant="subtitle2" sx={styles.labels}>
            Attached Resume:
          </Typography>
          <Typography
            variant="subtitle2"
            sx={styles.attachments}
            onClick={() => {
              downloadFile(`${awsBaseUrl}${cardData.resume}`, "Resume");
            }}
          >
            Resume
            <IconButton sx={styles.arrowIcon}>
              <ArrowDownwardIcon />
            </IconButton>
          </Typography>
        </Box>
        {Boolean(cardData.coverLetter) && (
          <Box sx={styles.letterWrapper}>
            <Typography variant="subtitle2" sx={styles.labels}>
              Attached Cover Letter:
            </Typography>
            <Typography
              variant="subtitle2"
              sx={styles.attachments}
              onClick={() => {
                downloadFile(
                  `${awsBaseUrl}${cardData.coverLetter}`,
                  "Cover Letter"
                );
              }}
            >
              Cover Letter
              <IconButton sx={styles.arrowIcon}>
                <ArrowDownwardIcon />
              </IconButton>
            </Typography>
          </Box>
        )}
      </Box>
      {/* ))} */}
    </div>
  );
}
