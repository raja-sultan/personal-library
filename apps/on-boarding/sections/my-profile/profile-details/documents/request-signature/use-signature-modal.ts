import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./signature-modal.schema";
import { useLazyGetDepartmentsQuery } from "@services/settings/emails/choreographed-email-api";

export function useRequestSignatureModal(): any {
  const departmentList = useLazyGetDepartmentsQuery();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };
  return {
    handleSubmit,
    onSubmit,
    methods,
    departmentList,
  };
}
