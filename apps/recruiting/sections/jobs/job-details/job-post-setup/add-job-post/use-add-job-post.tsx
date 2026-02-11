import {
  useGetJobPostByIdApiQuery,
  usePostJobPostMutation,
  usePutJobPostByIdMutation,
} from "@services/jobs/create-jobs/job-post/job-post-api";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { jobPostFormSchema, jobPostInitialValue } from "./job-post.schema";
import { useGetJobFieldsListApiQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import { RHFRadioGroup } from "common";
import { applicationFormData } from "@sections/jobs/job-post/job.post.data";

export function useAddJobPost(): any {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobPostId = searchParams.get("jobPostId");
  const jobId = searchParams.get("jobId");
  const action = searchParams.get("action");

  const { data, isError, isSuccess } = useGetJobPostByIdApiQuery(
    { jobPostId },
    { skip: action === "add" }
  );
  const [postData, { isLoading }] = usePostJobPostMutation();

  const [putData] = usePutJobPostByIdMutation();
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
    resolver: yupResolver(jobPostFormSchema),
    defaultValues: jobPostInitialValue,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...data?.data,
      openingId:
        action !== "add"
          ? {
              _id: data?.data?.jobOpening?._id,
              openingId: data?.data?.jobOpening?.openingId,
            }
          : null,
      postTo:
        action !== "add"
          ? {
              _id: data?.data?.jobBoard?._id,
              type: data?.data?.jobBoard?.type,
              name: data?.data?.jobBoard?.name,
            }
          : null,
      body: data?.data?.postDescription?.body,
    }));
    if (isError) {
      toast.error("Something Went Wrong!");
      router.push(`jobs/job-details?jobId=${jobId}`);
    }
  }, [data, reset, isError, router, jobId]);
  useEffect(() => {
    if (!isSubmitting && errors) {
      const firstErrorFieldId: any = Object.keys(errors)[0];
      const errorFieldElement = document.getElementById(firstErrorFieldId);
      if (errorFieldElement) {
        errorFieldElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [isSubmitting, errors]);
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
      if (action === "add" || action === "duplicate") {
        const res: any = await postData({
          body,
          jobId,
          openingId: formData?.openingId?._id,
        }).unwrap();
        toast.success(res?.message ?? `Update Successfully!`);
        router.back();
      } else {
        const res: any = await putData({
          body,
          jobPostId,
        }).unwrap();
        toast.success(res?.message ?? `Update Successfully!`);
        router.back();
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    } finally {
      // nextStepHandler();
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
    action,
    personalInfoCustomFields,
    educationInfoCustomFields,
    ApplicationFormData,
  };
}
