import { Box, Typography, useTheme } from "@mui/material";
import { CustomModal } from "common";

export const FinalInterview = [
  {
    id: 1,
    name: "What is your Salary?",
    stage: "85,500£",
  },
  {
    id: 2,
    name: "What is desire Compensation?",
    stage: "95,000£",
  },
  {
    id: 3,
    name: "What is your expected Starting date?",
    stage: "Jan 10,2024",
  },
];

export function SubmittedFormModal(props): JSX.Element {
  const theme = useTheme();
  const { markAsSent, setMarkAsSent } = props;

  return (
    <CustomModal
      onClose={() => {
        setMarkAsSent(false);
      }}
      rootSx={{
        maxWidth: { xs: 350, sm: 600 },
      }}
      headerLabel="Final Interview Form"
      closeButtonProps={{
        onClick: () => {
          setMarkAsSent(false);
        },
      }}
      isOpen={markAsSent}
    >
      <Typography variant="subtitle2">Face to Face Interview</Typography>
      <Box
        sx={{
          backgroundColor: theme.palette.success.lightest,
          borderLeft: `5px ${theme.palette.success.main} solid`,
          p: 2,
          borderRadius: "0px 4px 4px 0px",
          my: 2,
        }}
      >
        <Typography variant="h6">
          Submitted by Kate on May 24,2022
        </Typography>
      </Box>

      {FinalInterview?.map((item) => (
        <Box key={item.id} sx={{ mb: 1 }}>
          <Typography variant="subtitle1">Offer {item?.name}</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Offer {item?.stage}
          </Typography>
        </Box>
      ))}
    </CustomModal>
  );
}
