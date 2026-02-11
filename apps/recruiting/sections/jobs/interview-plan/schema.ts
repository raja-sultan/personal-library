import * as Yup from "yup";

export const defaultValuesOfAddInterview: any = {
  interviewName: "test name",
  description: "text",
  // qualifications: [],
  // personalityTraits: [],
  // skills: [],
  // details: [],
  focusAttributes: [],
  interviewQuestion: [
    {
      whatIsQuestion: "",
      answerType: "",
      required: false,
      options: [],
    },
  ],
  interviewPrep: "",
};

export const validationSchemaForInterviewPlan = Yup.object().shape({
  interviewName: Yup.string().required("Interview is required"),
  interviewQuestion: Yup.array().of(
    Yup.object().shape({
      whatIsQuestion: Yup.string().required("Question is required"),
      answerType: Yup.string().required("Select answer type"),
    })
  ),
});

export const defaultValuesOfAddStage = {
  yourFieldName: "",
  "Application Review": false,
  "Background Check": false,
  "Document Submission": false,
  "Executive Review": false,
  "Face To Face": false,
  "Face To Face 2": false,
  "Hiring Manager Review": false,
  Offer: false,
  "Offer Short List": false,
  "Phone Interview": false,
  "Phone Interview 2": false,
  "Preliminary Phone Screen": false,
  "Reference Check": false,
  "Take Home Test": false,
  "Trial Project": false,
};
