import { useSelector } from "react-redux";
import { useGetPipeLineReportQuery } from "@services/reports/dashboard/pipeline-health/pipeline-health-api";
import { useMemo, useState } from "react";
import { useGetUsersListQuery } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useGetOfficeQuery } from "@services/candidate/candidate-details/tools/add-prospect-api";
import { useGetDepartmentsQuery } from "@services/jobs/existing-job/existing-job-api";

const usePipelineHealth = () => {
  const [pipelineModals, setPipelineModals] = useState<boolean>(false);

  const companyId: any = useSelector(
    (state: any) => state?.auth?.user?.companyId
  );

  const [params, setParams] = useState<any>();

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

  const { data, isLoading }: any = useGetPipeLineReportQuery({
    params: queryParams,
  });

  const closePipelineModal = (): void => {
    setPipelineModals(false);
  };

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
      lineCap: "round",
      width: [0, 2],
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
  };
  const series = useMemo(() => {
    if (!data?.data?.[0]?.data) {
      return [
        {
          name: "Application Over Time",
          data: [0, 0, 0, 0, 0, 0],
        },
      ];
    }

    return [
      {
        name: "Application Over Time",
        data: Array.from({ length: 12 }, (_, i) => {
          const monthData = data.data[0].data.find(
            (item: any) => item.month === i + 1
          );
          return monthData?.candidateCount || 0;
        }),
      },
    ];
  }, [data]);

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
    data,
    isLoading,
    series,
    closePipelineModal,
    options,
    pipelineModals,
    setPipelineModals,
    setParams,
    departmentOptions,
    officeOptions,
    userList,
    params,
  };
};

export default usePipelineHealth;
