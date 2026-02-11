"use client";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useGetAllCustomReportQuery } from "@services/candidate/custom-report/custom-report-api";
import { CustomTable, TableHeader } from "common";
import dayjs from "dayjs";
import { useState } from "react";
import { tableDataSelectField } from "./generate-report-main.data";
import { ShareEmailModal } from "./share-email-modal";
// import { BASE_URL } from "@root/config";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { DownloadCsv } from "@root/utils";
import { useLazyGenerateReportQuery } from "@services/candidate/candidate-main/candidate-main-api";

export function GenerateReportMain(): JSX.Element {
  const [search, setSearch] = useState<any>({
    offset: 0,
  });
  const [candidate, setCandidate] = useState<boolean>(false);

  const GenerateTableColumns = [
    {
      accessorFn: (row: any) => row.firstName ?? "-",
      id: "firstName",
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
      header: () => <span>First Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.lastName ?? "-",
      id: "lastName",
      cell: (info: any) => info.getValue(),
      header: () => <span>Last Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.title ?? "-",
      id: "title",
      cell: (info: any) => (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          gap={2}
          sx={{ minWidth: "160px" }}
        >
          {info.getValue()}
        </Box>
      ),
      header: () => <span>Title</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.company ?? "-",
      id: "company",
      cell: (info: any) => (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          gap={2}
          sx={{ minWidth: "160px" }}
        >
          {info.getValue()}
        </Box>
      ),
      header: () => <span>Company</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row.phone ?? "-",
      id: "phone",
      cell: (info: any) => {
        return (
          <>{info.row.original.phoneType === "Home" ? info.getValue() : "-"}</>
        );
      },
      header: () => <span>Phone (home)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.phone ?? "-",
      id: "phone",
      cell: (info: any) => {
        return (
          <>{info.row.original.phoneType === "work" ? info.getValue() : "-"}</>
        );
      },
      header: () => <span>Phone (work)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.phone ?? "-",
      id: "phone",
      cell: (info: any) => {
        return (
          <>
            {info.row.original.phoneType === "mobile" ? info.getValue() : "-"}
          </>
        );
      },
      header: () => <span>Phone (mobile)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.phone ?? "-",
      id: "phone",
      cell: (info: any) => {
        return (
          <>{info.row.original.phoneType === "other" ? info.getValue() : "-"}</>
        );
      },
      header: () => <span>Phone (other)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.email ?? "-",
      id: "email",
      cell: (info: any) => {
        return (
          <>
            {info.row.original.emailType === "Personal" ? info.getValue() : "-"}
          </>
        );
      },
      header: () => <span>Email (Personal)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.email ?? "-",
      id: "email",
      cell: (info: any) => {
        return (
          <>{info.row.original.emailType === "work" ? info.getValue() : "-"}</>
        );
      },
      header: () => <span>Email (work)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.email ?? "-",
      id: "email",
      cell: (info: any) => {
        return (
          <>{info.row.original.emailType === "other" ? info.getValue() : "-"}</>
        );
      },
      header: () => <span>Email (Other)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.socialMedia ?? "-",
      id: "socialMedia",
      cell: (info: any) => (
        <Box
          display="block"
          maxWidth="80%"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          width={200}
        >
          {info.getValue()}
        </Box>
      ),
      header: () => <span>Social Media</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.website ?? "-",
      id: "website",
      cell: (info: any) => {
        return (
          <>
            {info.row.original.websiteType === "Personal Website"
              ? info.getValue()
              : "-"}
          </>
        );
      },
      header: () => <span>Website (personal)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.website ?? "-",
      id: "website",
      cell: (info: any) => {
        return (
          <>
            {info.row.original.websiteType === "Company Website"
              ? info.getValue()
              : "-"}
          </>
        );
      },
      header: () => <span>Website (Company)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.website ?? "-",
      id: "website",
      cell: (info: any) => {
        return (
          <>
            {info.row.original.websiteType === "Portfolio Website"
              ? info.getValue()
              : "-"}
          </>
        );
      },
      header: () => <span>Website (Portfolio)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.website ?? "-",
      id: "website",
      cell: (info: any) => {
        return (
          <>
            {info.row.original.websiteType === "Blog Website"
              ? info.getValue()
              : "-"}
          </>
        );
      },
      header: () => <span>Website (Blog)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.website ?? "-",
      id: "website",
      cell: (info: any) => {
        return (
          <>
            {info.row.original.websiteType === "Other Website"
              ? info.getValue()
              : "-"}
          </>
        );
      },
      header: () => <span>Website (other)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.offices ?? "-",
      id: "offices",
      cell: (info: any) => (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          gap={2}
          sx={{ minWidth: "160px" }}
        >
          {info.getValue()}
        </Box>
      ),
      header: () => <span>Location</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.address?.address ?? "-",
      id: "address",

      cell: (info: any) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignContent="center"
            flexDirection="column"
            gap={2}
            sx={{ minWidth: "160px" }}
          >
            {info.row.original.address?.addressType === "Home"
              ? info.getValue()
              : "-"}
          </Box>
        );
      },
      header: () => <span>Address (Home)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.address?.address ?? "-",
      id: "address",
      cell: (info: any) => {
        return (
          <>
            {info.row.original.address?.addressType === "Work"
              ? info.getValue()
              : "-"}
          </>
        );
      },
      header: () => <span>Address (work)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.address?.address ?? "-",
      id: "address",
      cell: (info: any) => {
        return (
          <>
            {info.row.original.address?.addressType === "Other"
              ? info.getValue()
              : "-"}
          </>
        );
      },
      header: () => <span>Address (other)</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.type ?? "-",
      id: "type",
      cell: (info: any) => info.getValue(),
      header: () => <span>Type</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.appliedFor ?? "-",
      id: "appliedFor",
      cell: (info: any) => (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          gap={2}
          sx={{ minWidth: "160px" }}
        >
          {info.getValue()}
        </Box>
      ),
      // cell: (info: any) => info.getValue(),
      header: () => <span>Applied For</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.offices ?? "-",
      id: "offices",
      cell: (info: any) => (
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          flexDirection="column"
          gap={2}
          sx={{ minWidth: "160px" }}
        >
          {info.getValue()}
        </Box>
      ),
      header: () => <span>Offices</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.department ?? "-",
      id: "department",
      cell: (info: any) => info.getValue(),
      header: () => <span>Department</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.source ?? "-",
      id: "source",
      cell: (info: any) => info.getValue(),
      header: () => <span>Source</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.creditedTo ?? "-",
      id: "creditedTo",
      cell: (info: any) => info.getValue(),
      header: () => <span>Credited To</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.requisitionId ?? "-",
      id: "requisitionId",
      cell: (info: any) => info.getValue(),
      header: () => <span>Requisition ID</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.openingIds ?? "-",
      id: "openingIds",
      cell: (info: any) => (
        <Box>
          {Array.isArray(info.getValue()) ? (
            info.getValue().map((product: any, index: number) => (
              <Box key={index}>
                {product}
                {index !== 0 && ","}
              </Box>
            ))
          ) : (
            <Box>{info.getValue()}</Box>
          )}
        </Box>
      ),
      header: () => <span>Opening ID</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.stage ?? "-",
      id: "stage",
      cell: (info: any) => info.getValue(),
      header: () => <span>Stage</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.status ?? "-",
      id: "status",
      cell: (info: any) => info.getValue(),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ rejectionDate }) =>
        dayjs(rejectionDate).format("DD MMM YYYY"),
      id: "rejectionDate",
      cell: (info: any) => info.getValue(),
      header: () => <span>Rejection Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.rejectionReason ?? "-",
      id: "rejectionReason",
      cell: (info: any) => info.getValue(),
      header: () => <span>Rejection Reason</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.rejectionNote ?? "-",
      id: "rejectionNote",
      cell: (info: any) => info.getValue(),
      header: () => <span>Rejection Note</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ applicationDate }) =>
        dayjs(applicationDate).format("DD MMM YYYY"),
      id: "lastActivity",
      cell: (info: any) => info.getValue(),
      header: () => <span>Application Date</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ lastActivity }) =>
        dayjs(lastActivity).format("DD MMM YYYY"),
      id: "lastActivity",
      cell: (info: any) => info.getValue(),
      header: () => <span>Last Activity</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ lastStageChange }) =>
        dayjs(lastStageChange).format("DD MMM YYYY"),
      id: "lastStageChange",
      cell: (info: any) => info.getValue(),
      header: () => <span>Last Stage Change</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ nextScheduledInterview }) =>
        dayjs(nextScheduledInterview).format("DD MMM YYYY"),
      id: "nextScheduledInterview",
      cell: (info: any) => info.getValue(),
      header: () => <span>Next Scheduled interview</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ lastScheduledInterview }) =>
        dayjs(lastScheduledInterview).format("DD/MM/YYYY"),
      id: "lastScheduledInterview",
      cell: (info: any) => info.getValue(),
      header: () => <span>last Scheduled interview</span>,
      isSortable: false,
    },
    {
      accessorFn: ({ offerDate }) => dayjs(offerDate).format("DD/MM/YYYY"),
      id: "OfferDate",
      cell: (info: any) => info.getValue(),
      header: () => <span>Offer Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.recruiter ?? "-",
      id: "recruiter",
      cell: (info: any) => info.getValue(),
      header: () => <span>Recruiter</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.coordinator ?? "-",
      id: "coordinator",
      cell: (info: any) => info.getValue(),
      header: () => <span>Coordinator</span>,
      isSortable: false,
    },
    // {
    //   accessorFn: (row: any) => row.tags ?? "-",
    //   id: "tags",
    //   cell: (info: any) => (
    //     <Box>
    //       {info.getValue().map((product: any, index: number) => (
    //         <Box key={index}>
    //           {product}
    //           {index !== 0 && ","}
    //         </Box>
    //       ))}
    //     </Box>
    //   ),
    //   header: () => <span>Tags</span>,
    //   isSortable: false,
    // },
    {
      accessorFn: (row: any) => row.tags ?? "-",
      id: "tags",
      cell: (info: any) => (
        <Box>
          {Array.isArray(info.getValue()) ? (
            info.getValue().map((product: any, index: number) => (
              <Box key={index}>
                {product}
                {index !== 0 && ","}
              </Box>
            ))
          ) : (
            <Box>{info.getValue()}</Box>
          )}
        </Box>
      ),
      header: () => <span>Tags</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.prospectPool ?? "-",
      id: "prospectPool",
      cell: (info: any) => info.getValue(),
      header: () => <span>Prospect Pool</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.prospectStage ?? "-",
      id: "prospectStage",
      cell: (info: any) => info.getValue(),
      header: () => <span>Prospect Stage</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.prospectOwner ?? "-",
      id: "prospectOwner",
      cell: (info: any) => info.getValue(),
      header: () => <span>Prospect Owner</span>,
      isSortable: false,
    },
  ];

  const {
    data,
    isError,
    isFetching,
    isLoading: loading,
    isSuccess,
  } = useGetAllCustomReportQuery({
    params: {
      limit: 10,
      ...search,
      offset: search.offset,
    },
  });
  const [generateReport, { isLoading }] = useLazyGenerateReportQuery();
  return (
    <Paper variant="elevation" elevation={1}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" mx={4} pt={2}>
          Custom Report
        </Typography>
        <Box mx={4} pt={2}>
          <Box display="flex">
            <Button
              variant="outlined"
              color="primary"
              sx={{ whiteSpace: "nowrap", marginRight: "10px", height: "37px" }}
              onClick={() => {
                setCandidate(true);
              }}
            >
              Share
            </Button>
            {isLoading ? (
              <CircularProgress color="primary" size={30} />
            ) : (
              <IconButton
                onClick={() => {
                  return DownloadCsv(generateReport, "candidates_report");
                }}
                color="primary"
                sx={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                }}
              >
                <ArrowDownwardIcon sx={{ color: "white" }} />
              </IconButton>
            )}
          </Box>
          <ShareEmailModal setCandidate={setCandidate} candidate={candidate} />
        </Box>
      </Box>
      <Box mx={4} mb={3} sx={{ display: "flex" }}>
        <TableHeader
          showClearFilterButton
          onChanged={(e: any) => {
            setSearch((prv) => {
              return {
                ...prv,
                ...e,
                offset: 0,
              };
            });
          }}
          tableHeaderData={tableDataSelectField}
        />
      </Box>
      <Box px={2}>
        <CustomTable
          data={data?.data?.candidates}
          columns={GenerateTableColumns}
          isLoading={loading}
          isFetching={isFetching}
          isError={isError}
          isSuccess={isSuccess}
          isPagination
          currentPage={data?.data?.meta.page}
          totalPages={data?.data?.meta.pages}
          showSerialNo
          onPageChange={(onPageData: any) => {
            setSearch((prev) => {
              return {
                ...prev,
                offset: (onPageData - 1) * 10,
              };
            });
          }}
        />
      </Box>
    </Paper>
  );
}
