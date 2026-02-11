import {
  useAddJobInfoMutation,
  useGetJobInfoQuery,
  useUpdateJobInfoMutation,
} from "@services/jobs/create-jobs/job-info/job-info-api";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchema, defaultValues } from "./form-data";
import { useRouter, useSearchParams } from "next/navigation";
import { displayErrorMessage, displaySuccessMessage } from "./utils";
import { useGetJobFieldsListApiQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";

export function useJobInfo({ nextStepHandler }): any {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const router = useRouter();
  const [addJobInfo] = useAddJobInfoMutation();
  const [updateJobInfo] = useUpdateJobInfoMutation();
  const {
    data: getJobData,
    isLoading,
    isFetching,
  } = useGetJobInfoQuery({ jobId }, { skip: jobId === null });

  const { data: textFieldData, isLoading: isTextFieldLoading } =
    useGetJobFieldsListApiQuery({
      resourceType: "job",
    });
  const [jobInfoHolder, setJobInfoHolder] = useState({
    disabled: false,
    isLoading: true,
    teamResHtml: "",
    sellHtml: "",
    visibilityOfTeamResEditor: Boolean(jobId),
    visibilityOfSellEditor: Boolean(jobId),
  });
  // const { data, isError, error } = getJobInfo({ jobId }, false);

  const methods: any = useForm<any>({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    control,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
  } = methods;
  const { fields, remove, append } = useFieldArray({
    control,
    name: "openings",
  });
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...getJobData?.data?.jobInfo,
      teamResponsibilities:
        getJobData?.data?.jobInfo?.infoForInterviewer?.teamResponsibility,
      howToSell: getJobData?.data?.jobInfo?.infoForInterviewer?.howToSellJob,
      openings: getJobData?.data?.jobInfo?.openings?.map((items) => {
        return {
          id: items?._id,
          openingId: items?.openingId,
          status: items?.status,
          openDate: items?.openDate ? new Date(items?.openDate) : new Date(),
          targetStartDate: items?.targetStartDate
            ? new Date(items?.targetStartDate)
            : new Date(),
          closeDate: items?.closeDate ? new Date(items?.closeDate) : new Date(),
          closeReason: items?.closeReason[0],
          customFields: items?.customFields,
        };
      }),
    }));
  }, [reset, getJobData]);
  function duplicate(index): any {
    const field = getValues().openings[index];
    append(field);
  }

  function addNewJobOpening(): any {
    append({
      openingId: "",
      status: "",
      openDate: new Date(),
      targetStartDate: "",
      closeDate: "",
      closeReason: {},
      customFields: {},
    });
  }

  const onSubmit = handleSubmit(async (data: any) => {
    const department = data?.department?._id;
    const office = data?.office?._id;
    const openings = data?.openings?.map((opening, index) => {
      const openingId =
        data?.requisitionId !== undefined
          ? `${data.requisitionId}-${index + 1}`
          : null;
      return {
        _id: opening?.id,
        status: opening?.status,
        openDate: opening?.openDate,
        targetStartDate: opening?.targetStartDate,
        closeDate: opening?.closeDate,
        closeReasonId: opening?.closeReason?._id,
        openingId,
        customFields: opening?.customFields,
      };
    });

    try {
      const jsonPayload = {
        jobInfo: {
          ...data,
          department,
          office,
          openings,
          infoForInterviewer: {
            teamResponsibility: data?.teamResponsibilities,
            howToSellJob: data?.howToSell,
          },
        },
      };

      const res = jobId
        ? await updateJobInfo({ payload: jsonPayload, jobId }).unwrap()
        : await addJobInfo(jsonPayload).unwrap();
      const {
        data: { _id },
      }: any = res;
      displaySuccessMessage(res);
      router.push(`/create-job?jobId=${_id}`);
      nextStepHandler();
    } catch (error: any) {
      displayErrorMessage(error);
    }
  });

  function teamResHtmlChangeHand(val: string): any {
    setJobInfoHolder((pre) => ({ ...pre, teamResHtml: val }));
  }
  function sellHtmlChangeHand(val: string): any {
    setJobInfoHolder((pre) => ({ ...pre, sellHtml: val }));
  }
  function editorVisibilityChangeHand(name: string): any {
    setJobInfoHolder((pre) => ({ ...pre, [name]: !pre[name] }));
  }
  const RequisitionId = watch("requisitionId");

  return {
    addJobInfo,
    jobInfoHolder,
    onSubmit,
    methods,
    isSubmitting,
    teamResHtmlChangeHand,
    sellHtmlChangeHand,
    editorVisibilityChangeHand,
    fields,
    addNewJobOpening,
    remove,
    duplicate,
    isLoading,
    isFetching,
    control,
    textFieldData,
    isTextFieldLoading,
    RequisitionId,
  };
}
