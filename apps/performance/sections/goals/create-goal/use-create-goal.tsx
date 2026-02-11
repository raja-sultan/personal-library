import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCreateGoalsMutation,
  useUpdateGoalsMutation,
  useLazyGetGoalByIdQuery,
} from "@services/goals/goals.api";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { RHFTextField } from "common";

interface ReturnTypes {
  onSubmit?: (data: any) => void;
  handleSubmit?: any;
  router: AppRouterInstance;
  methods: any;
  getGoalId?: string | null;
  typeGroupComponent: any;
  typeDepartmentComponent: any;
  isCreateLoading: boolean;
  isUpdateLoading: boolean;
  isGetGoalLoading: boolean;
  path: string;
}

const defaultValues = {
  goalName: "",
  description: "",
  goalCycleId: null,
  owners: [],
  startDate: undefined,
  endDate: undefined,
  type: "",
  groupId: "",
  departmentId: "",
  visibility: "",
};

const createGoalFormSchema = Yup.object().shape({
  goalName: Yup.string().trim().required("Field is required").min(4).max(30),
  goalCycleId: Yup.string().nullable().required("Field is required"),
  owners: Yup.array().min(1, "Select at least one option").required("Field is required."),
  startDate: Yup.string().required("Field is required"),
  endDate: Yup.string().when('startDate', (startDate: any, schema) => {
    return schema
      .required('Field is required')
      .test({
        test(endDate) {
          if (!endDate) return true;
          return new Date(endDate) >= new Date(startDate);
        },
        message: 'End date must be greater than or equal to start date',
      });
  }),

  type: Yup.string().nullable().required("Field is required"),
  groupId: Yup.string().when("type", ([type], field) =>
    type.toLowerCase() === "group" ? field.required("Field is required") : field.optional()
  ),
  departmentId: Yup.string().when("type", ([type], field) =>
    type.toLowerCase() === "department" ? field.required("Field is required") : field.optional()
  ),
  visibility: Yup.string().nullable().required("Field is required"),
});

export function useCreateGoal(): ReturnTypes {
  const getGoalId = useSearchParams().get("id");
  const redirectTo = Boolean(useSearchParams().get("redirectTo"));
  const backPath = Boolean(useSearchParams().get("back"));
  const router = useRouter();


  let path = '/goals';
  if (redirectTo) path = '/my-team/view';
  if (backPath) path = '/profile';

  // api call *********************
  const [createGoals, { isLoading: isCreateLoading }] = useCreateGoalsMutation();
  const [updateGoals, { isLoading: isUpdateLoading }] = useUpdateGoalsMutation();
  const [getGoalById, { isLoading: isGetGoalLoading }] = useLazyGetGoalByIdQuery();

  const { data: departmentData } = useGetReferenceDataLookupQuery({
    type: "departments",
  });

  const { data: groupsData } = useGetReferenceDataLookupQuery({
    type: "groups",
  });

  const methods = useForm<any>({
    resolver: yupResolver(createGoalFormSchema),
    defaultValues,
  });
  const typeGroupComponent = {
    id: "1",
    componentProps: {
      name: "groupId",
      outerLabel: "Group",
      select: true,
      placeholder: "Select",
    },
    groupOptions:
      groupsData?.data?.map((items) => ({
        value: items?.value,
        label: items?.text,
      })) || [],
    component: RHFTextField,
    xl: 12,
    lg: 12,
    md: 12,
    xs: 12,
  };
  const typeDepartmentComponent = {
    id: "1",
    componentProps: {
      name: "departmentId",
      outerLabel: "Department",
      select: true,
      placeholder: "Select",
    },
    departmentOptions:
      departmentData?.data?.map((items) => ({
        value: items?.value,
        label: items?.text,
      })) || [],
    component: RHFTextField,
    xl: 12,
    lg: 12,
    md: 12,
    xs: 12,
  };
  const { handleSubmit, watch, reset, setValue } = methods;

  useEffect(() => {
    if (getGoalId) {
      getGoalById({ id: getGoalId })
        .unwrap()
        .then((data) => {
          const goalData = data?.data;
          reset({
            goalName: goalData?.goalName,
            description: goalData?.description,
            goalCycleId: goalData?.goalCycleId,
            owners: goalData?.ownersData?.map(
              (owner: {
                _id: string;
                firstName: string;
                lastName: string;
              }) => ({
                id: owner?._id,
                name: `${owner?.firstName} ${owner?.lastName}`,
              })
            ),
            startDate: dayjs(goalData?.startDate).toDate(),
            endDate: dayjs(goalData?.endDate).toDate(),
            type: goalData?.type,
            visibility: goalData?.visibility,
          });
          if (goalData?.type === "Group") {
            setValue(
              "groupId",
              groupsData?.data?.find(
                (group) => group?.value === goalData?.groupId
              )?.value
            );
          }
          if (goalData?.type === "Department") {
            setValue(
              "departmentId",
              departmentData?.data?.find(
                (department) => department?.value === goalData?.departmentId
              )?.value
            );
          }
        });
    }
  }, [getGoalId, groupsData, getGoalById, reset]);

  const TypeWatch = watch('type');

  const onSubmit = async (formData: any): Promise<void> => {
    try {
      const { groupId, departmentId, startDate, endDate, owners, ...rest } = formData;
      const obj = {
        ...(TypeWatch === 'Group' && { groupId }),
        ...(TypeWatch === 'Department' && { departmentId }),
        owners: owners?.map(({ id }: { id: string }) => id),
        startDate: dayjs(startDate)?.toISOString(),
        endDate: dayjs(endDate)?.toISOString(),
        ...rest,
      };
      const response = getGoalId
        ? await updateGoals({ id: getGoalId, ...obj }).unwrap()
        : await createGoals(obj).unwrap();
      const goalId = response?.data?._id;
      toast.success(
        `Goals is ${getGoalId ? "updated" : "created"}  successfully`
      );
      const goalDetailsRoute = getGoalId
        ? "/goals"
        : `/goals/create-goal/goal-details/?goalId=${getGoalId ?? goalId}`;
      router.push(redirectTo ? "/my-team/view" : goalDetailsRoute);
    } catch (error) {
      toast.error(
        error?.data?.message ??
        `Error while ${getGoalId ? "updating" : "creating"}  goal.`
      );
    }
  };

  return {
    onSubmit,
    handleSubmit,
    router,
    methods,
    getGoalId,
    typeGroupComponent,
    typeDepartmentComponent,
    isCreateLoading,
    isUpdateLoading,
    isGetGoalLoading,
    path
  };
}
