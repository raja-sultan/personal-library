import { type SetStateAction, type Dispatch } from "react";
import { CustomModal } from "common";
import { Box, Typography, useTheme } from "@mui/material";

const scorecardDueData = [
  {
    id: 1,
    jobName: "Business Analyst",
    jobCount: "13",
    requestedBy: "John Doe",
    createdDate: "04-05-2022",
    status: "Pending",
  },
  {
    id: 2,
    jobName: "Data Analyst",
    jobCount: "10",
    requestedBy: "John Doe",
    createdDate: "04-05-2022",
    status: "Pending",
  },
];

export function ScorecardDueModal({
  scorecardDue,
  setScorecardDue,
}: {
  scorecardDue: boolean;
  setScorecardDue: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const theme = useTheme();

  return (
    <CustomModal
      onClose={setScorecardDue}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, lg: 750, xl: 1000 },
        maxHeight: 500,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "6px",
        },
        pr: 2,
      }}
      headerLabel="Approvals"
      closeButtonProps={{
        onClick: () => {
          setScorecardDue(false);
        },
      }}
      isOpen={scorecardDue}
    >
      <Box sx={{ mt: 2 }}>
        <Box sx={{ backgroundColor: "#F9FAFB", p: 1.5, mt: 2 }}>
          <Typography variant="h6">Pending Offer Approvals(2)</Typography>
        </Box>
        {scorecardDueData.map((item: any) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#F9FAFB",
                p: 1.5,
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {item.jobName} ({item.jobCount})
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ mr: 2 }}>
                  <Typography color={theme.palette.neutral[400]}>
                    Requested By
                  </Typography>
                  <Typography>{item.requestedBy}</Typography>
                </Box>
                <Box sx={{ mr: 2 }}>
                  <Typography color={theme.palette.neutral[400]}>
                    Created Date
                  </Typography>
                  <Typography>{item.createdDate}</Typography>
                </Box>
                <Box sx={{ mr: 2 }}>
                  <Typography color={theme.palette.neutral[400]}>
                    Status
                  </Typography>
                  <Typography color={theme.palette.error.main}>
                    {item.status}
                  </Typography>
                </Box>
                <Box sx={{ mr: 2 }}>
                  <Typography color={theme.palette.neutral[400]}>
                    Action
                  </Typography>
                  <Typography
                    sx={{ cursor: "pointer" }}
                    color={theme.palette.primary.main}
                  >
                    Fill Scorecard
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </CustomModal>
  );
}
