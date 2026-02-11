import { useForm } from "react-hook-form";
import * as Yup from "yup";
import type {
  UseFormHandleSubmit,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useEffect } from "react";
import {
  useCreateGroupMutation,
  useEditGroupMutation,
  useSingleGroupQuery,
} from "@services/settings/career/plans/groups-api";
import { useGetCareerPlansQuery } from "@services/settings/career/plans/plans-api";

interface FormValues {
  name: string;
  plans?: { id: string; name: string }[] | [];
}
interface ReturnType {
  methods: UseFormReturn<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  getCareerPlans: { _id: string; title: string }[] | [];
}

const queryParams: any = {};

export function useGroupModal({ onClose, id }): ReturnType {
  const { data: singleGroup } = useSingleGroupQuery({ id });

  const { data } = useGetCareerPlansQuery({
    limit: 10000,
    offset: 0,
    listingType: "all",
    ...queryParams,
  });
  const [createCareerGroups] = useCreateGroupMutation();
  const [editGroups] = useEditGroupMutation();

  const getCareerPlans =
    data?.data?.careerPlan?.map(
      ({ _id, title }: { _id: string; title: string }) => {
        return { id: _id, name: title, value: _id };
      }
    ) ?? [];

  const result = getCareerPlans.filter((obj) =>
    singleGroup?.data?.planIds.includes(obj.id)
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required("Group name is required"),
        plans: Yup.array().optional(),
      })
    ),
    defaultValues: { name: "", plans: [] },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      name: singleGroup?.data.name ?? "",
      plans: result ?? [],
    }));
  }, [reset, singleGroup]);

  async function onSubmit(values: FormValues): Promise<void> {
    const planIds = values?.plans?.map((item: any) => item.id) ?? [];
    const payload = { name: values?.name, planIds };

    try {
      if (id) {
        await editGroups({ id, body: payload }).unwrap();
        toast.success("Group Edit Successfully");
      } else {
        await createCareerGroups({
          body: payload,
        }).unwrap();
        toast.success("Group Created Successfully");
      }
    } catch (error) {
      const errorMessage =
        error.message ||
        `Failed to ${id ? "edit" : "create"} group. Please try again later.`;
      toast.error(errorMessage);
    } finally {
      onClose();
    }
  }

  return {
    handleSubmit,
    onSubmit,
    methods,
    getCareerPlans,
  };
}
