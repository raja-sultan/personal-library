import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { DepartmentModal } from "./department-modal";
import { WarningPrompt } from "common";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentsListQuery,
} from "@services/settings/department/department-api";
import toast from "react-hot-toast";

export function DepartmentSection(): JSX.Element {
  const [addField, setAddField] = useState<any>({ open: false, id: null });

  const [deleteDepartment]: any = useDeleteDepartmentMutation({});

  const { data: getDepartmentList } = useGetDepartmentsListQuery({
    limit: 10,
    offset: 0,
  });
  const departmentData = getDepartmentList?.data?.departments;

  return (
    <Box>
      <Stack
        direction={{ sm: "row", xs: "column" }}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography gutterBottom variant="h5" component="h5">
          Department
        </Typography>
        <Button
          onClick={() => {
            setAddField({ open: true, id: null });
          }}
          variant="contained"
          sx={{ color: "neutral.200", borderColor: "neutral.300" }}
        >
          Add a Department
        </Button>
      </Stack>
      {departmentData?.map((cardItems) => (
        <Box
          key={cardItems?._id}
          sx={{
            mb: "20px",
            py: 1,
            px: 2,
            backgroundColor: "background.default",
            borderRadius: "8px",
          }}
        >
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "text.primary", fontWeight: 600 }}
                m={0}
              >
                {cardItems?.departmentName}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {cardItems?.membersCount} Member
              </Typography>
            </Box>
            <Stack
              sx={{
                flexDirection: "row",
              }}
            >
              <ModeEditIcon
                sx={{ cursor: "pointer", mb: 0.4, mr: 0.5 }}
                onClick={() => {
                  setAddField({ open: true, id: cardItems?._id });
                }}
              />
              <WarningPrompt
                mainColor="error.main"
                heading="Alert"
                subTitle="Are you sure you want to delete this Department?"
                modelOpenLabel={
                  <DeleteIcon sx={{ cursor: "pointer", color: "error.main" }} />
                }
                acceptButtonLabel="Delete"
                acceptButtonProps={{
                  onClick: () => {
                    // void onProspectPoolDelete(info.row.original._id);
                    setAddField({ id: cardItems?._id });
                    deleteDepartment({ id: cardItems?._id })
                      .unwrap()
                      .then((res) => {
                        toast.success(res?.message);
                      })
                      .catch((error) => {
                        toast.error(error?.data?.message);
                      });
                  },
                  variant: "contained",
                  color: "error",
                  sx: {
                    bgcolor: "error.main",
                    color: "primary.contrastText",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>
      ))}
      <DepartmentModal addField={addField} setAddField={setAddField} />
    </Box>
  );
}
