import { Box, Typography } from "@mui/material";
import { CustomTable } from "common";
import React, { useState } from "react";

const data = [
  {
    id: 1,
    type: "test 1",
    timeInStage: "Time In Stage",
    description: "How long should a candidate dwell in a stage?",
    target: "Finish setup",
    myAttainment: "Finish setup",
    currentOrgAtt: "89%",
  },
  {
    id: 2,
    type: "test 2",
    timeInStage: "Time In Stage",
    description: "How long should a candidate dwell in a stage?",
    target: "Finish setup",
    myAttainment: "Finish setup",
    currentOrgAtt: "71%",
  },
];

export function CompanyGoals(): React.JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  // const { data, isError, isFetching, isLoading, isSuccess } = useGetUsersQuery({
  //   params: {
  //     limit: 10,
  //     companyUser: true,
  //     offset: params.offset,
  //   },
  // });

  const columns = [
    {
      accessorFn: (row: any) => `${row.timeInStage} ${row.description}`,
      id: "timeInStage",
      cell: (info: any) => (
        <Box sx={{ textAlign: "left" }}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {info.row.original.timeInStage ?? "-"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">
              {info.row.original.description ?? "-"}
            </Typography>
          </Box>
        </Box>
      ),
      header: () => <span>Type</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.target,
      id: "target",
      cell: (info: any) => (
        <Box>
          <Typography variant="subtitle2">{info.getValue() ?? "-"}</Typography>
        </Box>
      ),
      header: () => <span>Target</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.myAttainment,
      id: "myAttainment",
      cell: (info: any) => (
        <Box>
          <Typography variant="subtitle2">{info.getValue() ?? "-"}</Typography>
        </Box>
      ),
      header: () => <span>My Attainment</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.currentOrgAtt,
      id: "currentOrgAtt",
      cell: (info: any) => (
        <Box>
          <Typography variant="subtitle2">{info.getValue() ?? "-"}</Typography>
        </Box>
      ),
      header: () => <span>Current Org Attainment</span>,
      isSortable: false,
    },
  ];

  return (
    <Box
      mb={2}
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        Company Goals
      </Typography>
      <Box sx={{ height: "100%" }}>
        <CustomTable
          data={data}
          // data={data?.data?.dataData}
          columns={columns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination={false}
          isSuccess
          // count={Math.ceil(data?.data?.meta?.total / limit)}
          totalPages={data.length ?? 0}
          currentPage={1}
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
