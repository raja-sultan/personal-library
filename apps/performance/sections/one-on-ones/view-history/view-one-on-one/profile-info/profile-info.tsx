import { TableActionsIcon } from "@assets/icons/table-action-icon";
import { Box, MenuItem, Typography } from "@mui/material";
import { renderUserImage } from "@root/utils/render-user-image";
import { TableIconActions } from "common";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";

const { PERMISSION } = PERMISSIONS.PERFORMANCE.MODULE._1_ON_1S._1_ON_1S

function ProfileInfo({ userDetails, handleViewProfile, handleCancel, actionType, disabled }): JSX.Element {
    return (
        <Box sx={styles.info}>
            <Box display="flex" alignItems="center" gap="16px">
                {renderUserImage({
                    profileImage: userDetails?.profileImage,
                    firstName: userDetails?.firstName,
                    lastName: userDetails?.lastName,
                    height: 80, width: 80
                })}
                <Box>
                    <Typography variant="h6" fontWeight={600} textTransform='capitalize'>
                        {userDetails?.firstName ?? '--'}&nbsp;{userDetails?.lastName ?? '--'}
                    </Typography>
                    <Typography variant="body2" color="neutral.500" textTransform='capitalize'>
                        {userDetails?.employeeTitle}
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" alignItems="center" gap="14px">
                <Typography variant="subtitle2" fontWeight={400} color="neutral.500">
                    Draft Saved: {userDetails?.date}
                </Typography>
                <TableIconActions icon={<TableActionsIcon />} selectButtonProps={{ disabled }}>
                    <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                    {!actionType &&
                        <PermissionProtected permission={PERMISSION.CANCEL}>
                            <MenuItem onClick={handleCancel}>Cancel this 1-on-1</MenuItem>
                        </PermissionProtected>
                    }
                </TableIconActions>
            </Box>
        </Box>
    )
}

export default ProfileInfo;

const styles = {
    info: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        borderRadius: "10px",
        boxShadow: '0px 0px 4px 0px rgba(16, 24, 40, 0.12)',
        p: '24px',
        mb: '20px'
    },
}