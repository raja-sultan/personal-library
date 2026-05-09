import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, defaultValues } from "./email-template.schema";
import { emailTeam } from "./email-template.data";
import { useLazyGetDepartmentsQuery } from "@services/settings/emails/choreographed-email-api";

export function useEmailTeamModal(): any {
  const departmentList = useLazyGetDepartmentsQuery();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const emailTeamDetails = emailTeam({
    departmentList,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };
  return {
    handleSubmit,
    onSubmit,
    methods,
    reset,
    departmentList,
    emailTeamDetails,
  };
}
