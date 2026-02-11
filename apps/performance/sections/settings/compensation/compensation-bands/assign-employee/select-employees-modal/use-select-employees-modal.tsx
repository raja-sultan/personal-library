import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type {
  SelectEmployeesModal,
  // SelectEmployeesModalHook,
} from "./select-employees-modal.types";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { useGetBandMembersByIdQuery } from "@services/compensation/compensation-bands/compensation-bands-api";
import { useSearchParams } from "next/navigation";

const defaultValues = { name: "", title: "", allEmployees: false };

export function useSelectEmployeesModal(props: SelectEmployeesModal): any {
  const { setIsOpen = () => {}, isOpen = false, onAdd = () => {}, buttonTitle = "Add" } = props;

  const [selectedFilter, setSelectedFilter] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [employeesList, setEmployeesList] = useState<any>([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [empSearchValue, setEmpSearchValue] = useState<string>("");
  const [searchValues, setSearchValues] = useState<string>("");

  const methods = useForm<any>({ defaultValues });
  const { handleSubmit } = methods;

  const bandId = useSearchParams().get("id");

  function changeFilterHandler({ target: { value } }: any): void {
    setSearchValues(value);
  }

  const { data: getMangers } = useGetReferenceDataLookupQuery({
    search: searchValues,
    type: "managers",
  });

  const { data: getJobTitle } = useGetReferenceDataLookupQuery({
    search: searchValues,
    type: "job_title",
  });

  const managers = getMangers?.data?.map((manager) => {
    return { value: manager.value, name: manager.text };
  });
  const jobsTitle = getJobTitle?.data?.map((jobTitle) => {
    return { value: jobTitle.text, name: jobTitle.text };
  });

  /*********************Filter Lsit data*****************/

  const filterList = [
    {
      key: "managers",
      title: "Manager",
      titleList: managers,
    },
    {
      key: "employmentStartDate",
      title: "Start Date",
      startDate: true,
    },
    {
      key: "jobTitle",
      title: "Title",
      titleList: jobsTitle,
    },
    {
      key: "jobLevel",
      title: "Job Level",
      titleList: [
        { value: "Junior", name: "Junior" },
        { value: "Mid", name: "Mid Level" },
        { value: "Senior", name: "Senior" },
      ],
    },
  ];

  const queryParams: any = {};
  const keyMap = {
    managers: "managers",
    employmentStartDate: "startDate",
    jobTitle: "JobTitle",
    jobLevel: "jobLevel",
  };

  selectedFilter.forEach(({ name, value }) => {
    if (!queryParams[keyMap[name]]) {
      value && (queryParams[keyMap[name]] = value);
    }
  });

  const { data: employeesDataFromApi } = useGetBandMembersByIdQuery({
    id: bandId,
    params: {
      limit: 100000,
      offset: 0,
      isAMember: false,
      ...queryParams,
      search: empSearchValue,
    },
  });

  const handleClose = (): void => {
    setIsOpen(false);
  };

  function handleSelectEmployeesById(checked: boolean, id: string): void {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds?.filter((_id) => _id !== id));
    }
  }

  function handleSelectAllEmployees(checked: boolean): void {
    setSelectedIds(checked ? employeesDataFromApi?.data?.users?.map(({ _id }) => _id) : []);
  }

  const handleEmployeeSearch = (e: any) => {
    setTimeout(() => {
      setEmpSearchValue(e.target.value);
    }, 1000);
  };

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  const onSubmit = (): void => {
    onAdd(selectedIds);
  };

  const deSelectHandler = (emp: any): void => {
    setSelectedEmployees(selectedEmployees?.filter((item: any) => item?._id !== emp?._id));
    setSelectedIds(selectedIds?.filter((item: any) => item !== emp?._id));
    setEmployeesList([...employeesList, emp]);
  };

  useEffect(() => {
    const selected = employeesDataFromApi?.data?.users?.filter((item: any) =>
      selectedIds.includes(item?._id)
    );
    const notSelected = employeesDataFromApi?.data?.users?.filter(
      (item: any) => !selectedIds.includes(item?._id)
    );
    setSelectedEmployees(selected);
    setEmployeesList(notSelected);
  }, [selectedIds, employeesDataFromApi]);

  return {
    toggleDrawer,
    handleClose,
    employeesList,
    selectedEmployees,
    ApiData: employeesDataFromApi?.data?.users,
    selectedIds,
    setIsOpen,
    isOpen,
    onAdd,
    methods,
    buttonTitle,
    open,
    filterList,
    searchValues,
    onSubmit,
    handleSubmit,
    setSelectedFilter,
    changeFilterHandler,
    handleEmployeeSearch,
    deSelectHandler,
    handleSelectAllEmployees,
    handleSelectEmployeesById,
  };
}
