import * as React from "react";
import {
  AccordionDetailsCustom,
  AccordionSummary,
  Accordion,
} from "./custom-popover-according.style";
import type {
  AccordionProps,
  AccordionSummaryProps,
  AccordionDetailsProps,
} from "@mui/material";

interface CustomPopoverAccordingProps {
  AccordionDetailsProps?: AccordionDetailsProps;
  AccordionProps?: AccordionProps;
  AccordionSummaryProps?: AccordionSummaryProps;
  mainTitle: string;
  children: any;
}

export function CustomPopoverAccording(
  props: CustomPopoverAccordingProps
): JSX.Element {
  const {
    AccordionProps,
    AccordionSummaryProps,
    AccordionDetailsProps,
    mainTitle,
    children,
  } = props;
  const [expanded, setExpanded] = React.useState<string | false>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        {...AccordionProps}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          {...AccordionSummaryProps}
        >
          {mainTitle}
        </AccordionSummary>
        <AccordionDetailsCustom {...AccordionDetailsProps}>
          {children}
        </AccordionDetailsCustom>
      </Accordion>
    </div>
  );
}
