import type { Theme } from '@mui/material';
import { Drawer, IconButton, Typography, Box } from '@mui/material'
import React from 'react';
import { CloseIcon } from '@assets/icons/close-icon';
import { ThemeModeColor } from '@root/utils';
import { KeyboardArrowRight } from "@mui/icons-material";

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  showCustomCloseIcon?: boolean;
}

export function CustomDrawer({ isOpen, onClose, title, children, maxWidth,showCustomCloseIcon = false, }: CustomDrawerProps): JSX.Element {
  const styles = customDrawer()
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        style: {
          maxWidth, // Apply maxWidth directly on the style
        },
        sx: styles.drawerWrap,
      }}
    >
      {showCustomCloseIcon && (
        <IconButton sx={styles.customCloseIcon} onClick={onClose}>
          <KeyboardArrowRight />
        </IconButton>
      )}
      <IconButton
        onClick={onClose}
        sx={styles.closeIcon}
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>
      <Typography variant='h5' fontWeight="600" color="text.primary" sx={styles.title}>{title}</Typography>
      <Box>{children}</Box>
    </Drawer>
  )
}

export function customDrawer(): any {
  return {
    drawerWrap: ({ palette: { neutral } }: Theme) => ({ width: '100%', maxWidth: '380px', border: `1px solid ${neutral[100]}`, background: ThemeModeColor("#fff", "color2"), borderRadius: '24px 0px 0px 24px', padding: '24px',overflow: "visible" }),
    closeIcon: { position: 'absolute', top: '10px', right: '10px', },
    title: { width: '100%', mb: 1 },
    customCloseIcon: (theme: Theme) => ({
      position: "absolute",
      boxShadow: `0px 1px 2px 0px ${theme.palette.neutral[900]}`,
      "&:hover": {
        backgroundColor: "background.paper",
      },
      backgroundColor: "background.paper",
      top: "50%",
      transform: "translateY(-50%)",
      left: "-20px",
    }),
  }
}
