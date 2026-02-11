import { useTheme } from "@mui/material";
import { useGetPipeLineReportsQuery } from "@services/reports/essential-reports/essential-reports";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetOfficeQuery } from "@services/candidate/candidate-details/tools/add-prospect-api";
import { useGetDepartmentsQuery } from "@services/jobs/existing-job/existing-job-api";
import { useGetJobsDropdownQuery } from "@services/jobs/job-details/pipeline-api";
import { useGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";

const usePipeline = () => {
  const theme: any = useTheme();
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<any>();
  const companyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const individualDepartment = params?.department?.map((item) => item?.value);
  const individualOffices = params?.office?.map((item) => item?.value);
  const individualUsers = params?.user?.map((item) => item?.value);
  const individualJob = params?.job?.map((item) => item?.value);

  const queryParams: any = {
    companyId,
    ...(params?.jobStatus && { jobStatus: params.jobStatus }),
    ...(params?.date && { dateApplied: params.date }),
    ...(individualJob && individualJob.length > 0 && { job: individualJob }),
    ...(individualDepartment &&
      individualDepartment.length > 0 && { department: individualDepartment }),
    ...(individualOffices &&
      individualOffices.length > 0 && { office: individualOffices }),
    ...(individualUsers &&
      individualUsers.length > 0 && { user: individualUsers }),
  };

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetPipeLineReportsQuery({
      params: queryParams,
    });

  const { data: jobDetails } = useGetJobsDropdownQuery({});
  const jobList = jobDetails?.map((list) => {
    return {
      id: list._id,
      label: list.jobName,
      value: list.jobName,
    };
  });

  const { data: userDetails } = useGetUsersListQuery({});

  const userList = userDetails?.map((list) => {
    return {
      id: list._id,
      label: list.userName,
      value: list.userName,
    };
  });

  const stageLabels: any = data?.data?.map((item) => item.stage);
  const newSeries = useMemo(() => {
    if (!data?.data) {
      return [];
    }
    const stagesData = data.data;
    const seriesData = stagesData.map((item) => ({
      x: item.stage || "Unknown Stage",
      y: item.count,
    }));
    return [
      {
        name: "Attainment",
        data: seriesData,
      },
    ];
  }, [data]);

  //Departments API
  const { data: departments } = useGetDepartmentsQuery({});

  const departmentOptions = departments?.map((option: any) => {
    return {
      id: option._id,
      label: option.departmentName,
      value: option._id,
    };
  });

  //Offices List API
  const { data: offices } = useGetOfficeQuery({});

  const officeOptions = offices?.map((option: any) => {
    return {
      id: option._id,
      label: option.officeName,
      value: option._id,
    };
  });

  return {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    stageLabels,
    newSeries,
    open,
    setOpen,
    theme,
    setParams,
    departmentOptions,
    officeOptions,
    jobList,
    userList,
  };
};

export default usePipeline;
