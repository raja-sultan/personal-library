import type { ChangeEvent } from "react";

export interface Employee {
  firstName: string;
  lastName: string;
  employeeTitle: string;
  _id: string;
  profileImage: string;
}
export interface SeclectedMember {
  firstName: string;
  lastName: string;
  employeeTitle: string;
  _id: string;
  profileImage?: string;
}
export interface SelectEmployeesModal {
  headerLabel?: string;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd?: (data: string[]) => void;
  selectedMember?: SeclectedMember[];
  buttonTitle?: string;
  employeeIds?: string[];
  title?: string;
}

export interface TitleListItem {
  id?: string;
  name?: string;
  value?: string;
}
export interface EmployeeFilter {
  title: string;
  key: string;
  custum?: boolean;
  startDate?: boolean;
  titleList?: TitleListItem[];
}

export interface SelectEmployeesModalHook {
  methods: any;
  handleSubmit: any;
  open: boolean;
  isOpen: boolean;
  selectData: Employee[] | null;
  deSelectData: Employee[];
  filteredData: Employee[] | null | undefined;
  handleClose: () => void;
  onSubmit: () => void;
  filterList: EmployeeFilter[];
  toggleDrawer: () => void;
  buttonTitle?: string;
  onAdd: (data: string[]) => void;
  selectAllHandler: (data: Employee[] | null | undefined) => void;
  selectHandler: (data: Employee) => void;
  deSelectHandler: (data: Employee) => void;
  searchValues: string;
  changeFilterHandler: ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => void;
  handlerSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFilter: React.Dispatch<React.SetStateAction<any>>;
  headerLabel?: string;
  isLoading:any;
}
