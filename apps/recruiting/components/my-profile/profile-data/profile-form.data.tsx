import {
  RHFDatePicker,
  RHFCustomSelect,
  RHFTextField,
  RHFTelInput,
  RHFAutocompleteAsync,
} from "common";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const profileDataDefaultValues = {
  firstName: "",
  lastName: "",
  pronouns: "",
  email: "",
  contactNumber: "",
  dob: "",
  gender: "",
  ethnicity: "",
  maritalStatus: "",
  about: "",
  address: { addressLine: "", country: "", city: "", state: "", zipCode: "" },
  employeeId: "",
  workEmail: "",
  startDate: "",
  employeeTitle: "",
  department: {},
  location: {},
  emergencyContact: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    relationship: "",
  },
  timeZone: "",
};
export const profileDataSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "First name must contain only alphabets")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last name must contain only alphabets")
    .required("Last name is required"),
  pronouns: Yup.string().nullable().required("Pronouns are required"),
  email: Yup.string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Work email is required"),
  contactNumber: Yup.string()
    .required("Phone number is required")
    .test(
      "isValidPhoneNumber",
      "Invalid phone number",
      (value) => !value || isValidPhoneNumber(value)
    ),
  dob: Yup.string().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  ethnicity: Yup.string().required("Ethnicity is required"),
  maritalStatus: Yup.string().required("Marital status is required"),
  about: Yup.string().required("About is required"),
  address: Yup.object().shape({
    addressLine: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip Code is required"),
  }),
  workEmail: Yup.string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email"
    )
    .required("Work email is required"),
  startDate: Yup.string(),
  employeeTitle: Yup.string().required("Employee title is required"),
  department: Yup.object().required("Department is required"),
  location: Yup.object().required("Department is required"),
  emergencyContact: Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "First name must contain only alphabets")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "First name must contain only alphabets")
      .required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .required("Phone Number is required")
      .min(7, "Invalid Phone number"),
    relationship: Yup.string().required("Relationship is required"),
  }),
  timeZone: Yup.string().required("Time zone is required"),
});
export const capitalizeFirstLetter = (string) => {
  if (typeof string !== "string" || string.trim() === "") {
    return "";
  }

  return string
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};
export const ProfileFormData = ({
  getDepartmentListQuery,
  getCompanyLocations,
}: any): any => {
  return {
    PersonalInformation: [
      {
        id: 1,
        componentProps: {
          name: "firstName",
          outerLabel: "First Name",
        },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 2,
        componentProps: {
          name: "lastName",
          outerLabel: "Last Name",
        },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 3,
        componentProps: {
          name: "pronouns",
          outerLabel: "Pronouns",
          options: [
            { id: 1, label: "He", value: "he" },
            { id: 2, label: "She", value: "she" },
          ],
        },

        component: RHFCustomSelect,
        md: 12,
      },
      {
        id: 4,
        componentProps: {
          name: "email",
          outerLabel: "Personal Email",
          disabled: true,
        },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 5,
        componentProps: {
          name: "contactNumber",
          outerLabel: "Phone Number",
          defaultCountry: "GB",
          focusOnSelectCountry: true,
        },

        component: RHFTelInput,
        md: 12,
      },
      {
        id: 6,
        componentProps: {
          name: "dob",
          outerLabel: "Date of Birth",
          disableFuture: true,
        },
        component: RHFDatePicker,
        format: (date: any) => {
          return new Date(date);
        },
        md: 12,
      },
      {
        id: 7,
        componentProps: {
          name: "gender",
          outerLabel: "Gender",
          options: [
            { id: 1, label: "Male", value: "male" },
            { id: 2, label: "Female", value: "female" },
            { id: 2, label: "Other", value: "other" },
          ],
        },

        component: RHFCustomSelect,
        md: 12,
      },
      {
        id: 8,
        componentProps: {
          name: "ethnicity",
          outerLabel: "Ethnicity",
          options: [
            { id: 1, label: "Asian", value: "Asian" },
            { id: 2, label: "White", value: "White" },
            { id: 2, label: "Black", value: "Black" },
            { id: 2, label: "Irish", value: "Irish" },
            { id: 2, label: "Hispanic", value: "Hispanic" },
            { id: 2, label: "African", value: "African" },
            { id: 2, label: "European", value: "European" },
            { id: 2, label: "Native American", value: "Native American" },
          ],
        },

        component: RHFCustomSelect,
        md: 12,
      },
      {
        id: 9,
        componentProps: {
          name: "maritalStatus",
          outerLabel: "Marital Status",
          options: [
            { id: 1, label: "Single", value: "Single" },
            { id: 2, label: "Married", value: "Married" },
            { id: 3, label: "Divorced", value: "Divorced" },
            { id: 4, label: "Widowed", value: "Widowed" },
          ],
        },

        component: RHFCustomSelect,
        md: 12,
      },
      {
        id: 10,
        componentProps: {
          name: "about",
          outerLabel: "About",
          multiline: true,
          rows: 3,
        },

        component: RHFTextField,
        md: 12,
      },
    ],
    address: [
      {
        id: 11,
        componentProps: { name: "address.addressLine", outerLabel: "Address" },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 22,
        componentProps: { name: "address.country", outerLabel: "Country" },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 33,
        componentProps: { name: "address.city", outerLabel: "City" },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 44,
        componentProps: { name: "address.state", outerLabel: "State" },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 55,
        componentProps: { name: "address.zipCode", outerLabel: "Zip Code" },

        component: RHFTextField,
        md: 12,
      },
    ],
    workInformation: [
      {
        id: 111,
        componentProps: {
          name: "employeeId",
          outerLabel: "Employee Id",
          disabled: true,
        },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 222,
        componentProps: {
          name: "workEmail",
          outerLabel: "Work Email",
        },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 333,
        componentProps: {
          name: "startDate",
          outerLabel: "Start Date",
          disabled: true,
        },
        component: RHFDatePicker,
        format: (date: any) => {
          return new Date(date);
        },
        md: 12,
      },
      {
        id: 444,
        componentProps: {
          name: "timeZone",
          outerLabel: "Time Zone",
          options: [
            {
              id: 1,
              label: "UTC (Coordinated Universal Time)",
              value: "UTC (Coordinated Universal Time)",
            },
            {
              id: 2,
              label: "GMT (Greenwich Mean Time)",
              value: "GMT (Greenwich Mean Time)",
            },
            {
              id: 3,
              label: "EST (Eastern Standard time)",
              value: "EST (Eastern Standard time)",
            },
            {
              id: 4,
              label: "CST (Central Standard Time)",
              value: "CST (Central Standard Time)",
            },
            {
              id: 5,
              label: "MST (Mountain Standard time)",
              value: "MST (Mountain Standard time)",
            },
            {
              id: 6,
              label: "PST (Pacific Standard time)",
              value: "PST (Pacific Standard time)",
            },
          ],
        },

        component: RHFCustomSelect,
        md: 12,
      },
      {
        id: 555,
        componentProps: {
          name: "employeeTitle",
          outerLabel: "Title",
        },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 666,
        componentProps: {
          name: "department",
          outerLabel: "Department",
          apiQuery: getDepartmentListQuery,
          getOptionLabel: (option: any) =>
            capitalizeFirstLetter(option.departmentName),
        },

        component: RHFAutocompleteAsync,
        md: 12,
      },
      {
        id: 777,
        componentProps: {
          name: "manager",
          outerLabel: "Manager",
          options: [
            { id: 1, label: "He", value: "he" },
            { id: 2, label: "She", value: "she" },
          ],
        },

        component: RHFCustomSelect,
        md: 12,
      },

      {
        id: 888,
        componentProps: {
          name: "location",
          outerLabel: "Location",
          apiQuery: getCompanyLocations,
          getOptionLabel: (option: any) =>
            capitalizeFirstLetter(option.address),
        },

        component: RHFAutocompleteAsync,
        md: 12,
      },
      {
        id: 999,
        componentProps: {
          name: "employmentStatus",
          outerLabel: "Employee Status",
          options: [
            { id: 1, label: "Full time", value: "Full Time" },
            { id: 2, label: "Part time", value: "Part Time" },
            { id: 3, label: "Temporary", value: "Temporary" },
            { id: 4, label: "Contract", value: "Contract" },
          ],
        },

        component: RHFCustomSelect,
        md: 12,
      },
      {
        id: 101010,
        componentProps: {
          name: "jobLevel",
          outerLabel: "Job Level",
          options: [
            { id: 1, label: "Junior", value: "Junior" },
            { id: 2, label: "Mid", value: "Mid" },
            { id: 3, label: "Senior", value: "Senior" },
          ],
        },

        component: RHFCustomSelect,
        md: 12,
      },
    ],
    emergencyContact: [
      {
        id: 1111,
        componentProps: {
          name: "emergencyContact.firstName",
          outerLabel: "First Name",
        },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 2222,
        componentProps: {
          name: "emergencyContact.lastName",
          outerLabel: "Last Name",
        },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 3333,
        componentProps: {
          name: "emergencyContact.email",
          outerLabel: "Email",
        },

        component: RHFTextField,
        md: 12,
      },
      {
        id: 4444,
        componentProps: {
          name: "emergencyContact.phone",
          outerLabel: "Phone Number",
          defaultCountry: "GB",
          focusOnSelectCountry: true,
        },

        component: RHFTelInput,
        md: 12,
      },
      {
        id: 5555,
        componentProps: {
          name: "emergencyContact.relationship",
          outerLabel: "Relationship",
          options: [
            { id: 1, label: "Parent", value: "parent" },
            { id: 2, label: "Spouse", value: "spouse" },
            { id: 3, label: "Child", value: "child" },
            { id: 4, label: "Sibling", value: "sibling" },
            { id: 5, label: "Partner", value: "partner" },
            { id: 6, label: "Friend", value: "friend" },
            { id: 7, label: "Other", value: "other" },
          ],
        },

        component: RHFCustomSelect,
        md: 12,
      },
    ],
  };
};
