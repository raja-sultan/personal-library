"use client";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { UploadIcon } from "@assets/icons/upload-icon";
import { styles } from "./upload-button.styles";

interface Props {
  handleRemove?: () => void;
  anchorPosition: "center" | "left" | "right";
  disableBtnProps?: { uploadBtn: boolean; removeBtn: boolean };
  onUpload?: React.ChangeEventHandler<HTMLInputElement>;
}

function UploadButton({
  anchorPosition,
  disableBtnProps,
  handleRemove = () => {},
  onUpload = () => {},
}: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }
  function handleClose(): void {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        sx={{ padding: "0 0 5px 0" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <UploadIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: anchorPosition,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: anchorPosition,
        }}
      >
        <MenuItem sx={styles.menuItemStyle} disabled={disableBtnProps?.uploadBtn}>
          <Button
            disableRipple
            component="label"
            fullWidth
            variant="text"
            sx={{
              all: "unset",
              cursor: "pointer",
              "&:hover": { background: "transparent" },
            }}
          >
            <Typography variant="body2">Upload Picture</Typography>
            <VisuallyHiddenInput
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => {
                onUpload(e);
                handleClose();
              }}
            />
          </Button>
        </MenuItem>
        <MenuItem
          sx={styles.menuItemStyle}
          disabled={disableBtnProps?.removeBtn}
          onClick={() => {
            handleRemove();
            handleClose();
          }}
        >
          <Typography variant="body2">Remove Picture</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UploadButton;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
