import { useTheme } from "@mui/material";
import { useGetDepartmentSummaryQuery } from "@services/reports/essential-reports/essential-reports";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useGetOfficeQuery } from "@services/candidate/candidate-details/tools/add-prospect-api";
import { useGetDepartmentsQuery } from "@services/jobs/existing-job/existing-job-api";

const useSummary = () => {
  const theme: any = useTheme();
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<any>();
  const companyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const individualDepartment = params?.department?.map((item) => item?.value);
  const individualOffices = params?.office?.map((item) => item?.value);
  const individualUsers = params?.user?.map((item) => item?.value);

  const queryParams: any = {
    companyId,
    ...(params?.jobStatus && { jobStatus: params.jobStatus }),
    ...(individualDepartment &&
      individualDepartment.length > 0 && { Department: individualDepartment }),
    ...(individualOffices &&
      individualOffices.length > 0 && { Office: individualOffices }),
    ...(individualUsers &&
      individualUsers.length > 0 && { User: individualUsers }),
  };

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetDepartmentSummaryQuery({
      params: queryParams,
    });

  const stageLabels: any = data?.data?.map((item) => item.stage);

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
    open,
    setOpen,
    theme,
    departmentOptions,
    officeOptions,
    userList,
    setParams,
  };
};

export default useSummary;
