"use client";
import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import type { CustomAccordionProps } from "./types";
import { styles } from "./styles";

export function CustomAccordion({
  title,
  subTitle,
  inlineHeaderRequired,
  children,
  sx,
  handleSubmit,
  buttonTitle,
  showBtn,
  disabled,
  submitButtonProps,
  expended = false,
}: CustomAccordionProps): JSX.Element {
  const [accordionExpanded, setAccordionExpanded] = useState<boolean>(false);
  return (
    <Accordion
      disabled={disabled}
      disableGutters
      defaultExpanded={expended}
      sx={
        (styles.mainAccordionStyling,
        {
          "& .MuiAccordionSummary-content": {
            display: inlineHeaderRequired ? "flex !important" : "block",
            justifyContent: "space-between",
            alignItems: "center",
          },
        })
      }
    >
      <AccordionSummary
        sx={styles.accordionSummaryStyling || sx}
        aria-controls="panel1d-content"
        id="panel1d-header"
        expandIcon={
          <Box>
            {accordionExpanded ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Box>
        }
      >
        <Typography variant="h6" sx={styles.accordionTitleStyling}>
          {title}
        </Typography>
        {showBtn && (
          <Button onClick={handleSubmit} {...submitButtonProps}>
            {buttonTitle}
          </Button>
        )}
        <Typography variant="body2" sx={styles.accordionDescriptionStyling}>
          {subTitle}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
