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

export const detailSchema = Yup.object({
  jobs: Yup.string().required("Jobs is required"),
  resume: Yup.string().required("Resume is required"),
});

export const detailDefaultValues = {
  jobs: null,
  resume: null,
};
