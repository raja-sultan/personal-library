import { useFieldArray, useForm } from "react-hook-form";
import { defaultValues, schema } from "./apply-for-job-data";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostApplyNowMutation } from "@services/jobs/careers/careers-api";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export const useApplyJob = (): any => {
  const router = useRouter();
  const params = useSearchParams();
  const jobId = params.get("jobId");
  const openingId = params.get("openingId");

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const [postApplyNow, { isLoading }] = usePostApplyNowMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("linkedInProfile", data.linkedInProfile);
    formData.append("website", data.website);
    formData.append("resume", data.resume);
    formData.append("coverLetter", data.coverLetter);
    // Convert education array to JSON string and append it
    formData.append("education", JSON.stringify(data.education));
    try {
      const { message } = await postApplyNow({
        params: {
          jobId,
          openingId,
        },
        body: formData,
      }).unwrap();
      toast.success(message || "Job Applied Successfully");
      reset(defaultValues);
      router.push("/careers/job-details/apply-for-job/get-verified");
    } catch (error) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Error Occurred");
    }
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return {
    handleSubmit,
    onSubmit,
    methods,
    fields,
    remove,
    isLoading,
    isSubmitting,
    append,
  };
};
