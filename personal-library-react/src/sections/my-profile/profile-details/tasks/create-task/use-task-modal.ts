import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./task-modal.schema";

export function useCreateTaskModal(): any {
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
  };
}
