import React from "react";
import { Box, Card, Divider, Typography } from "@mui/material";
import { ClockIcon, EmailIcon, PhoneIcon } from "@assets/icons";
import dayjs from "dayjs";

export const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string" || string.trim() === "") {
    return "";
  }

  return string
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
function PersonalInfoCard({ data }: any): JSX.Element {
  const cardData = [
    {
      id: 1,
      personalInfo: [
        {
          id: 1,
          icon: <EmailIcon />,
          title: data?.data?.workEmail,
        },
        {
          id: 2,
          icon: <PhoneIcon />,
          title: "+44 7700 900077",
        },
        {
          id: 3,
          icon: <ClockIcon />,
          title: `${dayjs().format("h:mm A")} (${data?.data?.location
            ?.address})`,
        },
      ],
      about: data?.data?.about,
      department: data?.data?.department?.departmentName,
      gender: capitalizeFirstLetter(data?.data?.gender),
    },
  ];
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Personal Info
      </Typography>
      {cardData.map((item) => (
        <Box key={item.id}>
          {item.personalInfo.map((list) => (
            <Box
              key={list.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 0.7,
              }}
            >
              <Box sx={{ color: "text.secondary", pt: 0.7 }}>{list.icon}</Box>
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                {list.title}
              </Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            About
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {item.about}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
            Department
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {item.department}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, mt: 3 }}>
            Gender
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {item.gender}
          </Typography>
        </Box>
      ))}
    </Card>
  );
}

export default PersonalInfoCard;
