import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

export function employeeFilterStyles(): any {
  return {
    wrap_drawer: {
      borderRadius: "5px",
      width: { xs: "280px", lg: "340px" },
    },
    drawer_icon_button: {
      borderRadius: "5px",
      display: "block",
      ml: "auto",
    },
    accordionSummary: {
      boxShadow: "none",
      minHeight: "40px",
      "&.Mui-expanded": {
        minHeight: "40px",
      }
    },
    wrap_employee_filters: ({ palette: { neutral } }: Theme) => ({
      display: "flex",
      alignItems: "center",
      padding: "0.8rem 0.8rem 2.4rem 1.6rem",
      borderBottom: `1.5px solid ${neutral[300]}`,
    }),
    filter_label: () => ({
      color: ThemeModeColor("#1D2939", "darkColor"),
    }),
    filter_title: () => ({
      color: ThemeModeColor("#344054", "darkColor"),
    }),
    search_field: {
      marginBottom: "1rem",
      width: "100%",
      maxWidth: "300px",
    },
    wrap_filter_options: {
      minHeight: "25px !important",
      maxHeight: "210px !important",
      overflowY: "auto !important",
      overflowX: "hidden !important",
      marginRight:"20px",
      "&::-webkit-scrollbar": {
        width: "5px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#CACACA",
        borderRadius: "5px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f1f1f1",
        borderRadius: "5px",
      },
      " @media screen and (max-width: 380px)": {
        height: "100%",
        padding: "0px",
        overflowY: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          display: "none",
        },
        "&::-webkit-scrollbar-track": {
          display: "none",
        },
      },
    },

    warp_Accordion: (expanded: string | boolean, key: string) => ({
      // padding:"1.6rem 0rem 2.4rem",
      padding: "0rem",
      boxShadow: "none",
      margin: "0rem !important",
      backgroundColor:
        expanded === key ? ThemeModeColor("#FAFAFF", "darkColor") : "inherit",
    }),
    filter_checkbox: {
      width: "max-content",
    },
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
      "& .MuiDateCalendar-root": {
        width: "258px",
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
  };
}
