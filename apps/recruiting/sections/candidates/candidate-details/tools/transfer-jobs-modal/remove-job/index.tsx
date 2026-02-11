import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { CustomModal, NoContentFound } from "common";
import React from "react";
import { deletedData } from "./remove-job.data";
import {
  useGetJobsQuery,
  useRemoveJobsMutation,
} from "@services/candidate/candidate-details/tools/remove-job-api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { styles } from "./remove-job.styles";

export function RemoveJobModal(props): JSX.Element {
  const { removeJob, setRemoveJob } = props;
  const searchParams = useSearchParams();
  const candidateIds = searchParams.get("candidateID");

  //GET API For Candidates
  const { data, isLoading, isError } = useGetJobsQuery({
    candidateId: candidateIds,
  });

  const jobDetails = data?.data;

  //DELETE API to remove Candidate
  const [deleteCandidate] = useRemoveJobsMutation();

  const deleteCandidateDetails = async (item: any) => {
    const formData = {
      candidateId: item._id,
    };
    try {
      const { message } = await deleteCandidate(formData).unwrap();
      toast.success(message || "Candidate Removed Successfully");
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Error occurred");
    }
  };

  if (isLoading) {
    return <Skeleton animation="wave" sx={{ height: 100 }} />;
  }

  return (
    <CustomModal
      onClose={() => {
        setRemoveJob(false);
      }}
      rootSx={styles.modalStyling}
      headerLabel="Remove Job"
      closeButtonProps={{
        onClick: () => {
          setRemoveJob(false);
        },
      }}
      isOpen={removeJob}
    >
      {isError || jobDetails.length === 0 ? (
        <Grid container justifyContent="center">
          <Grid item width={200}>
            <NoContentFound />
          </Grid>
        </Grid>
      ) : (
        <>
          {jobDetails?.map((item) => (
            <Box sx={styles.jobWrapper} key={item._id}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {item?.jobName ?? "-"}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary" }}
                >
                  {item?.stage ?? "-"}
                </Typography>
              </Box>
              <Button
                sx={{ p: 0, mt: { xs: 0.5, sm: 0 } }}
                onClick={() => {
                  void deleteCandidateDetails(item);
                }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </>
      )}
      <Typography
        variant="body1"
        sx={{ mt: { xs: 2, sm: 3 }, fontWeight: 600 }}
      >
        The following will be deleted:
      </Typography>
      {deletedData.map((list) => (
        <Box key={list.id}>
          <Box component="ol" sx={styles.listStyling}>
            <li style={{ fontSize: "14px" }}>{list.title}</li>
          </Box>
        </Box>
      ))}
      <Box sx={{ textAlign: "end", mt: { xs: 2, sm: 3 } }}>
        <Button variant="outlined" onClick={() => setRemoveJob(false)}>
          Cancel
        </Button>
      </Box>
    </CustomModal>
  );
}
