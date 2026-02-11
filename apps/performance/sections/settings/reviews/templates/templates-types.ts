import type { AccessorFn } from "@tanstack/react-table";

import type { Dispatch, SetStateAction } from "react";

export interface columns {
  accessorFn?: AccessorFn<any>;
  id?: string;
  cell?: (info: any) => React.JSX.Element;
  header?: () => JSX.Element;
  isSortable?: boolean;
}

export interface ReturnType {
  columns?: any;
  duplicateModal?: boolean;
  handleDuplicateModal?: () => void;
  handleDuplicateTemplate?: () => void;
  viewModal?: boolean;
  handleViewModal?: () => void;
  setSearchValue: Dispatch<SetStateAction<string>>;
  templateData: any;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  tableId: string;
  handleOffset: (value: number) => void;
  setOffset?: (value: number) => void;
  question: string;
}
