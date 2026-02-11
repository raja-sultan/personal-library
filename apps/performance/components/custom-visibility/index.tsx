import React, { useState } from 'react';
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Popover,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface CustomVisibilityProps {
    handleChange?: (value: string[]) => void;
}

export default function CustomVisibility({ handleChange = () => {} }: CustomVisibilityProps): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [checked, setChecked] = useState<string[]>([]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value, checked: isChecked } = event.target;

        if (isChecked) {
            setChecked((prevChecked) => [...prevChecked, value]);
            handleChange([...checked, value]); 
        } else {
            setChecked((prevChecked) => prevChecked.filter((item) => item !== value));
            handleChange(checked.filter((item) => item !== value)); 
        }
    };

    const checkboxValues = [
        { label: 'Public', value: 'Public' },
        { label: 'Private', value: 'Private' },
        { label: 'Private + Manager', value: 'Private + Manager' },
        { label: 'Manager only', value: 'Manager' },
    ];

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button
                variant="outlined"
                aria-describedby={id}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Visibility
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <FormControl component="fieldset" sx={{ p: '6px 16px' }}>
                    <FormGroup>
                        {checkboxValues.map((item) => (
                            <FormControlLabel
                                key={item.value}
                                control={
                                    <Checkbox
                                        checked={checked.includes(item.value)}
                                        onChange={handleCheckboxChange}
                                        value={item.value}
                                    />
                                }
                                label={item.label}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Popover>
        </>
    );
}
