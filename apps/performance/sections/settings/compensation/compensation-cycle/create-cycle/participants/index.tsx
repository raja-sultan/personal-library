'use client'
import { CustomPopover } from "@components/custom-popover";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { FilterComponent } from "@components/drawer-filter-component";
import { CustomLoader } from "@components/loader";
import { KeyboardArrowRight } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, DialogActions, Typography, type Theme } from "@mui/material";
import PromotionNominationModal from "./nomination-modal";
import { useParticipants } from "./use-participants";

export function Participants({ handleNext, viewDetailId, currency }): JSX.Element {
    const {
        tableData,
        isPromotionModalOpen,
        handlePromotionModal,
        handleActionChange,
        openFilterDrawer,
        handleOpenFilterDrawer,
        filterData,
        handleApplyFilter,
        handleClearAllFilters,
        handleSearch,
        handleContinue,
        handleReset,
        nominationUserDetail,
        promotedUser,
        handleEmptyUserData,
        selectEmployees,
        isUpdateCycleLoading,
        getRadioBtnOption,
        isEligibleUser,
    } = useParticipants({ handleNext, viewDetailId, currency });
    return (
        <>
            <CustomTableWithHeader
                primaryHeader
                primaryHeaderProps={{
                    title: 'Participants',
                    description: 'Review the employees that will be included in this cycle and adjust their eligibility for compensation changes and promotions.',
                }}
                secondaryHeader
                secondaryHeaderProps={{
                    actions: <>
                        <CustomPopover
                            key='participants'
                            btnText="Actions"
                            btnProps={{ disabled: selectEmployees?.length === 0 }}
                            options={['Set as eligible', 'Set as ineligible']}
                            handleChange={handleActionChange}
                            menuItemSx={{ textTransform: 'none' }}
                        />
                        <Button variant="outlined"
                            endIcon={<KeyboardArrowRight />}
                            onClick={handleOpenFilterDrawer}
                        >Filters</Button>
                    </>,
                    handleSearch
                }}
                tableWrapperSX={({ palette: { neutral } }: Theme) => ({
                    height: '45vh',
                    overflowY: 'auto',
                    "&::-webkit-scrollbar": {
                        width: "5px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: neutral[300],
                        borderRadius: "10px",
                    },
                })}
                tableProps={tableData}
            />
            {tableData?.isLoading && <CustomLoader />}
            <DialogActions>
                {!isEligibleUser?.length && <Typography flex={1} variant='subtitle2' color='error'>
                    Select at-least one participant to eligible to continue
                </Typography>}
                <Button variant="outlined" onClick={handleReset}>Reset Changes</Button>
                <LoadingButton
                    loading={isUpdateCycleLoading}
                    variant="contained"
                    disabled={!isEligibleUser?.length}
                    onClick={handleContinue}>
                    Continue
                </LoadingButton>
            </DialogActions>

            {isPromotionModalOpen && <PromotionNominationModal
                open={isPromotionModalOpen}
                onClose={() => { handlePromotionModal(); handleEmptyUserData() }}
                nominationUserDetail={nominationUserDetail}
                promotedUser={promotedUser?.isPromoted ? promotedUser : {}}
                viewDetailId={viewDetailId}
            />}

            {openFilterDrawer && <FilterComponent
                key='filterComponent'
                open={openFilterDrawer}
                onClose={handleOpenFilterDrawer}
                data={filterData}
                handleApplyFilter={handleApplyFilter}
                handleClearAllFilters={handleClearAllFilters}
                heading="Filters"
                radioOptionsForSingleVal={['promotion', 'status']}
                getRadioBtnOption={getRadioBtnOption}
            />}
        </>
    )
}