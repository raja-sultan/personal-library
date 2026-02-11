import { Box, Button, Grid, Typography } from "@mui/material";
import { addInterviewButton, addStageButton } from "./style";
import { AddInterviewModal } from "./add-interview-modal";
import { AlertSettingModal } from "./alert-setting-modal";
import { AddStageModal } from "./add-stage-modal";
import { nanoid } from "@reduxjs/toolkit";
import { useInterviewPlan } from "./use-interview-plan";
import { AddInterview } from "./add-interview";
import { AddStage } from "./add-stage";
import Link from "next/link";

export function InterviewPlanSection({
  nextStepHandler,
  previousStepHandler,
  hideButton,
  showScroll = true,
}): JSX.Element {
  const {
    openAddStageModal,
    setOpenAddStageModal,
    alertSetting,
    setAlertSetting,
    openInterviewModal,
    setOpenInterviewModal,
    setInterviewDetails,
    isLoading,
    isSuccess,
    isError,
    theme,
    getContrastColor,
    addStageMethods,
    onSubmitNewStage,
    onSubmitAddInterview,
    handleAddNewStage,
    interviewMethods,
    stagesData,
    deleteStage,
    setStageId,
    isEditOrSave,
    setIsEditOrSave,
    deleteInterview,
    scoreCardAttributes,
    loadingAttr,
    successAttr,
    errorAttr,
  }: any = useInterviewPlan();
  return (
    <>
      {isLoading && (
        <Typography
          variant="h5"
          align="center"
          sx={{ py: 10 }}
          color={theme.palette.text.secondary}
        >
          Loading...{" "}
        </Typography>
      )}
      {isError && (
        <Typography
          variant="h5"
          align="center"
          sx={{ py: 10 }}
          color={theme.palette.error.main}
        >
          Something Went Wrong{" "}
        </Typography>
      )}
      {isSuccess && (
        <Box sx={{ height: "100%" }}>
          <Box
            sx={{
              height: "90%",
              position: "relative",
              overflowY: showScroll ? "scroll" : "hidden",
            }}
          >
            {openAddStageModal && (
              <AddStageModal
                openAddStageModal={openAddStageModal}
                setOpenAddStageModal={setOpenAddStageModal}
                methods={addStageMethods}
                onSubmitNewStage={onSubmitNewStage}
              />
            )}

            {/* Alert-setting-modal */}
            <AlertSettingModal
              alertSetting={alertSetting}
              setAlertSetting={setAlertSetting}
            />

            {/* Add-Interview-Modal */}
            {openInterviewModal && (
              <AddInterviewModal
                openInterviewModal={openInterviewModal}
                methods={interviewMethods}
                onSubmitAddInterview={onSubmitAddInterview}
                setOpenInterviewModal={setOpenInterviewModal}
                setInterviewDetails={setInterviewDetails}
                setIsEditOrSave={setIsEditOrSave}
                isEditOrSave={isEditOrSave}
                scoreCardAttributes={scoreCardAttributes}
                loadingAttr={loadingAttr}
                successAttr={successAttr}
                errorAttr={errorAttr}
              />
            )}

            <Box
              p={4}
              mt={3}
              borderRadius={1}
              bgcolor={theme.palette.background.default}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.text.primary}
                    fontWeight={600}
                  >
                    Define your interview pipeline and specify what you want
                    each interviewer to focus on.
                  </Typography>
                </Grid>

                <Grid
                  container
                  item
                  xs={12}
                  md={4}
                  gap={1}
                  justifyContent={{ md: "end", xs: "center" }}
                  alignItems="center"
                >
                  <Button
                    variant="text"
                    color="primary"
                    size="large"
                    onClick={() => {
                      setAlertSetting(true);
                    }}
                  >
                    Alert Setting
                  </Button>

                  <Button
                    variant="outlined"
                    sx={addStageButton(theme)}
                    onClick={handleAddNewStage}
                  >
                    + Add Stage
                  </Button>
                </Grid>
              </Grid>

              {stagesData?.length > 0 &&
                stagesData?.map((item: any) => (
                  <Grid
                    borderBottom={`.5px solid ${getContrastColor({
                      light: theme.palette.neutral[300],
                      dark: theme.palette.neutral[600],
                    })}`}
                    key={nanoid()}
                    container
                    justifyContent="space-between"
                    spacing={2}
                    mt={3}
                    mb={3}
                    pb={3}
                  >
                    <Grid item xs={12} md={6}>
                      <AddStage stageInfo={item} deleteStage={deleteStage} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      {item?.interviews?.map((ele: any) => (
                        <AddInterview
                          key={nanoid()}
                          interviewName={ele?.applicationReview?.interviewName}
                          setOpenInterviewModal={setOpenInterviewModal}
                          setInterviewDetails={setInterviewDetails}
                          setIsEditOrSave={setIsEditOrSave}
                          ele={ele}
                          deleteInterview={deleteInterview}
                        />
                      ))}
                      <Button
                        variant="outlined"
                        sx={addInterviewButton(theme)}
                        onClick={() => {
                          setOpenInterviewModal(true);
                          setStageId(item?._id);
                          setIsEditOrSave("Save");
                        }}
                      >
                        {" "}
                        + Add Interview{" "}
                      </Button>
                    </Grid>
                  </Grid>
                ))}
            </Box>
          </Box>
          {!hideButton && (
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              sx={{
                p: "0.5em",
                height: "10%",
                position: "relative",
              }}
            >
              <Button
                variant="outlined"
                type="button"
                onClick={previousStepHandler}
              >
                Back
              </Button>
              <Box>
                <Link href="/jobs">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={nextStepHandler}
                    sx={{
                      m: { xs: "0.5em 0", sm: "0" },
                      marginRight: { xs: "0", sm: "0.5em" },
                    }}
                  >
                    Save & Finish Later
                  </Button>
                </Link>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{ ml: 1 }}
                  onClick={nextStepHandler}
                >
                  Next
                </Button>
              </Box>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
}
