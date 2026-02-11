export interface PrivateNote {
  aboutFeedback: string[];
  yourFeedback: string;
}

export const defaultValues: PrivateNote = {
  aboutFeedback: [],
  yourFeedback: "",
};
