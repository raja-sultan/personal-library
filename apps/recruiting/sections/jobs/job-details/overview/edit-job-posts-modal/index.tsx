import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomModal, FormProvider, IsFetching } from "common";
import { fieldsInfo, FormSchema } from "./edit-job-posts-modal.schema";
import { GenFormField } from "@components/form-fields-generator";
import { usePutJobPostsMutation } from "@services/jobs/job-details/job-setup/job-overview/job-posts/job-posts-api";
import { useSearchParams } from "next/navigation";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import toast from "react-hot-toast";

export function EditJobPostsModal({
  dataOfJobPosts,
}: {
  dataOfJobPosts: any;
}): JSX.Element {
  const [jobPosts, setJobPosts] = useState<boolean>(false);
  const [updateJobPost, { isLoading }] = usePutJobPostsMutation();

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const handleCancel = (): void => {
    setJobPosts(false);
  };

  const apiValues: any = {
    jobStatus: dataOfJobPosts?.isLive ? "Open" : "Close",
    jobPost: dataOfJobPosts?.postDetails?.jobName,
    jobBoard: dataOfJobPosts?.postDetails?.postTo,
  };

  const methods: any = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: apiValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const jsonPayload = {
        jobStatus: data.jobStatus,
        jobPost: data.jobPost,
        jobBoard: data.jobBoard,
      };

      const res = await updateJobPost({ ...jsonPayload, jobId });

      const {
        data: {
          data: { _id },
        },
      }: any = res;
      toast.success("Job posts updated successfully");
      setJobPosts(false);
    } catch (error: any) {
      // displayErrorMessage(error);
    }
  });

  return (
    /*Custom Modal*/
    <>
      <IconButton
        onClick={() => {
          setJobPosts(true);
        }}
        aria-label="edit"
      >
        <EditOutlinedIcon />
      </IconButton>
      <CustomModal
        onClose={setJobPosts}
        rootSx={{
          maxWidth: { xs: 350, sm: 500, md: 750 },
          position: "relative",
        }}
        headerLabel="Edit Job Posts"
        closeButtonProps={{
          onClick: () => {
            setJobPosts(false);
          },
        }}
        isOpen={jobPosts}
      >
        <IsFetching isFetching={isLoading} />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {/* Dynamically Generated Fields  */}
          <Grid container>
            {fieldsInfo.map((item: any, index: number) => {
              const props = item?.OuterConProps ? item?.OuterConProps : {};
              return (
                <GenFormField
                  key={index}
                  fullWidth
                  item={item}
                  isSubmitting={isSubmitting}
                  // disabled={disabled}
                  px={1}
                  py={1}
                  {...props}
                />
              );
            })}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </FormProvider>
      </CustomModal>
    </>
  );
}
