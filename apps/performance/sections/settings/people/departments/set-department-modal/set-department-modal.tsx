import React, { useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FormProvider, RHFAutocompleteSync } from "common";
import { membersModalStyles } from "../edit-departments/modals/add-members-modal/add-members-modal.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { TableDeleteIcon } from "@assets/icons/table-delete-icon";
import { LoadingButton } from "@mui/lab";
import { renderUserImage } from "@root/utils/render-user-image";
import CustomModal from "@components/custom-modal";

export function SetDepartmentModal(props: any): JSX.Element {
  const { isOpen, handleClose, title, onSubmit, headersData, isLoading } = props;
  const [departmentHeads, setDepartmentHeads] = useState([]);

  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        title: Yup.array().min(1, "Select at least one option").required("Field is required"),
      })
    ),
    defaultValues: {
      title: [],
    },
  });

  const { handleSubmit, watch, reset, setValue } = methods;

  const getData = watch("title");

  const styles = membersModalStyles();

  useEffect(() => {
    setDepartmentHeads(getData);
  }, [getData]);

  function deleteSelectedTextHandler(userId: string): void {
    if (userId) {
      const updatedHeads = departmentHeads.filter((item: any) => item.id !== userId);
      setDepartmentHeads(updatedHeads);
      setValue("title", updatedHeads);
    }
  }

  function handleFormSubmit(data: any): void {
    onSubmit(data);
    setTimeout(() => {
      reset();
    }, 3000);
  }

  return (
    <Box sx={styles.modalStyleWrap}>
      <CustomModal open={isOpen} onClose={handleClose} title={title} hideFooter headerIcon message>
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
            <RHFAutocompleteSync
              multiple
              size="medium"
              name="title"
              outerLabel="Select User"
              placeholder="Search by name"
              options={headersData}
            />
            <Box sx={{ height: departmentHeads?.length > 0 ? "200px" : "0px", overflowY: "auto" }}>
              {departmentHeads?.length > 0 &&
                departmentHeads?.map((item: any) => (
                  <Box sx={styles.userData} key={item.id}>
                    <Box sx={styles.userContent}>
                      <Stack direction="row" gap={2}>
                        {renderUserImage({ ...item, height: 35, width: 35 })}
                        <Box>
                          <Typography variant="body2" color="neutral.900">
                            {item?.name ?? "--"}
                          </Typography>
                          <Typography variant="subtitle2" color="neutral.500">
                            {item?.fields?.employeeTitle ?? "--"}
                          </Typography>
                        </Box>
                      </Stack>
                      <TableDeleteIcon
                        sx={{ cursor: "pointer", textAlign: "end" }}
                        onClick={() => {
                          deleteSelectedTextHandler(item.id);
                        }}
                      />
                    </Box>
                  </Box>
                ))}
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="color.secondary"
              sx={{ pt: "15px", mb: 3 }}
            >
              These users will be able to create department goals
            </Typography>

            <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
              <Button
                sx={{
                  color: "neutral.700",
                  borderColor: "neutral.300",
                  mt: "10px",
                }}
                variant="outlined"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
                sx={{
                  mt: "10px",
                }}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </CustomModal>
    </Box>
  );
}

export default SetDepartmentModal;
