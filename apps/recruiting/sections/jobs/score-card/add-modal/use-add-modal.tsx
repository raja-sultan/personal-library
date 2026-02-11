import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { categoryType } from "./add-modal.schema";
import { schema, defaultValues } from "./add-modal.schema";
import { usePostCategoryMutation } from "@services/jobs/create-jobs/score-card/score-card-api";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

export const useAddModal = ({ setOpenCategory }): any => {
  const searchParams = useSearchParams();
  const jobsId = searchParams.get("jobId");

  const [postCategory] = usePostCategoryMutation();
  const methods = useForm<categoryType>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  //Submit Function
  const onSubmit = async (data) => {
    const payload = {
      jobId: jobsId,
      category: data.category,
      attributes: [],
    };
    try {
      const { message } = await postCategory(payload).unwrap();
      toast.success(message || "Category Added Successfully");
      reset(defaultValues);
      setOpenCategory(false);
    } catch (error) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Error Occurred");
      setOpenCategory(false);
    }
  };

  const handleCancel = (): void => {
    setOpenCategory(false);
  };

  return {
    handleSubmit,
    onSubmit,
    handleCancel,
    methods,
    isSubmitting,
  };
};
