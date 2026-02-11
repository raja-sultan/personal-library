import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { usePostUpdatesSettingMutation } from "@services/settings/updates/settings-api";
import type { IFormData, updateSettingTypes } from "./updates-setting-types";
import { defaultValues, updateSettingSchma } from "./updates-setting.data";

export function useUpdatesSetting(): updateSettingTypes {
  const [isOpen, setIsOpen] = useState<{ general: boolean; defaults: boolean }>(
    { general: false, defaults: false }
  );

  const methods = useForm<any>({
    resolver: yupResolver(updateSettingSchma),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const [postUpdateSetting] = usePostUpdatesSettingMutation({});

  const onSubmit = async (data: IFormData): Promise<void> => {
    const payload = {
      employeeSentiment: data.employeeSentiment,
      publicUpdates: data.publicUpdates,
      allowManagerOverride: data.allowManagerOverride,
      schedule: {
        frequency: data.frequency,
        day: data.day,
        time: data.time,
      },
    };
    try {
      await postUpdateSetting({ body: payload }).unwrap();
      toast.success("Data is submitted successfully");
      reset();
    } catch (err) {
      toast.error(err);
    }
  };

  const handleGeneralToggle = (): void => {
    setIsOpen({ ...isOpen, general: !isOpen.general, defaults: false });
  };

  const handleDefaultsToggle = (): void => {
    setIsOpen({ ...isOpen, defaults: !isOpen.defaults, general: false });
  };

  return {
    handleGeneralToggle,
    handleDefaultsToggle,
    isOpen,
    onSubmit,
    methods,
    handleSubmit,
  };
}
