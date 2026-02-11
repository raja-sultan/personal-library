export interface SuggestedDiscussions {
  openCustomModal: boolean;
  setOpenCustomModal: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteModal: boolean;
  isEdit: boolean;
  relationshipOptions: any[];
  setActivePointId: React.Dispatch<React.SetStateAction<string>>;
  deleteResource: (id: string) => Promise<any>;
  addResource: (data: { name: string; type: string }) => Promise<void>;
  methods: {
    handleSubmit: (
      callback: (data: any) => void
    ) => (e: React.BaseSyntheticEvent) => void;
    reset: () => void;
  };
  discussionPoints: any[];
  handleSubmit: (data: any) => any;
  reset: () => void;
  onSubmit: (formData: any) => any;
  handleOpenModal: (
    modalType: string,
    category?: string,
    text?: string
  ) => void;
  handleOpenDeleteModal: () => void;
  handleDeleteDiscussion: () => void;
}

export interface DefaultData {
  category: string;
  discussionPoint: string;
}
