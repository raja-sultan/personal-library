import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface DrawerProps {
  handleSubmit: any;
  currencySymbol: string;
  methods: any;
  handleButtonClick: (value: string) => void;
  onSubmit: (value: any) => void;
}

export function useDrawer({ data }): DrawerProps {
  const [currencySymbol, setCurrencySymbol] = useState<string>("£");

  const methods = useForm<any>({
    defaultValues: { percentage: 0, newPay: "", currentSalary: "" },
  });
  const { handleSubmit, getValues, setValue, reset } = methods;

  useEffect(() => {
    const guidance = data?.user?.guidance ?? 0;
    setValue("newPay", data?.user?.newPay?.toFixed(2));
    setValue("currentSalary", data?.user?.currentSalary);
    setValue(
      "percentage",
      (data?.user?.currentSalary * guidance?.toFixed(2)) / 100
    );
    // reset({
    //   newPay: data?.user?.newPay?.toFixed(2),
    //   currentSalary: data?.user?.currentSalary,
    //   percentage: (data?.user?.currentSalary * guidance) / 100
    // })
  }, [data, setValue, reset]);

  const onSubmit = (formData: any): void => {
    console.log("FORM DATA", formData);
  };

  const handleButtonClick = (value: string): void => {
    setCurrencySymbol(value);
  };

  return {
    handleButtonClick,
    currencySymbol,
    onSubmit,
    handleSubmit,
    methods,
  };
}
