import { Box, Grid, styled, useTheme } from "@mui/material";
import type { ITableHeaderData } from "@root/types/table-header";
import { useGetAllActivityFeedListQuery } from "@services/candidate/candidate-details/activity-feed/activity-feed-api";
import { IsFetching, NoContent, TableHeader } from "common";
import { useSearchParams } from "next/navigation";
import Activity from "./activity/activity";
import { allActivitiesOptions } from "./data";
import Email from "./email/email";
import Reminders from "./reminders/reminders";
import { Scorecard } from "./scorecard/score-card";
import { useState } from "react";
import Notes from "./notes/notes";

export function ActivityFeedSection(): JSX.Element {
  const theme = useTheme();
  const [params, setParams] = useState<any>();

  const candidateId = useSearchParams().get("candidateID");

  const CustomScrollbar = styled(Grid)({
    maxHeight: 800,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "1px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  });
  const tableHeaderData: ITableHeaderData[] = [
    {
      type: "select",
      FieldProps: {
        name: "activityType",
        label: "All Activity Types",
      },
      options: allActivitiesOptions,
    },

    {
      type: "select",
      FieldProps: {
        name: "sortBy",
        label: "SortBy",
      },
      options: [
        { value: "recent", label: "Most Recent" },
        { value: "oldest", label: "Oldest" },
      ],
    },
  ];
  const { data, isLoading, isError } = useGetAllActivityFeedListQuery({
    params: {
      candidateId,
      sort: params?.sortBy,
    },
  });
  if (isLoading)
    return (
      <Box position="relative" height={300}>
        <IsFetching isFetching />
      </Box>
    );
  if (isError)
    return (
      <Box display="flex" justifyContent="center" mt={2}>
        <NoContent />
      </Box>
    );
  return (
    <Box px={2} bgcolor={theme?.palette?.background?.paper} overflow="hidden">
      <Box mb={2}>
        <TableHeader
          onChanged={(e) => {
            setParams(e);
          }}
          showClearFilterButton
          tableHeaderData={tableHeaderData}
          gridProps={{ lg: 2.7 }}
        />
      </Box>

      <CustomScrollbar>
        <ActivityFeedSectionRenderComponent
          value={params?.activityType}
          data={data}
        />
      </CustomScrollbar>
    </Box>
  );
}

function ActivityFeedSectionRenderComponent(params: any): JSX.Element {
  const { value, data } = params;
  const theme = useTheme();
  switch (value) {
    case "scoreCards":
      return (
        <>
          {data?.data?.scorecard ? (
            <Grid
              container
              mb={2}
              borderRadius={1}
              p={2}
              bgcolor={theme?.palette?.background?.default}
            >
              {data?.data?.scorecard?.length <= 0 && (
                <Box display="flex" justifyContent="center" width="100%" mt={2}>
                  <NoContent />
                </Box>
              )}
              {data?.data?.scorecard?.map((ele: any, index) => (
                <Grid key={ele?.id} item xs={12} pb={1}>
                  <Scorecard {...ele} index={index} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
        </>
      );
    case "activity":
      return (
        <>
          {data?.data?.activity?.length <= 0 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
          {data?.data?.activity ? (
            <Grid container>
              {data?.data?.activity?.map((ele: any) => (
                <Activity key={ele?.id} {...ele} />
              ))}
            </Grid>
          ) : (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
        </>
      );
    case "emails":
      return (
        <>
          {data?.data?.emails?.length <= 0 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
          {data?.data?.emails ? (
            <Grid container>
              {data?.data?.emails?.map((ele: any) => (
                <Email key={ele?.id} {...ele} />
              ))}
            </Grid>
          ) : (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
        </>
      );
    case "Reminders":
      return (
        <>
          {data?.data?.reminders?.length <= 0 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
          {data?.data?.reminders ? (
            <Grid container>
              {data?.data?.reminders?.map((ele: any) => (
                <Reminders key={ele?.id} {...ele} />
              ))}
            </Grid>
          ) : (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
        </>
      );
    case "notes":
      return (
        <>
          {data?.data?.notes?.length <= 0 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
          {data?.data?.notes ? (
            <Grid container>
              {data?.data?.notes?.map((ele: any) => (
                <Notes key={ele?.id} {...ele} />
              ))}
            </Grid>
          ) : (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
        </>
      );

    default: {
      const hasNoContent =
        !data?.data?.scorecard?.length &&
        !data?.data?.activity?.length &&
        !data?.data?.emails?.length &&
        !data?.data?.reminders?.length &&
        !data?.data?.notes?.length;
      return (
        <>
          {data?.data?.scorecard && data?.data?.scorecard?.length > 0 ? (
            <Grid
              container
              mb={2}
              borderRadius={1}
              p={2}
              bgcolor={theme?.palette?.background?.default}
            >
              {data?.data?.scorecard?.map((ele: any, index) => (
                <Grid key={ele?.id} item xs={12} pb={1}>
                  <Scorecard {...ele} index={index} />
                </Grid>
              ))}
            </Grid>
          ) : null}
          {data?.data?.activity && data?.data?.activity?.length > 0 ? (
            <Grid container>
              {data?.data?.activity?.map((ele: any) => (
                <Activity key={ele?.id} {...ele} />
              ))}
            </Grid>
          ) : null}
          {data?.data?.emails && data?.data?.emails?.length > 0 ? (
            <Grid container>
              {data?.data?.emails?.map((ele: any) => (
                <Email key={ele?.id} {...ele} />
              ))}
            </Grid>
          ) : null}
          {data?.data?.reminders && data?.data?.reminders?.length > 0 ? (
            <Grid container>
              {data?.data?.reminders?.map((ele: any) => (
                <Reminders key={ele?.id} {...ele} />
              ))}
            </Grid>
          ) : null}
          {data?.data?.notes && data?.data?.reminders?.notes > 0 ? (
            <Grid container>
              {data?.data?.notes?.map((ele: any) => (
                <Notes key={ele?.id} {...ele} />
              ))}
            </Grid>
          ) : null}
          {hasNoContent && (
            <Box display="flex" justifyContent="center" mt={2}>
              <NoContent />
            </Box>
          )}
        </>
      );
    }
  }
}
