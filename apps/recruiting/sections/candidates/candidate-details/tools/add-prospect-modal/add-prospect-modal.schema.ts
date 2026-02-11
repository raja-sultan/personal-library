import * as Yup from "yup";

export const schema = Yup.object({
  specificJobs: Yup.array(),
  department: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  office: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  pool: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  prospectStage: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  prospectOwner: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
});

export const defaultValues = {
  specificJobs: [],
  department: null,
  office: null,
  pool: null,
  prospectStage: null,
  prospectOwner: null,
};
