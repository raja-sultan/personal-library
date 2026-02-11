import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { CustomChip, CustomTable } from "common";
import { styles } from "./back-up.styles";
import {
  useGetBackUpDetailsQuery,
  useLazyGetDownloadAbleFileQuery,
} from "@services/sso-admin/back-up/back-up-api";
import { useState } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";

export function BackUpSection(): JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const [getFileDetails] = useLazyGetDownloadAbleFileQuery();

  //Status Function
  function getColorBasedOnStatus(
    info: any
  ): "success" | "warning" | "danger" | "started" {
    if (info.row.original.status === "Complete") {
      return "success";
    } else if (info.row.original.status === "Inprogress") {
      return "warning";
    } else if (info.row.original.status === "Interrupted") {
      return "danger";
    }
    return "started";
  }

  //Function To Handle the Downloadable File
  function downloadFile(url: any, name: any): void {
    const link = document?.createElement("a");
    link?.setAttribute("href", url);
    link?.setAttribute("download", name);
    document?.body?.appendChild(link);
    link?.click();
    document?.body?.removeChild(link); // Remove the link after the download
  }

  const columns = [
    {
      accessorFn: (row: any) => row?.file ?? "-",
      id: "backUpFile",
      cell: (info: any) => info.getValue(),
      header: () => <span>Backup File</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.type ?? "-",
      id: "backupType",
      cell: (info: any) => info.getValue(),
      header: () => <span>Backup Type</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.createdAt ?? "-",
      id: "createdDate",
      cell: (info: any) => {
        return (
          <Box>
            {dayjs(info.getValue()).format("DD-MM-YYYY ; HH:mm") ?? "-"}
          </Box>
        );
      },
      header: () => <span>Created Date & Time</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.status ?? "-",
      id: "status",
      cell: (info: any) => {
        return (
          <CustomChip
            ChipProps={{ label: info.getValue() }}
            variant={getColorBasedOnStatus(info)}
          />
        );
      },
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.file ?? "-",
      id: "Actions",
      cell: (info: any) => (
        <Button
          onClick={async () => {
            try {
              const { data }: any = await getFileDetails({
                params: {
                  backupId: info?.row?.original?._id,
                },
              });
              // Assuming the data returned is a Blob
              const blobData = new Blob([data], {
                type: "application/octet-stream",
              });
              const url = window.URL.createObjectURL(blobData);
              const name = info?.row?.original?.file;
              downloadFile(url, name);
            } catch (error) {
              toast.error(error || "Error Occurred");
            }
          }}
        >
          Download
        </Button>
      ),
      header: () => <span>Actions</span>,
    },
  ];

  // API HANDLER For BackUp API
  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetBackUpDetailsQuery({
      params: {
        limit: 10,
        offset: params.offset,
      },
    });

  return (
    <Card sx={styles.mainCard}>
      <CardContent sx={{ pt: 2 }}>
        <Typography variant="h5" sx={{ color: "text.primary", mb: 3 }}>
          Backup
        </Typography>
        <CustomTable
          data={data?.data?.backups}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination
          isSuccess={isSuccess}
          showSerialNo
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
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
