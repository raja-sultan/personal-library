import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import {
  useCreateProspectPoolMutation,
  usePatchProspectPoolMutation,
} from "@services/crm/configure-crm/configure-crm-api";
import toast from "react-hot-toast";
import { configurePoolDefaultValues } from "./configure-pool.data";

export function useConfigurePool({ setProspectPoolModal }): any {
  const [rowData, setRowData] = useState<any>(null);

  const [postData, { isError, isSuccess, isLoading }] =
    useCreateProspectPoolMutation();
  const [updatePool] = usePatchProspectPoolMutation();
  const methods = useForm({
    defaultValues: configurePoolDefaultValues,
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const { fields, prepend, remove, swap } = useFieldArray({
    control,
    name: "stages",
  });
  const poolAdminsData = rowData?.poolAdmins?.map((pool: any) => {
    return {
      name: pool?.adminName,
      value: pool?.adminId,
    };
  });
  useEffect(() => {
    reset((formValues: any) => ({
      ...formValues,
      ...rowData,
      poolAdmins: poolAdminsData,
    }));
  }, [rowData, reset]);
  async function onSubmit(formData: any): Promise<void> {
    const poolArray = formData?.poolAdmins?.map((pool: any) => {
      return {
        adminName: pool?.name,
        adminId: pool?.value,
      };
    });

    try {
      if (!rowData?._id) {
        const res: any = await postData({
          body: {
            ...formData,
            poolAdmins: poolArray,
          },
        }).unwrap();
        toast.success(res?.message ?? `Update Successfully!`);
      } else {
        const res: any = await updatePool({
          body: {
            ...formData,
            poolAdmins: poolArray,
          },
          poolId: rowData?._id,
        }).unwrap();
        toast.success(res?.message ?? `Update Successfully!`);
      }
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    } finally {
      setRowData(null);
      reset(configurePoolDefaultValues);
      setProspectPoolModal(false);
    }
  }
  return {
    fields,
    prepend,
    remove,
    methods,
    handleSubmit,
    isSubmitting,
    onSubmit,
    isError,
    isSuccess,
    isLoading,
    setRowData,
    reset,
    swap,
  };
}
