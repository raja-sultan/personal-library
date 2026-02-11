import type { CustomTableProps } from "common/components/custom-table/custom-table.types";
import type { AccessorFn } from "@tanstack/react-table";

export interface UseFullReportTypes {
    open: boolean;
    toggleDrawer: () => void;
    tableData?: CustomTableProps;
    handleSearch: (value: string) => void;
    handleDownloadCSV: () => void;
    handleTimeRangeChange?: (item: any) => void;
    data?: any
  
  }
  export interface IFilter {
    startDate?: string,
    endDate?: string,
    search?: string,
    limit?: number,
    offset?: number
  }
  export interface Columns {
    accessorFn?: AccessorFn<any>;
    id: string;
    cell: (info: any) => React.JSX.Element;
    header: () => JSX.Element;
    isSortable?: boolean;
  }