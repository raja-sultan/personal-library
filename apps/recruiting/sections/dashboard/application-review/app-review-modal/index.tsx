import React, { useState } from "react";
import { CustomModal, CustomTable } from "common";
import { Accordion, AccordionSummary, Box, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Link from "next/link";

export const subColumns = [
  {
    accessorFn: (row: any) => {
      return (
        <Box>
          {row?.nameAndCompany?.firstName}
          <Box>
            {row?.department}, {row?.school}
          </Box>
        </Box>
      );
    },
    id: "templates",
    cell: (info: any) => info.getValue(),
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

function AppReviewModal({ data }): React.JSX.Element {
  const [arrowControl, setArrowControl] = useState<boolean>(false);
  const [openReviewModal, setOpenReviewModal] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          setOpenReviewModal(true);
        }}
      >
        See All
      </Button>
      <CustomModal
        isOpen={openReviewModal}
        onClose={() => {
          setOpenReviewModal(false);
        }}
        headerLabel="Application Review"
        rootSx={{ width: { md: "40%", xs: "60%" } }}
        closeButtonProps={{
          onClick: () => {
            setOpenReviewModal(false);
          },
        }}
      >
        {data?.map((item: any) => {
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
                  </Box>

                  <Box sx={{ minWidth: "10%" }}>
                    <Button
                      sx={{
                        minWidth: "0px",
                        px: "0px",
                        pl: 1,
                        py: "0px",
                        position: "relative",
                        top: "-9px",
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
                columns={subColumns}
                isPagination={false}
                isSuccess
                showSerialNo={false}
              />
            </Accordion>
          );
        })}
      </CustomModal>
    </>
  );
}
export default AppReviewModal;
