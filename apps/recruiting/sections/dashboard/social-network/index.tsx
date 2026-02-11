import { LinkedInIcon } from "@assets/icons/linkedin-icon";
import { TwitterIcon } from "@assets/icons/twitter-icon";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { PostModal } from "./post-modal";
import { SocialLinkModal } from "./social-link-modal";
import { TwitterModal } from "./twitter-modal";
import { ScheduleModal } from "./schedule-modal";

const SocialNetworkData = [
  {
    id: 1,
    image: <LinkedInIcon sx={{ height: "36px", width: "36px" }} />,
    title: "Connect To LinkedIn",
    description: "Schedule Posts",
    points: 0,
    candidates: 0,
    active: 0,
    hired: 0,
  },
  {
    id: 2,
    image: <TwitterIcon sx={{ height: "36px", width: "36px" }} />,
    title: "Connect To Twitter",
    description: "Auto Posting 2 jobs weekly",
    points: 0,
    candidates: 0,
    active: 0,
    hired: 0,
  },
];

export function SocialNetwork(): React.JSX.Element {
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const [openSocialModal, setOpenSocialModal] = useState<boolean>(false);
  const [openTwitterModal, setOpenTwitterModal] = useState<boolean>(false);
  const [openScheduleModal, setOpenScheduleModal] = useState<boolean>(false);

  const postModalHandler = (): void => {
    setOpenPostModal(!openPostModal);
  };

  const SocialModalHandler = (): void => {
    // setOpenTwitterModal(!openTwitterModal);
    setOpenSocialModal(!openSocialModal);
  };
  const ScheduleModalHandler = (): void => {
    setOpenScheduleModal(!openScheduleModal);
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Box>
        <Typography variant="h6">
          Share Jobs with your Social Network
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Social media handles</TableCell>
              <TableCell align="center">Points</TableCell>
              <TableCell align="center">Candidates</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Hired</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SocialNetworkData.map((item: any) => (
              <TableRow
                key={item?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Box sx={{ mr: 1, mt: 0.6 }}>
                        <IconButton sx={{ p: 0 }}>{item?.image}</IconButton>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          onClick={SocialModalHandler}
                          sx={{ fontWeight: 600, cursor: "pointer" }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="p"
                          sx={{ cursor: "pointer" }}
                          onClick={ScheduleModalHandler}
                        >
                          {item.description}  
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Button variant="outlined" onClick={postModalHandler}>
                        Post
                      </Button>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">{item?.points}</TableCell>
                <TableCell align="center">{item?.candidates}</TableCell>
                <TableCell align="center">{item?.active}</TableCell>
                <TableCell align="center">{item?.hired}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      />
      <SocialLinkModal
        openSocialModal={openSocialModal}
        setOpenSocialModal={setOpenSocialModal}
      />
      <TwitterModal
        openTwitterModal={openTwitterModal}
        setOpenTwitterModal={setOpenTwitterModal}
      />
      <ScheduleModal
        openScheduleModal={openScheduleModal}
        setOpenScheduleModal={setOpenScheduleModal}
      />
    </Box>
  );
}
