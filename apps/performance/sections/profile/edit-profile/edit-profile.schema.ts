import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

const phoneNumberSchema = Yup.string().test(
  "isValidPhoneNumber",
  "Invalid phone number",
  (value) => !value || isValidPhoneNumber(value)
);
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "Minimum 3 characters")
    .max(30, "Maximum 30 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Minimum 3 characters")
    .max(30, "Maximum 30 characters"),

  // pronouns: Yup.array().of(
  //   Yup.object().shape({
  //     id: Yup.string(),
  //     name: Yup.string(),
  //     value: Yup.string(),
  //   })
  // ),

  email: Yup.string().email("Invalid email address"),

  contactNumber: phoneNumberSchema,

  dob: Yup.date()
    .nullable()
    .optional()
    .typeError("Date of birth should be a valid date"),

  gender: Yup.string(),

  ethnicity: Yup.string(),

  maritalStatus: Yup.string(),

  about: Yup.string(),

  address: Yup.object().shape({
    addressLine: Yup.string().required("Address line is required"),

    // country: Yup.string().required("Country is required"),

    city: Yup.string().required("City is required"),

    state: Yup.string().required("State is required"),

    zipCode: Yup.string().required("Zip code is required"),
  }),

  employeeId: Yup.string(),

  workEmail: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),

  employmentStartDate: Yup.date()
    .nullable()
    .optional()
    .typeError("Start date should be a valid date"),

  timeZone: Yup.string(),

  employeeTitle: Yup.string(),

  department: Yup.string().required("Department is required"),

  managerId: Yup.string(),

  location: Yup.string().required("Location is required").typeError('Location is required'),

  employmentStatus: Yup.string(),

  jobLevel: Yup.string(),

  emergencyContact: Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email("Invalid emergency contact email format"),
    phone: phoneNumberSchema,
    relationship: Yup.string(),
  }),
});
