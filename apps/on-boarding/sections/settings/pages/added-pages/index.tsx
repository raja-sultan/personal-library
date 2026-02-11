import React from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Paper,
  Typography,
  Button,
  Box,
  Grid,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import EmployeeBackground from "../../../../assets/images/my-profile/profile-background-image.jpg";
import { useRouter } from "next/router";
import Link from "next/link";

const AddedPagesData = [
  {
    id: 0,
    title: "Personal Information",
    Image: "Personal Information",
  },
  {
    id: 1,
    title: "Education",
    Image: "Education",
  },
  {
    id: 2,
    title: "Education",
    Image: "Education",
  },
  {
    id: 3,
    title: "Education",
    Image: "Education",
  },
  {
    id: 4,
    title: "Education",
    Image: "Education",
  },
];

export function AddedPages(): JSX.Element {
  const deleteHandler = (id: number) => {
    console.log("id", id);
  };

  return (
    <>
      <FormControlLabel
        label="Include Unpublished Pages"
        control={<Checkbox />}
      />
      <Grid container spacing={2} marginTop={1}>
        {AddedPagesData.map((item: any) => (
          <Grid item key={item.id} sm={12} md={6} lg={4} xl={3}>
            <Paper
              sx={{
                p: 2,
                position: "relative",
                borderRadius: "1rem",
                "&:hover Button": {
                  opacity: 1,
                },
              }}
            >
              <Box sx={{ textAlign: "right" }}>
                <FiberManualRecordIcon sx={{ color: "success.main" }} />
                <FiberManualRecordIcon sx={{ color: "error.main" }} />
              </Box>
              <Image
                src={EmployeeBackground}
                alt="employee image"
                style={{ width: "100%", height: "100%" }}
              />
              <Typography
                variant="subtitle2"
                color="neutral.700"
                textAlign="left"
                marginTop={2}
              >
                {item.title}
              </Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  position: "absolute",
                  left: "20%",
                  right: "20%",
                  top: "43%",
                  bottom: "43%",
                }}
              >
                <Button
                  onClick={() => {
                    deleteHandler(item.id);
                  }}
                  variant="outlined"
                  sx={{
                    color: "neutral.50",
                    border: "none",
                    bgcolor: "error.main",
                    "&:hover": {
                      border: "none",
                      bgcolor: "error.main",
                    },
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  Delete
                </Button>
                <Link href={`pages/page-rules?${item?.id}`}>
                  <Button
                    variant="outlined"
                    sx={{
                      border: "none",
                      bgcolor: "#fff",
                      "&:hover": {
                        border: "none",
                        bgcolor: "#fff",
                      },
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {/* <EditIcon sx={{ mr: 1 }} /> */}
                    Edit
                  </Button>
                </Link>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
