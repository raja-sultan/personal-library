
import { alpha } from "@mui/material";
import type { Theme } from "@mui/material";

export function growthAreasSidebar():any  {
    return {
        wrapper: (id: string, selected: string)=>(theme: Theme) => ({

            position: "relative",
            padding: "8px 47px",
            cursor: "pointer",
            background: id === selected ? alpha(theme.palette.primary.light, 0.2) : "",
            "&::before": {
                position: "absolute",
                content: `''`,
                left: 0,
                top: 0,
                width: "5px",
                height: "100%",
                background: id === selected ? theme.palette.primary.main : "",
                borderRadius: "0 5px 5px 0",
            },
            "&::after": {
                position: "absolute",
                content: `''`,
                left: "25px",
                top: "13px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border:  id === selected ? `1px solid ${theme.palette.primary.main}` : "",
            },
        }),
    }
};

