export interface UseQustionsTypes {
  openCustomModal: boolean;
  setOpenCustomModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteModal: boolean;
  isEdit: boolean;
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
  questionId: string;
  questions: any;
  isLoading: boolean;
  handleOpenModal: (modalType: string, text?: string) => void;
  handleOpenDeleteModal: () => void;
  handleDeleteDiscussion: () => void;
  handleSubmit: any;
  handleInputChange: (event: any) => void;
  inputValue: string|undefined;
}
export interface DefaultData {
  question: string;
}
