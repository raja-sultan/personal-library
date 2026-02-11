import { Avatar, Box, Button, Card, Skeleton, Typography } from '@mui/material';
import { TableSkeleton } from 'common';
import { styles } from "../../../../../../components/profile/profile-upload/profile-upload.styles";
import Image from 'next/image';
import React from 'react'
import { awsBaseUrl } from '@root/config';
import { bgPlaceholderImage } from '@assets/images';
import { useRouter } from 'next/navigation';

export function ProfileUploadView({
  isLoading,
  data,
}): JSX.Element {

  const router = useRouter();

  function getInitials(firstName: string, lastName: string): string {
    const initials = firstName?.charAt(0) + lastName?.charAt(0);
    return initials;
  }

  return (
    <Card sx={styles.cardStyle}>
      <Box sx={{ position: "relative" }}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Image
            style={styles.uploadImg}
            height={200}
            width={1700}
            src={
              data?.coverImage
                ? `${awsBaseUrl}${data?.coverImage}`
                : bgPlaceholderImage
            }
            alt="Cover Photo"
          />
        )}

      </Box>
      <Box sx={{ padding: "24px" }}>
        <Box sx={styles.flex}>
          <Box sx={{ marginTop: "-8.50rem" }}>
            <Box sx={styles.avatarWrapper}>
              <Box position="relative">
                {isLoading ? (
                  <Skeleton variant="circular" width={125} height={125} />
                ) : (
                  <Avatar
                    src={`${awsBaseUrl}${data?.profileImage ? data?.profileImage : "N/A"}`}
                    sx={styles.avatarStyle}
                  >
                    {getInitials(data?.firstName ? data?.firstName : "N/A", data?.lastName ? data?.lastName : "N/A")}
                  </Avatar>
                )}

              </Box>
              <Box>
                <Typography component="h5" sx={{ fontWeight: 600 }}>
                  {data?.firstName ? data?.firstName : "N/A"}&nbsp;
                  {data?.lastName ? data?.lastName : "N/A"}
                </Typography>
                <Typography component="p" variant="body2" sx={{ color: "neutral.500" }}>
                  {data?.employeeTitle}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={styles.buttonsWrapper}>
            <Button
              variant="outlined"
              onClick={() => {
                router.push("/one-on-ones");
              }}
              sx={styles.buttonStyles}
            >
              Setup 1 on 1s
            </Button>
            <Button variant="outlined" sx={styles.buttonStyles} onClick={() => { router.push(`/feedback/add-feedback?tab=0`) }}>
              Give or Request Feedback
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>

  )
}