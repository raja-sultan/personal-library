import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  NameAndCompanyData,
  nameAndCompanyDefaultValues,
  nameAndCompanyValidationSchema,
} from "./name-and-company-modal.data";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import {
  useGetDetailTabDataApiQuery,
  usePutJobCandidateMutation,
} from "@services/candidate/detail-tab/detail-tab-api";
import { useEffect, useState } from "react";
import { awsBaseUrl } from "@root/config";
import { useGetJobFieldsListApiQuery } from "@services/configuration/manage-job-fields-api.ts/manage-job-fields-api";
import { useLazyGetCandidateTagsListQuery } from "@services/candidate/add-candidate/add-candidate-api";

export function useNameAndCompanyModal({ setJobInfo }: any): any {
  const searchParams = useSearchParams();
  const [resumeBlob, setResumeBlob] = useState<Blob | null>(null);
  const [coverBlob, setCoverBlob] = useState<Blob | null>(null);

  // const jobId = searchParams.get("jobId");
  const candidateId = searchParams.get("candidateID");
  const { data } = useGetDetailTabDataApiQuery({ candidateId });
  const [updateData, { isLoading, isError, isSuccess }] =
    usePutJobCandidateMutation();
  const { data: textFieldData, isLoading: isTextFieldLoading } =
    useGetJobFieldsListApiQuery({
      resourceType: "candidate",
    });
  const getCandidateTagsListQuery = useLazyGetCandidateTagsListQuery();

  const transformedData = {};

  textFieldData?.data?.forEach((field) => {
    if (field.section === "Education") {
      transformedData[field._id] = ""; // You can assign any value here if needed
    }
  });
  const methods = useForm({
    resolver: yupResolver(nameAndCompanyValidationSchema),
    defaultValues: nameAndCompanyDefaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    control,
    watch,
  } = methods;
  const educationData =
    data?.data?.education instanceof Array
      ? data?.data?.education?.map((items: any) => {
          return {
            schoolName: items?.schoolName,
            degree: items?.degree,
            discipline: items?.discipline,
            startDate: items?.startDate
              ? new Date(items?.startDate)
              : new Date(),
            endDate: items?.endDate ? new Date(items?.endDate) : new Date(),
            customFields: items?.customFields,
          };
        })
      : [];
  useEffect(() => {
    const fetchData = async () => {
      if (data?.data?.resume && data?.data?.coverLetter) {
        try {
          const [resumeResponse, coverLetterResponse] = await Promise.all([
            fetch(`${awsBaseUrl}${data.data.resume}`).then((response) =>
              response.blob()
            ),
            fetch(`${awsBaseUrl}${data.data.coverLetter}`).then((response) =>
              response.blob()
            ),
          ]);

          const ResumeBlob = resumeResponse;
          const CoverBlob = coverLetterResponse;

          setResumeBlob(resumeBlob);
          setCoverBlob(coverBlob);

          const resumeFile = new File([ResumeBlob], "resume.pdf");
          const coverLetterFile = new File([CoverBlob], "coverLetter.pdf");

          reset((formValues: any) => ({
            ...formValues,
            ...data.data,
            education: educationData,
            resume: resumeFile,
            coverLetter: coverLetterFile,
          }));
        } catch (error) {
          // console.error("Error fetching data:", error);
        }
      }
    };

    void fetchData();
  }, [reset, data?.data]);

  const onSubmit = handleSubmit(async (d: any) => {
    const formData = new FormData();
    formData.append("candidateType", data?.data?.candidateType);
    formData.append("jobId", data?.data?.jobId);

    const nameAndCompany = JSON.stringify(d?.nameAndCompany);
    formData.append("nameAndCompany", nameAndCompany);
    const info = JSON.stringify(d?.info);
    formData.append("info", info);
    const EducationData = d?.education?.map((items: any) => {
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
    formData.append("resume", d?.resume);
    formData.append("coverLetter", d?.coverLetter);
    const detail = JSON.stringify(d?.detail);
    formData.append("detail", detail);
    // const candidateResponsibleFor = JSON.stringify({
    //   recruiter: d?.candidateResponsibleFor?.recruiter,
    //   coordinator: d?.candidateResponsibleFor?.coordinator,
    // });
    // formData.append("candidateResponsibleFor", candidateResponsibleFor);

    try {
      const res: any = await updateData({
        body: formData,
        candidateId,
      }).unwrap();
      toast.success(res?.message ?? `Update Successfully!`);
      reset();
      setJobInfo(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });
  const nameAndCompany = NameAndCompanyData({
    data: textFieldData,
    isLoading: isTextFieldLoading,
    getCandidateTagsListQuery,
  });
  return {
    methods,
    onSubmit,
    isSubmitting,
    isError,
    isSuccess,
    isLoading,
    fields,
    append,
    remove,
    nameAndCompany,
    transformedData,
    reset,
    watch,
  };
}
