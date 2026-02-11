import {
  useLazyGetCandidateTagsListQuery,
  useLazyGetDepartmentListQuery,
  useLazyGetJobListQuery,
  useLazyGetOfficeListQuery,
  useLazyGetPoolListQuery,
  useLazyGetProductOwnerListQuery,
  useLazyGetProspectStagesListQuery,
  usePostJobCandidateDataMutation,
} from "@services/candidate/add-candidate/add-candidate-api";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddProspectFormData,
  prospectDefaultValues,
  prospectValidationSchema,
} from "./prospect.data";
import { useGetJobFieldsListApiQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useProspectForm(): any {
  const router = useRouter();
  const getDepartmentListQuery = useLazyGetDepartmentListQuery();
  const getOfficeListQuery = useLazyGetOfficeListQuery();
  const getJobListQuery = useLazyGetJobListQuery();
  const getPoolListQuery = useLazyGetPoolListQuery();
  const getProspectStagesList = useLazyGetProspectStagesListQuery();
  const getProductOwnerList = useLazyGetProductOwnerListQuery();
  const getCandidateTagsListQuery = useLazyGetCandidateTagsListQuery();

  const { data: textFieldData, isLoading: isTextFieldLoading } =
    useGetJobFieldsListApiQuery({
      resourceType: "candidate",
    });
  const [postData, { isError, isSuccess, isLoading }] =
    usePostJobCandidateDataMutation();
  const methods = useForm({
    resolver: yupResolver(prospectValidationSchema),
    defaultValues: prospectDefaultValues,
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
    formState: { isSubmitting },
    control,
  } = methods;
  useEffect(() => {
    if (!isSubmitting && methods.formState.errors) {
      const firstErrorFieldId: any = Object.keys(methods.formState.errors)[0];
      const errorFieldElement = document.getElementById(firstErrorFieldId);
      if (errorFieldElement) {
        errorFieldElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [isSubmitting, methods.formState.errors]);
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const prospectPool = JSON.stringify({
        poolId: data?.pool?._id,
        poolName: data?.pool?.name,
      });
      const prospectStage = JSON.stringify({
        stageId: data?.prospectStage?._id,
        stageName: data?.prospectStage?.stage,
      });
      const productOwner = JSON.stringify({
        ownerId: data?.productOwner?._id,
        ownerName: data?.productOwner?.userName,
      });

      const formData = new FormData();
      formData.append("candidateType", "PROSPECT");
      formData.append("department", data?.department?._id);
      formData.append("office", data?.office?._id);
      const specificJobs = data?.specificJob?.map((items: any) => items?._id);

      formData.append("specificJobs", specificJobs);
      formData.append("prospectPool", prospectPool);
      formData.append("prospectStage", prospectStage);
      formData.append("productOwner", productOwner);
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
      const detail = JSON.stringify(data?.detail ?? {});
      formData.append("detail", detail);
      // const candidateResponsibleFor = JSON.stringify({
      //   recruiter: data?.candidateResponsibleFor?.recruiter,
      //   coordinator: data?.candidateResponsibleFor?.coordinator,
      // });
      // formData.append("candidateResponsibleFor", candidateResponsibleFor);

      const res: any = await postData({
        body: formData,
      }).unwrap();
      toast.success(res?.message ?? `Update Successfully!`);
      reset();
      router.push("candidates");
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  });

  const [office, department, pool] = watch(["office", "department", "pool"]);

  const addProspectFormData = AddProspectFormData({
    getDepartmentListQuery,
    getOfficeListQuery,
    getJobListQuery,
    getPoolListQuery,
    getProductOwnerList,
    getProspectStagesList,
    getCandidateTagsListQuery,
    data: textFieldData,
    isLoading: isTextFieldLoading,
    getJobListQueryParams: {
      office: office === null ? "" : office,
      department: department === null ? "" : department,
      pool: pool === null ? "" : pool,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return {
    addProspectFormData,
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
    watch,
  };
}
