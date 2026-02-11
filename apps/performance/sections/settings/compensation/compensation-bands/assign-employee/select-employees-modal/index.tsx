"use client";
import React from "react";
import { CustomModal, FormProvider } from "common";
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Checkbox,
} from "@mui/material";
import { EmployeeSearchIcon } from "@assets/icons/employee-search-icon";
import { ThemeModeColor } from "@root/utils";
import { GroupFilterIcon } from "@assets/icons/group-filter-icon";
import { styles } from "./select-employees-modal.styles";
import { GroupDeleteIcon } from "@assets/icons/group-delete-icon";
import type { SelectEmployeesModal } from "./select-employees-modal.types";
import { useSelectEmployeesModal } from "./use-select-employees-modal";
import { EmployeeFilter } from "../employee-filter";
import { GlobalAvatar } from "@components/global-avatar";

function SelectEmployeesModal(props: SelectEmployeesModal): JSX.Element {
  const {
    toggleDrawer,
    handleSelectAllEmployees,
    handleSelectEmployeesById,
    handleEmployeeSearch,
    selectedIds,
    deSelectHandler,
    handleClose,
    onSubmit,
    selectedEmployees,
    ApiData,
    employeesList,
    setIsOpen,
    isOpen,
    open,
    methods,
    handleSubmit,
    setSelectedFilter,
    filterList,
    buttonTitle = "Add",
    changeFilterHandler,
    searchValues,
  } = useSelectEmployeesModal(props);

  return (
    <CustomModal
      onClose={setIsOpen}
      rootSx={{
        maxWidth: 850,
      }}
      cancelButtonsProps={{
        variant: "outlined",
        onClick: () => {
          handleClose();
        },
      }}
      footer
      headerLabel="Select Specific employees"
      acceptButtonLabel={buttonTitle}
      acceptButtonProps={{
        onClick: onSubmit,
        variant: "contained",
        disabled: !selectedIds?.length,
      }}
      closeButtonProps={{
        onClick: () => {
          handleClose();
        },
      }}
      isOpen={isOpen}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ my: 2.5, width: "100%" }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", mb: 2 }}>
              <TextField
                variant="outlined"
                fullWidth
                size="medium"
                sx={{
                  background: ThemeModeColor("#fff", "color2"),
                }}
                inputProps={{
                  style: {
                    height: "10px",
                  },
                }}
                InputProps={{
                  placeholder: "Search",
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmployeeSearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleEmployeeSearch}
              />
              <GroupFilterIcon sx={{ mx: 2, cursor: "pointer" }} onClick={toggleDrawer} />
            </Box>

            <Box sx={styles.employee}>
              <Checkbox
                checked={ApiData?.length && selectedIds?.length === ApiData?.length}
                onChange={({ target }) => {
                  handleSelectAllEmployees(target.checked);
                }}
              />
              <Typography variant="body2" sx={{ pl: 1 }}>
                Employees
              </Typography>
            </Box>
            <Box sx={styles.employeeScroll}>
              {employeesList?.length ? (
                employeesList?.map((item) => {
                  return (
                    <Box key={item?.value}>
                      <Box
                        sx={{
                          pl: { xs: 1, sm: 4.2 },
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          checked={false}
                          onChange={({ target }) => {
                            handleSelectEmployeesById(target.checked, item?._id);
                          }}
                        />
                        <Box sx={styles.employeeProfile}>
                          <GlobalAvatar imgUrl={item?.profileImage} firstName={item?.firstName} lastName={item?.lastName} width={40} height={40} />
                          <Box sx={{ pl: 1.5 }}>
                            <Typography color="text.primary" variant="body1">
                              {`${item?.firstName} ${item?.lastName}`}
                            </Typography>
                            <Typography color="text.secondary" variant="body2">
                              {item?.employeeTitle}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 0.5 }} />
                    </Box>
                  );
                })
              ) : (
                <Box textAlign="center" mt={2}>
                  <Typography>
                    {selectedIds?.length ? "All Employees Added" : "No Data Found!"}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: "-webkit-fill-available" }}>
            <Box sx={styles.selectedMember}>
              <Typography color="text.primary" variant="body1">
                Selected members
              </Typography>
              <Box sx={styles.selectEmployeeScroll}>
                {selectedEmployees?.map((item) => {
                  return (
                    <Box
                      key={item?._id}
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={styles.employeeProfile}>
                        <GlobalAvatar imgUrl={item?.profileImage} firstName={item?.firstName} lastName={item?.lastName} width={40} height={40} />

                        <Box sx={{ pl: 1.5 }}>
                          <Typography color="text.primary" variant="body1">
                            {`${item?.firstName} ${item?.lastName}`}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            {item?.employeeTitle}
                          </Typography>
                        </Box>
                      </Box>
                      <GroupDeleteIcon
                        sx={{ cursor: "pointer", color: "#706981" }}
                        onClick={() => {
                          deSelectHandler(item);
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
        {open && (
          <EmployeeFilter
            open={open}
            toggleDrawer={toggleDrawer}
            searchValue={searchValues}
            changeHandler={changeFilterHandler}
            setSelectedFilter={setSelectedFilter}
            filterList={filterList}
          />
        )}
      </FormProvider>
    </CustomModal>
  );
}

export default SelectEmployeesModal;
