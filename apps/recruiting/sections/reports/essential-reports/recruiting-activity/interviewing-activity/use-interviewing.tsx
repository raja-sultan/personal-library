import { useGetInterviewingActivityJobQuery } from "@services/reports/essential-reports/essential-reports";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useGetJobsDropdownQuery } from "@services/jobs/job-details/pipeline-api";
import { useGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useGetOfficeQuery } from "@services/candidate/candidate-details/tools/add-prospect-api";
import { useGetDepartmentsQuery } from "@services/jobs/existing-job/existing-job-api";

const useInterviewing = () => {
  const [params, setParams] = useState<any>();
  const [open, setOpen] = useState(false);
  const companyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const individualDepartment = params?.department?.map((item) => item?.value);
  const individualOffices = params?.office?.map((item) => item?.value);
  const individualUsers = params?.recruiter?.map((item) => item?.value);
  const individualJob = params?.job?.map((item) => item?.value);

  const queryParams: any = {
    companyId,
    ...(params?.jobStatus && { jobStatus: params.jobStatus }),
    ...(params?.date && { activityDate: params.date }),
    ...(individualJob && individualJob.length > 0 && { Job: individualJob }),
    ...(individualDepartment &&
      individualDepartment.length > 0 && { Department: individualDepartment }),
    ...(individualOffices &&
      individualOffices.length > 0 && { Office: individualOffices }),
    ...(individualUsers &&
      individualUsers.length > 0 && { recruiter: individualUsers }),
  };

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetInterviewingActivityJobQuery({
      params: queryParams,
    });

  const stagesData = data?.data;

  let limitedData;

  if (stagesData) {
    limitedData = stagesData.slice(0, 10);
  } else {
    limitedData = [];
  }

  const stageLabels: any = limitedData?.map((item) => item.jobName);

  const newSeries = useMemo(() => {
    if (!stagesData) {
      return [];
    }
    // Get all unique property names from the data
    const propertyNames = new Set<string>(); // Define propertyNames as Set<string>
    limitedData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (typeof key === "string" && key.startsWith("has")) {
          propertyNames.add(key);
        }
      });
    });
    // Map each item in limitedData to a series object for each property
    const seriesData = Array.from(propertyNames).map((propertyName) => ({
      name: propertyName,
      data: limitedData.map((item) => (item[propertyName] === true ? 1 : 0)),
    }));

    return seriesData;
  }, [limitedData, stagesData]);

  //Departments API
  const { data: departments } = useGetDepartmentsQuery({});

  const departmentOptions = departments?.map((option: any) => {
    return {
      departmentId: option._id,
      label: option.departmentName,
      value: option._id,
    };
  });

  //Offices List API
  const { data: offices } = useGetOfficeQuery({});
  const officeOptions = offices?.map((option: any) => {
    return {
      officeId: option._id,
      label: option.officeName,
      value: option._id,
    };
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
    departmentOptions,
    officeOptions,
    jobList,
    userList,
    setParams,
  };
};

export default useInterviewing;
