import { alpha } from "@mui/material";
import type { Theme } from "@mui/material";

export function styles(): any {
    return {
        accordion: (theme: Theme) => ({
            m: 0,
            borderRadius: 0, 
            boxShadow: 'none',
            '&.expanded': { margin: 0, '&:hover': { background: 'none' } },
            '&._root::before': { background: 'none' },
            '&._root:first-of-type, &._root:last-of-type': {
                borderRadius: 0
            },
            '&:hover': { background: alpha(theme.palette.primary.light, 0.2) },
            '& .acc_Detail .accordion_link': {
                fontSize: "14px",
                color: theme.palette.mode === 'dark' ? theme.palette.neutral[400] : theme.palette.neutral[900]
            },
            '& .acc_Detail.active': {
                background: alpha(theme.palette.primary.light, 0.2),
                position: 'relative',
                '&::before': {
                    position: 'absolute',
                    content: "''",
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: '5px',
                    background: theme.palette.primary.main,
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                },
                '&::after': {
                    position: 'absolute',
                    content: "''",
                    left: '46px',
                    top: '15.4px',
                    border: `2px solid ${theme.palette.primary.main}`,
                    borderRadius: '50px',
                    width: '8px',
                    height: '8px'
                },
                '& .accordion_link': {
                    color: theme.palette.mode === 'dark' ? theme.palette.neutral[100] : theme.palette.neutral[900]
                },
            }
        }),
        accordionSummary: {
            p: '8px 24px',
            '& .content': { margin: '0 !important', minHeight: 'unset', gap: '16px', fontSize: "16px" },
            '&.summary_expanded': { m: 0, minHeight: '48px', fontWeight: 600 },
        },
        linkWrapper: (theme: Theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            '& .link': {
                textDecoration: 'none',
                color: theme.palette.mode === 'dark' ? theme.palette.neutral[100] : theme.palette.neutral[900],
                fontSize: "16px",
                fontWeight: 400,
                flex: 1,
            },
            '& .link.active': {
                fontWeight: 600
            }
        })
    }
}

