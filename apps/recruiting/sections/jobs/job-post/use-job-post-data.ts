import {
  useGetJobPostDataApiQuery,
  usePostJobPostMutation,
  usePutJobPostByIdMutation,
} from "@services/jobs/create-jobs/job-post/job-post-api";
import { useForm } from "react-hook-form";
import {
  applicationFormData,
  jobPostDefaultValues,
  jobPostValidationSchema,
} from "./job.post.data";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetJobFieldsListApiQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import { RHFRadioGroup } from "common";

export function useJobPostData({ nextStepHandler }): any {
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const jobId = searchParams.get("jobId");
  const { data } = useGetJobPostDataApiQuery({ jobId });
  const [postData, { isError, isSuccess, isLoading }] =
    usePostJobPostMutation();
  const [updateJobPost] = usePutJobPostByIdMutation();
  const { data: textFieldData, isLoading: isTextFieldLoading } =
    useGetJobFieldsListApiQuery({
      resourceType: "application",
    });
  let personalInfoCustomFields: any;
  let educationInfoCustomFields: any;

  if (!isTextFieldLoading) {
    const personalInfo = textFieldData?.data.filter(
      (item) => item?.section === "Personal Information"
    )[0];
    const educationInfo = textFieldData?.data.filter(
      (item) => item?.section === "Education"
    )[0];

    if (personalInfo) {
      personalInfoCustomFields = personalInfo?.customFields.map((items) => ({
        id: items?._id,
        componentProps: {
          name: `basicApplicationInformation.personalInformation.customFields[${items?._id}]`,
          outerLabel: items?.label,
          options: [
            items?.isRequired
              ? { label: "Required", value: true }
              : { label: "Optional", value: false },
          ],
          value: items?.isRequired,
        },
        component: RHFRadioGroup,
        md: 2,
      }));
    }
    if (educationInfo) {
      educationInfoCustomFields = educationInfo?.customFields.map((items) => ({
        id: items?._id,
        componentProps: {
          name: `basicApplicationInformation.educationItemDto.customFields[${items?._id}]`,
          outerLabel: items?.label,
          options: [
            items?.isRequired
              ? { label: "Required", value: true }
              : { label: "Optional", value: false },
          ],
          value: items?.isRequired,
        },
        component: RHFRadioGroup,
        md: 2,
      }));
    }
  }
  const methods = useForm({
    resolver: yupResolver(jobPostValidationSchema),
    defaultValues: jobPostDefaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...data?.data[0],
      openingId: data?.data[0]?.jobOpening,
      postTo: data?.data[0]?.jobBoard,
      body: data?.data[0]?.postDescription?.body,
    }));
  }, [data, reset]);
  const onSubmit = handleSubmit(async (formData: any) => {
    const body = {
      postDetails: {
        jobName: formData?.postDetails?.jobName,
        location: formData?.postDetails?.location,
        applicationLanguage: formData?.postDetails?.applicationLanguage,
        jobBoardId: formData?.postTo?._id,
        postTo: formData?.postTo?.type,
      },
      postDescription: {
        descriptionIntroduction:
          formData?.postDescription.descriptionIntroduction,
        body: formData?.body,
        descriptionConclusion: formData?.postDescription?.descriptionConclusion,
      },
      basicApplicationInformation: {
        ...formData?.basicApplicationInformation,
      },
      customApplicationQuestions: {
        ...formData?.customApplicationQuestions,
      },
      setting: { ...formData?.setting },
      publishToFreeJobBoards: { ...formData?.publishToFreeJobBoards },
    };
    try {
      let res: any;
      if (data?.data && data?.data?.length !== 0) {
        // If data is available and has length > 0, update job post
        res = await updateJobPost({ body, jobPostId: data?.data[0]?._id });
      } else {
        // If data is not available or is an empty array, create new job post
        res = await postData({
          body,
          jobId,
          openingId: formData?.openingId?._id,
        }).unwrap();
      }
      toast.success(res?.message ?? `Update Successfully!`);
      if (!action) {
        nextStepHandler();
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  });
  const ApplicationFormData = applicationFormData();
  return {
    methods,
    onSubmit,
    isSubmitting,
    isError,
    isSuccess,
    isLoading,
    data,
    personalInfoCustomFields,
    educationInfoCustomFields,
    ApplicationFormData,
  };
}
