import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";

export function PermissionAccordion({ title, children }): JSX.Element {
  return (
    <Accordion sx={{ borderRadius: 1 }}>
      <AccordionSummary
        aria-controls="accordion-content"
        id="accordion-header"
        sx={styles.accordionMainBox}
        classes={{ content: '_content' }}
        expandIcon={<ExpandCircleDownOutlinedIcon />}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails sx={{ px: '7.2rem' }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

const styles = {
  accordionMainBox: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: '24px',
    marginTop: 2,
    padding: '2.4rem',
    '& ._content': {
      margin: 0
    }
  },

}