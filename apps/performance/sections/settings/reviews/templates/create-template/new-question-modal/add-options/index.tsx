import React from "react";
import { TrashIcon } from "@assets/icons/trash-icon";
import { Box, Button, Typography, Checkbox, TextField, Grid, IconButton, } from "@mui/material";
import type { CheckboxProps } from "@mui/material";
import { Add, } from '@mui/icons-material';
import { styles } from "../new-question.styles";
import { useAddOptions } from "./use-add-options";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


interface Props {
    checkboxProps?: CheckboxProps;
    number?: boolean;
    icon?: React.ReactNode;
    options: string[];
    setOptions: React.Dispatch<React.SetStateAction<[]>>;
}

export function AddOptions(props: Props): JSX.Element {
    const { checkboxProps, number, icon, options, setOptions } = props;
    const {

        toggleInput, setToggleInput,
        handleDeleteOption,
        handleInputChange,
        handlePushValues,
        handleClose,handleKeyDown } = useAddOptions({ setOptions, options })



    return (
        <Grid container>
            {options?.map((option, i) => (
                <Grid item xs={12} key={option}>
                    <Box sx={styles.addOptions}>
                        {number && <Typography variant='body1' className='_number'>{i + 1}</Typography>}
                        {checkboxProps && <Checkbox {...checkboxProps} />}
                        {icon && icon}

                        <Box className='_field'>{option}</Box>
                        <Box className='_icon'>
                            <TrashIcon onClick={() => { handleDeleteOption(i) }} />
                        </Box>

                    </Box>
                </Grid>
            ))}
            {toggleInput && <Grid item xs={12}>

                <Box sx={styles.inputWithIconStyleWrap}>
                    <TextField onKeyDown={handleKeyDown} size='medium' fullWidth onChange={handleInputChange} variant='outlined' placeholder="add questions" sx={{ maxWidth: "420px" }} />
                    <Box mt={0} sx={styles.gridIconStyle}>
                        <IconButton size="small">
                            <CancelOutlinedIcon onClick={handleClose} sx={{ color: "#98A2B3", cursor: 'pointer', fontSize: "28px" }} />
                        </IconButton>
                        <IconButton size="small" onClick={handlePushValues}>
                            <AddCircleOutlineOutlinedIcon sx={{ color: "#98A2B3", cursor: 'pointer', fontSize: "28px", }} />
                        </IconButton>
                    </Box>

                </Box>

            </Grid>
            }

            <Grid item xs={12} mt='10px'>
                <Button variant="outlined" size="small" startIcon={<Add />} onClick={() => { setToggleInput(true) }}>
                    Add Option
                </Button>
            </Grid>
        </Grid>
    )
}