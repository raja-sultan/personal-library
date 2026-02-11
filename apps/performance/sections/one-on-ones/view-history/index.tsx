"use client";
import { TableActionsIcon } from "@assets/icons/table-action-icon";
import CustomCard from "@components/custom-card";
import {
  MenuItem,
  Box,
  Typography,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import { TableIconActions } from "common";
import { renderUserImage } from "@root/utils/render-user-image";
import { alpha } from "@mui/system/colorManipulator";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { EmployeeFilter } from "@components/employee-filter";
import CustomModal from "@components/custom-modal";
import { useViewHistory } from "./use-view-history";
import dayjs from "dayjs";
import { CustomLoader } from "@components/loader";

export function ViewHistory(): JSX.Element {
  const {
    upcomingOneOnOneData,
    filterList,
    toggleFilterDrawer,
    setSelectedFilter,
    filterDrawer,
    searchValues,
    changeFilterHandler,
    handleTableCancelAction,
    openCancelMeetingModal,
    router,
    viewHistory,
    pastOneOnOneData,
    currentOneOnOneData,
    handleCancelMeeting,
    openDeleteMeetingModal,
    handleDeleteMeeting,
    handleTableDeleteAction,
    isDeleteLoading,
    isCancelLoading,
    userDetails,
    teamHistoryType
  } = useViewHistory();
  const profileDetails = viewHistory?.data?.meetingDetails?.userDetail;
  const userProfileData = userDetails?.data;
  const historyType = teamHistoryType === 'team-history';
  const isLoading = upcomingOneOnOneData?.isLoading || currentOneOnOneData?.isLoading || pastOneOnOneData?.isLoading;
  return (
    <>
      <CustomCard
        header
        cardHeader={{
          title: "1-on-1 History",
          divider: true,
          onBack: () => {
            router.push(historyType ? "/my-team" : "/one-on-ones");
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
                router.push(`/settings/employees/profile?id=${profileDetails?._id}`)
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
        }}
      >
        {isLoading && <CustomLoader />}
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
              profileImage: historyType ? userProfileData?.firstName : profileDetails?.firstName ?? '-',
              firstName: historyType ? userProfileData?.firstName : profileDetails?.firstName ?? '-',
              lastName: historyType ? userProfileData?.lastName : profileDetails?.lastName ?? '-',
              height: 80,
              width: 80,
            })}
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {historyType ? userProfileData?.firstName : profileDetails?.firstName ?? '-'}
                {historyType ? userProfileData?.lastName : profileDetails?.lastName ?? '-'}
              </Typography>
              <Typography variant="body2" color="neutral.500">
                {historyType ? (userProfileData?.employeeTitle ?? '-') : (profileDetails?.employeeTitle ?? '-')}
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
              {viewHistory?.data?.meetingDetails?.endDate ? `Last 1 on 1 on ${dayjs(
                viewHistory?.data?.meetingDetails?.endDate
              ).format("MMMM DD, YYYY")}` : '--'}
            </Typography>
          </Box>
        </Box>
        <DialogActions sx={{ my: "24px", padding: "0px" }}>
          <Button
            variant="outlined"
            endIcon={<KeyboardArrowRightIcon />}
            onClick={toggleFilterDrawer}
          >
            Filter
          </Button>
        </DialogActions>

        <Stack direction='column' gap='24px'>
          <CustomTableWithHeader
            primaryHeader
            primaryHeaderProps={{ title: "Upcoming 1-on-1" }}
            tableProps={upcomingOneOnOneData}
          />
          <CustomTableWithHeader
            primaryHeader
            primaryHeaderProps={{ title: "Current 1-on-1" }}
            tableProps={currentOneOnOneData}
          />
          <CustomTableWithHeader
            primaryHeader
            primaryHeaderProps={{ title: "Past 1-on-1" }}
            tableProps={pastOneOnOneData}
          />
        </Stack>
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
          isLoading={isCancelLoading}
          title="Alert"
          message="Are you sure you want to cancel this 1-on-1 meeting?"
          acceptText="Cancel Meeting"
          onAccept={handleCancelMeeting}
        />
      )}

      {openDeleteMeetingModal && (
        <CustomModal
          isLoading={isDeleteLoading}
          open={openDeleteMeetingModal}
          onClose={handleTableDeleteAction}
          title="Are you sure ?"
          message=" This will be permanently deleted from Personnel Library .Are you sure you want to delete this 1-on-1"
          acceptText="Delete"
          onAccept={handleDeleteMeeting}
        />
      )}
    </>
  );
}
