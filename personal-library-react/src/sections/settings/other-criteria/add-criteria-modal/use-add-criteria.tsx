import { useForm } from "react-hook-form";
import { DefValue } from "../other-criteria.data";
import { usePostOtherCriteriaMutation } from "@services/settings/other-criteria/other-criteria-api";
import toast from "react-hot-toast";
import { useState } from "react";

export function useAddCriteria(): any {
  const [openModal, setOpenModal] = useState(false);

  const [postData, { isLoading }] = usePostOtherCriteriaMutation();
  const methods = useForm({
    defaultValues: DefValue,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data: any) => {
    const values = data?.recrutingValues?.map((items: any) => {
      return items?.value.toString();
    });
    try {
      const res: any = await postData({
        body: {
          criteriaName: data?.criteriaName,
          recrutingFeild: data?.recrutingFeild?.value,
          recrutingValues: values,
        },
      }).unwrap();
      reset();
      setOpenModal(false);
      toast.success(res?.message ?? `Update Successfully!`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  });
  return {
    methods,
    onSubmit,
    isSubmitting,
    isLoading,
    openModal,
    setOpenModal,
    reset,
  };
}
