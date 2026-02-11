import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import type {
  Employee,
  SelectEmployeesModal,
  SelectEmployeesModalHook,
} from "./select-employees-modal.types";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { useEmployeesListQuery } from "@services/settings/people/employees-api";

const defaultValues = { name: "", title: "", allEmployees: false };

export function useSelectEmployeesModal(
  props: SelectEmployeesModal
): SelectEmployeesModalHook {
  const {
    setIsOpen = () => { },
    isOpen = false,
    onAdd = () => { },
    selectedMember,
    buttonTitle = "Add",
  } = props;
  const [selectData, setSelectData] = useState<Employee[] | null>(null);
  const [deSelectData, setDeSelectData] = useState<any>(selectedMember);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [open, setOpen] = useState(false);
  const methods = useForm<any>({ defaultValues });
  const [searchValue, setSearchValue] = useState<string>("");
  const { handleSubmit, setValue, watch } = methods;
  const checked = watch("allEmployees");
  const [searchValues, setSearchValues] = useState<string>("");

  function changeFilterHandler({ target: { value } }: any): void {
    setSearchValues(value);
  }

  const { data: getDepartments } = useGetReferenceDataLookupQuery({
    search: searchValues,
    type: "departments",
  });
  const { data: getMangers } = useGetReferenceDataLookupQuery({
    search: searchValues,
    type: "managers",
  });
  const { data: getJobTitle } = useGetReferenceDataLookupQuery({
    search: searchValues,
    type: "job_title",
  });

  const departments = getDepartments?.data?.map((department) => {
    return { value: department.value, name: department.text };
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
      key: "Manager",
      title: "Manager",
      titleList: managers,
    },
    {
      key: "Department",
      title: "Department",
      titleList: departments,
    },
    {
      key: "StartDate",
      title: "Start Date",
      startDate: true,
    },
    {
      key: "Job_title",
      title: "Title",
      titleList: jobsTitle,
    },
  ];

  const queryParams: any = {};
  const keyMap = {
    Manager: "managerId",
    Department: "department",
    employmentStartDate: "employmentStartDate",
    Job_title: "employeeTitle",
  };

  selectedFilter.forEach(({ name, value }) => {
    if (!queryParams[keyMap[name]]) {
      if (value) {
        queryParams[keyMap[name]] = value;
      }
    }
  });

  const { data: employeesData ,isLoading } = useEmployeesListQuery({
    limit: 50000,
    search: searchValue,
    ...queryParams,
  });

  const selectDataCopy: Employee[] = Array.isArray(selectData)
    ? [...selectData]
    : [];

  const deselectArrayCopy = deSelectData ? [...deSelectData] : [];

  const companyIds: string[] = deSelectData?.map((item) => item?._id);
  const onSubmit = (): void => {
    onAdd(companyIds);
    setIsOpen(!isOpen);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const deSelectHandler = (data: Employee): void => {
    const index = deselectArrayCopy.findIndex(
      (item: Employee) => item?._id === data?._id
    );
    deselectArrayCopy.splice(index, 1);

    selectDataCopy.push(data);
    setSelectData(selectDataCopy);
    setDeSelectData(deselectArrayCopy);
    setValue(data._id, false, { shouldValidate: true });
    setValue("allEmployees", false, { shouldValidate: true });
  };

  const selectHandler = (data: Employee): void => {
    const index = selectData?.findIndex(
      (item: Employee) => item._id === data._id
    );
    selectDataCopy.splice(index!, 1);
    deselectArrayCopy.push(data);
    setSelectData(selectDataCopy);
    setDeSelectData(deselectArrayCopy);
    setValue(data._id, false, { shouldValidate: true });
  };

  const selectAllHandler = (data: any): void => {
    deSelectData?.forEach((item) => {
      const fieldName = item?._id;
      setValue(fieldName, false, { shouldValidate: true });
    });
    if (!checked && Array.isArray(data)) {
      setSelectData([]);
      setDeSelectData([...deSelectData, ...data]);
    } else {
      setDeSelectData([]);
    }
  };

  const toggleDrawer = (): void => {
    setOpen(!open);
  };

  let timer: ReturnType<typeof setTimeout>;
  function handlerSearch({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchValue(value);
    }, 1000);
  }
  let filteredData = selectData?.filter((data: Employee) => {
    const fullName = `${data?.firstName} ${data?.lastName}`;
    const firstNameMatches = data?.firstName
      ?.toLowerCase()
      .startsWith(searchValue.toLowerCase());
    const lastNameMatches = data?.lastName
      ?.toLowerCase()
      .startsWith(searchValue.toLowerCase());
    const fullNameMatches = fullName?.toLowerCase().includes(searchValue);

    return firstNameMatches || lastNameMatches || fullNameMatches;
  });

  filteredData = filteredData?.filter((data: Employee) => {
    return !deSelectData?.some((item: Employee) => item._id === data._id);
  });

  useEffect(() => {
    if (deSelectData?.length > 0) {
      const filteredEmployees = employeesData?.data?.employees.filter(
        (element) => {
          return !deSelectData?.includes(element);
        }
      );

      setSelectData(filteredEmployees);
    } else {
      setSelectData(employeesData?.data?.employees);
    }
  }, [deSelectData, employeesData?.data?.employees]);

  useEffect(() => {
    if (deSelectData?.length > 0) {
      const filteredEmployees = employeesData?.data?.employees.filter(
        (element) => {
          return !deSelectData?.find((ele) => ele._id === element._id);
        }
      );

      setSelectData(filteredEmployees);
    } else {
      setSelectData(employeesData?.data?.employees);
    }
  }, [deSelectData, employeesData?.data?.employees]);

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setValue("allEmployees", false, { shouldValidate: true });
    }
    if (filteredData && filteredData?.length === 0) {
      setValue("allEmployees", true, { shouldValidate: true });
    }
  }, [searchValue, setValue, filteredData]);

  return {
    toggleDrawer,
    selectAllHandler,
    selectHandler,
    deSelectHandler,
    handleClose,
    onSubmit,
    handlerSearch,
    selectData,
    deSelectData,
    filteredData,
    setIsOpen,
    isOpen,
    onAdd,
    methods,
    buttonTitle,
    open,
    filterList,
    handleSubmit,
    setSelectedFilter,
    changeFilterHandler,
    searchValues,
    isLoading
  };
}
