import * as Yup from "yup";

export const addEmployeeSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .max(30, "First Name must be at most 30 characters")
    .matches(/^[A-Za-z]+$/, "First Name must contain only alphabets"),
  lastName: Yup.string()
    .required("Last Name is required")
    .max(30, "Last Name must be at most 30 characters")
    .matches(/^[A-Za-z]+$/, "Last Name must contain only alphabets"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .required("Email is required")
    .max(60, "Email must be at most 60 characters"),
  // phoneNumber: Yup.string(),
  gender: Yup.string(),
  employeeId: Yup.string().optional(),
  workEmail: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .required("Email is required")
    .max(60, "Email must be at most 60 characters"),
  // date: Yup.date(),
  title: Yup.string().optional(),
  department: Yup.string(),
  location: Yup.string(),
});
