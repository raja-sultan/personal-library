import * as Yup from "yup";

export const schema = Yup.object({
  // template: Yup.string().required("Template is required"),
  makeCandidatePrivate: Yup.string().required("Required"),
  // emailCandidate: Yup.string().required("Required"),
});

export const defaultValues = {
  template: ["None"],
  makeCandidatePrivate: "",
  // emailCandidate: "",
};
