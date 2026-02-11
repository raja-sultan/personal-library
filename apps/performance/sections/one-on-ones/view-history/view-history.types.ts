import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import type { ReactNode, ChangeEvent } from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface GetSelectedOptions {
  name: string;
  optionsIds: string[];
}
[];

export interface IColumn {
  accessorFn: (data: any) => any;
  id: string;
  cell: (data: { getValue: () => any; cell?: { row: { original: { rating?: number } } } }) => ReactNode;
  header: () => ReactNode;
  isSortable: boolean;
}

export interface IReturnType {
  upcomingOneOnOneData?: CustomTableProps;
  filterList: any;
  toggleFilterDrawer: () => void;
  selectedFilter: any;
  setSelectedFilter: any;
  filterDrawer: boolean;
  searchValues: string;
  changeFilterHandler: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  handleTableCancelAction: any;
  openCancelMeetingModal: boolean;
  router: AppRouterInstance;
  viewHistory: any;
  userDetails: any;
  pastOneOnOneData?: CustomTableProps;
  currentOneOnOneData?: CustomTableProps;
  handleCancelMeeting: () => void;
  handleDeleteMeeting: any;
  openDeleteMeetingModal: boolean;
  handleTableDeleteAction: any;
  isDeleteLoading: boolean;
  isCancelLoading: boolean;
  teamHistoryType: string | null;
}

export interface IFilter {
  id?: string | null;
  meetingDate?: string;
  createdBy?: string[] | undefined;
  contentAddedBy?: string[] | undefined;
}
