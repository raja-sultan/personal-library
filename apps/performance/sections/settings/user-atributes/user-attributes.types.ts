import type { AccessorFn } from "@tanstack/react-table";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { Dispatch, SetStateAction } from "react";
import type { UseFormSetValue, UseFormReturn, UseFormHandleSubmit, FieldErrors } from "react-hook-form";

export interface Columns {
  accessorFn?: AccessorFn<any>;
  id: string;
  cell: (info: any) => React.JSX.Element;
  header: () => JSX.Element;
  isSortable?: boolean;
}

export interface UserAttributesTableRow {
  id?: string | number;
  attributes?: string;
  visibility?: string;
  status?: string | JSX.Element;
}



export interface UserAttributesFormData {
  type?: string;
  name: string;
  visibility: string;
  options?: string[];
  // isRange?: boolean;
}

export interface UseAttributeForm {
  attributeType: string;
  setAttributeType: Dispatch<SetStateAction<string>>;
  onSubmit: (formData: UserAttributesFormData) => Promise<void>;
  methods: UseFormReturn<UserAttributesFormData>;
  errors: FieldErrors<UserAttributesFormData>;
  handleSubmit: UseFormHandleSubmit<UserAttributesFormData>;
  router: AppRouterInstance;
  snackbarOpen: boolean;
  handleCloseSnackBar: () => void;
  setValue: UseFormSetValue<UserAttributesFormData>,
  isLoading: boolean,
  attributeDetails?: any
  checked?:boolean;
  handleChange?:(event: any) => void
}