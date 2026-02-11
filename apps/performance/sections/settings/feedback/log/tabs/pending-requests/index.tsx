import dayjs from "dayjs";
import EastIcon from "@mui/icons-material/East";
import CustomModal from "@components/custom-modal";
import { ClockIcon } from "@assets/icons/clock-icon";
import { Box, Button, Typography } from "@mui/material";
import { GlobalAvatar } from "@components/global-avatar";
import { usePendingRequests } from "./use-pending-requests";
import CustomTimeRange from "@components/custom-time-range";
import CustomVisibility from "@components/custom-visibility";
import { DownloadCsvIcon } from "@assets/icons/download-csv-icon";
import { CustomHeaderTableTabs } from "@components/custom-header-table-tabs";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.FEEDBACK.FEEDBACK_LOG;

export function PendingRequests(): JSX.Element {
  const { pendingFeedbackObj, theme, isViewOpenModal, handleViewModal, tableData, handleDownloadCSV, handleTimeRangeChange, handleSearch, handleVisibilityChange } =
    usePendingRequests();
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
      {isViewOpenModal && <CustomModal
        headerIcon={false}
        message={false}
        open={isViewOpenModal}
        onClose={handleViewModal}
        title={false}
        hideFooter
      >
        <Box sx={styles.infoWrapper}>
          <Box sx={styles.pendingReqInfo}>
            <GlobalAvatar
              imgUrl={pendingFeedbackObj?.sender?.profileImage}
              firstName={pendingFeedbackObj?.sender?.firstName}
              lastName={pendingFeedbackObj?.sender?.lastName}
            />
            <Typography variant="body2">{`${pendingFeedbackObj?.sender?.firstName} ${pendingFeedbackObj?.sender?.lastName}`}</Typography>
          </Box>
          <EastIcon sx={{ color: '#667085' }} />
          <Box sx={styles.pendingReqInfo}>
            <GlobalAvatar
              imgUrl={pendingFeedbackObj?.receiver?.profileImage}
              firstName={pendingFeedbackObj?.receiver?.firstName}
              lastName={pendingFeedbackObj?.receiver?.lastName}
            />
            <Typography variant="body2">{`${pendingFeedbackObj?.receiver?.firstName} ${pendingFeedbackObj?.receiver?.lastName}`}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: theme?.palette.neutral[700], paddingTop: '24px' }}>impressed by clear communication and structure of slides.</Typography>
        <Box sx={styles.timeWrapper}>
          <ClockIcon />
          <Typography variant="body2" sx={{ color: theme?.palette.neutral[500] }}>Submitted {dayjs(pendingFeedbackObj?.date).format('MMM  D, YYYY - HH:mm A')}</Typography>
        </Box>
      </CustomModal>
      }
    </>
  );
}

// styles

const styles = {
  infoWrapper: { display: 'flex', alignItems: 'center', gap: '20px' },
  pendingReqInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
  timeWrapper: { pt: '45px', display: 'flex', alignItems: 'center', gap: '15px' }
}