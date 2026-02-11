import React from "react";
import dayjs from "dayjs";
import { Box, Typography, useTheme, Card } from "@mui/material";
import { styles } from "./personal-info.styles";
import { EmailIcon } from "@assets/icons/email-icon";
import { PhoneNumberIcon } from "@assets/icons/phone-number-icon";
import { ClockIcon } from "@assets/icons/clock-icon";
import { ComponentLoader } from "@components/component-loader";
import { renderUserImage } from "@root/utils/render-user-image";

export function PersonalInfo({
  data = {
    email: "N/A",
    contactNumber: "N/A",
    timeZone: "N/A",
    about: "N/A",
    firstName: "N/A",
    lastName: "N/A",
    gender: "N/A",
    employmentStartDate: null,
    departmentName: "N/A",
    directReport: "N/A",
  },
  isLoading,
}: any): JSX.Element | null {
  const theme = useTheme();
  // direct Report
  const firstName = data?.manager?.firstName;
  const lastName = data?.manager?.lastName;
  const profileImage = data?.manager?.profileImage;

  return (
    <Card sx={styles.personalWrapper(theme)}>
      {isLoading ? <ComponentLoader /> :
        <>
          <Typography variant="body1" sx={styles.label}>
            Personal Info
          </Typography>

          <Box sx={styles.icon}>
            <EmailIcon />
            <Typography variant="body2" sx={styles.title(theme)}>
              {data?.email ? data?.email : "N/A"}
            </Typography>
          </Box>

          <Box sx={styles.icon}>
            <PhoneNumberIcon />
            <Typography variant="body2" sx={styles.title(theme)}>
              {data?.contactNumber ? data?.contactNumber : "N/A"}
            </Typography>
          </Box>

          <Box sx={styles.icon}>
            <ClockIcon />
            <Typography variant="body2" sx={styles.title(theme)}>
              {data?.timeZone ? data?.timeZone : "N/A"}
            </Typography>
          </Box>

          <Box sx={styles.profileBio(theme)}>
            <Typography variant="body1" sx={styles.heading}>
              BIO
            </Typography>
            <Typography variant="body2" sx={styles.desc(theme)}>
              {data?.about ? data?.about : "N/A"}
            </Typography>
          </Box>

          <Box sx={styles.profileBio(theme)}>
            <Typography variant="body1" sx={styles.heading}>
              Department
            </Typography>
            <Typography variant="body2" sx={styles.desc(theme)}>
              {data?.department?.departmentName ? data?.department?.departmentName : "N/A"}
            </Typography>

            <Typography variant="body1" sx={styles.heading}>
              Direct Reports
            </Typography>
            <Box display="flex" justifyContent="start" alignItems="center" gap={1} mt='1.3rem'>
              {renderUserImage({ profileImage, firstName, lastName })}
              {firstName} {lastName}
            </Box>
          </Box>

          <Box sx={styles.profileBio(theme)}>
            <Typography variant="body1" sx={styles.heading}>
              Start Date
            </Typography>
            <Typography variant="body2" sx={styles.desc(theme)}>
              {dayjs(data?.employmentStartDate).format("ddd DD, YYYY")}
            </Typography>
          </Box>

          <Box sx={{ pb: 2 }}>
            <Typography variant="body1" sx={styles.heading}>
              Gender
            </Typography>
            <Typography variant="body2" sx={styles.desc(theme)}>
              {data?.gender ? data?.gender : "N/A"}
            </Typography>
          </Box>
        </>}
    </Card>
  );
}
