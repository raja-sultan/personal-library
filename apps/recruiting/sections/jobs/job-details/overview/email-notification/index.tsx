import {
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetJobNotificationQuery } from "@services/jobs/create-jobs/job-details-api";
import { IsFetching } from "common";
import { useSearchParams } from "next/navigation";

export function EmailNotification(): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data, isLoading }: any = useGetJobNotificationQuery({
    jobId,
  });
  if (isLoading) {
    return (
      <Box position="relative" height="50vh">
        <IsFetching isFetching />
      </Box>
    );
  }

  return (
    <Box>
      <Card sx={{ mt: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #f2f4f7",
              pb: 2,
            }}
          >
            <Typography variant="h6">Email Notification</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      Email Types
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      User(s)
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">
                      Weekly Recruiting Report
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {data?.data?.notifiers?.weeklyRecruitingReport?.map(
                      (item: any) => {
                        return (
                          <Typography variant="subtitle2" key={item?._id}>
                            {`${item?.firstName} ${item?.lastName}`},
                          </Typography>
                        );
                      }
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">New Applicants</Typography>
                  </TableCell>
                  <TableCell>
                    {data?.data?.notifiers?.newApplicants?.map((item: any) => {
                      return (
                        <Typography variant="subtitle2" key={item?._id}>
                          {`${item?.firstName} ${item?.lastName}`},
                        </Typography>
                      );
                    })}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">
                      New Internal Applicants
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {data?.data?.notifiers?.newInternalApplicants?.map(
                      (item: any) => {
                        return (
                          <Typography variant="subtitle2" key={item?._id}>
                            {`${item?.firstName} ${item?.lastName}`},
                          </Typography>
                        );
                      }
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">New Referrals</Typography>
                  </TableCell>
                  <TableCell>
                    {data?.data?.notifiers?.newReferrals?.map((item: any) => {
                      return (
                        <Typography variant="subtitle2" key={item?._id}>
                          {`${item?.firstName} ${item?.lastName}`},
                        </Typography>
                      );
                    })}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">
                      Approved to Start Recruiting
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {data?.data?.notifiers?.startRecruiting?.map(
                      (item: any) => {
                        return (
                          <Typography variant="subtitle2" key={item?._id}>
                            {`${item?.firstName} ${item?.lastName}`},
                          </Typography>
                        );
                      }
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">
                      Offer Fully Approved
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {data?.data?.notifiers?.offerFullyApproved?.map(
                      (item: any) => {
                        return (
                          <Typography variant="subtitle2" key={item?._id}>
                            {`${item?.firstName} ${item?.lastName}`},
                          </Typography>
                        );
                      }
                    )}
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="subtitle2">
                      Stage Transitions
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {data?.data?.stageTransitionNotifiers?.users?.map(
                      (item: any) => {
                        return (
                          <Typography variant="subtitle2" key={item?._id}>
                            {`${item?.firstName} ${item?.lastName}`},
                          </Typography>
                        );
                      }
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
