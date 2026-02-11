"use client";
import React, { useState } from "react";
import { CustomModal, FormProvider } from "common";
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  schema,
  defaultValues,
  systemAdminData,
} from "./role-and-right.schema";
import { LoadingButton } from "@mui/lab";

export function RoleAndRightForm({ rowId }: any): JSX.Element {
  console.log("rowId", rowId);

  const [openModal, setOpenModal] = useState(false);
  const methods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data, "data");
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Role & Rights
      </MenuItem>
      <CustomModal
        onClose={setOpenModal}
        rootSx={{
          maxWidth: { xs: 350, sm: 600 },
        }}
        headerLabel="Role & Rights"
        headerTypographyProps={{
          color: "primary.main",
        }}
        closeButtonProps={{
          onClick: () => {
            setOpenModal(false);
          },
        }}
        isOpen={openModal}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, mt: 1, color: "text.secondary" }}
          >
            Menu
          </Typography>
          <Divider sx={{ mb: 2, mt: 1.5 }} />
          {/* Mapping the components */}
          {systemAdminData?.map((item: any) => (
            <Box key={item?.id} sx={{ mb: 2, pl: 1 }}>
              <item.component
                {...item.componentProps}
                label={
                  <Typography sx={{ pl: 1 }}>
                    {item.componentProps.label}
                  </Typography>
                }
              />
            </Box>
          ))}
          <Box sx={{ textAlign: "end" }}>
            <LoadingButton variant="outlined" type="submit">
              Submit
            </LoadingButton>
          </Box>
        </FormProvider>
      </CustomModal>
    </>
  );
}
