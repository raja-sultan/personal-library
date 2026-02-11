import { Paper, Typography, Stack, Button } from "@mui/material";
import { CustomTable } from "common";
import React from "react";
import { AgenciesArray, agenciesTable } from "./agencies-data";
import { style } from "./agencies-style";

export function Agencies(): JSX.Element {
  const { columns } = agenciesTable();
  return (
    <Paper sx={{ p: 2 }}>
      <Stack sx={style.headerStyle}>
        <Typography variant="h3" component="h3">
          Agencies
        </Typography>

        <Typography variant="body1" component="span">
          Job Status:&nbsp;<span>Open</span>
        </Typography>
      </Stack>
      <Stack sx={style.headerStyle}>
        <Typography variant="h3" component="h3">
          Hiring Team
        </Typography>

        <Button variant="contained" sx={{ borderRadius: "8px" }}>
          Assign Another Agency
        </Button>
      </Stack>

      {/* <TableHeader
          onChanged={(e: any) => {console.log(e, "onChanged Function")}}
          tableHeaderData={[
            {
              type: "search",
              FieldProps: {
                name: "search",
                placeholder: "Search",
              },
            },
          ]}
        /> */}

      <CustomTable
        columns={columns}
        data={AgenciesArray}
        isLoading={false}
        isFetching={false}
        isError={false}
        isSuccess
        isPagination
      />
    </Paper>
  );
}
