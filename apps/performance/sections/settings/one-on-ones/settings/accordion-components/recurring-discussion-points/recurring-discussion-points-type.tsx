export interface UseRecurringDiscussionPoints {
  openCustomModal: boolean;
  setOpenCustomModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteModal: boolean;
  isEdit: boolean;
  setActivePointId: React.Dispatch<React.SetStateAction<string>>;
  discussionPoints: any[];
  handleOpenModal: (modalType: string, text?: string) => void;
  handleOpenDeleteModal: () => void;
  handleDeleteDiscussion: () => void;
  methods: {
    handleSubmit: (
      callback: (data: any) => void
    ) => (e: React.BaseSyntheticEvent) => void;
    reset: () => void;
  };
  handleSubmit: (data: any) => any;
  reset: () => void;
  onSubmit: (formData: any) => void;
}
export interface DefaultData {
  discussionPoint: string;
}
