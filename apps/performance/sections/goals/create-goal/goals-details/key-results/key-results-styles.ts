import type { Theme } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

export function keyResultsStyles(): any {
    return {
        wrap_progress_bar: {
            height: '12px',
            mb: '8px',
            borderRadius: '50px', '& ._bar': { borderRadius: '5px' }
        },
        custom_card_style:{
            marginBottom: "2rem" 
        },
        custom_card_timeline_style:{
            marginBottom: "2rem", background: ThemeModeColor("#F9FBFC", "color2")
        },
        form_control_style:{
            width: "100%" 
        },
        dialog_action_style:{
            marginTop: "2.4rem", display: "flex", gap: "1rem"
        },
        keyResultCardWrapStyle :{
         maxHeight:"660px",
         overflowY:'scroll',
         scrollbarColor: "#CACACA transparent",
         "&::-webkit-scrollbar": {
           width: "5px",
         },
   
         "&::-webkit-scrollbar-thumb": {
           backgroundColor: "#CACACA",
           borderRadius: "10px",
         },
   
         "&::-webkit-scrollbar-track": {
           backgroundColor: "transparent",
         },
        },

        btn_group: ({ palette: { neutral, mode } }: Theme) => ({
            p: '4px', background: mode === 'dark' ? neutral[900] : neutral[200], border: `1px solid ${neutral[200]}`, borderRadius: "8px", gap: '10px',
            "& .MuiButtonGroup-grouped": {
                borderRadius: "8px",
                ":hover": {
                    border: "none",
                    backgroundColor: "initial",
                },
                ":focus": {
                    border: "none",
                    backgroundColor: "white"
                }
            },
        }),

        btn_group_section: (btn: string) => ({
            backgroundColor: btn ? 'white' : '',
            color: btn ? '#101828' : '#98A2B3',
            border: "none",
            fontWeight: "600",
            fontSize: "16px",
            padding: "4px 20px",
        }),
    }


};
