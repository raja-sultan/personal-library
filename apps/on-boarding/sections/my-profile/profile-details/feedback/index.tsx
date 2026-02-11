import { Box, Card, CardContent } from "@mui/material";
import { CustomTable } from "common";
import { useState } from "react";
import dayjs from "dayjs";
import { tableData } from "./feed-back.data";

export function FeedbackTable(): JSX.Element {
  const [setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const columns = [
    {
      accessorFn: (row: any) => row?.feedbackQuestion ?? "-",
      id: "feedbackQuestion",
      cell: (info: any) => info.getValue(),
      header: () => <span>Feedback Question</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.askDate ?? "-",
      id: "askDate",
      cell: (info: any) => info.getValue(),
      header: () => <span>Ask Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.answerDate ?? "-",
      id: "answerDate",
      cell: (info: any) => {
        return <Box>{dayjs(info.getValue()).format("DD-MM-YYYY") ?? "-"}</Box>;
      },
      header: () => <span>Answer Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.status ?? "-",
      id: "status",
      cell: (info: any) => info.getValue(),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.comments ?? "-",
      id: "comments",
      cell: (info: any) => info.getValue(),
      header: () => <span>Comments</span>,
      isSortable: false,
    },
  ];

  return (
    <Card>
      <CardContent sx={{ pt: 2 }}>
        <CustomTable
          data={tableData}
          columns={columns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination
          isSuccess={true}
          showSerialNo
          //totalPages={data?.data?.meta?.pages ?? 0}
          //currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setParams({
              page: onPageData,
              offset: (onPageData - 1) * 10,
            });
          }}
        />
      </CardContent>
    </Card>
  );
}
