import { useState } from 'react';
import { Box } from '@mui/material';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export function DateRangePicker({ handleDateRange }): JSX.Element {

    const [state, setState] = useState([
        { startDate: new Date(), endDate: undefined, key: 'selection' }
    ]);

    return (
        <Box sx={dateRangeStyles.datePickerWrapper}>
            <DateRange
                editableDateInputs
                onChange={item => { setState([item.selection]); handleDateRange(item.selection) }}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />
        </Box>
    )
}

const dateRangeStyles = {
    datePickerWrapper: {
        "& .rdrDefinedRangesWrapper": { display: "none !important" },
        "& .rdrDateDisplayWrapper": { display: "none !important" },
    },
};