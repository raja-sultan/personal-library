export interface GiveFeedbackTypes {
  aboutFeedback: string[];
  addType: string;
  yourFeedback: string;
  feedbackVisibility:string;
}

export const defaultValues: GiveFeedbackTypes = {
  aboutFeedback: [],
  addType: "Private",
  yourFeedback: "",
  feedbackVisibility: "Public"
};
