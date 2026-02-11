import { alpha } from "@mui/material";
import type { Theme } from "@mui/material";

export const styles = {
    tabsWrapper: ({ palette: { neutral, common, mode } }: Theme) => ({
        background: mode === 'dark' ? neutral[900] : neutral[200],
        borderRadius: '8px',
        display: 'inline-block',
        border: `1px solid ${neutral[200]}`,
        padding: '4px',
        marginBottom: '24px',
        '& ._indicator': {
            height: '100%',
            background: mode === 'dark' ? alpha(neutral[500], 0.3) : common.white,
            boxShadow: `0px 1px 2px 0px ${alpha(neutral[900], 0.05)}`,
            borderRadius: '8px',
        },
        '& ._root, ': { minHeight: 'unset', maxWidth: '100%' },
        '& .tab_root': {
            marginLeft: '0px !important',
            zIndex: 1,
            padding: '4px 20px',
            minHeight: 'unset',
            textTransform: 'capitalize',
            color: neutral[400],
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '24px',
            '&._selected': {
                color: mode === 'dark' ? common.white : neutral[900]
            }
        },
    })
}