"use client";
import { Button } from "@mui/material";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import CustomModal from "@components/custom-modal";
import SelectEmployeesModal from "@components/select-employees-modal";
import { useEmployees } from "./use-employees";

export function NewRoleEmployees(): JSX.Element {
  const {
    addEmployeeModal,
    handleAddEmployeeModal,
    handleDeleteModal,
    openDeleteModal,
    tableData,
    handleSearch,
    handleDeleteEmployee,
    handleAddEmployeeIds,
    selectedMember,
  } = useEmployees();

  return (
    <>
      <CustomTableWithHeader
        key="employees"
        secondaryHeader
        secondaryHeaderProps={{
          handleSearch,
          actions: (
            <Button variant="contained" onClick={handleAddEmployeeModal}>
              Add Employees
            </Button>
          ),
        }}
        tableProps={tableData}
      />
      {openDeleteModal && (
        <CustomModal
          open={openDeleteModal}
          onClose={handleDeleteModal}
          onAccept={handleDeleteEmployee}
        />
      )}

      {addEmployeeModal && (
        <SelectEmployeesModal
          isOpen={addEmployeeModal}
          setIsOpen={handleAddEmployeeModal}
          onAdd={handleAddEmployeeIds}
          selectedMember={selectedMember}
        />
      )}
    </>
  );
}
