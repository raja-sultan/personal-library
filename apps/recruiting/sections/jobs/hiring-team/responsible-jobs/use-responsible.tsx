import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  useLazyGetHiringTeamUsersQuery,
  usePutHiringTeamMutation,
} from "@services/jobs/create-jobs/hiring-team/hiring-team-api";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { hiringTeamFormSchema } from "./responsible-data";
import toast from "react-hot-toast";

export function UseResponsibleJobs({ hiringTeamData }): any {
  const [showValue, setShowValue] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const defaultValues = {
    ...hiringTeamData.responsiblePersons,
  };

  const [updateResponsibleData]: any = usePutHiringTeamMutation();
  const getHiringTeamUsersQuery = useLazyGetHiringTeamUsersQuery();
  const methods = useForm({
    resolver: yupResolver(hiringTeamFormSchema),
    defaultValues,
  });
  const { handleSubmit, getValues } = methods;

  const onSubmit = async (formData: any): Promise<void> => {
    const allArrays = [].concat(
      formData.hiringManagers,
      formData.recruiters,
      formData.sources,
      formData.coordinators
    );

    const updatedJobData = {
      hiringTeam: {
        responsiblePersons: { ...formData },
        jobVisibilityLevel: { ...allArrays },
      },
    };

    try {
      await updateResponsibleData({
        jobId,
        formData: updatedJobData,
      });
      setShowValue(true);
    } catch (error) {
      toast(error);
    }
  };

  const toggleInputs = (): void => {
    setShowValue((oldValue) => !oldValue);
  };

  return {
    showValue,
    methods,
    onSubmit,
    handleSubmit,
    toggleInputs,
    getValues,
    getHiringTeamUsersQuery,
  };
}
