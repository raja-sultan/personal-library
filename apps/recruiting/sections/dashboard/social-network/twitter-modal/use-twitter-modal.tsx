import { useForm } from "react-hook-form";

export function useTwitterModal({
  openTwitterModal,
  setOpenTwitterModal,
}: any): any {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any): void => {
    console.log("Post Data", data);
    setOpenTwitterModal(false);
  };

  return {
    methods,
    onSubmit,
    handleSubmit,
    openTwitterModal,
    setOpenTwitterModal,
  };
}
