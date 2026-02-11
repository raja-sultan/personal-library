import type { ChangeEvent } from "react";

export interface Employee {
  value: string;
  text: string;
  additionalFields?: {
    employeeTitle?: string;
    profileImage?: string;
    companyId?: string;
  };
};
export interface SeclectedMember {
  firstName: string;
  lastName: string;
  employeeTitle: string;
  _id: string;
  profileImg: string;
}
export interface SelectEmployeesModal {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd?: (data: string[]) => void;
  selectedMembers?: string[];
  buttonTitle?: string;
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
}
