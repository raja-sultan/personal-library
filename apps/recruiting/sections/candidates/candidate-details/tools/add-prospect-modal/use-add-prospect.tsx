import {
  useLazyGetDepartmentsQuery,
  usePostProspectMutation,
  useLazyGetOfficeQuery,
  useLazyPoolListQuery,
  useLazyGetProspectOwnersQuery,
} from "@services/candidate/candidate-details/tools/add-prospect-api";
import toast from "react-hot-toast";
import { useLazyGetJobsDropdownQuery } from "@services/jobs/job-details/pipeline-api";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { schema, defaultValues } from "./add-prospect-modal.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLazyGetAllProspectPoolQuery } from "@services/crm/events/crm-events-api";

export function useAddProspectModal(setProspect: any): any {
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateID");
  const apiQuery = useLazyGetJobsDropdownQuery();
  const departmentList = useLazyGetDepartmentsQuery();
  const officeList = useLazyGetOfficeQuery();
  const poolList = useLazyPoolListQuery();
  const prospectOwners = useLazyGetProspectOwnersQuery();
  const prospectStageList = useLazyGetAllProspectPoolQuery();

  //POST API to Add Prospect
  const [postProspect] = usePostProspectMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;

  const poolDetails = watch("pool");

  const onSubmit = async (data) => {
    const specificJobsIds = data.specificJobs.map((job) => job._id);
    const payload = {
      candidateId,
      department: data.department.departmentName,
      office: data.office.officeName,
      pool: data.pool.name,
      prospectStage: data.prospectStage.stage,
      prospectOwner: data.prospectOwner.userName,
      specificJobs: specificJobsIds,
      source: "NOT_SPECIFIED",
      whoGetsCredit: "FaisalNaeem",
    };
    try {
      const { message } = await postProspect(payload).unwrap();
      toast.success(message || "Prospect Added Successfully");
      reset(defaultValues);
      setProspect(false);
    } catch (error) {
      const errMsg = error?.data.message;
      toast.error(errMsg || "Error Occurred");
      setProspect(false);
    }
  };

  return {
    apiQuery,
    handleSubmit,
    onSubmit,
    methods,
    departmentList,
    officeList,
    poolList,
    prospectStageList,
    prospectOwners,
    reset,
    watch,
    poolDetails,
  };
}
