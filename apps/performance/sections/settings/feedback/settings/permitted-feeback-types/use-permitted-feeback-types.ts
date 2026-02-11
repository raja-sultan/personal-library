import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdatePermitttedFeedbackTypesMutation } from "@services/settings/feedback/settings/settings-api";

interface IFormData {
  PUBLIC: boolean;
  PRIVATE: boolean;
  PRIVATE_AND_MANAGER: boolean;
  MANAGER: boolean;
}
interface PermittedFeedbackTypes {
  handleSubmit: any;
  handleToggle: () => void;
  isOpen: boolean;
  methods: any;
  onSubmit: (value: any) => void;
  defaultValues: IFormData;
}

export const defaultValues = {
  PUBLIC: false,
  PRIVATE: false,
  MANAGER: false,
  PRIVATE_AND_MANAGER: false,
};

export function usePermittedFeedbackTypes(): PermittedFeedbackTypes {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const methods = useForm<any>({ defaultValues });
  const { handleSubmit, reset } = methods;
  const [updatePermittedFeedback] = useUpdatePermitttedFeedbackTypesMutation();

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

const onSubmit = async (data: IFormData): Promise<void> => {
  if (
    !data.PUBLIC &&
    !data.PRIVATE &&
    !data.MANAGER &&
    !data.PRIVATE_AND_MANAGER
  ) {
    toast.error("Please select Permitted Feedback Type");
  } else {
    try {
      await updatePermittedFeedback({
        permittedFeedbackTypes: data,
      }).unwrap();
      toast.success("Permitted Feedback Types updated successfully ");
      reset();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  }
};

  return {
    handleSubmit,
    handleToggle,
    isOpen,
    methods,
    onSubmit,
    defaultValues,
  };
}
