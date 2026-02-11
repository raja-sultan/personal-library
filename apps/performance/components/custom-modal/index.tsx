"use client";
import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { DeleteIcon } from "@assets/icons";
import CloseIcon from "@mui/icons-material/Close";
import type { ModalProps } from "./modal.types";
import { styles } from "./modal.styles";
import { ThemeModeColor } from "@root/utils";
import { LoadingButton } from "@mui/lab";

function CustomModal(props: ModalProps): JSX.Element {
  const {
    maxWidth = "sm",
    open = false,
    isLoading = false,
    onClose = () => {
      ("");
    },
    headerIcon = <DeleteIcon />,
    title = "Alert",
    message = "Are you sure you want to delete record? You will not be able to recover the record",
    acceptText = "Delete",
    onAccept = () => {
      ("");
    },
    acceptButtonProps = { color: "error" },
    customAcceptComponent = "",
    rejectText = "Cancel",
    onReject,
    hideFooter,
    children,
    titleProps,
    hideCancelBtn = false,
  } = props;
  return (
    <Dialog
      maxWidth={maxWidth}
      fullWidth
      open={open}
      onClose={onClose}
      PaperProps={{ sx: styles.dialogPaperStyle }}
    >
      <Box p={1}>
        <Box mb="24px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={styles.head}>
              {headerIcon}
              {title && (
                <Typography
                  variant="h6"
                  color={ThemeModeColor("neutral.900", "neutral.200")}
                  {...titleProps}
                >
                  {title}
                </Typography>
              )}
            </Box>
            <CloseIcon sx={styles.closeIcon} onClick={onClose} />
          </Box>
          {message && (
            <Typography variant="body2" mt="24px">
              {message}
            </Typography>
          )}
        </Box>
        <DialogContent sx={{ p: 0 }}>{children}</DialogContent>
        {!hideFooter && (
          <DialogActions sx={{ mt: 2, gap: "10px", flexWrap: "wrap" }}>
            {!hideCancelBtn && (
              <Button
                fullWidth
                variant="outlined"
                sx={styles.cancelBtn}
                onClick={onReject || onClose}
              >
                {rejectText}
              </Button>
            )}
            {customAcceptComponent || (
              <LoadingButton
                loading={isLoading}
                variant="contained"
                fullWidth
                onClick={onAccept}
                style={{ margin: "0" }}
                sx={{
                  width: { sm: "auto", xs: "100%" },
                  p: "10px 20px",
                  ...(acceptButtonProps.color === "error" && {
                    backgroundColor: "error.dark",
                  }),
                }}
                color={acceptButtonProps.color ?? "error"}
                {...acceptButtonProps}
              >
                {acceptText}
              </LoadingButton>
            )}
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
}

export default CustomModal;
