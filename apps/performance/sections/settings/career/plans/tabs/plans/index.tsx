import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import CustomModal from "@components/custom-modal";
import { CustomPopover } from "@components/custom-popover";
import { usePlan } from "./use-plan"
import { CustomLoader } from "@components/loader";

export function TabPlans(): JSX.Element {
  const {
    tableProps,
    deleteModal,
    handleDeletePlan,
    handleDeleteModal,
    handleSearch,
    handleStatusChange,
    handleGroupsChange,
    isDeleteLoading,
    isDuplicateLoading,
    groupsFilter
  } = usePlan();

  return (
    <>
      {(tableProps?.isLoading || isDuplicateLoading) && <CustomLoader />}
      <CustomHeaderTableTabs
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            actions: <>
              <CustomPopover
                btnText="Groups"
                checkboxOptions={groupsFilter?.map(({ text, value }) => ({ id: value, name: text }))}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                checkboxChangeHandler={handleGroupsChange}
              />
              <CustomPopover
                btnText="Status"
                options={['All', 'Draft', 'Published']}
                handleChange={handleStatusChange}
              />
            </>,
            handleSearch
          },
          tableProps
        }}
      />
      {deleteModal && <CustomModal
        open={deleteModal}
        onClose={handleDeleteModal}
        isLoading={isDeleteLoading}
        message='Are you sure you want to delete this plan?'
        acceptButtonProps={{
          onClick: handleDeletePlan
        }}
      />}
    </>

  )
}