import type { AccessorFn } from "@tanstack/react-table";

export interface Columns {
  accessorFn?: AccessorFn<any>;
  id: string;
  cell: any;
  header: () => JSX.Element;
  isSortable?: boolean;
}
