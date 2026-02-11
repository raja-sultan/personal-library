import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddKeyResultOfGoalMutation,
  useUpdateKeyResultMutation,
  useGetKeyResultByKeyResultIdQuery,
} from "@services/goals/goals.api";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface ReturnTypes {
  onSubmit?: (data: any) => void;
  handleSubmit?: any;
  router: AppRouterInstance;
  methods: any;
  isLoading: boolean;
  isGetKeyLoading: boolean;
  actionType: string | null;
  goalId?:string| null
}

const defaultValues = {
  name: "",
  description: "",
  ownerId: "",
  type: "",
  start: "",
  target: "",
};

const addKeyResultFormSchema = Yup.object().shape({
  name: Yup.string().trim().required("Field is required").min(4).max(30),
  ownerId: Yup.string().required("Field is required."),
  type: Yup.string().required("Type is required"),
  start: Yup.number().when("type", ([type], field) =>
    type !== "Binary" ? field.min(0, "Value must be positive").required("Field is required") : field.optional()
  ),
  target: Yup.string().when("type", ([type], field) =>
    type !== "Binary" ? field.min(0, "Value must be positive").required("Field is required") : field.optional()
  ),
});

export function useAddKeyResult(): ReturnTypes {

  const methods = useForm<any>({
    resolver: yupResolver(addKeyResultFormSchema),
    defaultValues,
  });

  const router = useRouter();
  const search = useSearchParams();
  const goalId = search.get("goalId");
  const keyId = search.get("id");
  const actionType = search.get('actionType');

  // API calls keyResultId
  const [addKeyResult, { isLoading: isAddKeyLoading }] = useAddKeyResultOfGoalMutation();
  const [updateKeyResult, { isLoading: isUpdateKeyLoading }] = useUpdateKeyResultMutation();
  const { data: getKeyResultByKeyId, isLoading: isGetKeyLoading } = useGetKeyResultByKeyResultIdQuery({
    id: goalId,
    keyResultId: keyId,
  });

  const { handleSubmit, reset, watch } = methods;
  const binaryType = watch("type");

  useEffect(() => {
    if (goalId && keyId && getKeyResultByKeyId) {
      const keyResultData = getKeyResultByKeyId?.data;
      if (keyResultData) {
        reset({
          name: keyResultData?.name,
          description: keyResultData?.description,
          ownerId: keyResultData?.ownerId,
          type: keyResultData?.type,
          start: keyResultData?.start,
          target: keyResultData?.target,
        });
      }
    }
  }, [goalId, keyId, getKeyResultByKeyId, reset]);

  const onSubmit = async (formData: any): Promise<void> => {
    try {
      const obj: any = {
        name: formData?.name,
        description: formData?.description,
        ownerId: formData?.ownerId,
        type: formData?.type,
        ...(binaryType === "Binary"
          ? { start: 0, target: 1 }
          : { start: formData?.start, target: formData?.target }),
      };
      if (goalId && keyId && getKeyResultByKeyId) {
        await updateKeyResult({ id: goalId, keyResultId: keyId, body: obj }).unwrap();
      } else {
        await addKeyResult({ id: goalId, body: obj }).unwrap();
      }
      toast.success(`Goals is ${goalId && keyId ? "updated" : "created"} successfully`);
      // router.push(`/goals/create-goal/goal-details/?goalId=${goalId}`);
      router.push(`/goals/view-details?goalId=${goalId}`);
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "Error while adding add key result");
    }
  };

  return {
    onSubmit,
    handleSubmit,
    router,
    methods,
    isLoading: isAddKeyLoading || isUpdateKeyLoading,
    isGetKeyLoading,
    actionType,
    goalId
  };
}
