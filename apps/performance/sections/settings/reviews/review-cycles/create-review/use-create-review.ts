import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetEmployeesQuery } from "@services/login-as";
import {
  useAddReviewCycleMutation,
  useLazyGetReviewCycleByIdQuery,
  useUpdateReviewCycleByIdMutation,
} from "@services/settings/review/review-cycle-api";
import { type FormValues, reviewCycleSchema } from "./form-data.schema";
import { defaultValues } from "./form-data.default-value";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import type {
  UseFormHandleSubmit,
  SubmitHandler,
  UseFormReturn,
  UseFormWatch,
} from "react-hook-form";
import { useEmployeesListQuery } from "@services/settings/people/employees-api";

interface ReturnType {
  methods: UseFormReturn<FormValues>;
  onBack?: () => void;
  handleSelectEmployees?: () => void;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  selectEmployeesModal?: boolean;
  handleAddEmployees?: (ids: string[]) => void;
  handlePreviewModal: (id: string | null) => void;
  previewModal?: boolean;
  watch?: UseFormWatch<FormValues>;
  handleEmployeeChange?: () => void;
  setLaunchStatus: Dispatch<SetStateAction<string>>;
  selectEmployees?: any;
  templatePreviewId: string | null;
}

export function useCreateReview(): ReturnType {
  const cycleId = useSearchParams().get("id");
  const [getReview] = useLazyGetReviewCycleByIdQuery();
  const { data: employeesList } = useGetEmployeesQuery({ type: "employees" });
  const [addReviewCycleMutation] = useAddReviewCycleMutation();
  const [updateReviewCycleMutation] = useUpdateReviewCycleByIdMutation();
  const router = useRouter();

  const [selectEmployeesModal, setSelectEmployeesModal] = useState<boolean>(false);
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const [selectEmployeesIds, setSelectEmployeesIds] = useState<string[]>([]);
  const [selectEmployees, setSelectEmployees] = useState<any>([]);
  const [launchStatus, setLaunchStatus] = useState<string>("ACTIVE");
  const [templatePreviewId, setTemplatePreviewId] = useState<string | null>(null);

  const methods = useForm<FormValues>({
    resolver: yupResolver(reviewCycleSchema) as any,
    defaultValues,
  });

  const { handleSubmit, watch, setValue, reset } = methods;

  const { data: employeesData } = useEmployeesListQuery({
    limit: 50000,
    search: "",
  });

   useEffect(() => {
     const filteredArray = employeesData?.data?.employees.filter((obj) =>
       selectEmployeesIds?.includes(obj._id)
       );
       setSelectEmployees(filteredArray)
    
   }, [selectEmployeesIds]);

  useEffect(() => {
    if (cycleId && employeesList?.data) {
      getReview({ id: cycleId })
        .unwrap()
        .then(({ data: singleReviewCycle }) => {
          setSelectEmployeesIds(singleReviewCycle?.reviewees);
          reset({
            name: singleReviewCycle?.name,
            reviewType: singleReviewCycle?.reviewType,
            reviewees:
              singleReviewCycle?.reviewees?.length === employeesList?.data?.length
                ? "allEmployees"
                : "specificEmployees",
            downwardReview: singleReviewCycle?.downwardReview,
            selfReview: singleReviewCycle?.selfReview,
            peerReview: singleReviewCycle?.peerReview,
            upwardReview: singleReviewCycle?.upwardReview,
            downwardReviewType: singleReviewCycle?.downwardReviewType,
            downwardReviewTemplate: singleReviewCycle?.downwardReviewTemplate,
            selfReviewTemplate: singleReviewCycle?.selfReviewTemplate,
            upwardReviewTemplate: singleReviewCycle?.upwardReviewTemplate,
            peerReviewTemplate: singleReviewCycle?.peerReviewTemplate,
            launchDate: dayjs(singleReviewCycle?.launchDate).toDate(),
            launchTime: dayjs(singleReviewCycle?.launchDate).toDate(),
            reminder: dayjs(singleReviewCycle?.reminder).toDate(),
            reminderTime: dayjs(singleReviewCycle?.reminder).toDate(),
            endDate: dayjs(singleReviewCycle?.endDate).toDate(),
            endTime: dayjs(singleReviewCycle?.endDate).toDate(),
            shareWith: singleReviewCycle?.shareWith,
          });
        });
    }
  }, [getReview, cycleId, employeesList?.data, reset]);

  function handleSelectEmployees(): void {
    setSelectEmployeesModal(!selectEmployeesModal);
  }

  function onBack(): void {
    router.push("/settings/reviews/review-cycles");
  }

  function handlePreviewModal(id: string | null): void {
    setTemplatePreviewId(id);
    setPreviewModal(!previewModal);
  }

  function handleEmployeeChange(): void {
    cycleId && handleSelectEmployees();
  }

  function formatDateTimeToISOString(date: string, time?: string): string {
    const dateString = dayjs(...(dayjs(date).isValid() ? [date] : [])).format("YYYY-MM-DD");
    const timeString = dayjs(...(dayjs(time).isValid() ? [time] : [])).format("HH:mm:ss");
    return dayjs(date).isValid() ? dayjs(`${dateString} ${timeString}`).toISOString() : "";
  }

  async function onSubmit(values: any): Promise<void> {
    const totalEmployees = employeesList?.data?.map(({ value }) => value);
    const reviewees = values?.reviewees === "allEmployees" ? totalEmployees : selectEmployeesIds;
    const downwardReviewType = values?.downwardReview ? values?.downwardReviewType : null;
    const obj = {
      ...values,
      reviewees,
      launchStatus,
      launchDate: formatDateTimeToISOString(values?.launchDate, values?.launchTime),
      reminder: formatDateTimeToISOString(values?.reminder, values?.reminderTime),
      endDate: formatDateTimeToISOString(values?.endDate, values?.endTime),
      downwardReviewType
    };
    delete obj?.launchTime;
    delete obj?.reminderTime;
    delete obj?.endTime;
    const filteredObj = Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== "" && value !== false)
    );
    try {
      cycleId
        ? await updateReviewCycleMutation({
            id: cycleId,
            payload: filteredObj,
          }).unwrap()
        : await addReviewCycleMutation({ payload: obj }).unwrap();
      toast.success(`Review cycle ${cycleId ? "updated" : "launched"}`);
      onBack();
    } catch (error) {
      toast.error(
        error?.data?.message || `Error while ${cycleId ? "updating" : "launching"} review cycle`
      );
    }
  }

  function handleAddEmployees(ids: string[]): void {
    setSelectEmployeesIds(ids);
  }

  const watchName = watch("reviewees");
  useEffect(() => {
    if (watchName === "specificEmployees" && !cycleId) {
      handleSelectEmployees();
    }
  }, [watchName, cycleId]);

  const watchDownwardReview = watch("downwardReview");
  const watchUpwardReview = watch("upwardReview");
  const watchSelfReview = watch("selfReview");
  const watchPeerReview = watch("peerReview");
  useEffect(() => {
    if (watchDownwardReview === false) {
      setValue("downwardReviewType", "");
      setValue("downwardReviewTemplate", "");
    }
    if (watchUpwardReview === false) {
      setValue("upwardReviewTemplate", "");
    }
    if (watchSelfReview === false) {
      setValue("selfReviewTemplate", "");
    }
    if (watchPeerReview === false) {
      setValue("peerReviewTemplate", "");
    }
  }, [watchDownwardReview, watchUpwardReview, watchSelfReview, watchPeerReview, setValue]);

  return {
    methods,
    onBack,
    handleSubmit,
    onSubmit,
    selectEmployeesModal,
    handleSelectEmployees,
    handleAddEmployees,
    handlePreviewModal,
    previewModal,
    watch,
    handleEmployeeChange,
    setLaunchStatus,
    selectEmployees,
    templatePreviewId,
  };
}
