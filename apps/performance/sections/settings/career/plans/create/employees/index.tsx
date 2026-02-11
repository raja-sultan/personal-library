'use client'
import { Box, Button } from "@mui/material";
import { useEmployees } from "./use-employees";
import CustomCard from "@components/custom-card";
import { NoDataFound } from "@components/no-data";
import { NoEmployeeAssigned } from "@assets/icons";
import CustomModal from "@components/custom-modal";
import SelectEmployeesModal from "@components/select-employees-modal";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";

export function Employees({ id, disabled, plan }): JSX.Element {
    const { tableData, removePlan, handleRemovePlan, addEmployeeModalOpen, setAddEmployeeModalOpen, handleAssignEmployees } = useEmployees({ id, disabled, plan });

    return (
        <>
            <Box>
                {tableData.isSuccess ? (
                    <CustomHeaderTableTabs
                        table={{
                            secondaryHeader: true,
                            secondaryHeaderProps: {
                                // handleSearch: (value) => { setSearchValue(value) },
                                actions: (
                                    <Button variant="contained" disabled={disabled} onClick={() => { setAddEmployeeModalOpen(true) }}>
                                        Add Employees
                                    </Button>
                                ),
                            },
                            tableProps: tableData,
                        }}
                    />
                ) : (
                    <CustomCard subHeader cardProps={{ sx: { minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' } }}>
                        <NoDataFound
                            icon={<NoEmployeeAssigned sx={{ marginBottom: '2rem' }} />}
                            isCustomCard={false}
                            heading="No employees assigned"
                            description="Employees assigned to this plan will be able to view it on their “Profile” page and connect its skills to their growth areas."
                            buttonText="Add Employees"
                        />
                    </CustomCard>
                )}
            </Box>

            {addEmployeeModalOpen && (
                <SelectEmployeesModal
                    isOpen={addEmployeeModalOpen}
                    setIsOpen={setAddEmployeeModalOpen}
                    onAdd={handleAssignEmployees}
                />
            )}

            {removePlan && <CustomModal
                open={removePlan}
                onClose={handleRemovePlan}
                title="Alert"
                message="Are you sure you want to delete this plan?"
                acceptText="Delete"
            />}
        </>
    )
}