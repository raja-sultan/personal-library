import { type SetStateAction, type Dispatch } from "react";
import { CustomModal } from "common";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { Message } from "@assets/common/message";

const peopleFollowData = [
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

export function PeopleFollowFormModal({
  postInterviews,
  setPostInterviews,
}: {
  postInterviews: boolean;
  setPostInterviews: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  // const theme = useTheme();

  return (
    <CustomModal
      onClose={setPostInterviews}
      rootSx={{
        maxWidth: { xs: 350, sm: 500, lg: 750, xl: 1000 },
      }}
      headerLabel="People I Follow"
      closeButtonProps={{
        onClick: () => {
          setPostInterviews(false);
        },
      }}
      isOpen={postInterviews}
    >
      {peopleFollowData.map((item: any) => {
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
              mt: 2,
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
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2">{item.designation}</Typography>
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
    </CustomModal>
  );
}
