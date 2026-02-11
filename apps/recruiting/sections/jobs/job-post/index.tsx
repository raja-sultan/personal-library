import { FormProvider } from "common";
import { PostDetails } from "./post-details";
import { PostDescription } from "./post-description";
import { BasicApplicationInfo } from "./basic-application-info";
import { Settings } from "./settings";
import { FreeJobBoard } from "./free-job-board";
import { CustomApplicationQuestions } from "./custom-application-questions";
import { Box, Button, Stack } from "@mui/material";
import { useJobPostData } from "./use-job-post-data";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function JobPost(props: any): JSX.Element {
  const { nextStepHandler, previousStepHandler } = props;
  const searchParams = useSearchParams();

  const action = searchParams.get("action");
  const {
    methods,
    onSubmit,
    isLoading,
    personalInfoCustomFields,
    educationInfoCustomFields,
    ApplicationFormData,
  } = useJobPostData({
    nextStepHandler,
  });

  return (
    <>
      <Box
        sx={{
          height: "90%",
          position: "relative",
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <FormProvider methods={methods}>
          <Stack rowGap={2}>
            <PostDetails />
            <PostDescription />
            <BasicApplicationInfo
              personalInfoCustomFields={personalInfoCustomFields}
              educationInfoCustomFields={educationInfoCustomFields}
              ApplicationFormData={ApplicationFormData}
            />
            <CustomApplicationQuestions />
            <Settings />
            <FreeJobBoard />
          </Stack>
          {action && (
            <Stack sx={{ ml: "auto" }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                onClick={onSubmit}
                sx={{ ml: "auto", my: 1, mr: 1 }}
              >
                Save
              </LoadingButton>
            </Stack>
          )}
        </FormProvider>
      </Box>
      {!action && (
        <Stack direction="row" justifyContent="space-between" mt={1}>
          <Button
            variant="outlined"
            color="primary"
            onClick={previousStepHandler}
          >
            Back
          </Button>
          <Box>
            <Link href="/jobs">
              <Button
                variant="outlined"
                color="primary"
                onClick={onSubmit}
                sx={{
                  m: { xs: "0.5em 0", sm: "0" },
                  marginRight: { xs: "0", sm: "0.5em" },
                }}
              >
                Save & Finish Later
              </Button>
            </Link>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              sx={{ ml: "1em" }}
              onClick={onSubmit}
            >
              Next
            </LoadingButton>
          </Box>
        </Stack>
      )}
    </>
  );
}
