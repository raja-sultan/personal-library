import type { AccessorFn } from "@tanstack/react-table";

export interface columnsType {
  accessorFn?: AccessorFn<any>;
  id: string;
  cell: (info: any) => React.JSX.Element;
  header: ({ table, row }: any) => React.JSX.Element;
  isSortable?: boolean;
}
