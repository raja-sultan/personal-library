export interface RequestFeedbackTypes {
  askFeedback: {};
  aboutFeedback:{};
  feedbackPrompt: string;
  yourFeedback: string;
  addType: string;
}

export const defaultValues: RequestFeedbackTypes = {
  askFeedback: {id:"", name:"",value:""},
  aboutFeedback: {id:"", name:"",value:""},
  feedbackPrompt: "",
  yourFeedback: "",
  addType: "Public",
};
