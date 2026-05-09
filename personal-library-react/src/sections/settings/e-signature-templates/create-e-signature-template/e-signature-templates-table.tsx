import { MenuItem, Box, Typography } from "@mui/material";
import { CustomTable, TableIconActions, WarningPrompt } from "common";
import { TableActionsIcon } from "@assets/icons/table-action-icon";

export function ESignatureTemplatesTable({
  setRulesModal,
  setESignatureModal,
}: any): React.JSX.Element {
  const TableMockData = [
    {
      id: 1,
      title: "Hamza",
      description: "Need to hire new candidate",
      delivery: "Monday,8pm",
    },
    {
      id: 2,
      title: "Sultan",
      description: "Need to hire new candidate",
      delivery: "Monday,8pm",
    },
  ];

  const columns = [
    {
      accessorFn: (row: any) => row?.title ?? "-",
      id: "title",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title ?? "-",
      id: "title",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Public Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.title ?? "-",
      id: "title",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Counter Signer</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.delivery ?? "-",
      id: "delivery",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Assign</span>,
      isSortable: false,
    },
    {
      id: "Actions",
      cell: () => (
        <TableIconActions icon={<TableActionsIcon />}>
          <MenuItem
            onClick={() => {
              setESignatureModal(true);
            }}
          >
            <Typography variant="subtitle2">Edit Template</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setRulesModal(true);
            }}
          >
            <Typography variant="subtitle2">Set Rules</Typography>
          </MenuItem>
          <WarningPrompt
            mainColor="error.main"
            heading="Delete Template"
            subTitle="You are sure you want to delete the template I-9?"
            modelOpenLabel={
              <MenuItem>
                {" "}
                <Typography variant="subtitle2">Delete</Typography>
              </MenuItem>
            }
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {
                // void onProspectPoolDelete(info.row.original._id);
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
      ),
      header: () => <span>Actions</span>,
    },
  ];
  return (
    <CustomTable
      data={TableMockData}
      columns={columns}
      isLoading={false}
      isFetching={false}
      isError={false}
      isPagination={false}
      isSuccess
    />
  );
}
