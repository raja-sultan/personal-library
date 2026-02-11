import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

export const styles = {
  employee: ({ palette: { neutral } }: Theme) => ({
    backgroundColor: ThemeModeColor(neutral[100], neutral[700]),
    pl: {xs:1,sm:4.2},
    display: "flex",
    alignItems: "center",
  }),
  employeeScroll: {
    overflowY: "scroll",
    height: { xs: "25rem", sm: "40rem" },
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  },
  selectEmployeeScroll: {
    
    overflowY: "scroll",
    height: { xs: "20rem", sm: "45rem" },
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  },
  employeeProfile: {
    pl: {xs:0.2 , sm:0.5},
    py: 0.8,
    display: "flex",
    alignItems: "center",
  },
  selectedMember: ({ palette: { neutral } }: Theme) => ({

    width: "-webkit-fill-available",
    backgroundColor: ThemeModeColor(neutral[100], neutral[700]),
    padding: "1rem",
    
  }),
};
