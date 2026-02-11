import { useState } from "react";
import { useOneOnOnesSettingMutation } from "@services/settings/one-on-ones/setting-api";
import toast from "react-hot-toast";
import type { UseLimitOneOnOnesSection } from "./limit-1-on-1s-type";

function useLimitOneOnOnesSection(): UseLimitOneOnOnesSection {
  const [selectedValue, setSelectedValue] = useState(
    "Employees can only have 1-on-1s with their managers and/or direct reports"
  );

  const [updateOneOnOnesSetting] = useOneOnOnesSettingMutation();

  const handleRadioChange = (event): void => {
    setSelectedValue(event.target.value);
    const data = {
      oneOnOne: {
        limitOneOnOne: event.target.value,
      },
    };
    updateOneOnOnesSetting(data)
      .unwrap()
      .then((response) => {
        toast.success(response.data.oneOnOne.limitOneOnOne);
      })
      .catch(() => {
        toast.error("Error setting up Limit 1 on 1s");
      });
  };

  return {
    selectedValue,
    handleRadioChange,
  };
}

export default useLimitOneOnOnesSection;
