"use client";
import React from "react";
import { CustomModal, FormProvider, RHFCheckbox } from "common";
import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { EmployeeSearchIcon } from "@assets/icons/employee-search-icon";
import { ThemeModeColor } from "@root/utils";
import { GroupFilterIcon } from "@assets/icons/group-filter-icon";
import { styles } from "./select-employees-modal.styles";
import { Person } from "@assets/common";
import { GroupDeleteIcon } from "@assets/icons/group-delete-icon";
import { EmployeeFilter } from "@components/employee-filter";
import type { SelectEmployeesModal } from "./select-employees-modal.types";
import { useSelectEmployeesModal } from "./use-select-employees-modal";

function SelectEmployeesModal(props: SelectEmployeesModal): JSX.Element {
  const {
    handlerSearch,
    toggleDrawer,
    selectAllHandler,
    selectHandler,
    deSelectHandler,
    handleClose,
    onSubmit,
    deSelectData,
    filteredData,
    setIsOpen,
    isOpen,
    open,
    methods,
    handleSubmit,
    setSelectedFilter,
    filterList,
    buttonTitle,
    changeFilterHandler,
    searchValues,
    isLoading,
    headerLabel = "Select Specific employees",
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
      headerLabel={headerLabel}
      acceptButtonLabel={buttonTitle}
      acceptButtonProps={{
        onClick: onSubmit,
        variant: "contained",
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
                onChange={handlerSearch}
              />
              <GroupFilterIcon
                sx={{ mx: 2, cursor: "pointer", color: "#D0D5DD" }}
                onClick={toggleDrawer}
              />
            </Box>

            <Box sx={styles.employee}>
              <RHFCheckbox
                name="allEmployees"
                onClick={() => {
                  selectAllHandler(filteredData);
                }}
              />
              <Typography variant="body2" sx={{ pl: 1 }}>
                Employees
              </Typography>
            </Box>
             {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
            <Box sx={styles.employeeScroll}>
              {filteredData?.map((item) => {
                return (
                  <Box key={item?._id}>
                    <Box
                      sx={{
                        pl: { xs: 1, sm: 4.2 },
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <RHFCheckbox
                        onClick={() => {
                          selectHandler(item);
                        }}
                        name={item._id}
                      />
                      <Box sx={styles.employeeProfile}>
                        <Avatar
                          sx={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                          src={
                            item?.profileImage
                              ? Person.src
                              : `https://ui-avatars.com/api/?rounded=true&name=${item?.firstName}+${item?.lastName}&font-size=0.4&color=#344054&background=#F2F4F7&bold=true`
                          }
                        >
                          {item?.firstName?.charAt(0)} {item?.lastName?.charAt(0)}
                        </Avatar>
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
              })}
            </Box>)}
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: "-webkit-fill-available" }}>
            <Box sx={styles.selectedMember}>
              <Typography color="text.primary" variant="body1">
                Selected members
              </Typography>
              <Box sx={styles.selectEmployeeScroll}>
                {deSelectData?.map((item) => {
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
                        <Avatar
                          sx={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                          src={
                            item?.profileImage
                              ? Person.src
                              : `https://ui-avatars.com/api/?rounded=true&name=${item?.firstName}+${item?.lastName}&font-size=0.4&color=#344054&background=#F2F4F7&bold=true`
                          }
                        >
                          {item?.firstName?.charAt(0)} {item?.lastName?.charAt(0)}
                        </Avatar>
                        <Box sx={{ pl: 1.5 }}>
                          <Typography variant="body1" sx={{}}>
                            {`${item?.firstName} ${item?.lastName}`}
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
