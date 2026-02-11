import { LoadingButton } from "@mui/lab";
import { Button, Skeleton, Stack } from "@mui/material";
import { BasicApplicationInfo } from "@sections/jobs/job-post/basic-application-info";
import { CustomApplicationQuestions } from "@sections/jobs/job-post/custom-application-questions";
import { FreeJobBoard } from "@sections/jobs/job-post/free-job-board";
import { PostDescription } from "@sections/jobs/job-post/post-description";
import { PostDetails } from "@sections/jobs/job-post/post-details";
import { Settings } from "@sections/jobs/job-post/settings";
import { FormProvider } from "common";
import { useRouter } from "next/navigation";
import { JobDetailsHeader } from "../../job-details-header";
import { useAddJobPost } from "./use-add-job-post";

export function AddJobPostSection(): JSX.Element {
  const router = useRouter();
  const {
    methods,
    onSubmit,
    isLoading,
    data,
    action,
    personalInfoCustomFields,
    educationInfoCustomFields,
    ApplicationFormData,
  } = useAddJobPost();
  function renderSkeleton(): any {
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Skeleton variant="rounded" width={200} height={40} />
        <Skeleton variant="rounded" width={100} height={40} />
      </Stack>
      <Skeleton height={700} />

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} variant="rounded" width={100} height={40} />
        ))}
      </Stack>
    </Stack>;
  }
  return data || action === "add" ? (
    <Stack
      rowGap={6}
      p={3}
      sx={{ backgroundColor: "background.paper", borderRadius: "8px" }}
    >
      <JobDetailsHeader mainTitle="Care Team Lead" />

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack rowGap={1}>
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
          <Stack direction="row" spacing={2} justifyContent="end">
            <Button
              variant="contained"
              size="small"
              sx={{ width: 200 }}
              onClick={() => {
                router.back();
              }}
            >
              Back
            </Button>
            <Button variant="outlined" size="small" sx={{ width: 200 }}>
              Preview Form
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              sx={{ ml: "auto", my: 1, mr: 1 }}
            >
              Save
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Stack>
  ) : (
    renderSkeleton()
  );
}
