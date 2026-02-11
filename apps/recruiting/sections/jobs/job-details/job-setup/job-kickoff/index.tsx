import { Box, Button, Grid, Typography } from "@mui/material";
import { styles } from "./job-kickoff.style";
import { MenuIcon } from "@assets/jobs";
import { useJobKickOffSetUp } from "./use-job-kickoff";
import { FormProvider, IsFetching, RHFTextField } from "common";
import { LoadingButton } from "@mui/lab";
import StepperFormSkeleton from "@sections/jobs/stepper-form-skeleton";
import { EditBusinessGoalModal } from "./edit-business-goal-modal";
import { useSelector } from "@root/store";
import dayjs from "dayjs";
import { JobDetailsHeader } from "../../job-details-header";

export function JobKickOffSetUp(): JSX.Element {
  const {
    getJobKickOff,
    sectionData,
    fields,
    isLoading,
    methods,
    isSubmitting,
    submitHandler,
    showBusinessModal,
    setShowBusinessModal,
    closeModal,
    theme,
    fieldDisabled,
    setFieldDisabled,
  } = useJobKickOffSetUp();
  const getCompanyId: any = useSelector((state: any) => state?.auth?.user);
  if (isLoading) {
    return <StepperFormSkeleton />;
  }

  return (
    <Box>
      <JobDetailsHeader mainTitle="Job Kickoff" />
      <Grid container sx={styles}>
        <Grid item xs={12} sx={styles.mainActivity}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Job Kickoff Form Activity
          </Typography>
          <Box sx={styles.jobKickoffActivity}>
            <MenuIcon width="3rem" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Pending submission
              </Typography>
              <Typography variant="body1">
                Form sent on{" "}
                {dayjs(getJobKickOff?.data?.createdAt).format(
                  "dddd, MMMM D, YYYY h:mm A"
                )}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" mt={2}>
            Last edit by{" "}
            {`${getCompanyId?.firstName} ${getCompanyId?.lastName}`} on{" "}
            {dayjs(getJobKickOff?.data?.updatedAt).format(
              "dddd, MMMM D, YYYY h:mm A"
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={styles.mainSection}>
          <IsFetching isFetching={isSubmitting} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {sectionData?.name ? sectionData?.name : "Section Name"}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setShowBusinessModal(true)}
            >
              Edit
            </Button>
          </Box>
          <Typography variant="body1">{sectionData?.description}</Typography>
          <FormProvider methods={methods} onSubmit={submitHandler}>
            <Grid container mt={2} width="100%">
              {fields.map((item: any, index: any) => (
                <Grid
                  key={item?.id}
                  sx={{
                    width: "100%",
                    mt: 1,
                    pb: 1,
                    borderBottom: `1px solid ${theme.palette.neutral[200]}`,
                  }}
                >
                  {item?.question}
                  <RHFTextField
                    type="text"
                    name={`questions.${index}.answer`}
                    sx={{
                      "&.MuiBox-root": {
                        width: "100%",
                      },
                    }}
                    placeholder="Answer Here"
                    onClick={() => {
                      setFieldDisabled(true);
                    }}
                  />
                </Grid>
              ))}
              {fieldDisabled ? (
                <Grid
                  item
                  xs={12}
                  mt={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    type="button"
                    sx={{ ml: 1 }}
                    onClick={() => {
                      setFieldDisabled(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    sx={{ ml: 1 }}
                    loading={isSubmitting}
                  >
                    Save
                  </LoadingButton>
                </Grid>
              ) : null}
            </Grid>
          </FormProvider>
        </Grid>

        {showBusinessModal && (
          <EditBusinessGoalModal
            isOpen={showBusinessModal}
            closeModel={closeModal}
            setShowBusinessModal={setShowBusinessModal}
            modalData={getJobKickOff?.data?.kickoff}
          />
        )}
      </Grid>
    </Box>
  );
}
