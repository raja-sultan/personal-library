"use client";
// @mui imports
import { Box, InputAdornment, MenuItem, TextField } from "@mui/material";

// @ react states imports
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";

// @icons imports
import { EmployeeSearchIcon } from "@assets/icons/employee-search-icon";

// @components imports
import { ThemeModeColor } from "@root/utils";
import { CustomTable, TableAction } from "common";
import CustomModal from "@components/custom-modal";
import { useViewGroups } from "./use-view-groups";
import { styles } from "./view-groups-styles";
import CustomCard from "@components/custom-card";
import { useDeleteGroupMutation } from "@services/settings/people/groups-api";
import toast from "react-hot-toast";

export function ViewGroups(): JSX.Element {
  const {
    columns,
    handleDeleteUser,
    deleteUser,
    groupsViewData,
    setSearchValue,
    groupViewLoading,
    groupViewFetching,
    groupViewSuccess,
    groupViewError,
    setDeleteUser,
    groupViewId,
  } = useViewGroups();
  const router = useRouter();
  const [getGroupObj, setGetGroupObj] = useState<any>({});
  const [deleteGroupUser, setDeleteGroupUser] = useState(false);
  const [deleteGroup, { isError }] = useDeleteGroupMutation({});

  const handleGroupDeleteUser = async (): Promise<void> => {
    await deleteGroup(getGroupObj);
    if (!isError) {
      setDeleteGroupUser(false);
      toast.success("Group deleted successfully");
      router.push(`/settings/groups`);
    }
  };

  return (
    <CustomCard
      header
      cardHeader={{
        title: groupsViewData?.data?.groupName,
        description: groupsViewData?.data?.description,
        divider: true,
        onBack: () => {
          router.push("/settings/groups");
        },
      }}
    >

      <Box sx={styles.wrapSearchTextField}>
        <Box sx={styles.searchTextField}>
          <TextField
            variant="outlined"
            fullWidth
            size="medium"
            sx={{ background: ThemeModeColor("#fff", "color2") }}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setSearchValue(e.target.value);
            }}
            InputProps={{
              placeholder: "Search",
              startAdornment: (
                <InputAdornment position="start">
                  <EmployeeSearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {groupsViewData?.data?.members &&
          groupsViewData.data.members.length !== 0 && (
            <Box>
              <TableAction placeholder="Actions">
                <MenuItem
                  onClick={() => {
                    router.push(
                      `/settings/groups/edit-group/?id=${groupsViewData?.data?._id}&GroupName=${groupsViewData?.data?.groupName}`
                    );
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setDeleteGroupUser(true);
                    setGetGroupObj(groupViewId);
                  }}
                >
                  {" "}
                  Delete
                </MenuItem>
              </TableAction>
            </Box>
          )}
      </Box>


      <CustomTable
        data={groupsViewData?.data?.members}
        columns={columns}
        isLoading={groupViewLoading}
        isFetching={groupViewFetching}
        isError={groupViewError}
        isPagination
        isSuccess={groupViewSuccess}
        currentPage={1}
        // onPageChange={(onPageData: number) => {
        //     setCurrentPage((onPageData - 1) * 5)
        // }}
        onSortByChange={(onSortData: any) => {
          return onSortData;
        }}
      />
      {(deleteUser || deleteGroupUser) && (
        <CustomModal
          open={deleteUser || deleteGroupUser}
          onClose={() => {
            setDeleteUser(false);
            setDeleteGroupUser(false);
          }}
          acceptButtonProps={{
            onClick: deleteUser ? handleDeleteUser : handleGroupDeleteUser,
          }}
          title="Alert"
          message="By deleting this group, all of its current members will no longer be part of any Group."
          acceptText="Delete"
        />
      )}
    </CustomCard>
  );
}
