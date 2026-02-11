// import type { ChangeEvent } from "react";

export interface TitleListItem {
  id?: string;
  name?: string;
  value?: string;
}

export interface EmployeeFilter {
  title: string;
  key: string;
  startDate?: boolean;
  titleList?: TitleListItem[];
}
export interface UseFilterReturnType {
  expanded?: string | boolean;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, newExpanded: boolean) => void;
  handleCheckboxChange: (
    name: string,
    checked: boolean,
    value: string,
    key: string
  ) => void;
  applyFilters: () => void;
  selectedFilters: TitleListItem[];
  resetFilters: () => void;
  // changeHandler: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
  filterData: any;
  // searchValue: string;
  filterListEmployee?: any;
  handleDateChange: (data: any) => void;
  selectedDate?: Date | any;
  setSelectedFilters: React.Dispatch<React.SetStateAction<TitleListItem[]>>;
}
