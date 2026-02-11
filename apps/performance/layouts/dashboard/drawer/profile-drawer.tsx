import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoginIcon, LogoutIcon, MyProfileIcon, SettingIcon } from "@assets/icons";
import CustomModal from "@components/custom-modal";
import type { SelectChangeEvent } from "@mui/material";
import { ThemeModeColor } from "@root/utils";
import { styles } from "./drawer.styles";
// import { KeyboardArrowRight } from "@mui/icons-material";
import { clearLocalStorage, clearSessionStorage } from "@root/../../packages/common";
import { toast } from "react-hot-toast";
import { renderUserImage } from "@root/utils/render-user-image";
import { useGetEmployeesQuery, useLoginAsMutation } from "@services/login-as";
import { useDispatch, useSelector } from "react-redux";
import { loginAsAction } from "@root/slices";
import { useLogoutMutation } from "@services/auth-api";

interface PROFILELINKS {
  id?: number;
  title?: string;
  subTitle?: string;
  icon?: React.ReactNode;
  link?: string | undefined;
}
interface ProfileDrawerProps {
  open: boolean;
  toggleDrawer: () => void;
  user?: object | null | undefined | any;
}

const profileLinksList = [
  {
    id: 1,
    title: "Log In as",
    subTitle: "See what others see",
    icon: <LoginIcon />,
  },
  {
    id: 2,
    title: "My Profile",
    subTitle: "View profile information",
    link: "/profile",
    icon: <MyProfileIcon />,
  },
  {
    id: 3,
    title: "Settings",
    subTitle: "Manage your organization settings",
    link: "/settings/employees",
    icon: <SettingIcon />,
  },
  {
    id: 4,
    title: "Logout",
    subTitle: "Logout from the platform",
    icon: <LogoutIcon />,
  },
];

export function ProfileDrawer({ open, toggleDrawer, user }: ProfileDrawerProps): JSX.Element {
  const router = useRouter();
  const [logInModal, setLogInModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>(null);
  const dispatch = useDispatch();
  const isLoggedInAs = useSelector((state: any) => state?.loginAs?.loginAs);
  const { data: employeesData } = useGetEmployeesQuery({ type: "employees" });
  const [loginAsMutation] = useLoginAsMutation();
  const [logoutMutation] = useLogoutMutation();

  function toggleModal(): void {
    setLogInModal(!logInModal);
  }

  function Logout(): void {
    logoutMutation({})
      .unwrap()
      .then((data) => {
        window.location.href = "/sign-in";
        toast.success(data?.message || "Successfully logged out");
        clearSessionStorage();
        clearLocalStorage();
      });
  }

  function handleProfileListClick(item: PROFILELINKS): void {
    const { title, link } = item;
    if (title === "Log In as") toggleModal();
    if (title === "Logout") Logout();
    else link && router.push(link);
    toggleDrawer();
  }

  async function handleLoginAs(): Promise<void> {
    try {
      const res = await loginAsMutation({ id: userId, session: true }).unwrap();
      dispatch(loginAsAction.loginAs(res?.data?.loggedInAs));
      toggleModal();
      router.push("/dashboard");
      const employee = employeesData?.data?.find(({ value }) => value === userId);
      toast.success(`Successfully login as ${employee.text}`);
    } catch (error) {
      toast.error(error?.data?.message || "Error while login as user please try again");
    }
  }

  async function handleSwitchBack(): Promise<void> {
    try {
      const res = await loginAsMutation({
        id: userId,
        session: false,
      }).unwrap();
      dispatch(loginAsAction.loginAs(res?.data?.loggedInAs));
      router.push("/dashboard");
      toast.success(`Successfully switch back`);
      toggleDrawer();
    } catch (error) {
      toast.error(error?.data?.message || "Error while login as user please try again");
    }
  }

  const profileList = isLoggedInAs
    ? profileLinksList.slice(1, profileLinksList.length)
    : profileLinksList;

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: styles.drawerStyle,
        }}
      >
        {/* <IconButton sx={styles.customCloseIcon} onClick={toggleDrawer}>
          <KeyboardArrowRight />
        </IconButton> */}
        <Box sx={styles.profileWrapper}>
          <IconButton sx={styles.closeIcon} onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          <Typography variant="body1" fontWeight="700">
            My Account
          </Typography>
          <Box display="flex" alignItems="center" py={2}>
            {renderUserImage({ ...user, height: 80, width: 80 })}
            <Box pl={1.5}>
              <Typography variant="body2" fontWeight="600">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="subtitle2" fontWeight="400">
                {user?.employeeTitle}
              </Typography>
            </Box>
          </Box>
          <Divider />
          {profileList?.map((item: PROFILELINKS) =>
            isLoggedInAs && item.title === "Logout" ? (
              <Button fullWidth variant="outlined" key={item.id} onClick={handleSwitchBack}>
                Switch Back
              </Button>
            ) : (
              <Box
                key={item.id}
                onClick={() => {
                  handleProfileListClick(item);
                }}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" alignItems="center" my={3}>
                  <Box sx={styles.profileLinkIcon}>{item.icon}</Box>
                  <Box pl={1.5}>
                    <Typography fontWeight="600" variant="subtitle1">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontWeight="400"
                      sx={{
                        color: ThemeModeColor("neutral.500", "neutral.300"),
                      }}
                    >
                      {item.subTitle}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          )}
        </Box>
      </Drawer>
      {/* login as modal  */}
      <CustomModal
        open={logInModal}
        onClose={toggleModal}
        headerIcon={<LoginIcon />}
        title="Log In as"
        message="You will be able to view Personnel Library as selected employee sees it, but you will not be able to take any actions on behalf of them. A record of this impersonation will also be logged."
        acceptText="Login"
        onAccept={handleLoginAs}
        acceptButtonProps={{ color: "primary", disabled: !userId }}
      >
        <Select
          fullWidth
          name="users"
          value={userId}
          sx={{ mb: "48px" }}
          onChange={({ target: { value } }: SelectChangeEvent) => {
            setUserId(value);
          }}
        >
          {employeesData?.data?.length > 0 &&
            employeesData?.data?.map(({ text, value }) => (
              <MenuItem value={value} key={value}>
                {text}
              </MenuItem>
            ))}
        </Select>
      </CustomModal>
    </>
  );
}
