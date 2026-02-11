import type { Theme } from "@mui/material";

export const styles = {
    personalWrapper: (theme: Theme) => ({
        borderRadius: '10px',
        border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.neutral[800] : theme.palette.neutral[100]}`,
        p: 3
    }),
    label: { pb: 2, fontWeight: '600 !important' },
    icon: { display: 'flex', gap: '20px', alignItems: 'center', pb: 2, },
    profileBio: (theme: Theme) => ({ borderTop: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.neutral[800] : theme.palette.neutral[100]}`, pb: 2 }),
    profile: { display: 'flex', gap: '12px', alignItems: 'center', pb: '16px', pt: '16px' },
    title: (theme: Theme) => ({ color: theme.palette.mode === 'dark' ? theme.palette.neutral[200] : theme.palette.neutral[500] }),
    heading: { fontWeight: '600 !important', pt: 2 },
    desc: (theme: Theme) => ({ color: theme.palette.neutral[500], pt: '10px' })
}