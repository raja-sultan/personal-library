import {
  type UseFormReturn,
  type UseFormHandleSubmit,
  type SubmitHandler,
} from "react-hook-form";

export interface FormValues {
  updateSetting: string;
  enableUpdates?: boolean;
  frequency?: string;
  day?: string;
  time?: string;
}

export interface ReturnType {
  methods: UseFormReturn<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  addModal: boolean;
  handleOpenDeleteModal: () => void;
  setEditQuestionId: React.Dispatch<React.SetStateAction<string>>;
  handleAddQuestionChange: (value: string) => void;
  handleOpenModal: (modalType: string, text?: string) => void;
  editQuestionId: any;
  questions: any;
  isLoading: any;
  openDeleteModal: boolean;
  handleDeleteQuestion:()=>void;
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  inputValue: string | undefined;
  //   handleDeleteQuestion: () => void;
  handleInputChange: (event: any) => void;
  handleSubmitQuestion: (event: any) => void;
}
