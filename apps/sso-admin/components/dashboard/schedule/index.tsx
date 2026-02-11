import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, Grid, Typography } from "@mui/material";
import Link from "next/link";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const curr = new Date();
const week: string[] = [];

for (let i = 1; i <= 7; i++) {
  const first = curr.getDate() - curr.getDay() + i;
  const day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  week.push(day);
}
export function Schedule({ data }): JSX.Element {
  //converting data into FE schema
  const rows = data?.map((item) => {
    const { firstName, lastName, demoDateAndTime } = item;
    const client = `${firstName} ${lastName}`;
    const dayOfWeek = new Date(demoDateAndTime).getDay();
    const time = new Date(demoDateAndTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const event = "reminder";

    const row = {
      client,
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {},
    };

    switch (dayOfWeek) {
      case 0:
        row.sunday = { time, event };
        break;
      case 1:
        row.monday = { time, event };
        break;
      case 2:
        row.tuesday = { time, event };
        break;
      case 3:
        row.wednesday = { time, event };
        break;
      case 4:
        row.thursday = { time, event };
        break;
      case 5:
        row.friday = { time, event };
        break;
      case 6:
        row.saturday = { time, event };
        break;
    }

    return row;
  });

  return (
    <Grid
      p={2}
      container
      alignContent="flex-start"
      sx={{
        boxShadow: " 0px 5px 25px 0px rgba(105, 105, 105, 0.10)",
        maxHeight: "auto",
        overflow: "hidden",
        borderRadius: "8px",
        minHeight: "430px",
        rowGap: 3,
      }}
    >
      <Grid item xs={12}>
        <ScheduleHeader />
      </Grid>
      <Grid item xs={12}>
        <TableContainer
          component={Card}
          sx={{
            border: "1px solid #C4C4CC",
            borderRadius: 2,
          }}
        >
          <Table
            size="small"
            sx={{
              maxWidth: "auto",
              minWidth: 600,
            }}
          >
            <TableHead>
              <TableRow>
                {["Client", ...DAYS].map((day, i) => (
                  <TableCell
                    key={day}
                    sx={{
                      borderRight: "1px solid #C4C4CC",
                      borderBottom: "1px solid #C4C4CC",
                      width: "90px",
                      color: "#565666",
                    }}
                  >
                    <Grid
                      sx={{
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {day}
                    </Grid>
                    <Grid
                      sx={{
                        textAlign: "end",
                        fontWeight: 400,
                        fontSize: "10px",
                      }}
                    >
                      {Boolean(i) && week[i - 1]}
                    </Grid>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow
                  key={row.client}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {index < 4 &&
                    ["Client", ...DAYS].map((day: string) => {
                      const key: string = day.toLocaleLowerCase();
                      return (
                        <TableCell
                          component="th"
                          scope="row"
                          key={day}
                          sx={{
                            border: "1px solid #C4C4CC",
                            fontSize: "12px",
                            borderBottom: "0",
                          }}
                        >
                          <>
                            {key === "client" ? (
                              <Grid
                                sx={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: "#565666",
                                  textAlign: "end",
                                }}
                              >
                                {row.client}
                              </Grid>
                            ) : (
                              Boolean(row[key].time) && (
                                <Grid
                                  sx={{
                                    p: 0.5,
                                    minWidth: "60px",
                                    borderRadius: "4px",
                                    bgcolor: "#A5AFEE",
                                    // bgcolor: getEventColor(row[key].event),
                                    color: "white",
                                    textAlign: "center",
                                  }}
                                >
                                  {row[key].time}
                                </Grid>
                              )
                            )}
                          </>
                        </TableCell>
                      );
                    })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

function ScheduleHeader(): JSX.Element {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Typography fontSize="18px" color="#565666" fontWeight={600}>
          Schedule
        </Typography>
      </Grid>
      <Grid item xs={5.7} textAlign="right">
        <Link href="/calendar" style={{ textDecoration: "none" }}>
          <Typography fontWeight={600} variant="body2" color="primary.main">
            View All
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
}
