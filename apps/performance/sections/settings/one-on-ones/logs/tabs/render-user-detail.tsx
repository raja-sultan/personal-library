import { Box, Typography } from "@mui/material"
import { renderUserImage } from "@root/utils/render-user-image"

export function RenderUserInfo({ firstName, lastName, profileImage, userRole, height = 32, width = 32 }: {
  firstName: string, lastName: string, profileImage: string, userRole: string, height?: string | number, width?: string | number
}): JSX.Element {
  return (
    <Box display='flex' alignItems='center' gap='24px' flex={1}>
      {renderUserImage({
        profileImage,
        firstName,
        lastName,
        height, width
      })}
      <Box>
        <Typography variant='subtitle1' fontWeight='600' color='neutral.900' textTransform='capitalize'>
          {firstName}&nbsp;{lastName}
        </Typography>
        <Typography variant='subtitle1' fontWeight='400' color='neutral.500' textTransform='capitalize'>
          {userRole}
        </Typography>
      </Box>
    </Box>
  )
}