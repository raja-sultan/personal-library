import {
  useLazyGetCandidateTagsListQuery,
  useLazyGetDepartmentListQuery,
  useLazyGetJobListQuery,
  useLazyGetOfficeListQuery,
  usePostJobCandidateDataMutation,
} from "@services/candidate/add-candidate/add-candidate-api";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddCandidateFormData,
  jobCandidateDefaultValues,
  jobCandidateValidationSchema,
} from "./job.candidate.data";
import { useGetJobFieldsListApiQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import { useRouter } from "next/navigation";
import { useEffect } from "react"; // Import useEffect

export function useJobCandidateForm(): any {
  const router = useRouter();
  const getDepartmentListQuery = useLazyGetDepartmentListQuery();
  const getOfficeListQuery = useLazyGetOfficeListQuery();
  const getJobListQuery = useLazyGetJobListQuery();
  const getCandidateTagsListQuery = useLazyGetCandidateTagsListQuery();
  const { data: textFieldData, isLoading: isTextFieldLoading } =
    useGetJobFieldsListApiQuery({
      resourceType: "candidate",
    });
  const [postData, { isError, isSuccess, isLoading }] =
    usePostJobCandidateDataMutation();
  const methods = useForm({
    resolver: yupResolver(jobCandidateValidationSchema),
    defaultValues: jobCandidateDefaultValues,
  });
  const transformedData = {};

  textFieldData?.data?.forEach((field) => {
    if (field.section === "Education") {
      transformedData[field._id] = ""; // You can assign any value here if needed
    }
  });

  const {
    watch,
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = methods;

  // Handle form submission and scroll behavior
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
  const onSubmit = handleSubmit(async (data: any) => {
    const formData = new FormData();
    formData.append("candidateType", "JOB_CANDIDATE");
    formData.append("department", data?.department?._id);
    formData.append("office", data?.office?._id);
    formData.append("prospectPool", "");
    formData.append("prospectStage", "");
    formData.append("productOwner", "");
    formData.append("jobId", data?.jobId?._id);
    formData.append("initialStage", data?.initialStage);
    const nameAndCompany = JSON.stringify(data?.nameAndCompany);
    formData.append("nameAndCompany", nameAndCompany);
    const info = JSON.stringify(data?.info);
    formData.append("info", info);
    const EducationData = data?.education?.map((items: any) => {
      return {
        schoolName: items?.schoolName,
        degree: items?.degree,
        discipline: items?.discipline,
        startDate: items?.startDate,
        endDate: items?.endDate,
        customFields: items?.customFields,
      };
    });

    const educationString = EducationData.map((obj) =>
      JSON.stringify(obj)
    ).join(",");
    formData.append("education", educationString);
    formData.append("resume", data?.resume);
    formData.append("coverLetter", data?.coverLetter);
    const detail = JSON.stringify(data?.detail ? data?.detail : {});
    formData.append("detail", detail);
    // const candidateResponsibleFor = JSON.stringify({
    //   recruiter: data?.candidateResponsibleFor?.recruiter,
    //   coordinator: data?.candidateResponsibleFor?.coordinator,
    // });
    // formData.append("candidateResponsibleFor", candidateResponsibleFor);

    try {
      const res: any = await postData({ body: formData }).unwrap();
      reset();
      router.push("candidates");
      toast.success(res?.message ?? `Update Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    } finally {
      // nextStepHandler();
    }
  });
  const [office, department] = watch(["office", "department"]);

  const addCandidateFormData = AddCandidateFormData({
    getDepartmentListQuery,
    getOfficeListQuery,
    getJobListQuery,
    getCandidateTagsListQuery,
    getJobListQueryParams: {
      office: office === null ? "" : office,
      department: department === null ? "" : department,
    },
    data: textFieldData,
    isLoading: isTextFieldLoading,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return {
    addCandidateFormData,
    methods,
    onSubmit,
    isSubmitting,
    isError,
    isSuccess,
    isLoading,
    fields,
    append,
    remove,
    transformedData,
    control,
    watch,
  };
}
