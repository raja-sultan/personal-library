import type { Theme } from "@mui/material";

export function addQuestionStyles(): any {
    return {
        wrap_choose_question: ({ palette: { neutral } }: Theme) => ({
            border: `1px solid ${neutral[100]}`,
            marginBottom: "1.6rem",
            padding: "1.6rem",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }),
        icon_styling: ({ palette: { neutral } }: Theme) => ({
            border: `1px solid ${neutral[300]}`,
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            padding: "0.8rem",
            borderRadius: "100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }),
        wrap_button: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "1.6rem",
        },
        wrap_question: {
            height: "80vh",
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "10px",
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
    }


};
