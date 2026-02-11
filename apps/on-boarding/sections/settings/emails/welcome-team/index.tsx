import React, { useState } from "react";
import { Box, Button, Card, Switch, Typography } from "@mui/material";
import { CustomTable } from "common";
import { EmailTeamTemplate } from "../next-step/email-template";
import EditDelivery from "../next-step/edit-delivery";

const TableMockData = [
  {
    id: 1,
    title: "Default",
    delivery: "Monday, 8pm",
  },
];

const WelcomeTeam = () => {
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const columns = [
    {
      accessorFn: (row: any) => row?.title ?? "-",
      id: "title",
      cell: () => <Switch />,
      header: () => <span>Published</span>,
      isSortable: false,
    },

    {
      accessorFn: (row: any) => row?.candidates ?? "-",
      id: "candidates",
      cell: (info: any) => {
        return (
          <>
            <Typography variant="body2" fontWeight={500}>
              {info.row.original?.title ?? "-"}
            </Typography>
          </>
        );
      },
      header: () => <span>Email Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.delivery ?? "-",
      id: "delivery",
      cell: (info: any) => <Box>{info.getValue()}</Box>,
      header: () => <span>Delivery</span>,
      isSortable: false,
    },
  ];

  return (
    <Card sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">Welcome to the team</Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ marginRight: 3 }}
            onClick={() => {
              setEditModal(true);
            }}
          >
            Edit default delivery
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
          >
            Create Template
          </Button>
        </Box>
      </Box>
      <Typography variant="subtitle2" sx={{ color: "text.secondary", my: 2 }}>
        Send an optional touch point email closer to new hires, start dates,
        with a summary of who their manager is, what tasks they have to
        complete, and any custom text.
      </Typography>
      <CustomTable
        data={TableMockData}
        columns={columns}
        isLoading={false}
        isFetching={false}
        isError={false}
        isPagination={false}
        isSuccess
      />
      {open && <EmailTeamTemplate open={open} setOpen={setOpen} />}
      {editModal && (
        <EditDelivery editModal={editModal} setEditModal={setEditModal} />
      )}
    </Card>
  );
};

export default WelcomeTeam;
