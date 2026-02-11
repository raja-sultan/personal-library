import type { ReactNode } from "react";
import type { Theme } from "@mui/material";
import Header from "./header";
import Footer from "./footer";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useLoginAsMutation } from "@services/login-as";
import { toast } from "react-hot-toast";
import { loginAsAction } from "@root/slices";
import { useGetProfileQuery } from "@services/profile/profile-api";
import { usePathname, useRouter } from 'next/navigation'

export function Layout({ children }: { children: ReactNode }): JSX.Element {

  const [loginAsMutation] = useLoginAsMutation();
  const loginAsId = useSelector((state: any) => state?.loginAs?.loginAs);
  const { data: userProfile } = useGetProfileQuery({});
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();

  async function handleSwitchBack(): Promise<void> {
    try {
      const res = await loginAsMutation({ id: loginAsId, session: false }).unwrap();
      dispatch(loginAsAction.loginAs(res?.data?.loggedInAs));
      router.push('/dashboard')
      toast.success(`Successfully switch back`);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while login as user please try again');
    }
  }

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Box flex="1"
        sx={{
          px: pathName === "/praise-wall" ? "" : {
            xl: "8rem",
            lg: "6rem",
            md: "4rem",
            sm: "3rem",
            xs: "1rem",
          },
          py: pathName === "/praise-wall" ? "" : 3,
          mt: "8rem",
        }}
      >
        {loginAsId && <LoginAsComp user={userProfile?.data} handleSwitchBack={handleSwitchBack} />}
        {children}
      </Box>
      <Footer />
    </Stack>
  );
}

function LoginAsComp({ handleSwitchBack, user }): JSX.Element {
  return (
    <Box mb='15px' display='flex' alignItems='center' justifyContent='space-between' gap='16px' flexWrap='wrap'
      sx={(theme: Theme) => ({
        background: theme.palette.primary.main,
        borderRadius: '10px',
        padding: '15px',
        '& .login_as': {
          color: theme.palette.common.white
        }
      })}
    >
      <Typography className="login_as" variant="h6" fontWeight={500}>
        Logged in as &nbsp;
        <b>{user?.firstName} {user?.lastName}</b>
      </Typography>
      <Button variant="outlined"
        sx={({ palette: { common } }: Theme) => ({
          color: common.white,
          borderColor: common.white,
          '&:hover': { borderColor: common.white }
        }
        )}
        onClick={handleSwitchBack}
      >Switch Back</Button>
    </Box>
  )
}
