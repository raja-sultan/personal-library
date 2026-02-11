import type { AccessorFn } from "@tanstack/react-table";
import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormReturn, UseFormHandleSubmit, SubmitHandler } from "react-hook-form";
export interface IColumns {
  accessorFn?: AccessorFn<any>;
  id: string;
  cell: (info: any) => React.JSX.Element;
  header: () => JSX.Element;
  isSortable?: boolean;
}
export interface IFormValues {
  name: string;
  description?: string;
}

export interface IFilters {
  limit: number;
  offset: number;
  search?: string;
}
export interface IUseEmployeesReturnType {
  isSetDepartmentsModal: boolean;
  mutationLoading: boolean;
  setIsSetDepartmentsModal: Dispatch<SetStateAction<boolean>>;
  setIsDeleteDepartment: Dispatch<SetStateAction<boolean>>;
  isDeleteDepartment: boolean;
  handleAddDepartment: SubmitHandler<IFormValues>;
  isAddDepartment: boolean;
  handleSubmit: UseFormHandleSubmit<IFormValues>;
  methods?: UseFormReturn<IFormValues>;
  getDepartment: any;
  handleDeleteDepartment: () => void;
  headersData: any;
  handleAddHeadsDepartment: (values: any) => void;
  handleDeleteDepartmentsHead: () => void;
  getDepartmentObj: any;
  actionType: string;
  setActionType: Dispatch<SetStateAction<string>>;
  handleCloseDepartment: () => void;
  tableData?: CustomTableProps;
  handleSearch?: (value: string) => void;
}
