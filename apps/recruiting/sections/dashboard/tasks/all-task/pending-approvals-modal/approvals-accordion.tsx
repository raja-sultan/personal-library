import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import Link from "next/link";
import { CircleWithDotsIcon } from "@assets/icons/circle-with-dots-icon";
import { ArrowLongDownIcon } from "@assets/icons/arrow-long-down-icon";
import { CircleWithDotsGrayIcon } from "@assets/icons/circle-with-dots-gray-icon";

const offersData = [
  {
    id: 1,
    jobName: "Business Analyst",
    jobCount: "13",
    requestedBy: "Jhon Doe",
    createdDate: "04-05-2022",
    status: "Pending",
    openingID: "18-4",
    staredDate: "18-4-2022",
    employmentType: "Full-time",
  },
  {
    id: 2,
    jobName: "Data Analyst",
    jobCount: "10",
    requestedBy: "Jhon Doe",
    createdDate: "04-05-2022",
    status: "Pending",
    openingID: "18-4",
    staredDate: "18-4-2022",
    employmentType: "Full-time",
  },
];

export function ApprovalsAccordion(): JSX.Element {
  const [displayBody, setDisplayBody] = useState<number | null>(null);
  const theme = useTheme();

  return (
    <Box>
      {offersData.map((item: any) => {
        const isItemOpen = displayBody === item.id;
        
        return (
          <Box key={item.id} sx={{ backgroundColor: "#F9FAFB", p: 2, mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {item.jobName} ({item.jobCount})
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ mr: 2 }}>
                  <Typography color={theme.palette.neutral[400]}>
                    Requested By
                  </Typography>
                  <Typography>{item.requestedBy}</Typography>
                </Box>
                <Box sx={{ mr: 2 }}>
                  <Typography color={theme.palette.neutral[400]}>
                    Created Date
                  </Typography>
                  <Typography>{item.createdDate}</Typography>
                </Box>
                <Box sx={{ mr: 2 }}>
                  <Typography color={theme.palette.neutral[400]}>
                    Status
                  </Typography>
                  <Typography color={theme.palette.error.main}>
                    {item.status}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    padding: "0px 2px",
                    minWidth: "0px",
                    height: "30px",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    setDisplayBody((prevId) =>
                      prevId === item.id ? null : item.id
                    );
                  }}
                >
                  {isItemOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
              </Box>
            </Box>
            {isItemOpen && (
              <Box sx={{ mt: 3, flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        p: 2,
                        borderRadius: "4px",
                      }}
                    >
                      <Box>
                        <Typography color={theme.palette.neutral[400]}>
                          Opening ID
                        </Typography>
                        <Typography>{item.openingID}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 4,
                        }}
                      >
                        <Box>
                          <Typography color={theme.palette.neutral[400]}>
                            Started Date
                          </Typography>
                          <Typography>{item.staredDate}</Typography>
                        </Box>
                        <Box>
                          <Typography color={theme.palette.neutral[400]}>
                            Employment Type
                          </Typography>
                          <Typography>{item.employmentType}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={7}>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        p: 2,
                        borderRadius: "4px",
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Approval Details
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <IconButton>
                            <CircleWithDotsIcon />
                          </IconButton>
                          <ArrowLongDownIcon />
                          <IconButton>
                            <CircleWithDotsGrayIcon />
                          </IconButton>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            sx={{
                              color: theme.palette.success.main,
                              backgroundColor: theme.palette.success.light,
                              padding: "4px 15px",
                              borderRadius: 1,
                              textAlign: "center",
                            }}
                          >
                            Ole Fuller
                          </Typography>
                          <Typography
                            sx={{
                              backgroundColor: theme.palette.neutral[50],
                              padding: "4px 15px",
                              borderRadius: 1,
                              textAlign: "center",
                            }}
                          >
                            Albert
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography color={theme.palette.neutral[400]}>
                            2 of 2 required
                          </Typography>
                          <Link href="#">Mark as approved</Link>
                          <Link href="#">Send Reminder</Link>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        backgroundColor: "#FFF6ED",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                        mt: 2,
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Hey Isaac, is it okay to make this offer?
                      </Typography>
                      <Box>
                        <Button variant="outlined" sx={{ mr: 2 }}>
                          Don't Approve
                        </Button>
                        <Button variant="contained">Approve</Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
