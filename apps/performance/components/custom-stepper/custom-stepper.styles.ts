import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { CircleChecked } from "@assets/images";

export const styles = {
  stepperLabel: ({ palette: { primary } }) => ({
    '& ._label': { fontSize: '14px', fontWeight: 400 },
    '& ._alternativeLabel': { marginTop: '4px !important' },
    '& ._alternativeLabel .Mui-active': { color: `${primary.main} !important`, fontWeight: 600 },
    '& .MuiStepLabel-label.Mui-completed': { color: 'text.secondary' }
  })
}

export const ColorLibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 14,
    left: "calc(-50% + 15px)",
    right: "calc(50% + 15px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down("sm")]: {
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: "white",
      },
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down("md")]: {
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: "transparent",
    borderRadius: 1,
  },
}));

export const ColorLibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState, theme }) => ({
  backgroundColor: theme.palette.neutral[300],
  zIndex: 1,
  color: "background.white",
  width: 20,
  height: 20,
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
    backgroundColor: "white"
  }),
}));
