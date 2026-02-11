import React, { type ChangeEvent, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, IconButton, type IconButtonProps, MenuItem, Popover, type SxProps, type ButtonProps } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TableActionsIcon } from "@assets/icons/table-action-icon";

interface PopOver {
  vertical: "bottom" | "center" | "top";
  horizontal: "center" | "left" | "right";
}

export function CustomPopover({
  btnText,
  options = [],
  handleChange = () => { },
  checkboxOptions = [],
  checkboxChangeHandler = () => { },
  width = "auto",
  iconButton,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin,
  customIcon = <TableActionsIcon />,
  customComponent,
  customActionComponent,
  customActionComponentSX,
  menuItemSx,
  iconButtonProps,
  btnProps,
  hideCheckbox,
}: {
  btnText?: string;
  options?: string[];
  width?: string;
  handleChange?: (val: string) => void;
  iconButton?: boolean;
  checkboxOptions?: { id: string; name: string }[];
  checkboxChangeHandler?: (ids: string[]) => void;
  transformOrigin?: PopOver;
  anchorOrigin?: PopOver;
  customIcon?: React.ReactNode;
  customComponent?: React.ReactNode;
  menuItemSx?: SxProps
  customActionComponent?: React.ReactNode;
  customActionComponentSX?: SxProps;
  iconButtonProps?: IconButtonProps;
  btnProps?: ButtonProps;
  hideCheckbox?: boolean;
}): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }
  function handleClosePopover(value: string): void {
    handleChange(value);
    handleClose();
  }

  const handleCheckboxChange =
    (id: string) =>
      (_: ChangeEvent<HTMLInputElement>): void => {
        if (selected.includes(id)) {
          const filtered = selected.filter((Id) => Id !== id);
          setSelected(filtered);
          checkboxChangeHandler(filtered);
        } else {
          const filtered = [...selected, id];
          setSelected(filtered);
          checkboxChangeHandler(filtered);
        }
      };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {btnText && (
        <Button
          aria-describedby={id}
          variant="outlined"
          endIcon={<ExpandMoreIcon />}
          onClick={handleClick}
          {...btnProps}
        >
          {btnText}
        </Button>
      )}
      {iconButton && (
        <IconButton aria-describedby={id} onClick={handleClick} {...iconButtonProps}>
          {customIcon}
        </IconButton>
      )}
      {customActionComponent && <Box
        component='div'
        aria-describedby={id}
        onClick={handleClick} sx={customActionComponentSX}>
        {customActionComponent}
      </Box>}

      {open && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          sx={({ palette: { neutral } }) => ({
            "& .MuiPaper-root": {
              width,
              maxHeight: "300px",
              "&::-webkit-scrollbar": {
                width: "5px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: neutral[300],
              },
            },
          })}
        >
          {options?.length > 0 &&
            options.map((value) => (
              <MenuItem
                sx={{ textTransform: "capitalize", fontSize: "16px", ...menuItemSx }}
                key={value}
                value={value}
                onClick={() => {
                  handleClosePopover(value);
                }}
              >
                {value}
              </MenuItem>
            ))}
          {checkboxOptions?.length > 0 &&
            checkboxOptions?.map((option) => (
              <MenuItem key={option?.id}>
                <FormControlLabel
                  label={option?.name}
                  sx={{ pl: hideCheckbox ? 1.5 : ''}}
                control={<Checkbox checked={selected.includes(option?.id)} sx={{ display: hideCheckbox ? 'none' : '' }} />}
                onChange={handleCheckboxChange(option?.id)}
                />
              </MenuItem>
            ))}

          {customComponent && customComponent}
        </Popover>
      )}
    </>
  );
}
