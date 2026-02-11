import { useGetEfficiencyReportQuery } from "@services/reports/dashboard/recruiting-efficiency/recruiting-efficiency-api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useGetOfficeQuery } from "@services/candidate/candidate-details/tools/add-prospect-api";
import { useGetDepartmentsQuery } from "@services/jobs/existing-job/existing-job-api";

const useRecruitingEfficiency = () => {
  const [params, setParams] = useState<any>();
  const [recruitingModals, setRecruitingModals] = useState<boolean>(false);

  const companyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const individualDepartment = params?.department?.map((item) => item?.value);
  const individualOffices = params?.office?.map((item) => item?.value);
  const individualUsers = params?.recruiters?.map((item) => item?.value);

  const queryParams: any = {
    companyId,
    ...(individualDepartment &&
      individualDepartment.length > 0 && { department: individualDepartment }),
    ...(params?.startDate && { startDate: params.startDate }),
    ...(params?.endDate && { endDate: params.endDate }),
    ...(individualOffices &&
      individualOffices.length > 0 && { office: individualOffices }),
    ...(individualUsers &&
      individualUsers.length > 0 && { recruiters: individualUsers }),
  };

  const { data: getEfficiencyData, isLoading } =
    useGetEfficiencyReportQuery<any>({
      params: queryParams,
    });

  const efficiencyData = getEfficiencyData?.data[0]?.data;

  console.log("getEfficiencyData", getEfficiencyData);

  const options: any = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    toolbar: {
      show: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    colors: ["#EC3676", "#EC3676", "#D9D9D9"],
  };
  const series = [
    {
      name: "series2",
      data: efficiencyData?.map((item) => item?.candidateCount)??[0,0,0,0,0,0],
    },
  ];
  //Departments API
  const { data: departments } = useGetDepartmentsQuery({});

  const departmentOptions = departments?.map((option: any) => {
    return {
      id: option._id,
      label: option.departmentName,
      value: option.departmentName,
    };
  });

  //Offices List API
  const { data: offices } = useGetOfficeQuery({});

  const officeOptions = offices?.map((option: any) => {
    return {
      id: option._id,
      label: option.officeName,
      value: option.officeName,
    };
  });

  const { data: userDetails } = useGetUsersListQuery({});

  const userList = userDetails?.data?.map((list) => {
    return {
      id: list._id,
      label: list.userName,
      value: list.userName,
    };
  });

  return {
    isLoading,
    departmentOptions,
    officeOptions,
    userList,
    setParams,
    series,
    options,
    recruitingModals,
    setRecruitingModals,
    getEfficiencyData,
    params,
    open,
    efficiencyData,
  };
};

export default useRecruitingEfficiency;
