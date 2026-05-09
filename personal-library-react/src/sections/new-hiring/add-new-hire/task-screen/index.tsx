"use client";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { CustomTable } from "common";
import React, { useState } from "react";
import { addNewHireSecondPageData } from "./data";
import NewHireAddNewTask from "./add-new-task";
import { useRouter } from "next/navigation";

export default function TaskScreenSection(props): JSX.Element {
  const { setIsSecondScreenShow } = props;
  const router = useRouter();
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [signatureValue, setSignatureValue] = useState("");
  const handleChange = (event: any) => {
    setSignatureValue(event.target.value as string);
  };
  const theme = useTheme();
  const eSignatureData = [
    { id: 1, name: "Signature 01", value: "sign1" },
    { id: 2, name: "Signature 02", value: "sign2" },
    { id: 3, name: "Signature 03", value: "sign3" },
  ];
  return (
    <Box p={2}>
      {addNewHireSecondPageData?.map((ele) => (
        <Grid
          key={nanoid()}
          container
          direction="column"
          borderRadius={1.5}
          overflow="hidden"
          border={`1px solid ${theme.palette.grey[200]}`}
          mb={3}
        >
          <Grid container justifyContent="space-between" p={2}>
            <Typography variant="h6">{ele?.title}</Typography>
            {ele?.isButton && (
              <Button
                size="medium"
                onClick={() => {
                  setOpenTaskModal(true);
                }}
                variant="contained"
              >
                Add Task
              </Button>
            )}
            {ele?.title === "E-signature Requests" && (
              <Box sx={{ minWidth: 280 }}>
                <FormControl fullWidth>
                  <InputLabel>Select E-Signature Template</InputLabel>
                  <Select
                    sx={{ height: 50 }}
                    value={signatureValue}
                    label="Select E-Signature Template"
                    onChange={handleChange}
                  >
                    {eSignatureData?.map((menuItems) => (
                      <MenuItem
                        sx={{ fontSize: 14 }}
                        key={menuItems?.id}
                        value={menuItems?.value}
                      >
                        {menuItems?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
            {ele?.task && (
              <Typography
                variant="subtitle2"
                color={theme.palette.grey[600]}
                fontWeight={600}
              >
                Tasks: {ele?.task}
              </Typography>
            )}
          </Grid>
          <CustomTable
            columns={ele?.tableColumns}
            data={ele?.tableData}
            isSuccess
            isError={false}
            isLoading={false}
            isFetching={false}
          />
        </Grid>
      ))}
      <Box display="flex" justifyContent="end" gap={2} px={1}>
        <Button
          size="medium"
          variant="outlined"
          onClick={() => setIsSecondScreenShow(false)}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          variant="contained"
          onClick={() => {
            router.push("/new-hiring/new-hire-info");
          }}
        >
          Assign
        </Button>
      </Box>
      {openTaskModal && (
        <NewHireAddNewTask
          openTaskModal={openTaskModal}
          setOpenTaskModal={setOpenTaskModal}
        />
      )}
    </Box>
  );
}
