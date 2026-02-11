import * as Yup from "yup";

export const schema = Yup.object({
  jobName: Yup.object({ jobName: Yup.string().required("required") }).required(
    "Job Name Required"
  ),
  jobStage: Yup.object({
    name: Yup.string().required("required"),
  }).required("Job Stage Required"),
});

export const defaultValues = {
  jobName: null,
  jobStage: null,
};
