import React, { type ChangeEvent, useState } from "react";
import {
    Checkbox,
    FormControlLabel,
    Box,
    MenuItem,
    Popover,
    TextField,
    Typography,

} from "@mui/material";
import { SearchIcon } from "common";

interface PopOver {
    vertical: "bottom" | "center" | "top";
    horizontal: "center" | "left" | "right";
}

interface CustomReportFilterProps {
    btnText?: string;
    width?: string;
    handleSearch?: (val: string) => void;
    checkboxOptions?: { id: string; name: string }[];
    checkboxChangeHandler?: (ids: string[]) => void;
    transformOrigin?: PopOver;
    anchorOrigin?: PopOver;
    customIcon?: React.ReactNode;
    customComponent?: React.ReactNode;

}

export function CustomReportFilter({
    btnText,
    handleSearch = () => { },
    checkboxOptions = [],
    checkboxChangeHandler = () => { },
    anchorOrigin = {
        vertical: "bottom",
        horizontal: "left",
    },
    transformOrigin,
    customComponent,
    width = "auto",
    customIcon
}: CustomReportFilterProps): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [selected, setSelected] = useState<string[]>([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
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
         {customIcon && (
                <Typography
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                    onClick={handleClick}
                >
                    {customIcon}
                    {btnText && (
                        <Typography
                            variant="subtitle2"
                            fontWeight={400}
                            color="text.secondary"
                            onClick={handleClick}
                        sx={{cursor:'pointer'}}>
                            {btnText}
                        </Typography>
                    )}
                </Typography>
            )}
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
                    <Box>
                        <TextField
                            fullWidth
                            name=''
                            placeholder="Search"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ mr: 1 }} />
                            }}
                            onChange={() => { handleSearch }}
                            sx={{ padding: "1.2rem"}}
                        />
                            {checkboxOptions?.length > 0 &&
                                checkboxOptions?.map((option) => (
                                    <MenuItem key={option?.id}>
                                        <FormControlLabel
                                            label={option?.name}
                                            control={<Checkbox checked={selected.includes(option?.id)} />}
                                            onChange={handleCheckboxChange(option?.id)}
                                        />
                                    </MenuItem>
                                ))}
                        {customComponent && customComponent}
                    </Box>
                </Popover>
            )}
        </>
    );
}
