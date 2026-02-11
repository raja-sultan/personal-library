import {
  RHFDatePicker,
  RHFCustomSelect,
  RHFTextField,
  RHFTelInput,
} from "common";
import * as Yup from "yup";

export const MyProfileDefaultValues = {
  employeeId: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  dob: new Date(""),
  gender: "",
  addressLine: "",
  country: "",
  city: "",
  state: "",
  zipCode: "",
};
export const MyProfileValidationSchema = Yup.object({
  firstName: Yup.string().trim().required("First Name is Required"),
  lastName: Yup.string().trim().required("Last Name is Required"),
  email: Yup.string().required("Email is Required").email("Invalid Email"),
  contactNumber: Yup.string()
    .required("Phone is required")
    .min(7, "Invalid Phone number"),
  dob: Yup.date().required("To Date is Required"),
  gender: Yup.string().trim().required("Gender is Required"),
  addressLine: Yup.string().trim().required("Address is Required"),
  country: Yup.string().trim().required("Country is Required"),
  city: Yup.string().trim().required("City is Required"),
  state: Yup.string().trim().required("State is Required"),
  zipCode: Yup.string().trim().required("Zip Code is Required"),
});
export const myProfileData = {
  userInformation: [
    {
      id: 1,
      componentProps: {
        name: "employeeId",
        outerLabel: "Employee ID",
        readonly: true,
      },

      component: RHFTextField,
      md: 3,
    },
    {
      id: 2,
      componentProps: {
        name: "firstName",
        outerLabel: "First Name",
        readonly: true,
      },

      component: RHFTextField,
      md: 3,
    },
    {
      id: 3,
      componentProps: {
        name: "lastName",
        outerLabel: "Last Name",
        readonly: true,
      },

      component: RHFTextField,
      md: 3,
    },
    {
      id: 4,
      componentProps: { name: "email", outerLabel: "Email", readonly: true },

      component: RHFTextField,
      md: 3,
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
      md: 3,
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
      md: 3,
    },
    {
      id: 7,
      componentProps: {
        name: "gender",
        outerLabel: "Gender",
        options: [
          { id: 1, label: "Male", value: "male" },
          { id: 2, label: "Female", value: "female" },
        ],
      },
      component: RHFCustomSelect,

      md: 3,
    },
  ],
  addressDetails: [
    {
      id: 1,
      componentProps: { name: "addressLine", outerLabel: "Address" },

      component: RHFTextField,
      md: 3,
    },
    {
      id: 2,
      componentProps: { name: "country", outerLabel: "Country" },

      component: RHFTextField,
      md: 3,
    },
    {
      id: 3,
      componentProps: { name: "city", outerLabel: "City" },

      component: RHFTextField,
      md: 3,
    },
    {
      id: 4,
      componentProps: { name: "state", outerLabel: "State" },

      component: RHFTextField,
      md: 3,
    },
    {
      id: 4,
      componentProps: { name: "zipCode", outerLabel: "Zip Code" },

      component: RHFTextField,
      md: 3,
    },
  ],
};
