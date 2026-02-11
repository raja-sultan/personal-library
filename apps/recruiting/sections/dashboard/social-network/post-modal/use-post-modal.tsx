import { useForm } from "react-hook-form";
import { useLazyUsersQuery } from "@services/json-placeholder-api";

export function usePostModal({ openPostModal, setOpenPostModal }: any): any {
  const apiQuery = useLazyUsersQuery();
  const methods = useForm({
    defaultValues: {
      job: [],
      post: [],
      template: [],
      feedback: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any): void => {
    console.log("Post Data", data);
    setOpenPostModal(false);
  };

  return {
    methods,
    onSubmit,
    apiQuery,
    handleSubmit,
    openPostModal,
    setOpenPostModal,
  };
}
