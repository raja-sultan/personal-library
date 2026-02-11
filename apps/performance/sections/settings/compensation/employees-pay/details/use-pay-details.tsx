"use client";

import * as yup from "yup";
import { useSearchParams, useRouter } from "next/navigation";
import { type UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetEmployeePayDataQuery,
  useUpdateEmployeePayMutation,
} from "@services/compensation/employee-pay/employee-pay-api";
import toast from "react-hot-toast";
import { useEffect } from "react";
import dayjs from "dayjs";

interface PayDetailsFormData {
  payType: string;
  currency: string;
  payEffectiveDate: any;
  basePay: number | null;
  variablePay: number | null;
}

interface UsePayDetailsReturn {
  router: ReturnType<typeof useRouter>;
  methods: UseFormReturn<PayDetailsFormData>;
  handleSubmit: any;
  handleUpdatePay: (formValues: PayDetailsFormData) => void;
}

export default function usePayDetails(): UsePayDetailsReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data } = useGetEmployeePayDataQuery({});
  const employeePay = data?.data?.employeePay?.find((item: any) => item._id === id);

  const [updateEmployeePay] = useUpdateEmployeePayMutation();

  const defaultValues: PayDetailsFormData = {
    payType: "",
    currency: "",
    payEffectiveDate: "",
    basePay: null,
    variablePay: null,
  };

  const payDetailsSchema = yup.object().shape({
    payType: yup.string().required("Pay Type is required"),
    currency: yup.string().required("Currency is required"),
    payEffectiveDate: yup.date().required("Date is required"),
    basePay: yup
      .number()
      .required("Base Pay is required")
      .positive("Base Pay must be a positive number"),
  });

  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(payDetailsSchema),
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (employeePay) {
      Object.keys(employeePay).forEach((key) => {
        const value =
          key === "payEffectiveDate"
            ? new Date(dayjs(employeePay[key])?.format("MM/DD/YYYY"))
            : employeePay[key];

        setValue(key, value);
      });
    }
  }, [employeePay, setValue]);

  //Update employee pay API
  const handleUpdatePay = async (formValues: any): Promise<void> => {
    const payload = {
      currency: formValues?.currency,
      payType: formValues?.payType,
      payEffectiveDate: dayjs(formValues?.payEffectiveDate).toISOString(),
      basePay: Number(formValues?.basePay),
      variablePay: Number(formValues?.variablePay),
    };
    try {
      await updateEmployeePay({ id, payload }).unwrap();
      toast.success("Record Updated Successfully");
      router.push("/settings/compensation/employees-pay");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return { router, methods, handleSubmit, handleUpdatePay };
}
