import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditUserAttributesSchema } from "../attribute-form.schema";
import { useRouter, useSearchParams } from "next/navigation";
import type { UseAttributeForm, UserAttributesFormData } from "../user-attributes.types";
import { editDefaultValues } from "../attribute-form.data";
import { useForm } from "react-hook-form";
import { useAttributeDetailsQuery, useUpdateAttributeMutation } from "@services/settings/people/user-attribute-api";
import toast from "react-hot-toast";

export function useEditAttribute(): UseAttributeForm {

  const attributeId = useSearchParams().get("id");
  const { data: attributeDetails } = useAttributeDetailsQuery(attributeId);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [attributeType, setAttributeType] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const [updateAttribute, { isLoading }] = useUpdateAttributeMutation();
  const handleCloseSnackBar = (): void => {
    setSnackbarOpen(false);
  };
  const handleChange = (event): void => { setChecked(event.target.checked);
  };
  const router = useRouter();
  const methods = useForm<UserAttributesFormData>({
    resolver: yupResolver(EditUserAttributesSchema),
    defaultValues: editDefaultValues,
  });

  const { handleSubmit, setValue, formState: { errors } } = methods;

  const onSubmit = async (formData): Promise<void> => {
    formData.type = attributeType;
    formData.isRange = attributeType === "Number" ? checked : false; 
    try {
      await updateAttribute({ id: attributeId, payload: formData }).unwrap();
      toast.success("Attribute updated successfully.")
      router.push("/settings/user-attributes");
    } catch (error) {
      toast.error(error?.data?.message)
    } 
  };
  useEffect(() => {
    setAttributeType(attributeDetails?.data?.type)
    setValue("name", attributeDetails?.data?.name)
    setValue("visibility", attributeDetails?.data?.visibility)
    setChecked(attributeDetails?.data?.isRange)
  }, [attributeDetails, setValue])

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
    attributeDetails,
    checked,
    handleChange
  };
}

