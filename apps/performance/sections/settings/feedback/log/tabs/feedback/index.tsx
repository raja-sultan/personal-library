"use client";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { Button, Box, Typography } from "@mui/material";
import { useFeedback } from "./use-feedback";
import CustomModal from "@components/custom-modal";
import EastIcon from "@mui/icons-material/East";
import { ClockIcon } from "@assets/icons/clock-icon";
import CustomTimeRange from "@components/custom-time-range";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import CustomVisibility from "@components/custom-visibility";
import dayjs from "dayjs";
import { GlobalAvatar } from "@components/global-avatar";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.FEEDBACK.FEEDBACK_LOG;

export function Feedback(): JSX.Element {
  const {
    handleTimeRangeChange = () => { },
    handleVisibilityChange,
    tableData,
    isViewOpenModal,
    handleViewModal,
    theme,
    handleDownloadCSV,
    handleSearch,
    feedbackObj,
  } = useFeedback();

  return (
    <>
      <CustomHeaderTableTabs
        table={{
          secondaryHeader: true,
          secondaryHeaderProps: {
            handleSearch,
            actions: (
              <>
                <PermissionProtected permission={PERMISSION.DOWNLOAD} disabled>
                  <Button
                    variant="outlined"
                    onClick={handleDownloadCSV}
                    startIcon={<DownloadCsvIcon />}
                  >
                    Download CSV
                  </Button>
                </PermissionProtected>
                <CustomTimeRange setStartAndEndDate={handleTimeRangeChange} />
                <CustomVisibility handleChange={handleVisibilityChange} />
              </>
            ),
          },
          tableProps: tableData,
        }}
      />
      <CustomModal
        headerIcon={false}
        message={false}
        open={isViewOpenModal}
        onClose={handleViewModal}
        title={false}
        hideFooter
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <GlobalAvatar
                imgUrl={feedbackObj?.sender?.profileImage}
                firstName={feedbackObj?.sender?.firstName}
                lastName={feedbackObj?.sender?.lastName}
              />
              <Typography variant="body2">{`${feedbackObj?.sender?.firstName} ${feedbackObj?.sender?.lastName}`}</Typography>
            </Box>
            <EastIcon sx={{ color: "#667085" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <GlobalAvatar
                imgUrl={feedbackObj?.receiver?.profileImage}
                firstName={feedbackObj?.receiver?.firstName}
                lastName={feedbackObj?.receiver?.lastName}
              />
              <Typography variant="body2">{`${feedbackObj?.receiver?.firstName} ${feedbackObj?.receiver?.lastName}`}</Typography>
            </Box>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: theme?.palette.neutral[700],
              paddingTop: "24px",
              textTransform: "capitalize",
            }}
          >
            impressed by clear communication and structure of slides.
          </Typography>
          <Box sx={{ pt: "45px", display: "flex", alignItems: "center", gap: "15px" }}>
            <ClockIcon />
            <Typography variant="body2" sx={{ color: theme?.palette.neutral[500] }}>
              Submitted {dayjs(feedbackObj?.date).format("MMM  D, YYYY - HH:mm A")}
            </Typography>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
}
