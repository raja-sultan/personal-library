import { type SetStateAction, type Dispatch } from "react";
import { CustomModal } from "common";
import { Box, Typography } from "@mui/material";
import { ApprovalsAccordion } from "./approvals-accordion";

export function OffersAllTaskModal({
  offersAllTask,
  setOffersAllTask,
}: {
  offersAllTask: boolean;
  setOffersAllTask: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  // const theme = useTheme();

  return (
    <CustomModal
      onClose={setOffersAllTask}
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
          setOffersAllTask(false);
        },
      }}
      isOpen={offersAllTask}
    >
      <Box sx={{ mt: 2 }}>
        <Typography
          variant="h6"
          sx={{ backgroundColor: "#F9FAFB", p: 1.5, mt: 2 }}
        >
          Pending Offer Approvals(2)
        </Typography>
        <ApprovalsAccordion />
      </Box>
    </CustomModal>
  );
}
