import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeModeColor } from "@root/utils";
import { styles } from "./drawer.styles";
import { useNotificationDrawer } from "./use-notifications-drawer";
import { GlobalAvatar } from "@components/global-avatar";
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { KeyboardArrowRight } from "@mui/icons-material";
interface NotificationDrawerProps {
  openNotifications: boolean;
  toggleDrawerNotifications: () => void;
}

dayjs.extend(relativeTime);

export function NotificationDrawer({
  openNotifications,
  toggleDrawerNotifications,
}: NotificationDrawerProps): JSX.Element {
  const { notificationsData, handleViewMore, isLoading } = useNotificationDrawer();

  return (
    <Drawer
      anchor="right"
      open={openNotifications}
      onClose={toggleDrawerNotifications}
      PaperProps={{
        sx: { padding: '16px', ...styles.drawerStyle, width: '400px', overflowY: 'visible' }
      }}
    >
      <IconButton sx={styles.customCloseIcon} onClick={toggleDrawerNotifications}>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        sx={styles.closeIcon}
        onClick={toggleDrawerNotifications}
      >
        <CloseIcon />
      </IconButton>
      <Box p='8px'>
        <Typography
          variant="body1"
          fontWeight="700"
          mb='24px'
          sx={{ color: ThemeModeColor() }}
        >
          Notifications
        </Typography>
        <Box overflow='auto !important' pb="20px">
          {notificationsData?.data?.notifications.map((item) => (
            <Box key={item.id} sx={styles.notificationList}>
              <GlobalAvatar imgUrl={item?.icon} firstName={item?.user?.firstName} lastName={item?.user?.lastName} />
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="subtitle1">
                  {item.message && item?.message?.length > 50 ? `${item.message?.slice(0, 50)}...` : item.message}
                </Typography>
                <Typography variant="caption" mt='16px'>
                  {dayjs(item.createdAt).fromNow()}
                </Typography>
              </Box>
            </Box>
          ))}
          {notificationsData?.data?.notifications?.length > 5 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '20px' }}>
              <LoadingButton type="button" variant="contained" onClick={handleViewMore} loading={isLoading}>View More</LoadingButton>
            </Box>
          )
          }
        </Box>
        {/* <Box sx={styles.viewAllBtn}>
          <StyledViewAllLink href="/notifications">View All</StyledViewAllLink>
        </Box> */}
      </Box>
    </Drawer>
  );
}
