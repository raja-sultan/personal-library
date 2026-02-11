import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { userAttributesSchema } from "../attribute-form.schema";
import { useRouter } from "next/navigation";
import type { UseAttributeForm, UserAttributesFormData } from "../user-attributes.types";
import { defaultValues } from "../attribute-form.data";
import { useForm } from "react-hook-form";
import { useCreateAttributeMutation } from "@services/settings/people/user-attribute-api";
import toast from "react-hot-toast";

export function useCreateAttribute(): UseAttributeForm {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [attributeType, setAttributeType] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const [createAttribute, { isLoading }] = useCreateAttributeMutation();
  const handleCloseSnackBar = (): void => {
    setSnackbarOpen(false);
  };

 const handleChange = (event): void => { setChecked(event.target.checked);
  };

 

  const router = useRouter();
  const methods = useForm<UserAttributesFormData>({
    resolver: yupResolver(userAttributesSchema),
    defaultValues,
  });

  const { handleSubmit, setValue, formState: { errors } } = methods;

  const onSubmit = async (formData): Promise<void> => {
    formData.options = formData?.options?.map(option => option?.value);
    formData.isRange = attributeType === "Number" ? checked : false; 
    try {
      await createAttribute(formData).unwrap();
      toast.success("Attribute created successfully.")
      router.push("/settings/user-attributes");
    } catch (error) {
      toast.error(error?.data?.message)
    }
  };


  return {
    attributeType,
    setAttributeType,
    onSubmit,
    methods,
    handleSubmit,
    router,
    snackbarOpen,
    handleCloseSnackBar,
    setValue,
    isLoading,
    errors,
    checked,
    handleChange
  };
}

