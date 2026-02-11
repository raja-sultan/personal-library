"use client";
import { Box, Grid } from "@mui/material";
import { EditDepartmentsHeader } from "./edit-departments-header";
import { Members } from "./members";
import { DepartmentsHeads } from "./departments-heads";
import { useEditDepartment } from "./use-edit-department";
import { NoDataFound } from "@components/no-data";
import { ViewDepartmentsNoDataIcon } from "@assets/icons/view-departments-no-data";

export function EditDepartmentsSection(): JSX.Element {
  const { getMembers, getHeads } = useEditDepartment();
  const hasMembersData = getMembers?.data?.members && getMembers?.data?.members.length > 0;
  const hasHeadsData = getHeads?.data?.heads && getHeads?.data?.heads.length > 0;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EditDepartmentsHeader />
        </Grid>
        <Grid item xs={12}>
          {hasMembersData || hasHeadsData ? null : (
            <NoDataFound
              isCustomCard
              sx={{ height: "46vh" }}
              icon={<ViewDepartmentsNoDataIcon />}
              heading="No members have been added yet"
              description="Once added, you’ll see department members here"
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Box>{hasHeadsData && <DepartmentsHeads />}</Box>
          <Box mt={3}>{hasMembersData && <Members />}</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
