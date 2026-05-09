import * as Yup from "yup";

export const schema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name required"),
  email: Yup.string(),
  contactNumber: Yup.string(),
  gender: Yup.string(),
  employeeId: Yup.string(),
  workEmail: Yup.string(),
  startDate: Yup.string(),
  title: Yup.string(),
  // department: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  // location: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
  onboardingCoordinator: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  peopleNotify: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  skipPlan: Yup.boolean(),
  // otherCriteria: Yup.object()
  //   .nullable()
  //   .test("check null", "Required", (value) => value !== null),
});

export const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  gender: "",
  employeeId: "",
  workEmail: "",
  startDate: "",
  title: "",
  department: [],
  location: [],
  onboardingCoordinator: null,
  peopleNotify: null,
  skipPlan: false,
  employmentStatus: [],
  otherCriteria: [],
  manager: null,
};
