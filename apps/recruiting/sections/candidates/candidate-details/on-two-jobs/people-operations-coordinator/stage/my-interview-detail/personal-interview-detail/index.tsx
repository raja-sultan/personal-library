import React from "react";
import { Box, Typography, useTheme, Divider } from "@mui/material";
import dayjs from "dayjs";

export function PersonalInterviewDetail({
  candidateDetails,
  stageName,
  scoreCardDetails,
}): JSX.Element {
  const theme = useTheme();
  return (
    <Box px={2} bgcolor={theme?.palette?.background?.default} overflow="hidden">
      <Box sx={{ py: 2 }}>
        <Box sx={{ mb: 0.8 }}>
          <Typography variant="h6">{`${candidateDetails?.data[0]?.nameAndCompany?.firstName} ${candidateDetails?.data[0]?.nameAndCompany?.lastName}`}</Typography>
          {/* <Typography variant="subtitle2">(he/him/his)</Typography> */}
        </Box>
        <Box>
          <Typography variant="body2">{`${candidateDetails?.data[0]?.info?.phone?.phoneNumber} (${candidateDetails?.data[0]?.info?.phone?.phoneType ?? "-"})`}</Typography>
          <Typography variant="body2">{`${candidateDetails?.data[0]?.info?.email?.emailAddress} (${candidateDetails?.data[0]?.info?.email?.emailType ?? "-"})`}</Typography>
          <Divider sx={{ my: 1.5, bgcolor: "background.paper", height: 2 }} />
        </Box>

        {/* <Box>
          <Typography variant="body2" fontWeight={600}>
            Details
          </Typography>

          <Box>
            <Button sx={{ minWidth: 0, p: 0 }} onClick={() => {}}>
              Resume
            </Button>
          </Box>
          <Box>
            <Button sx={{ minWidth: 0, p: 0 }} onClick={() => {}}>
              Take Home Test
            </Button>
          </Box>
          <Box>
            <Button sx={{ minWidth: 0, p: 0 }} onClick={() => {}}>
              Offer Packet
            </Button>
          </Box>
          <Divider sx={{ my: 1.5, bgcolor: "background.paper", height: 2 }} />
        </Box> */}
        <Box>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
            Interviews
          </Typography>
        </Box>
        {scoreCardDetails?.data?.assignedTo ? (
          <Box
            sx={{
              bgcolor: "#D1FADF",
              width: "80%",
              borderLeft: "6px green solid",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ pb: 0.3, color: "#101828" }}
              >
                {`${scoreCardDetails?.data?.assignedTo?.firstName} ${scoreCardDetails?.data?.assignedTo?.lastName}`}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ pb: 0.3, color: "#101828" }}
              >
                {stageName}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ pb: 0.3, color: "#101828" }}
              >
                {dayjs(new Date(scoreCardDetails?.data?.createdAt)).format(
                  "MMMM DD, YYYY hh:mm A"
                )}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="subtitle2">Not Assigned yet</Typography>
        )}
      </Box>
    </Box>
  );
}
