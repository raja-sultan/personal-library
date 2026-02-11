"use client";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import CustomCard from "@components/custom-card";
import {
  MenuItem,
  Box,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { TableIconActions } from "common";
import { useRouter, useSearchParams } from "next/navigation";
import { renderUserImage } from "@root/utils/render-user-image";
import { alpha } from "@mui/system/colorManipulator";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { useHistory } from "@sections/settings/one-on-ones/history/use-history";
import { EmployeeFilter } from "@components/employee-filter";
import CustomModal from "@components/custom-modal";
import Link from "next/link";
import dayjs from "dayjs";
import { useGetUserProfileQuery } from "@services/profile/profile-api";

export function OneOnOneHistory({
  redirectTo,
  showEvents = false,
}: {
  redirectTo?: string;
  showEvents?: boolean;
}): JSX.Element {
  const router = useRouter();

  const {
    upcomingOneOnOneData,
    currentOneOnOneData,
    pastOneOnOneData,
    filterList,
    toggleFilterDrawer,
    // selectedFilter,
    setSelectedFilter,
    filterDrawer,
    searchValues,
    changeFilterHandler,
    handleTableCancelAction,
    openCancelMeetingModal,
    viewHistory,
    handleCancelOneOnOne,
    isCancelLoading,
    openDeleteMeetingModal,
    isDleteLoading,
    handleTableDeleteAction,
    handleDeleteOneOnOne,
  } = useHistory();
  const userData = viewHistory?.data?.meetingDetails;


  const memberId = useSearchParams().get("id");

  const { data: getProfileData } = useGetUserProfileQuery(memberId);

  return (
    <>
      <CustomCard
        header={!showEvents}
        cardHeader={
          !showEvents
            ? {
              title: "1-on-1 History",
              divider: true,
              onBack: () => {
                router.push(
                  redirectTo ? redirectTo : "/settings/one-on-ones/logs"
                );
              },
              actions: (
                <TableIconActions
                  icon={<TableActionsIcon />}
                  selectButtonProps={{
                    sx: ({ palette: { neutral } }) => ({
                      border: `1px solid ${neutral[300]}`,
                      borderRadius: "8px",
                    }),
                  }}
                >
                  <MenuItem onClick={() => {
                    router.push(`/settings/employees/profile?id=${getProfileData?.data?._id}`)
                  }}>View Profile</MenuItem>
                  <MenuItem
                    onClick={() => {
                      router.push("/one-on-ones/create");
                    }}
                  >
                    Create 1-on-1
                  </MenuItem>
                </TableIconActions>
              ),
            }
            : {}
        }
      >
        {!showEvents && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap="16px"
            borderRadius="10px"
            sx={({ palette: { primary } }) => ({
              background: alpha(primary.main, 0.05),
              p: { sm: "24px", xs: "12px" },
            })}
          >
            <Box display="flex" alignItems="center" gap="16px">
              {renderUserImage({
                profileImage: getProfileData?.data?.profileImage,
                firstName: getProfileData?.data?.firstName,
                lastName: getProfileData?.data?.lastName,
                height: 80,
                width: 80,
              })}
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {`${getProfileData?.data?.firstName} ${getProfileData?.data?.lastName}`}
                </Typography>
                <Typography variant="subtitle1" color="neutral.500">
                  {getProfileData?.data?.employeeTitle}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap="16px">
              <AccessTimeIcon sx={{ color: "neutral.500" }} />
              <Typography
                variant="subtitle2"
                fontWeight={400}
                color="neutral.500"
              >
                Last 1 on 1 on{" "}
                {userData && dayjs(userData?.updatedAt).format("MMM D, YYYY")}
              </Typography>
            </Box>
          </Box>
        )}
        <DialogActions sx={{ my: "24px" }}>
          <Button
            variant="outlined"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={toggleFilterDrawer}
          >
            Filter
          </Button>
          {showEvents && (
            <Link href="/one-on-ones/create">
              <Button variant="contained">New 1-on-1</Button>
            </Link>
          )}
        </DialogActions>

        <CustomTableWithHeader
          primaryHeader
          primaryHeaderProps={{ title: "Upcoming 1-on-1" }}
          tableProps={upcomingOneOnOneData}
        />
        <br />
        <CustomTableWithHeader
          primaryHeader
          primaryHeaderProps={{ title: "Current 1-on-1" }}
          tableProps={currentOneOnOneData}
        />
        <br />
        <CustomTableWithHeader
          primaryHeader
          primaryHeaderProps={{ title: "Past 1-on-1" }}
          tableProps={pastOneOnOneData}
        />
      </CustomCard>
      {filterDrawer && (
        <EmployeeFilter
          open={filterDrawer}
          toggleDrawer={toggleFilterDrawer}
          searchValue={searchValues}
          changeHandler={changeFilterHandler}
          setSelectedFilter={setSelectedFilter}
          filterList={filterList}
        />
      )}

      {openCancelMeetingModal && (
        <CustomModal
          open={openCancelMeetingModal}
          onClose={handleTableCancelAction}
          isLoading={isDleteLoading}
          title="Alert"
          message="Are you sure you want to cancel this 1-on-1 meeting?"
          acceptText="Cancel Meeting"
          onAccept={handleCancelOneOnOne}
        />
      )}

      {openDeleteMeetingModal && (
        <CustomModal
          open={openDeleteMeetingModal}
          onClose={handleTableDeleteAction}
          isLoading={isCancelLoading}
          title="Delete"
          message="Are you sure you want to Delete this 1-on-1 meeting?"
          acceptText="Delete Meeting"
          onAccept={handleDeleteOneOnOne}
        />
      )}
    </>
  );
}

