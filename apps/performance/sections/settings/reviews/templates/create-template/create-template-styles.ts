import type { Theme } from "@mui/material";

export function createTemplateStyles(): any {
    return {
        wrap_create_template: {
            minHeight: "55vh"
        },
        display_question: {
            display: "flex", justifyContent: "space-between", paddingBottom: "2.4rem"
        },
        wrap_button: {
            display:"flex", justifyContent:"end", alignItems:"end", gap:"1rem" ,height: "44vh", flexWrap:"wrap" 
        },
        wrap_delete_icon: ({ palette: { neutral } }: Theme) => ({
            border: `1px solid ${neutral[300]}`,
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.6rem",
            cursor: "pointer",
            height: "34px",
            width: "34px"
        }),
    }


};
