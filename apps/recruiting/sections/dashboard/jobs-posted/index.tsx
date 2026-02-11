import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetDashboardJobsPostedQuery } from "@services/dashboard/company-goals-api";
import { CustomTable } from "common";

export function JobsPosted(): React.JSX.Element {
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetDashboardJobsPostedQuery({});

  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const columns = [
    // {
    //   accessorFn: (row: any) => row.jobInfo.jobName,
    //   id: "job",
    //   cell: (info: any) => {
    //     const variants: any = ["success", "warning", "danger", "started"];
    //     return (
    //       <Box
    //         display="flex"
    //         justifyContent="flex-start"
    //         alignItems="flex-start"
    //         flexDirection="column"
    //         // gap={2}
    //       >
    //         {info.getValue()}
    //         <Box maxWidth={400}>
    //           {info.row?.original?.candidateTags?.length > 0 && (
    //             <Box
    //               display="flex"
    //               justifyContent="flex-start"
    //               flexWrap="wrap"
    //               gap={1}
    //               mt={1}
    //             >
    //               {info.row.original.candidateTags
    //                 .slice(0, 3)
    //                 .map((label: any, index: any) => (
    //                   <CustomChip
    //                     key={index}
    //                     variant={variants[index % variants.length]}
    //                     rootSx={{
    //                       fontSize: 11,
    //                     }}
    //                     ChipProps={{ label: `${label}` }}
    //                   />
    //                 ))}
    //             </Box>
    //           )}
    //         </Box>
    //       </Box>
    //     );
    //   },
    //   header: () => <span>Job</span>,
    //   isSortable: false,
    // },
    {
      accessorFn: (row: any) => row?.name ?? "---",
      id: "name",
      cell: (info: any) => {
        return <Typography>{info.getValue() ?? "---"}</Typography>;
      },
      header: () => <span>Job</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.requisitionId ?? "---",
      id: "requisitionId",
      cell: (info: any) => {
        return <Typography>{info.getValue() ?? "---"}</Typography>;
      },
      header: () => <span>Req ID</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.department,
      id: "department",
      cell: (info: any) => {
        return <Typography>{info.getValue() ?? "---"}</Typography>;
      },
      header: () => <span>Department</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.office,
      id: "office",
      cell: (info: any) => {
        return <Typography>{info.getValue() ?? "---"}</Typography>;
      },
      header: () => <span>office</span>,
      isSortable: false,
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        pb: 2,
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ py: 2 }}>
          Jobs Posted
        </Typography>

        <CustomTable
          data={data?.data}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination={false}
          isSuccess={isSuccess}
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setParams({
              page: onPageData,
              offset: (onPageData - 1) * 10,
            });
          }}
        />
      </Box>
    </Box>
  );
}
