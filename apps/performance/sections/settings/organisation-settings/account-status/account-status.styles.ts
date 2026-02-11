import type { Theme } from "@mui/material";

export const styles = {
    wrapper: ({ palette: { error } }: Theme) => ({
        '& .deactivate_acc .custom_card ': {
            backgroundColor: error.lightest,
        },
        '& .custom_card_sub_header': {
            padding: '24px'
        }
    })
}