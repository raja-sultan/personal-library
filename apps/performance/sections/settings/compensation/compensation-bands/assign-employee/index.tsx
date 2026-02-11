"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import CustomCard from "@components/custom-card";
import useAssignedEmployee from "./use-assign-employees";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import SelectEmployeesModal from "./select-employees-modal";

export function AssignEmployee(): JSX.Element {
  const {
    onBack,
    tableProps,
    selectedIds,
    bandName,
    addEmployeeModalOpen,
    setAddEmployeeModalOpen,
    handleSearch,
    handleAssignEmployees,
    handleRemoveEmployees,
  } = useAssignedEmployee();
  return (
    <>
      <CustomCard header cardHeader={{ title: `Assign Employees to ${bandName}`, onBack }} />
      <Box mt="24px">
        <CustomTableWithHeader
          secondaryHeader
          secondaryHeaderProps={{
            handleSearch,
            actions: (
              <>
                {selectedIds?.length > 0 && (
                  <Button onClick={handleRemoveEmployees} variant="contained" color="error">
                    Remove
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setAddEmployeeModalOpen(true);
                  }}
                  variant="outlined"
                >
                  Add Employees
                </Button>
              </>
            ),
          }}
          tableProps={tableProps}
        />
      </Box>
      {addEmployeeModalOpen && (
        <SelectEmployeesModal
          isOpen={addEmployeeModalOpen}
          setIsOpen={setAddEmployeeModalOpen}
          onAdd={handleAssignEmployees}
        />
      )}
    </>
  );
}
