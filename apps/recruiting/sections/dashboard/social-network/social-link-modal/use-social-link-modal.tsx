import { useForm } from "react-hook-form";

export function useSocialLinkModal({
    openSocialModal,
    setOpenSocialModal,
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
    setOpenSocialModal(false);
  };

  return {
    methods,
    onSubmit,
    handleSubmit,
    openSocialModal,
    setOpenSocialModal,
  };
}
