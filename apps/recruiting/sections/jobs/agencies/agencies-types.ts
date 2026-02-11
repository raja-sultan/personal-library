import type { AccessorFn } from "@tanstack/react-table";

export interface Columns {
    accessorFn?: AccessorFn<any>;
    id: string;
    cell: (info: any) => React.JSX.Element;
    header: () => JSX.Element;
    isSortable: boolean;
}
export interface agenciesReturnType {
columns: Columns[];
}