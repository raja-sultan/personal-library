import type { AccessorFn } from "@tanstack/react-table";

export interface Columns {
    accessorFn?: AccessorFn<any>;
    id: string;
    cell: (info: any) => React.JSX.Element;
    header: () => JSX.Element;
    isSortable?: boolean;
}

export interface DepartmentFilters {
    id: number;
    label: string
}

export interface Data {
    id: string;
    band: string;
    department: string;
    jobLevel: string;
    tile: string;
    location: string;
    minBasePay: string;
    midBasePay: string;
    maxBasePay: string;
    minVariablePay: string;
    midVariablePay: string;
    maxVariablePay: string;
}
