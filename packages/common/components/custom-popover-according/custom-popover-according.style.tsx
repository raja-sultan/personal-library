import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import type {
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummaryProps,
} from "@mui/material";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  transition: theme.transitions.create("height", {
    // easing: theme.transitions.easing.sharp,
    duration: "0.4s",
  }),
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "15px" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  fontWeight: 600,
  fontSize: 16,
  minHeight:60,

  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(270deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  transition: theme.transitions.create("width", {
    // easing: theme.transitions.easing.sharp,
    duration: "0.4s",
  }),
  borderRadius: 10,
  border: `2px solid ${theme.palette.neutral[300]}`,
}));
export const AccordionDetailsCustom = styled((props: AccordionDetailsProps) => (
  <AccordionDetails {...props} />
))(({ theme }) => ({
  position: "absolute",
  zIndex: 9,
  background: theme.palette.background.paper,
  maxHeight: "40vh",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: 5,
  },
  borderRadius: 8,
  border: `1px solid ${theme.palette.neutral[300]}`,
  width: "100%",
}));
