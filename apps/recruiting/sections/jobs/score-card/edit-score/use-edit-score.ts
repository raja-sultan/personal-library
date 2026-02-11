import type { formDataTypes } from "./edit-score.schema";
import { schema, defaultValues } from "./edit-score.schema";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useLazyGetScoreCardByIdQuery,
  usePutAttributesMutation,
} from "@services/jobs/create-jobs/score-card/score-card-api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export const useEditScore = ({ getId, setShowReplacement }): any => {
  const [getScoreCard, { isLoading }] = useLazyGetScoreCardByIdQuery();
  const [postAttributes] = usePutAttributesMutation();
  const searchParams = useSearchParams();
  const jobsId = searchParams.get("jobId");

  const getDefaultValue = async () => {
    const { data, isError } = await getScoreCard({
      jobId: jobsId,
      categoryId: getId,
    });
    if (isError) {
      toast.error("Error Occurred");
      return defaultValues;
    }
    const responseData = { ...data.data };
    return responseData;
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValue,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  // OnSubmit Function
  const onSubmit = async (data: formDataTypes) => {
    const payload = {
      jobId: jobsId,
      categoryId: getId,
      body: {
        category: data.category,
        attributes: data.attributes,
      },
    };
    try {
      const { message } = await postAttributes(payload).unwrap();
      toast.success(message || "Information Updated Successfully");
      setShowReplacement(true);
    } catch (error) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Error Occurred");
    }
  };

  const handleFormSubmit = (): void => {
    void handleSubmit(onSubmit)();
  };

  return {
    handleSubmit,
    handleFormSubmit,
    onSubmit,
    fields,
    append,
    remove,
    methods,
    control,
    isLoading,
    isSubmitting,
  };
};
