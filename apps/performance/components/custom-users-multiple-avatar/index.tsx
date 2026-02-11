import { CustomPopover } from "@components/custom-popover";
import { Box, Tooltip } from "@mui/material";
import { renderUserImage } from "@root/utils/render-user-image";

interface User {
    _id: string,
    profileImage: string,
    firstName: string,
    lastName: string
}

interface Props {
    data: User[];
    count?: number
}


export function CustomUserAvatar({ data, count = 3 }: Props): JSX.Element {
    const limit = data?.slice(0, count);
    const remaining = data?.slice(count);
    const totalLength = data?.length - limit?.length

    return (
        <Box display='flex' alignItems='center'>
            {limit?.length > 0 ? limit?.map((user) => (
                <Box key={user?._id} sx={{ ml: '-5px', '&:first-child()': { ml: 0 } }}>
                    <Tooltip arrow title={`${user?.firstName} ${user?.lastName}`}>
                        {renderUserImage({
                            ...user,
                        })}
                    </Tooltip>
                </Box>
            )) : '--'}
            <CustomPopover
                customActionComponent={totalLength > 1 ? <Box sx={styles.moreIcon}>
                    {totalLength}+
                </Box> : false}
                customComponent={
                    <Box display='flex' alignItems='center' gap='12px' padding='10px'>
                        {remaining?.map((user) => (
                            <Tooltip key={user?._id} arrow title={`${user?.firstName} ${user?.lastName}`}>
                                {renderUserImage({
                                    ...user,
                                })}
                            </Tooltip>
                        ))}
                    </Box>
                }
            />
        </Box>
    )
}

const styles = {
    moreIcon: ({ palette: { neutral, common, mode } }) => ({
        height: '32px', width: '32px',
        borderRadius: '50px', border: `1px solid ${common.white}`, ml: '-5px',
        backgroundColor: neutral[mode === 'dark' ? 300 : 200],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        color: common.black
    })
}