import { Message } from "@assets/common/message";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { PeopleFollowFormModal } from "./people-follow-modal";

const peopleData = [
  {
    id: 1,
    profilePic: "",
    alt: "Profile",
    name: "Cameron Williamson",
    designation: "UI/UX Designer",
  },
  {
    id: 2,
    profilePic: "",
    alt: "Profile",
    name: "Cameron Williamson",
    designation: "UI/UX Designer",
  },
  {
    id: 3,
    profilePic: "",
    alt: "Profile",
    name: "Cameron Williamson",
    designation: "UI/UX Designer",
  },
];

export function FollowPeople(): React.JSX.Element {
  const [postInterviews, setPostInterviews] = useState<boolean>(false);

  return (
    <Box
      sx={{
        mt: 2,
        px: 2,
        py: 1,
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">People | Follow</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setPostInterviews(true);
            }}
          >
            See All
          </Button>
        </Box>
      </Box>
      {peopleData.map((item: any) => {
        return (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #EAECF0",
              "&:last-child": { borderBottom: "0" },
              py: 1,
              mt: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box sx={{ mr: 2 }}>
                <Avatar alt={item.alt} src="/static/images/avatar/1.jpg" />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {item.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary" }}
                >
                  {item.designation}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Link href="#">
                <IconButton
                  sx={{
                    p: 1,
                    backgroundColor: "#F9FBFC",
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                  }}
                >
                  <Message />
                </IconButton>
              </Link>
            </Box>
          </Box>
        );
      })}

      <PeopleFollowFormModal
        postInterviews={postInterviews}
        setPostInterviews={setPostInterviews}
      />
    </Box>
  );
}
