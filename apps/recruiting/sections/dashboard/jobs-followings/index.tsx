import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { useGetFollowJobsQuery } from "@services/dashboard/jobs-following/jobs-following-api";

export function JobsFollowings(): React.JSX.Element {
  const { data } = useGetFollowJobsQuery({ limit: 4, offset: 0 });
  const theme: any = useTheme();

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Jobs I'm Following</Typography>
          <Link href="/dashboard/job-i-am-following">
            <Button variant="outlined">See All</Button>
          </Link>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "600",
                      textTransform: "capitalize",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Job
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "600",
                      textTransform: "capitalize",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Department
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "600",
                      textTransform: "capitalize",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Office
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "600",
                      textTransform: "capitalize",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Candidates
                  </Typography>
                </TableCell>
                {/* <TableCell align="center">New</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.jobs?.map((item: any) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {item?.jobInfo?.jobName ?? "---"}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {item?.departmentData[0]?.departmentName ?? "---"}
                  </TableCell>
                  <TableCell align="left">
                    {item?.locationData[0]?.address ?? "---"}
                  </TableCell>
                  <TableCell align="center">
                    {item?.jobCandidatesCount ?? "---"}
                  </TableCell>
                  {/* <TableCell align="center">{item?.new ?? "---"}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
