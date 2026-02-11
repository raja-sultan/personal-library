import { Grid, Typography } from "@mui/material";
import { HeadingSubHeadingCard } from "./heading-sub-heading-card";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CustomChip, Error, IsFetching } from "common";
import { useGetSingleEventDetailQuery } from "@services/crm/events/crm-events-api";
import {
  displaySuccessMessage,
  getShortName,
} from "@sections/jobs/job-info/utils";
import dayjs from "dayjs";

export function ViewDetailModelContent(): JSX.Element {
  const { data, isError, isFetching } = useGetSingleEventDetailQuery({});
  if (isFetching) return <IsFetching isFetching={isFetching} />;
  if (isError) return <Error statusCode={500} title="Will Update You Later" />;
  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    displaySuccessMessage({ data: { message: "Event link copied " } });
  };
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="body1">Event Details</Typography>
      </Grid>
      {/* Job Info cards  */}
      <Grid item container>
        <Grid item sm={3}>
          <HeadingSubHeadingCard
            heading="Name"
            subHeading={`${
              getShortName(data?.data?.eventDetails?.eventName, 15) ?? "---"
            }`}
          />
        </Grid>
        <Grid item sm={3}>
          <HeadingSubHeadingCard
            heading="Location"
            subHeading={`${
              getShortName(data?.data?.eventDetails?.location, 15) ?? "---"
            }`}
          />
        </Grid>
        <Grid item sm={3}>
          <HeadingSubHeadingCard
            heading="Event date"
            subHeading={
              data?.data?.eventDetails?.startDate
                ? dayjs(data?.data?.eventDetails?.startDate).format("MMM d")
                : "---"
            }
          />
        </Grid>
        <Grid item sm={3}>
          <HeadingSubHeadingCard
            heading="Active Form"
            subHeading={
              data?.data?.eventDetails?.startDate &&
              data?.data?.eventDetails?.endDate
                ? `${dayjs(data?.data?.eventDetails?.startDate).format(
                    "MMM d"
                  )} ${dayjs(data?.data?.eventDetails?.endDate).format(
                    "MMM d"
                  )}`
                : "---"
            }
          />
        </Grid>
      </Grid>
      <Grid item container sx={{ mt: "1.3em" }}>
        <Grid item sm={3}>
          <HeadingSubHeadingCard
            heading="Source"
            subHeading={`${
              getShortName(data?.data?.eventDetails?.source, 15) ?? "---"
            }`}
          />
        </Grid>
        <Grid item sm={3}>
          <HeadingSubHeadingCard
            heading="Prospect Pool"
            subHeading={`${
              getShortName(
                data?.data?.eventDetails?.prospectStage?.stage,
                15
              ) ?? "---"
            }`}
          />
        </Grid>
        <Grid item sm={3}>
          <HeadingSubHeadingCard
            heading="Prospect Stage"
            subHeading={`${
              getShortName(
                data?.data?.eventDetails?.prospectStage?.stage,
                15
              ) ?? "---"
            }`}
          />
        </Grid>
      </Grid>
      {/* Job Info cards  */}
      {/* chip container  */}
      <Grid item container sx={{ mt: "1.2em" }}>
        <Grid item>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Information To Be Collected From Prospects
          </Typography>
        </Grid>
        <Grid item container sx={{ mt: "0.8em" }}>
          <Grid item sm={5} container>
            {data?.data?.prospectInfoForm?.questions.length > 0 &&
              data?.data?.prospectInfoForm?.questions.map(
                (questionName, index) => {
                  return (
                    <CustomChip
                      key={index}
                      variant="success"
                      ChipProps={{ label: questionName }}
                      rootSx={{ mr: "0.3em" }}
                    />
                  );
                }
              )}
          </Grid>
        </Grid>
      </Grid>
      {/* chip container  */}
      {/* Associated User Card  */}
      <Grid item sx={{ mt: "1.4em" }}>
        <Grid item>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Associated Users
          </Typography>
        </Grid>
        <Grid item container sx={{ mt: "1.4em" }}>
          <Grid item sm={3}>
            <HeadingSubHeadingCard heading="Attendees" />
            {data?.data?.eventDetails?.attendees.length > 0 &&
              data?.data?.eventDetails?.attendees.map((attendee) => {
                return (
                  <HeadingSubHeadingCard
                    key={attendee?._id}
                    subHeading={attendee.firstName ?? attendee.firstName}
                  />
                );
              })}
          </Grid>
          <Grid item sm={3}>
            <HeadingSubHeadingCard heading="Administrators" />
            {data?.data?.eventDetails?.attendees.length > 0 &&
              data?.data?.eventDetails?.eventAdministrator.map(
                (administrator) => {
                  return (
                    <HeadingSubHeadingCard
                      key={administrator?._id}
                      subHeading={
                        administrator.firstName ?? administrator.firstName
                      }
                    />
                  );
                }
              )}
          </Grid>
        </Grid>
      </Grid>
      {/* Associated User Card  */}
      {/* Event Url  */}
      <Grid item sx={{ mt: "1.4em" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Event URL
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "primary.main", mt: "0.8em", cursor: "pointer" }}
        >
          {data?.data?.url}
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="column"
        sx={{
          backgroundColor: "rgba(222, 247, 236, 1)",
          p: "1.6em",
          borderRadius: "0.5px",
          cursor: "pointer",
        }}
        onClick={async () => {
          await copyUrl(data?.data?.url as string);
        }}
      >
        <Grid item container>
          <Grid item>
            <ContentCopyIcon />
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", ml: "0.5em" }}
            >
              What is this URL for?
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" sx={{ color: "neutral.500" }}>
            Share it with prospects during your event so they can fill out the
            form from their own devices.
          </Typography>
        </Grid>
      </Grid>
      {/* Event Url  */}
      <Grid item>
        <Grid item>
          <HeadingSubHeadingCard subHeading="Follow-Up Email" />
        </Grid>
      </Grid>
      <Grid item>
        <HeadingSubHeadingCard
          heading={data?.data?.eventEmail?.emailTemplate}
        />
      </Grid>
      <Grid item>
        <Grid item>
          <HeadingSubHeadingCard subHeading="Default Event Prospect Auto Reply" />
        </Grid>
      </Grid>
    </Grid>
  );
}
