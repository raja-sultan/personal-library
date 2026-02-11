import React, { useRef, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Button, Grid, Menu, MenuItem } from "@mui/material";

export function SingleJobOpeningFormActions({
  remove,
  duplicate,
}): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openingIdBtnRef = useRef(null);
  const open = Boolean(anchorEl);
  function handleClick(): any {
    setAnchorEl(openingIdBtnRef?.current);
  }
  function handleClose(): any {
    setAnchorEl(null);
  }

  function duplicateHand(): any {
    duplicate();
    setAnchorEl(null);
  }

  return (
    <Grid item lg={12}>
      <Button
        id="basic-button"
        ref={openingIdBtnRef}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableRipple
        endIcon={<MoreHorizIcon onClick={handleClick} sx={{ ml: 5 }} />}
      >
        Opening Id
      </Button>
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
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={duplicateHand}>Duplicate</MenuItem>
        <MenuItem
          onClick={() => {
            remove();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Grid>
  );
}
