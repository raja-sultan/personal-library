import { Box } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

export function SingleDatePicker({ handleDateChange }): JSX.Element {
    function onChange(val: string | Date): void {
        const date = dayjs(val).format('YYYY-MM-DD')
        handleDateChange(date)
    }
    return (
        <Box sx={styles.calander}>
            <DateCalendar onChange={onChange} />
        </Box>
    );
}

const styles = {
    calander: {
        "& .MuiPickersCalendarHeader-root": {
            position: "relative",
            paddingLeft: "50px",
        },
        "& .MuiPickersCalendarHeader-switchViewIcon": {
            display: "none",
            color: "blue",
        },
        "& .MuiPickersCalendarHeader-labelContainer": {
            width: "150px",
            margin: "auto",
        },

        "& .MuiButtonBase-root.MuiIconButton-edgeEnd": {
            left: 0,
            position: "absolute",
        },

        "& .MuiPickersArrowSwitcher-spacer": {
            width: "0px",
        },
        "& .MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
            borderRadius: "10px",
            height: "31px",
            width: "40px",
            marginTop: "2px",
        },
        "& .MuiButtonBase-root.MuiPickersDay-root.MuiPickersDay-dayWithMargin": {
            borderRadius: "10px",
            height: "31px",
            width: "40px",
            marginTop: "2px",
        },
    },
}