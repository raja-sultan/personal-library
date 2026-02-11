import { type ChangeEvent, useState } from "react";
import { SearchIcon } from "@assets/icons";
import { Add, Remove } from '@mui/icons-material';
import { DateRangePicker } from "./date-range-picker";
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Checkbox, FormControlLabel, List, ListItem, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { SingleDatePicker } from "./single-date-picker";


export function FilterAccordion({
    title,
    options,
    selectedOptions,
    updateFinalArr,
    expanded,
    onAccordionChange,
    hideSearchBar,
    radio,
    handleRadioBtnChange,
    handleDateRange,
    openPicker,
    requireSingleDatePicker,
    handleSingleDatePickerChange,
    rootSxTitle
}): JSX.Element {
    const [optionsArr, setOptionsArr] = useState(options);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        const filteredOptions = options.filter(option =>
            option.name.toLowerCase().includes(value.toLowerCase())
        );
        setOptionsArr(filteredOptions)
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, checked } = event.target;
        updateFinalArr(title, name, checked);
    };

    return (
        <Accordion
            sx={styles.accordion}
            onChange={onAccordionChange}
            expanded={expanded}
            classes={{ expanded: '_expanded' }}
        >
            <AccordionSummary
                expandIcon={!expanded ? <Add /> : <Remove />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                classes={{ content: '_content' }}
                sx={styles.accordionSummary(expanded)}
            >
                <Typography variant="subtitle1" fontWeight={600} textTransform='capitalize' {...rootSxTitle}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={styles.accordionDetail(expanded)}>
                {!hideSearchBar && <TextField
                    fullWidth
                    name={title}
                    placeholder="Search"
                    variant="outlined"
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1 }} />
                    }}
                    onChange={handleChange}
                />}
                {!radio ? <List sx={styles.listScroll}>
                    {optionsArr?.map((option: { id: string, name: string }) => (
                        <ListItem key={option?.id} sx={{ p: 0 }}>
                            <FormControlLabel
                                control={<Checkbox
                                    name={option?.id}
                                    onChange={handleCheckboxChange}
                                    checked={selectedOptions?.includes(option?.id)}
                                />}
                                label={option?.name}
                            />
                        </ListItem>
                    ))}
                </List> :
                    <Box>
                        <RadioGroup name={title}>
                            {optionsArr?.map((option: { id: string, name: string, value?: number }) => (
                                <ListItem key={option?.id} sx={{ p: 0, pl: 1 }}>
                                    <FormControlLabel
                                        onChange={handleRadioBtnChange(option, title)}
                                        value={option?.id}
                                        control={<Radio />}
                                        label={option?.name}
                                        sx={{ textTransform: 'capitalize' }}
                                        classes={{
                                            label: '_label'
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </RadioGroup>
                        {openPicker && <DateRangePicker key={title + 1} handleDateRange={handleDateRange} />}
                    </Box>
                }
                {requireSingleDatePicker &&
                    <SingleDatePicker handleDateChange={handleSingleDatePickerChange} />
                }
            </AccordionDetails>
        </Accordion>
    )
}

const styles = {
    accordion: ({ palette: { neutral } }) => ({
        // minWidth: { md: '370px', xs: '270px' },
        boxShadow: 'none',
        '&._expanded': { margin: 0 },
        '&::after': {
            position: 'absolute',
            content: `''`,
            bottom: 0,
            left: 0,
            height: '1px',
            backgroundColor: neutral[100],
            width: '100%'
        },
    }),
    accordionSummary: (expanded: boolean) => ({ palette: { primary } }) => ({
        padding: '16px 23px',
        background: expanded ? alpha(primary.light, 0.07) : '',
        '& ._content': { margin: 0 }
    }),
    accordionDetail: (expanded: boolean) => ({ palette: { primary } }) => ({
        background: expanded ? alpha(primary.light, 0.07) : ''
    }),
    listScroll: ({ palette: { neutral } }) => ({
        mt: 0.5,
        maxHeight: '200px', overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '5px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: neutral[400],
            borderRadius: '4px'
        }
    }),
}