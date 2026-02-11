import { Accordion, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styles } from "./accordion-style";

export function CustomAccordion({
  title,
  children,
  expanded,
  handleChange,
}): JSX.Element {
  const sidebarStyles = styles();
  return (
    <Accordion
      classes={{ expanded: "expanded", root: "_root" }}
      sx={sidebarStyles.accordion}
      expanded={expanded}
      onChange={handleChange}
    >
      <AccordionSummary
        classes={{ expanded: "summary_expanded", content: "content" }}
        sx={sidebarStyles.accordionSummary}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography sx={sidebarStyles.name}>{title}</Typography>
      </AccordionSummary>
      {children}
    </Accordion>
  );
}
