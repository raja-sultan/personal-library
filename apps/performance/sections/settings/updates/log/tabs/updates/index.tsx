"use client";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { Alert, Box, Button, Divider, Typography } from "@mui/material";

import { useUpdatesLogTable } from "./use-updates";
import { FilterComponent } from "@components/drawer-filter-component";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CustomModal from "@components/custom-modal";
import { renderUserImage } from "@root/utils/render-user-image";
import EmojiList from "@components/emoji-reactions/emoji-list";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

export function UpdateLogTable(): JSX.Element {
  const {
    tableData,
    handleOpenFilterDrawer,
    openFilterDrawer,
    filterData,
    handleDateRange,
    handleApplyFilter,
    handleClearAllFilters,
    handleRadioChange,
    handleViewDetailModal,
    openViewDetailModal,
    handleReaction,
    handleSearch,
    handleDownloadCSV,
    ViewUpadateData,
    from,
    to,
    emojiHandle,
    reviewed,
    publish,
    user,
  } = useUpdatesLogTable();

  const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.UPDATES.UPDATES_LOG

  return (
    <>
      <CustomHeaderTableTabs
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            handleSearch,
            actions: (
              <>
                <PermissionProtected permission={PERMISSION.DOWNLOAD}>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadCsvIcon />}
                    onClick={handleDownloadCSV}
                  >
                    Download CSV
                  </Button>
                </PermissionProtected>

                <Button
                  variant="outlined"
                  endIcon={<KeyboardArrowDownIcon />}
                  onClick={handleOpenFilterDrawer}
                >
                  Filter
                </Button>
              </>
            ),
          },
          tableProps: tableData,
        }}
      />
      {openFilterDrawer && (
        <FilterComponent
          data={filterData}
          key="employees-filter"
          open={openFilterDrawer}
          onClose={handleOpenFilterDrawer}
          handleDateRange={handleDateRange}
          getRadioBtnOption={handleRadioChange}
          handleApplyFilter={handleApplyFilter}
          handleClearAllFilters={handleClearAllFilters}
        />
      )}
      {openViewDetailModal?.open && (
        <CustomModal
          open={openViewDetailModal?.open}
          onClose={handleViewDetailModal}
          headerIcon={false}
          title="Update"
          message={false}
          hideFooter
        >
          <Box
            sx={{
              height: "600px",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#CACACA",
                borderRadius: "8px",
              },
            }}
          >
            <Box
              mb={2.4}
              sx={{ border: "1px solid #EAECF0", borderRadius: "8px" }}
              p={1.6}
            >
              <RenderUserInfo
                firstName={user?.firstName}
                lastName={user?.lastName}
                profileImage={user?.profileImage}
                userRole={user?.employeeTitle}
              />
            </Box>
            <Box mb={2.6}>
              <Typography variant="body2" color="text.secondary">
                {from}&nbsp;-&nbsp;{to}
              </Typography>
            </Box>

            {ViewUpadateData?.data?.points?.map((item) => {
              return (
                <>
                  <Box
                    mt={2.4}
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="start"
                    flexWrap="wrap"
                    flexDirection="column"
                    gap={1.6}
                    key={item?._id}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {item?.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.answer}
                    </Typography>
                  </Box>
                  <Divider sx={{ marginTop: "16px" }} />
                </>
              );
            })}
            {ViewUpadateData?.data?.sentimentScoreEnabled && (
              <Box
                mt={2.4}
                sx={{ border: "1px solid #EAECF0", borderRadius: "8px" }}
                p={1.6}
              >
                <Typography
                  textAlign="center"
                  mb={1}
                  variant="body1"
                  fontWeight={500}
                  color="text.primary"
                >
                  Challenges you faced during this month?
                </Typography>

                <Box
                  mt={2}
                  mb={2}
                  textAlign="center"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  <EmojiList
                    onEmojiClick={handleReaction}
                    selectedEmoji={emojiHandle(
                      ViewUpadateData?.data?.sentimentScore
                    )}
                  />
                </Box>
              </Box>
            )}
            <Alert icon={false} severity="warning" sx={{ marginTop: "26px" }}>
              <Typography variant="body2" color="text.primary">
                {" "}
                Responses cannot be edited after they have been reviewed
              </Typography>
            </Alert>
            <Box
              mt={2.4}
              display="flex"
              alignItems="flex-start"
              justifyContent="start"
              flexWrap="wrap"
              flexDirection="column"
              gap={1}
            >
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.primary"
              >
                Published publicity - {publish}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reviewed - {reviewed}
              </Typography>
            </Box>
          </Box>
        </CustomModal>
      )}
    </>
  );
}

function RenderUserInfo({
  firstName,
  lastName,
  profileImage,
  userRole,
}: {
  firstName: string;
  lastName: string;
  profileImage: string;
  userRole: string;
}): JSX.Element {
  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" gap="24px" flex={1}>
      {renderUserImage({
        profileImage,
        firstName,
        lastName,
        height: 48,
        width: 48,
      })}
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight="600"
          color="neutral.900"
          textTransform="capitalize"
        >
          {firstName}&nbsp;{lastName}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="400"
          color="neutral.500"
          textTransform="capitalize"
        >
          {userRole}
        </Typography>
      </Box>
    </Box>
  );
}
