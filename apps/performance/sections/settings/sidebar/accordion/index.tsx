import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import type { ACCORDION } from "../sidebar.interface";
import { styles } from "../sidebar.styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LinkComp } from "../link";

export function CustomAccordion({ expanded = '1', id = '', icon, name, subLinks, handleChange, pathName = '' }: ACCORDION): JSX.Element {
    const sidebarStyles = styles();

    return (
        <Accordion
            key={id}
            classes={{ expanded: 'expanded', root: '_root' }}
            sx={sidebarStyles.accordion}
            expanded={expanded === id}
            onChange={handleChange(id)}
        >
            <AccordionSummary
                classes={{ expanded: 'summary_expanded', content: 'content' }}
                sx={sidebarStyles.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
            >
                {icon} {name}
            </AccordionSummary>
            {subLinks ? subLinks.map((links) => (
                <AccordionDetails key={links.id}
                    className={`acc_Detail ${ links.link && pathName.includes(links.link) ? 'active' : ''}`}
                    sx={{ p: '8px 24px 8px 63px', }}>
                    <LinkComp className='accordion_link' {...links} />
                </AccordionDetails>
            )) : null}
        </Accordion>
    )
}