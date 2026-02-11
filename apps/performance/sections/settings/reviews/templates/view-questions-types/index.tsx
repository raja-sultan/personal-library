import { Grid, Typography, Box, Button } from "@mui/material";
import { RHFMultiCheckbox, RHFRadioGroup, RHFTextField } from "common";
import { useState } from "react";
import { viewQuestionsStyles } from "./view-questions.style";

export interface CustomInputFieldProps {
    title?: string;
    points?: { id: string; label: string }[];
    options?: string[];
    handleChange?: (val: string) => void;
    textFieldProps?: {
        name: string;
        placeholder: string;
    };
    type?: string;
    multiCheckProps?: {
        name: string;
        options: { label: string; value: string }[];
    };
    radioOptionsProps?: {
        name: string;
        options: { label: string; value: string }[];
    }
    textBoxCheck: boolean
}

export function ViewQuestionTypes({
    title,
    points,
    options,
    handleChange,
    textFieldProps,
    type,
    textBoxCheck,
    multiCheckProps,
    radioOptionsProps
}: CustomInputFieldProps): JSX.Element {
    const [active, setActive] = useState('');

    function handleActive(val: string): void {
        setActive(val);
        handleChange && handleChange(val);
    }

    const styles = viewQuestionsStyles()

    return (
        <Grid container spacing={1} mb={2}>
            {title && <Grid item xs={12} xl={12} >
                <Typography variant="body1" fontWeight="600" color="text.primary" >{title}</Typography>
                {/* <Typography mt={0.3} variant="body2" color="text.secondary" >Use the following to inform your answer. In the current assessment period:</Typography> */}
            </Grid>}

            {points && <Grid item xs={12} xl={12} >
                {points?.map(({ id, label }) => (
                    <ul key={id} style={styles.list}>
                        <li >
                            <Grid item xs={12} xl={12}>
                                <Typography variant="body2" color="text.secondary">{label}</Typography>
                            </Grid>
                        </li>
                    </ul>
                ))}
            </Grid>}
            {type === 'RATING' || type === "MULTI_SELECT" || type === "MULTIPLE_CHOICE" ? (
                <Grid item xs={12} xl={12} mb={4} sx={{ width: "100%", margin: '0 auto' }}>
                    {options?.map((option: string) => (
                        <Box key={option} mb={1}>
                            {type === 'RATING' && (
                                <Button
                                    fullWidth
                                    disabled
                                    size='small'
                                    variant={active === option ? 'contained' : 'outlined'}
                                    onClick={() => { handleActive(option) }}
                                >
                                    {option}
                                </Button>
                            )}
                        </Box>
                    ))}
                    {type === "MULTI_SELECT" && options && options.length > 0 && (
                        <Grid item xs={12} xl={12} mb={4} sx={{ width: "100%", margin: '0 auto' }}>
                            <RHFMultiCheckbox
                                name={multiCheckProps?.name}
                                options={multiCheckProps?.options}
                                disabled
                            />
                        </Grid>
                    )}

                    {type === "MULTIPLE_CHOICE" && options && options.length > 0 &&(
                        <RHFRadioGroup
                            row={false}
                            name={radioOptionsProps?.name}
                            options={radioOptionsProps?.options}
                            disabled
                        />
                    )}
                </Grid>
            ) : null}


            {textFieldProps && textBoxCheck && <Grid item xs={12} xl={12} sx={{ width: "100%", margin: '0 auto' }}>
                {textFieldProps && textBoxCheck && <RHFTextField disabled  {...textFieldProps} multiline fullWidth minRows={3} />}
            </Grid>}
        </Grid>
    )
}
