import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useGetApplicationReviewsQuery } from "@services/dashboard/application-review/application-review-api";
import { CustomTable } from "common";
import AppReviewModal from "./app-review-modal";

export const mainColumns = [
  {
    accessorFn: (row: any) => row.nameAndCompany.firstName ?? "-",
    id: "templates",
    cell: (info: any) => {
      return (
        <Box>
          {`${info?.row?.original?.nameAndCompany?.firstName} ${info?.row?.original?.nameAndCompany?.lastName}`}
          <Box>{info?.row?.original?.nameAndCompany?.currentCompany}</Box>
        </Box>
      );
    },
    header: () => <span>Candidate</span>,
    isSortable: false,
  },

  {
    accessorFn: (row: any) => row.action ?? "-",
    id: "Actions",
    cell: ({ row: { original } }) => {
      const { _id, jobId } = original;

      return (
        <Link href={`/application-review?jobId=${jobId}&candidateId=${_id}`}>
          Application Review
        </Link>
      );
    },

    header: () => <span>Actions</span>,
  },
];
export function ApplicationReview(): React.JSX.Element {
  const [arrowControl, setArrowControl] = useState<boolean>(false);

  const { data } = useGetApplicationReviewsQuery(null);

  return (
    <Box
      sx={{
        maxHeight: 350,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "6px",
        },
        pr: 2,
      }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ pt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              Application To Review
            </Typography>

            <AppReviewModal data={data?.data} />
          </Box>

          {data?.data?.slice(0, 2)?.map((item: any) => {
            return (
              <Accordion key={item?._id} expanded={arrowControl === item?._id}>
                <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                // aria-controls="panel1-content"
                // id="panel1-header"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ minWidth: "30%" }}>
                      {item?.jobInfo?.jobName ?? "---"}
                      <Box>
                        {`${item?.jobInfo?.departmentInfo?.departmentName} , ${item?.jobInfo?.officeInfo?.officeName}`}
                      </Box>
                    </Box>

                    <Box sx={{ minWidth: "10%" }}>
                      <Button
                        sx={{
                          minWidth: "0px",
                          px: "0px",
                          pl: 1,
                          py: "0px",
                          position: "relative",
                          // top: "-9px",
                          left: "4px",
                        }}
                        variant="outlined"
                        onClick={() => {
                          setArrowControl(
                            arrowControl === item?._id ? null : item?._id
                          );
                        }}
                      >
                        {item?.jobs?.length}
                        {arrowControl === item?._id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </Button>
                    </Box>
                  </Box>
                </AccordionSummary>

                <CustomTable
                  data={item?.jobs}
                  columns={mainColumns}
                  isPagination={false}
                  isSuccess
                  showSerialNo={false}
                />
              </Accordion>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
