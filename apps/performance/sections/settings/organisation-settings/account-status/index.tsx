'use client'

import CustomCard from "@components/custom-card";
// import CustomModal from "@components/custom-modal";
import { Box, Button, Stack, Typography } from "@mui/material";
// import TextField from "@mui/material/TextField";
import Link from "next/link";
import { styles } from "./account-status.styles";
// import { useAccountStatus } from "./use-account-status";
import { ThemeModeColor } from "@root/utils";

export function AccountStatus(): JSX.Element {

    // const { changeUrlModal, handleChangeUrl, deactivateUser, handleDeactivateUser } = useAccountStatus()

    return (
        <Stack gap='16px' sx={styles.wrapper}>
            {/* <CustomCard
                subHeader
                cardSubHeader={{
                    title: 'Account Status',
                    description: 'Manage your account settings'
                }}
            />
            <CustomCard
                subHeader
                cardSubHeader={{
                    title: <Typography variant="h6" fontWeight={600} sx={{color:ThemeModeColor("#344054","#A0AEC0")}}>Change Company URL</Typography>,
                    description: 'If you would like to change your company’s Personal Library URL, click on the button Change Url.',
                    actions: <Button variant="contained" size='small' sx={{ fontSize: "14px" }} onClick={handleChangeUrl}>Change URL</Button>
                }}
            /> */}
            
            <CustomCard
                subHeader
                cardSubHeader={{
                    title: <Typography variant="h6" fontWeight={600} sx={{color:ThemeModeColor("#344054","#A0AEC0")}}>Terms of Service</Typography>,
                    description: <>You can access your terms of service here:&nbsp;
                        <Link href='/settings/account-status/terms-of-service' color="primary" style={{textDecoration:"none",fontWeight: 500}}>Terms & Service.</Link>
                    </>
                }}
            />
            {/* <Box className='deactivate_acc'>
                <CustomCard
                    subHeader
                    cardSubHeader={{
                        title: <Typography variant="h6" fontWeight={600} sx={{color:ThemeModeColor("#344054","#A0AEC0")}}>Deactivate Account</Typography>,
                        description: 'If you would like to deactivate your Personal Library account and suspend billing, Click on Deactivate account.',
                        actions: <Button variant="contained" size='small' color="error" sx={{ background:"#B42318", fontSize: "14px" }} onClick={handleDeactivateUser}>Deactivate</Button>
                    }}
                />
            </Box> */}
{/* 
            {changeUrlModal &&
                <CustomModal
                    open={changeUrlModal}
                    onClose={handleChangeUrl}
                    title='Change Company URL'
                    headerIcon={false}
                    message={false}
                    acceptText='Save'
                    acceptButtonProps={{
                        color: 'primary'
                    }}
                >
                    <Typography variant="subtitle1" mb='5px'>Previous URL</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        disabled
                        variant="outlined"
                        value='www.OrcaloHoldingsjobs.com'
                        InputProps={{
                            startAdornment: <Typography variant="body2">http://</Typography>
                        }}
                    />

                    <Typography variant="subtitle1" mb='5px' mt='16px'>New URL</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        InputProps={{
                            startAdornment: <Typography variant="body2">http://</Typography>
                        }}
                    />
                </CustomModal>
            } */}
{/* 
            {deactivateUser && <CustomModal
                open={deactivateUser}
                onClose={handleDeactivateUser}
                title='Are you sure?'
                message='Are you sure to deactivate your Personal Library account and suspend billing?'
                acceptText="Deactivate"
            />} */}
        </Stack>
    )
}