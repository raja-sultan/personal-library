import { Box, Stack } from "@mui/system";
import { useRouter } from "next/navigation";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { Typography, Button, MenuItem, Paper } from "@mui/material";
import { SaveReportModal } from "./create-reports/save-report-modal";
import { CustomTable, TableIconActions, WarningPrompt } from "common";
import {
  useDeleteReportListMutation,
  useEmailCsvReportsMutation,
  useGetReportListQuery,
} from "@services/reports/field-reports-api";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export function FieldReports(): JSX.Element {
  const [deleteReportList] = useDeleteReportListMutation();

  const [addEmailCSV] = useEmailCsvReportsMutation();

  async function deleteFieldReportKist(id): Promise<void> {
    try {
      await deleteReportList(id).unwrap();
      toast.success(`Deleted Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  }

  const getCompanyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const userId = useSelector((state: any) => state?.auth?.user?.email);

  const handleEmailCSV = async (emailCsv): Promise<void> => {
    const body = {
      reportId: emailCsv,
      companyId: getCompanyId,
    };
    await addEmailCSV({ body })
      .unwrap()
      .then(() => {
        toast.success(
          `Your report is being generated and emailed to: ${userId}`
        );
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const columns = [
    {
      accessorFn: (row) => row.name,
      id: "name",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="flex-start">
          {info.getValue()}
        </Typography>
      ),
      header: () => false,
    },
    {
      accessorFn: (row) => row.createdAt,
      id: "createdAt",
      cell: (info) => (
        <Typography variant="body1" display="flex" justifyContent="center">
          Last saved by {info.row.original?.updatedBy} on{" "}
          {dayjs(info.getValue()).format("MM/DD/YYYY")}
        </Typography>
      ),
      header: () => false,
    },
    {
      accessorFn: (row) => row._id,
      header: () => false,
      id: "actions",
      cell: (info) => {
        return (
          <Box display="flex">
            <TableIconActions icon={<TableActionsIcon />}>
              <SaveReportModal isSaveModal={false} data={info?.row?.original} />
              <MenuItem
                onClick={() => handleEmailCSV(info?.row?.original?._id)}
              >
                Email CSV
              </MenuItem>
              <WarningPrompt
                mainColor="error.main"
                heading="Alert"
                subTitle="You are sure you want to delete this report? This cannot be undone."
                modelOpenLabel={
                  <MenuItem>
                    <Typography variant="subtitle2">Delete</Typography>
                  </MenuItem>
                }
                acceptButtonLabel="Delete"
                acceptButtonProps={{
                  onClick: () => {
                    void deleteFieldReportKist(info.row.original._id);
                  },
                  variant: "contained",
                  color: "error",
                  sx: {
                    bgcolor: "error.main",
                    color: "primary.contrastText",
                  },
                }}
              />
            </TableIconActions>
          </Box>
        );
      },
    },
  ];

  const router = useRouter();

  const { data: getReportList } = useGetReportListQuery({
    limit: 10,
    offset: 0,
    search: "",
  });
  const reportListData = getReportList?.data?.fieldReport;
  return (
    <Paper
      sx={{
        a: {
          textDecoration: "none !important",
          color: "unset",
        },
      }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={3}
      >
        <Typography variant="h5">Field Reports</Typography>
        <Button
          variant="contained"
          onClick={() => {
            router.push("/reports/create-new-page");
          }}
        >
          Create New Page
        </Button>
      </Stack>
      <CustomTable
        columns={columns}
        data={reportListData}
        isSuccess
        isError={false}
        isLoading={false}
        isFetching={false}
        isPagination={false}
      />
    </Paper>
  );
}
