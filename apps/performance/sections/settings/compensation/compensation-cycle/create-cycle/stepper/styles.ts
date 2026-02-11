import { styled } from "@mui/material/styles";
import { CircleChecked } from "@assets/images";
import { alpha } from '@mui/material';


export const ColorLibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState, theme }) => ({
    backgroundColor: theme.palette.neutral[300],
    zIndex: 1,
    color: "background.white",
    width: 24,
    height: 24,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        border: `3px solid ${theme.palette.primary.main}`,
        backgroundColor: "transparent",
    }),
    ...(ownerState.completed && {
        backgroundImage: `url(${CircleChecked.src})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        cursor: 'pointer'
    }),
}));

export const styles = {
    stepperWrapper: ({ palette: { common, neutral, mode } }) => ({
        background: mode === 'dark' ? neutral[900] : common.white,
        border: `1px solid ${neutral[100]}`,
        borderRadius: '10px',
        minHeight: '65vh',
        '& ._mui_complete': {
            cursor: 'pointer'
        },
    }),
    stepperLabel: ({ palette: { neutral, primary } }) => ({
        gap: '16px',
        '&._vertical': {
            padding: '12px 16px',
            borderBottom: `1px solid ${neutral[100]}`
        },
        '&._completed': {
            background: alpha(primary.main, 0.05)
        }
    })
}