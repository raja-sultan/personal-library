import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetNotificationsLatestQuery } from "@services/my-profile/notifications-account/notifications-account-api";
import dayjs from "dayjs";
import { renderUserImage } from "@sections/my-profile/profile-data/image-profile";
import { IsFetching } from "common";

dayjs.extend(relativeTime);

interface NotificationDrawerProps {
  openNotifications: boolean;
  toggleDrawerNotifications: () => void;
}

export function NotificationDrawer({
  openNotifications,
  toggleDrawerNotifications,
}: NotificationDrawerProps): JSX.Element {
  const { data, isFetching, isLoading } = useGetNotificationsLatestQuery({});

  return (
    <Drawer
      anchor="right"
      open={openNotifications}
      onClose={toggleDrawerNotifications}
      sx={{ borderRadius: "10px" }}
    >
      <Box
        sx={{
          width: { xs: "280px", lg: "340px" },
          p: 2,
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
            Notifications
          </Typography>
          <IconButton
            // sx={{ display: "block", ml: "auto" }}
            onClick={toggleDrawerNotifications}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {isLoading || isFetching ? (
          <Box position="relative" height="50vh">
            <IsFetching isFetching />
          </Box>
        ) : (
          <>
            {data?.data?.slice(0, 4).map((item) => (
              <Box
                key={item.id}
                sx={{
                  borderBottom: "1.5px solid",
                  borderColor: "divider",
                  py: 2,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                  gap={1}
                >
                  {renderUserImage({
                    profileImage: item?.user?.profileImage ?? "",
                    firstName: item?.user?.firstName ?? "-",
                    lastName: item?.user?.lastName ?? "-",
                  })}
                  <Box>
                    <Typography variant="subtitle2">{item?.title}</Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 0.8 }}>
                  <Typography variant="caption" sx={{ pl: 4.5 }}>
                    {/* {item?.createdAt} */}
                    {dayjs(item?.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Drawer>
  );
}
