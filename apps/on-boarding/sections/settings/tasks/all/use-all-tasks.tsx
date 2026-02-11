import { BASE_URL } from "@root/config";
import { DownloadCsv } from "@root/utils/download.esv";
import {
  useGetOfficeQuery,
  useGetDepartmentsQuery,
  useGetTasksListQuery,
  useGetCriteriaListQuery,
  usePostCSVMutation,
} from "@services/settings/tasks/tasks-api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useAllTasks = () => {
  const [params, setParams] = useState<any>();
  const [isBulkSelected, setIsBulkSelected] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedRowJobs, setSelectedRowJobs] = useState<any>([]);
  const router: any = useRouter();

  //Extracting the IDS from an array
  const rowsIds = selectedRowJobs.map((item) => item?._id);

  //API FOR POST CSV
  const [postCVS]: any = usePostCSVMutation();

  const handlePostCSV = async () => {
    try {
      const res: any = await DownloadCsv(postCVS, "tasks/download-tasks-csv", {
        tasksIds: rowsIds,
      });
      toast.success(res?.message ?? `Successfully!`);
      // router.push(`${BASE_URL}tasks/download-tasks-csv`);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      toast.error(errMsg ?? "Something Went Wrong!");
    }
  };

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
      label: option.location,
      value: option.location,
    };
  });

  const { data: criteria } = useGetCriteriaListQuery({
    params: { search: "", limit: 10, offset: 0 },
  });

  const criteriaList = criteria?.data?.criteria?.map((option: any) => {
    return {
      id: option._id,
      label: option.criteriaName,
      value: option.criteriaName,
    };
  });

  const queryParams: any = {
    ...(params?.responsibleForTask && {
      responsibleForTask: params.responsibleForTask,
    }),
    ...(params?.employmentStatus && {
      employmentStatus: params.employmentStatus,
    }),
    ...(params?.search && { search: params.search }),
    ...(params?.department && { departmentId: params.department }),
    ...(params?.location && { locationId: params.location }),
    ...(params?.other_Criteria && { criteriaId: params.other_Criteria }),
  };

  const { data, isError, isFetching, isLoading, isSuccess } =
    useGetTasksListQuery({
      param: queryParams,
    });

  useEffect(() => {
    const filterJobs: any = [];
    selectedJobs.forEach((item: any) => {
      filterJobs.push(item.original);
    });
    setSelectedRowJobs(filterJobs);
    if (selectedJobs.length > 0) {
      setIsBulkSelected(true);
    } else {
      setIsBulkSelected(false);
    }
  }, [selectedJobs]);

  const handleSelected = (e: any) => {
    setSelectedJobs(e);
  };

  return {
    departmentOptions,
    officeOptions,
    setParams,
    open,
    setOpen,
    data,
    isBulkSelected,
    criteriaList,
    handleSelected,
    selectedRowJobs,
    handlePostCSV,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  };
};

export default useAllTasks;
