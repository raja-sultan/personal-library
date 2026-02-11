import type {
  UseFormReturn,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { type CustomTableProps } from "@root/../../packages/common/components/custom-table/custom-table.types";

export interface FormValues {
  applyTo: string;
  userId: string;
}

export interface UseManageTemplateReturnType {
  handleDeleteUser: () => void;
  handleDeleteModal: () => void;
  deleteUser: boolean;
  isAppliedHistoryOpen: boolean;
  handleAppliedHistoryModal: () => void;
  isApply: boolean;
  handleApplyModal: () => void;
  templateApplyHandler: (id: string | null) => void;
  onSubmit: SubmitHandler<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  methods: UseFormReturn<FormValues>;
  oneOnOneWith: any;
  tableData: CustomTableProps;
  isApplyTemplateLoading: boolean;
  isDeleteLoading: boolean;
  isAppliedHistoryLoading: boolean;
  handleSearch: (val: string) => void;
  appliedTemplateData: any;
}

export interface ManageTemplateTableRow {
  id?: string | number;
  name?: string;
  createdBy?: string;
  defaultTemplate?: string;
}
