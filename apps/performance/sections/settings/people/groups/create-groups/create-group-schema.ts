import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  groupName: Yup.string()
    .required("Name is required")
    .max(50, "Name must be at most 50 characters")
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Company Name must contain only alphabets with spaces allowed only between words"),

  description: Yup.string().notRequired().max(50, "Maximum 50 characters"),
  // members: Yup.array()
  //   .min(1, "Minimum 1 member")
  //   .required("Group Name is required"),
});
