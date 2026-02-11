import type { Theme } from "@mui/material";

export function SidebarStyles(): any {
    return {
        common: {
            py: '1.6rem !important',
            height: 'calc(100vh - 230px)', overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#cacaca',
                borderRadius: '8px'
            }
        },
        rightContentStylesWrap: {
            py: '0rem !important',
            marginTop:"-5px",
            height: 'calc(100vh - 230px)', overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#cacaca',
                borderRadius: '8px'
            }
        },
        tabsStyle: (theme: Theme) => ({
            color: theme.palette.mode === 'dark' ? theme.palette.neutral[100] : theme.palette.neutral[700],
            fontSize: "1.6rem",
            fontWeight: 400,
            marginRight:"0px !important",
            '& .Mui-selected': {
                fontWeight: 600,
                color: theme.palette.mode === 'dark' ? '#F2F4F7 !important' : "#344054 !important",
            },
            '& .MuiTabs-indicator': {
                display: "none"
            },
            '& .MuiTab-root:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? "#344054 !important" : "#F2F4F7 !important", 
            },
           
        }),
        tabStyle: {
            paddingLeft: '2.4rem',
            marginLeft:"0px !important",
            display: 'flex', 
            justifyContent: "start", 
            alignItems: 'start',
        }
    }
}
