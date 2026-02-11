// import { useForm } from "react-hook-form";
// import { useLazyGetHiringTeamUsersQuery } from "@services/jobs/create-jobs/hiring-team/hiring-team-api";

// export function UseBasicInformation({ hiringTeamData }): any {
//   const defaultValues = {
//     ...hiringTeamData?.responsiblePersons,
//   };

//   const getHiringTeamUsersQuery = useLazyGetHiringTeamUsersQuery();

//   const methods = useForm({
//     defaultValues,
//   });
//   const { getValues, watch } = methods;

//   return {
//     getHiringTeamUsersQuery,
//     methods,
//     getValues,
//     watch,
//   };
// }
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  useLazyGetHiringTeamUsersQuery,
  usePutHiringTeamMutation,
} from "@services/jobs/create-jobs/hiring-team/hiring-team-api";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
// import { hiringTeamFormSchema } from "./responsible-data";
import toast from "react-hot-toast";
import { hiringTeamFormSchema } from "@sections/jobs/hiring-team/responsible-jobs/responsible-data";

export function UseBasicInformation({ hiringTeamData }): any {
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
  const { handleSubmit, getValues,watch } = methods;

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
    watch,
    onSubmit,
    handleSubmit,
    toggleInputs,
    getValues,
    getHiringTeamUsersQuery,
  };
}
