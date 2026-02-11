import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  useGetGoalByIdQuery,
  usePostGoalCycleMutation,
  usePutSingleGoalMutation,
} from "@services/goal-cycle/goal-cycle-api";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import type {
  UseFormHandleSubmit,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

interface FormValues {
  cycleName: string;
  cycleStartDate: Date;
  cycleDueDate: Date;
  companyGoal?: boolean;
  departmentGoal?: boolean;
  individualGoal?: boolean;
}

interface ReturnType {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  methods?: UseFormReturn<FormValues>;
  isCreated: boolean;
  cycleId?: string | null;
  cycleStatus?: string | null;
}

export function useCreateGoal(): ReturnType {
  const [isCreated, setIsCreated] = useState(false);

  const cycleId = useSearchParams().get("id");

  const router = useRouter();

  const [postGoalCycle] = usePostGoalCycleMutation({});
  const [putSingleGoal] = usePutSingleGoalMutation({});

  const { data: singleCycle } = useGetGoalByIdQuery(
    { id: cycleId },
    { skip: cycleId === null }
  );

  const cycleStatus = singleCycle?.data?.status;

  const methods = useForm<FormValues>({
    resolver: yupResolver(
      Yup.object().shape({
        cycleName: Yup.string().required("Field is required."),
        cycleStartDate: Yup.date().required("Field is required."),
        cycleDueDate: Yup.date().required("Field is required."),
        companyGoal: Yup.boolean().optional(),
        departmentGoal: Yup.boolean().optional(),
        individualGoal: Yup.boolean().optional(),
      })
    ),
    defaultValues: {
      cycleName: "",
      cycleStartDate: undefined,
      cycleDueDate: undefined,
      companyGoal: false,
      departmentGoal: false,
      individualGoal: false,
    },
  });

  const { handleSubmit, setValue } = methods;

  async function onSubmit(values: FormValues): Promise<void> {
    setIsCreated(true);
    const {
      cycleStartDate,
      cycleDueDate,
      companyGoal,
      cycleName,
      departmentGoal,
      individualGoal,
    } = values;
    const obj = {
      cycleStartDate: dayjs(cycleStartDate).toISOString(),
      cycleDueDate: dayjs(cycleDueDate).toISOString(),
      companyGoal,
      cycleName,
      departmentGoal,
      individualGoal,
    };
    try {
      cycleId
        ? await putSingleGoal({ id: cycleId, payload: obj }).unwrap()
        : await postGoalCycle(obj).unwrap();
      toast.success(
        `Goal cycle ${cycleId ? "updated" : "created "} successfully`
      );
      router.push("/settings/goals/goals-cycles");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          `Error while ${cycleId ? "updating" : "creating "} goal`
      );
    } finally {
      setIsCreated(false);
    }
  }

  // updated fields values when id changed
  useEffect(() => {
    const cycle = singleCycle?.data;
    if (cycleId) {
      setValue("cycleName", cycle?.cycleName);
      setValue("cycleStartDate", dayjs(cycle?.cycleStartDate).toDate());
      setValue("cycleDueDate", dayjs(cycle?.cycleDueDate).toDate());
      setValue("companyGoal", cycle?.companyGoal);
      setValue("departmentGoal", cycle?.departmentGoal);
      setValue("individualGoal", cycle?.individualGoal);
    }
  }, [singleCycle, setValue, cycleId]);

  return {
    handleSubmit,
    onSubmit,
    isCreated,
    methods,
    cycleId,
    cycleStatus,
  };
}
