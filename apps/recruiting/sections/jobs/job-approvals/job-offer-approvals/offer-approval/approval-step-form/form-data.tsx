import * as Yup from "yup";

export const FormSchema = Yup.object().shape({
  userListForApprovals: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
      userName: Yup.string().required("User Name is required"),
      _id: Yup.string().required("_id is required"),
    })
  ),
  approvers: Yup.string().required("required"),
});
