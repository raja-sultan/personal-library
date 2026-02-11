import * as Yup from "yup";

export const scheduleInterviewSchema = Yup.object().shape({
  interviewDate: Yup.date().required("Required"),
  startTime: Yup.string().required("Required"),
  endTime: Yup.string().required("Required"),
  candidateId: Yup.string(),
  stageId: Yup.string(),
  interviewId: Yup.string(),
  interviewers: Yup.array()
    .min(1, "Select at least one option")
    .required("This test sync multi is required."),
});

export const scheduleInterviewDefaultValues = {
  interviewDate: new Date(),
  startTime: "",
  endTime: "",
  candidateId: "",
  stageId: "655e32a9d7feb5a36e87a94d",
  interviewId: "65611ac2b1741fb4201dcece",
  interviewers: [],
};
