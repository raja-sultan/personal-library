import { useTheme } from "@mui/material";
import { useGetApplicationOverTimeQuery } from "@services/reports/essential-reports/essential-reports";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { monthsData } from "./application-data";
import { useGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useGetOfficeQuery } from "@services/candidate/candidate-details/tools/add-prospect-api";
import { useGetDepartmentsQuery } from "@services/jobs/existing-job/existing-job-api";

const useApplicationTime = () => {
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
    ...(params?.date && { dateApplied: params.date }),
    ...(individualDepartment &&
      individualDepartment.length > 0 && { department: individualDepartment }),
    ...(individualOffices &&
      individualOffices.length > 0 && { office: individualOffices }),
    ...(individualUsers &&
      individualUsers.length > 0 && { user: individualUsers }),
  };

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetApplicationOverTimeQuery({
      params: queryParams,
    });

  const stagesData = data?.data;

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

  // Transforming offerCreatedData into series data
  const newSeries = useMemo(() => {
    if (!stagesData?.length) {
      return [];
    }

    const seriesData = monthsData.map((month) => {
      const monthData = stagesData.find((item) => item.month === month);
      return monthData ? monthData.count : 0;
    });

    return [
      {
        name: "Applications",
        data: seriesData,
      },
    ];
  }, [stagesData]);

  return {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    newSeries,
    open,
    setOpen,
    theme,
    setParams,
    departmentOptions,
    officeOptions,
    userList,
  };
};

export default useApplicationTime;
