"use client";
import { Button } from "@mui/material";
import { useGroups } from "./use-groups";
import CustomModal from "@components/custom-modal";
import { useRouter } from "next/navigation";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.PEOPLE.GROUPS;
export function Groups(): JSX.Element {
  const router = useRouter();
  const {
    columns,
    groupsData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    changeHandler,
    handleDeleteUser,
    deleteUser,
    handleOffset,
    setDeleteUser,
  } = useGroups();
  return (
    <>
      <CustomTableWithHeader
        primaryHeader
        primaryHeaderProps={{
          title: "Groups",
          description:
            "Cohesive units of individuals working together towards a common goal, leveraging collective skills, knowledge, and collaboration to achieve desired outcomes.",
          actions: (
            <PermissionProtected permission={PERMISSION.ADD}>
            <Button
              variant="contained"
              onClick={() => {
                router.push("/settings/groups/create-group");
              }}
            >
              Create Group
            </Button>
            </PermissionProtected>
          ),
        }}
        secondaryHeader
        secondaryHeaderProps={{
          handleSearch: changeHandler,
        }}
        tableProps={{
          data: groupsData?.data?.groups,
          columns,
          isLoading,
          isFetching,
          isError,
          isPagination: true,
          isSuccess,
          totalPages: groupsData?.data?.meta?.page,
          currentPage: groupsData?.data?.meta?.pages,
          onPageChange: (onPageData: number) => {
            handleOffset((onPageData - 1) * 10);
          },
          onSortByChange: (onSortData: any) => {
            return onSortData;
          },
        }}
      />
      {deleteUser && (
        <CustomModal
          open={deleteUser}
          onClose={() => {
            setDeleteUser(false);
          }}
          acceptButtonProps={{ onClick: handleDeleteUser }}
          title="Alert"
          message="By deleting this group all of its current members will no longer be part of any Group."
          acceptText="Delete"
        />
      )}
    </>
  );
}
