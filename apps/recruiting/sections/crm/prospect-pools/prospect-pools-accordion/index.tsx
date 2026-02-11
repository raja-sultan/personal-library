"use client";

import React, { useState } from "react";
import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Typography,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import type { CustomAccordionProps } from "./types";
import { styles } from "./styles";
import { PersonIcon } from "@assets/icons";
import { CustomTable } from "common";

const data = [
  {
    Name: "David",
    ProspectAddedBy: "Miller",
    Date: "12/11/2023",
  },
  {
    Name: "Miller",
    ProspectAddedBy: "David",
    Date: "12/11/2023",
  },
];

const TaskTableColumns = [
  {
    accessorFn: (row: any) => row.Name,
    id: "Name:",
    cell: (info: any) => (
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        flexDirection="column"
        gap={2}
      >
        {info.getValue()}
      </Box>
    ),
    header: () => <span>Name</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.ProspectAddedBy,
    id: "Prospect Added By",
    cell: (info: any) => info.getValue(),
    header: () => <span>Prospect Added By</span>,
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row.Date,
    id: "Date",
    cell: (info: any) => info.getValue(),
    header: () => <span>Date</span>,
    isSortable: false,
  },
];
export function ProspectPoolAccordion({
  title,
  subTitle,
  inlineHeaderRequired,
  poolCount,
  sx,
  disabled,
  poolStagesArray,
}: CustomAccordionProps): JSX.Element {
  const [accordionExpanded, setAccordionExpanded] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <Accordion
      disabled={disabled}
      disableGutters
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
              <ArrowCircleUpIcon />
            ) : (
              <ArrowCircleDownIcon />
            )}
          </Box>
        }
      >
        <Box>
          <Typography variant="h6" sx={styles.accordionTitleStyling}>
            {title}
          </Typography>
          <Typography variant="body2" sx={styles.accordionDescriptionStyling}>
            {subTitle}
          </Typography>
        </Box>
        <Typography padding={1}>
          <Button
            size="small"
            startIcon={<PersonIcon />}
            variant="contained"
            sx={{
              bgcolor: poolCount > 0 ? "contained" : theme.palette.grey[500],
            }}
          >
            {poolCount}
          </Button>
        </Typography>
      </AccordionSummary>
      {poolStagesArray ? (
        <AccordionDetails>
          {poolStagesArray?.length > 0 &&
            poolStagesArray?.map((ele) => (
              <>
                <Typography
                  sx={{
                    border: "0.2px solid #F2F4F7",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  padding={1}
                  key={ele?._id}
                >
                  <Box>{ele?.stage}</Box>
                  <Button
                    size="small"
                    startIcon={<PersonIcon />}
                    variant="contained"
                    sx={{
                      bgcolor:
                        ele?.stageCount > 0
                          ? "contained"
                          : theme.palette.grey[500],
                    }}
                  >
                    {ele?.stageCount}
                  </Button>
                </Typography>
                <Box>
                  {ele?.stageCount > 0 ? (
                    <CustomTable
                      data={data}
                      columns={TaskTableColumns}
                      isSuccess
                      isPagination={false}
                      onSortByChange={(onSortData: any) => {
                        return onSortData;
                      }}
                    />
                  ) : null}
                </Box>
              </>
            ))}
        </AccordionDetails>
      ) : null}
    </Accordion>
  );
}
