import { useForm } from "react-hook-form";
import { useLazyUsersQuery } from "@services/json-placeholder-api";

export function useScheduleModal({
  openScheduleModal,
  setOpenScheduleModal,
}: any): any {
  const apiQuery = useLazyUsersQuery();
  const methods = useForm({
    defaultValues: {
      template: [],
      feedback: "",
      schedule: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any): void => {
    console.log("Post Data", data);
    setOpenScheduleModal(false);
  };

  return {
    methods,
    onSubmit,
    apiQuery,
    handleSubmit,
    openScheduleModal,
    setOpenScheduleModal,
  };
}
