import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import {
  Box,
  Card,
  CardContent,
  Divider,
  useTheme,
  Typography,
} from "@mui/material";
import { styles } from "./audit-trail.styles";
import { useGetAuditTrialQuery } from "@services/sso-admin-dashboard-api";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export function AuditTrail(): JSX.Element {
  const router = useRouter();
  const { data, isLoading } = useGetAuditTrialQuery({});
  return (
    <Card sx={styles.cardStyling}>
      {isLoading ? (
        <CardContent>Loading . . .</CardContent>
      ) : (
        <CardContent>
          <Box sx={styles.cardHeaderWrapper}>
            <Typography variant="h6">Audit Trail</Typography>
            <Box
              onClick={() => {
                router.push("/audit-log");
              }}
            >
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                View All
              </Typography>
            </Box>
          </Box>
          <Timeline sx={styles.timeLineStyling}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Recent Activities
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              <Box sx={{ mt: 0 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2, mt: 2 }}
                >
                  Today
                </Typography>
              </Box>
              <LogDisplay dataArray={data?.data?.todayResult} />
            </Box>
            <Box sx={{ mt: 0.5 }}>
              <Box sx={{ mt: "-10px" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2, mt: 2 }}
                >
                  Yesterday
                </Typography>
              </Box>
              <LogDisplay dataArray={data?.data?.yesterdayResult} />
            </Box>
          </Timeline>
        </CardContent>
      )}
    </Card>
  );
}
function LogDisplay(props): JSX.Element {
  const theme = useTheme();
  const { dataArray: item } = props;
  return (
    <>
      {item?.length ? (
        item?.map((list, index) => {
          const date = dayjs().format("YYYY-MM-DD");
          const time = dayjs(`${date}T${list.eventTime}`).format("hh:mm A");
          return (
            <TimelineItem key={list._id} sx={{ minHeight: "45px" }}>
              <TimelineSeparator>
                <TimelineDot
                  sx={styles.timeLineDotStyling({ index })}
                  variant={!index ? "filled" : "outlined"}
                />
                {1 + index !== item?.length && (
                  <TimelineConnector
                    sx={{
                      border: `1px solid ${theme.palette.primary.main}`,
                    }}
                  />
                )}
              </TimelineSeparator>
              <TimelineContent sx={styles.timelineContentWrapper({ index })}>
                <Typography variant="body2" sx={styles.descriptionStyling}>
                  {list.trialMgs}
                </Typography>
                <Divider sx={styles.dividerStyling} />
                <Typography variant="subtitle2" sx={styles.timeStyling}>
                  {time}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          );
        })
      ) : (
        <Typography variant="subtitle1" sx={{ color: "primary.main" }}>
          No Logs Found
        </Typography>
      )}
    </>
  );
}
