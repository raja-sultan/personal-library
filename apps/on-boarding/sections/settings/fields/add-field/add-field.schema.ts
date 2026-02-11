import * as Yup from "yup";

export const schema: any = Yup.object({
  displayName: Yup.string().required("First Name is required"),
  helpText: Yup.string().required("helpText is required"),
  fieldType: Yup.object()
    .nullable()
    .test("check null", "fieldType is required", (value) => value !== null),
  // fieldGroup: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // personalLibrary: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // skipPlan: Yup.boolean(),
  // department: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // location: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // employment: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // criteria: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
});

export const defaultValues = {
  displayName: "",
  helpText: "",
  fieldType: null,
  fieldGroup: null,
  publicFacingName: false,
  // personalLibrary: null,
  // skipPlan: false,
  // department: null,
  // location: null,
  // employment: null,
  // criteria: null,
};
