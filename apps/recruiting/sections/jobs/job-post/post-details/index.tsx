import { Card, Grid, Typography } from "@mui/material";
import { PostDetailsFormData } from "./post.details.data";
import { useSearchParams } from "next/navigation";
import { RHFAutocompleteSync } from "common";
import { useGetJobOpeningIdListQuery } from "@services/jobs/create-jobs/job-post/job-post-api";
import { useGetJobBoardsQuery } from "@services/configuration/job-boards/job-boards-api";

export function PostDetails(): JSX.Element {
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const jobsId = searchParams.get("jobId");

  //Job Opening ID API
  const { data: apiQuery } = useGetJobOpeningIdListQuery({
    payload: { jobId: jobsId },
  });

  //Job Boards GET List API
  const { data: boardsList } = useGetJobBoardsQuery({});

  return (
    <Card
      sx={{
        p: 3,
        backgroundColor: "background.paper",
        borderRadius: "10px",
        boxShadow: "none !important",
      }}
    >
      <Grid container rowSpacing={2} columnSpacing={2}>
        {action === "edit" && (
          <Grid item xs={12}>
            <Typography variant="h5">Edit Job Posts</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="body1">
            Configure the job details and how candidates will apply.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Post details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <RHFAutocompleteSync
            renderOption={false}
            options={
              apiQuery?.data?.length
                ? apiQuery.data.map((item) => {
                    return {
                      _id: item?._id,
                      openingId: item?.openingId,
                    };
                  })
                : []
            }
            getOptionLabel={(option: any) => option?.openingId}
            outerLabel="Opening ID"
            placeholder="Select Opening Id"
            fullWidth
            name="openingId"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <RHFAutocompleteSync
            renderOption={false}
            options={
              boardsList?.data?.length
                ? boardsList.data.map((item) => {
                    return {
                      _id: item?._id,
                      type: item?.type,
                      name: item?.name,
                    };
                  })
                : []
            }
            getOptionLabel={(option: any) => option?.name}
            outerLabel="Post To"
            placeholder="Select Post To"
            fullWidth
            name="postTo"
          />
        </Grid>

        {PostDetailsFormData?.map((item) => (
          <Grid item xs={12} md={item?.md} key={item?.id}>
            <item.component {...item.componentProps} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
