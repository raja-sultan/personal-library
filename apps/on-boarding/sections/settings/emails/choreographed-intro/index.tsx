import {
  Box,
  Button,
  Card,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { EmailTeamModal } from "./email-modal";
import { CustomTable, WarningPrompt } from "common";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { tableData } from "./choreographed-intro.data";

export function CreateEmailTemplate(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState("");
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const columns = [
    {
      accessorFn: (row: any) => row?.id ?? "-",
      id: "id",
      cell: (info: any) => {
        return (
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      },
      header: () => <span>Published</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.emailName ?? "-",
      id: "emailName",
      cell: (info: any) => info.getValue(),
      header: () => <span>Email name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.delivery ?? "-",
      id: "delivery",
      cell: (info: any) => info.getValue(),
      header: () => <span>Delivery</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.action ?? "-",
      id: "Actions",
      cell: (info: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              setOpen(true);
              setEdit("edit");
            }}
          >
            <ModeEditOutlinedIcon />
          </IconButton>
          <WarningPrompt
            mainColor="error.main"
            heading="Delete Template"
            subTitle="Are you sure you want to delete the Choreographed introductions?"
            //  modelOpenLabel={<Delete />}
            acceptButtonLabel="Delete"
            acceptButtonProps={{
              onClick: () => {},
              variant: "contained",
              color: "error",
              sx: {
                bgcolor: "error.main",
                color: "primary.contrastText",
              },
            }}
            modelOpenLabel={
              <IconButton>
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            }
          />
        </Box>
      ),
      header: () => <span>Actions</span>,
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
        <Typography variant="subtitle1">Choreographed Introductions</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
            setEdit("");
          }}
        >
          Create Template
        </Button>
      </Box>
      <Typography variant="subtitle2" sx={{ color: "text.secondary", my: 2 }}>
        Create a regular cadence for introducing groups of new hires and choose
        what details about a new hire are shared.
      </Typography>
      <CustomTable
        data={tableData}
        columns={columns}
        isLoading={false}
        isFetching={false}
        //isError={isError}
        isPagination
        isSuccess={true}
        showSerialNo
        // totalPages={data?.data?.meta?.pages ?? 0}
        // currentPage={data?.data?.meta?.page ?? 1}
        // onPageChange={(onPageData: any) => {
        //   setParams({
        //     page: onPageData,
        //     offset: (onPageData - 1) * 10,
        //   });
        // }}
      />
      {open && <EmailTeamModal open={open} setOpen={setOpen} edit={edit} />}
    </Card>
  );
}
