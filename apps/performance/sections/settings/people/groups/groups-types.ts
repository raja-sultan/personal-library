import type { AccessorFn } from "@tanstack/react-table";
import type { Dispatch, SetStateAction } from "react";

export interface Columns {
  accessorFn?: AccessorFn<any>;
  id: string;
  cell: (info: any) => React.JSX.Element;
  header: () => JSX.Element;
  isSortable?: boolean;
}

export interface GroupsTableRow {
  id?: string | number;
  name?: string;
  description?: string;
  members?: string;
}
export interface UseGroupsReturnType {
  columns: Columns[];
  handleDeleteUser?: () => void;
  deleteUser?: boolean;
  setDeleteUser: Dispatch<SetStateAction<boolean>>;
  handleOffset: (value: number) => void;
  offset?: number;
  groupsData: any;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  searchValue: string;
  changeHandler: (value: string) => void;
}
