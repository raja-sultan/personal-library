import React, { useState } from "react";
import { Button, MenuItem, Popover } from "@mui/material";

import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { PermissionProtected } from "@guards/permission-protected";

export function CardMenu({ onItemClick, dropdownValues }): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }

  function handleClosePopover(value: string): void {
    onItemClick(value);
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        <TableActionsIcon />
      </Button>
      {open && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{ marginLeft: "-60px", "& .MuiPaper-root": { width: "145px" } }}
        >
          {dropdownValues.map((value) => (
            value?.permission ? <PermissionProtected key={value?.text ?? value} permission={value?.permission} disabled>
              <MenuItem
                sx={{ textTransform: "capitalize", fontSize: "14px" }}
                key={value?.text ?? value}
                value={value?.text ?? value}
                onClick={() => {
                  handleClosePopover(value?.text ?? value);
                }}
              >
                {value?.text}
              </MenuItem>
            </PermissionProtected>
              : <MenuItem
                sx={{ textTransform: "capitalize", fontSize: "14px" }}
                key={value?.text ?? value}
                value={value?.text ?? value}
                onClick={() => {
                  handleClosePopover(value?.text ?? value);
                }}
              >
                {value?.text}
              </MenuItem>
          )
          )}
        </Popover>
      )}
    </>
  );
}
