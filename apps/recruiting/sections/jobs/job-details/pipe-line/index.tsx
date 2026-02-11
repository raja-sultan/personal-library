import {
  Card,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import { visualPipeline } from "./pipe-line.data";
import { CustomChip, DnDDraggableElement, DnDDraggableListItem } from "common";
import { AppReviewSection } from "./app-review";
import { styles } from "./pipe-line.styles";
import WestIcon from "@mui/icons-material/West";
import { DragDropContext } from "react-beautiful-dnd";
import dayjs from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useGetJobStageDetailsQuery,
  useUpdateCandidateStageMutation,
} from "@services/jobs/job-details/pipeline-api";
import toast from "react-hot-toast";
import { JobDetailsHeader } from "../job-details-header";

export function PipeLineSection(): JSX.Element {
  const router = useRouter();
  const params = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    jobId: params.get("jobId"),
    sortBy: "LAST_ACTIVITY_NEW_TO_OLD",
  });

  const { data: pipelineData, isLoading: isGettingData } =
    useGetJobStageDetailsQuery(queryParams, {
      refetchOnMountOrArgChange: true,
    });
  const BEData = pipelineData?.data;
  const [changeCandidateStage, status] = useUpdateCandidateStageMutation();

  async function dropHandler(result): Promise<any> {
    if (
      result.destination === null ||
      result.source.droppableId === result.destination.droppableId
    ) {
      result.destination === null
        ? toast.error("Cannot drop here")
        : toast.error("Cannot drop in same section");
      return;
    }
    if (result.destination.droppableId === "rejected") {
      toast.error("NOTE:: Please reject from details section!", {
        style: {
          background: "#F4C000",
        },
      });
      return;
    }
    const body = {
      stageName: result.destination.droppableId,
    };
    const candidateId = result.draggableId;
    try {
      const { message } = await changeCandidateStage({
        body,
        candidateId,
      }).unwrap();
      toast.success(message || "Stage moved Successfully");
    } catch (error) {
      // toast.error(error.data.message);
      toast.error("Something went wrong!");
    }
  }

  return (
    <Box>
      <JobDetailsHeader mainTitle="Pipeline" />
      <Box sx={{ p: 2 }}>
        {status?.isLoading && <Loader />}
        {!params.get("candidateId") ? (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Visual Pipeline
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ mt: 0.5, color: "text.secondary" }}
              >
                {`View and update active candidates currently in this job's pipeline.`}
              </Typography>
            </Box>
            <Grid xs={12} md={4} flexWrap="wrap" justifyContent="center" item>
              <TextField
                select
                variant="outlined"
                size="small"
                fullWidth
                value={queryParams.sortBy}
                onChange={(e) => {
                  setQueryParams((prev) => ({
                    ...prev,
                    sortBy: e.target.value,
                  }));
                }}
                {...visualPipeline.FieldProps}
              >
                {visualPipeline.options.map(({ label, value }: any) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              container
              sx={{
                mt: { xs: 0, sm: 2 },
              }}
              spacing={4}
            >
              {isGettingData ? (
                <Box sx={{ width: "100%" }} textAlign="center">
                  Loading . . .
                  <LinearProgress color="primary" />
                </Box>
              ) : (
                <DragDropContext onDragEnd={dropHandler}>
                  {BEData?.map((stage) => {
                    return (
                      <Grid item xs={12} key={stage.stage}>
                        <DnDDraggableElement
                          droppableId={stage.stage}
                          direction="horizontal"
                          getListStyle={styles.stageCardContainer}
                        >
                          <Card sx={styles.stageCard}>
                            <Box display="flex">
                              <Typography variant="h6" sx={styles.commonTypo}>
                                {stage.stage}
                              </Typography>
                              <Typography
                                component="span"
                                variant="h6"
                                sx={{
                                  color: "primary.main",
                                  fontWeight: 500,
                                  mx: 2,
                                }}
                              >
                                {stage.count}
                              </Typography>
                            </Box>
                            <Grid container spacing={3}>
                              {stage?.candidates?.length ? (
                                stage?.candidates?.map((application, index) => (
                                  <React.Fragment key={application?.createdAt}>
                                    <PipeLineCard
                                      index={index}
                                      application={application}
                                    />
                                  </React.Fragment>
                                ))
                              ) : (
                                <Grid
                                  item
                                  xs={12}
                                  sx={{ mt: { xs: 2, sm: 3 } }}
                                  mx={2}
                                  minHeight="25vh"
                                  container
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  {" "}
                                  <Typography
                                    textAlign="center"
                                    variant="h4"
                                    color="primary.main"
                                  >
                                    No Candidates in this stage!
                                  </Typography>
                                </Grid>
                              )}
                            </Grid>
                          </Card>
                        </DnDDraggableElement>
                      </Grid>
                    );
                  })}
                </DragDropContext>
              )}
            </Grid>
          </>
        ) : (
          <AppReviewSection stagesData={BEData} />
        )}
        {params.get("candidateId") && (
          <Button
            variant="outlined"
            startIcon={<WestIcon />}
            sx={{ mt: { xs: 2, sm: 0 }, mb: 3 }}
            onClick={() => {
              router.push(`jobs/job-details?jobId=${params.get("jobId")}`);
            }}
          >
            Back
          </Button>
        )}
      </Box>
    </Box>
  );
}
function PipeLineCard(props): JSX.Element {
  const params = useSearchParams();

  const router = useRouter();
  const { application, index } = props;

  return (
    <Grid item xs={12} md={3} sx={{ mt: { xs: 2, sm: 3 } }} mx={2}>
      <DnDDraggableListItem
        draggableId={String(application.id)}
        index={index}
        key={application.id}
        applyOffset={false}
        getItemStyle={(isDragging: boolean, draggableStyle: any) => ({
          transition: "all",
          background: isDragging ? "lightgrey" : "transparent",
          rotate: isDragging ? "5deg" : "0deg",
          border: isDragging ? "1px dashed blue" : "none",
          minWidth: "250px",
          ...draggableStyle.style,
        })}
      >
        <Card
          sx={{ p: 2, cursor: "pointer" }}
          onClick={(): void => {
            router.push(
              `jobs/job-details?jobId=${params.get("jobId")}&candidateId=${
                application.id
              }`
            );
          }}
        >
          <CustomChip
            rootSx={{ mb: 1.2 }}
            ChipProps={{ label: "Referral" }}
            variant="success"
          />
          <Typography
            variant="h5"
            sx={{ color: "text.primary", mb: 5, fontWeight: 600 }}
          >
            {`${application?.nameAndCompany?.firstName} ${application?.nameAndCompany?.lastName}`}
          </Typography>
          <Box sx={styles.cardsWrapper}>
            <CustomChip
              ChipProps={{ label: "Collect Feedback" }}
              variant="warning"
            />
            <Typography
              variant="h6"
              sx={{ color: "text.secondary", fontWeight: 600 }}
            >
              {dayjs(application.createdAt).format("DD")}
            </Typography>
          </Box>
        </Card>
      </DnDDraggableListItem>
    </Grid>
  );
}
function Loader(): JSX.Element {
  return (
    <Box
      position="absolute"
      height="100vh"
      width="100vw"
      top="0px"
      left="0px"
      sx={{ zIndex: 99, backdropFilter: "blur(3px)" }}
      bgcolor="rgba(0,0,30,0.4)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box sx={{ width: "70%" }} textAlign="center">
        Loading . . .
        <LinearProgress color="primary" />
      </Box>
    </Box>
  );
}
