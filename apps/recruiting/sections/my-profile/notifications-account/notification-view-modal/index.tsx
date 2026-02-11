import { BellIcon } from "@root/assets/icons/bell-icon";
import { Box, Divider, Typography } from "@mui/material";
import { CustomModal } from "common";
import React from "react";

export function NotificationViewModal(props): JSX.Element {
  const { open, setOpen, notificationView, setNotificationView } = props;

  return (
    <CustomModal
      onClose={() => {
        setOpen(false);
        setNotificationView(null);
      }}
      rootSx={{ maxWidth: { xs: 350, sm: 650 } }}
      headerLabel={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BellIcon />
          <Typography variant="h6" sx={{ ml: 2 }}>
            {notificationView?.title}
          </Typography>
        </Box>
      }
      closeButtonProps={{
        onClick: () => {
          setOpen(false);
          setNotificationView(null);
        },
      }}
      isOpen={open}
    >
      <Box>
      <Divider sx={{ height: "1.5px", backgroundColor: "divider" }} />
        <Typography variant="body2" sx={{ py: 3, px: 1, textAlign: "justify" }}>
          {notificationView?.message}
        </Typography>
      </Box>
    </CustomModal>
  );
}
