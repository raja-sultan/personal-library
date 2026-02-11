import { RHFAutocompleteSync, RHFDateTimePicker, RHFTextField } from "common";
import * as Yup from "yup";

export const AddFormData = [
  {
    id: 1,
    grid: 6,
    RhfValue: {
      name: "firstName",
      fullWidth: true,
      label: "FirstName",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    grid: 6,
    RhfValue: {
      name: "lastName",
      fullWidth: true,
      label: "Last Name",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    grid: 6,
    RhfValue: {
      name: "businessName",
      fullWidth: true,
      label: "Business Name",
    },
    component: RHFTextField,
  },
  {
    id: 4,
    grid: 6,
    RhfValue: {
      name: "workEmail",
      fullWidth: true,
      label: "Business Email",
      disabled: true,
    },
    component: RHFTextField,
  },
  {
    id: 5,
    grid: 6,
    RhfValue: {
      name: "contactNumber",
      fullWidth: true,
      label: "Phone No",
    },
    component: RHFTextField,
  },
  {
    id: 6,
    grid: 6,
    RhfValue: {
      name: "companySize",
      fullWidth: true,
      label: "No of employee",
    },
    component: RHFTextField,
  },
  {
    id: 7,
    grid: 6,
    RhfValue: {
      multiple: true,
      name: "allowedCompany",
      fullWidth: true,
      label: "Select Product",
      options: [
        { id: 1, name: "PERFORMANCE", value: "PERFORMANCE" },
        { id: 2, name: "ONBOARDING", value: "ONBOARDING" },
        { id: 3, name: "RECRUITMENT", value: "RECRUITMENT" },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 8,
    grid: 6,
    RhfValue: {
      name: "address.city",
      fullWidth: true,
      label: "City",
    },
    component: RHFTextField,
  },
  {
    id: 9,
    grid: 6,
    RhfValue: {
      name: "address.zipCode",
      fullWidth: true,
      label: "Postal Code",
    },
    component: RHFTextField,
  },
  {
    id: 10,
    grid: 6,
    RhfValue: {
      name: "addressUpdate",
      fullWidth: true,
      label: "Address",
    },
    component: RHFTextField,
  },
];
export const AddFormDataValue = {
  fullName: "",
  lastName: "",
  businessName: "",
  businessEmail: "",
  phoneNo: "",
  noOfEmployess: "",
  selectProduct: null,
  city: "",
  postalCode: "",
};

export const formSchemaModel = Yup.object().shape({
  fullName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  businessName: Yup.string().required("required"),
  businessEmail: Yup.string().required("required"),
  phoneNo: Yup.string().required("required"),
  noOfEmployess: Yup.string().required("required"),
  selectProduct: Yup.string().required("required"),
  city: Yup.string().required("required"),
  postalCode: Yup.string().required("required"),
});

export const scheduleADemoData = [
  {
    id: 1,
    grid: 12,
    RhfValue: {
      name: "demoDateAndTime",
      fullWidth: true,
      label: "Select Date and Time",
      minDate: new Date(),
    },
    component: RHFDateTimePicker,
  },

  {
    id: 2,
    grid: 12,
    RhfValue: {
      name: "name",
      fullWidth: true,
      label: "Name",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    grid: 12,
    RhfValue: {
      name: "email",
      fullWidth: true,
      label: "Email",
    },
    component: RHFTextField,
  },
  {
    id: 5,
    grid: 12,
    RhfValue: {
      name: "demoLink",
      fullWidth: true,
      label: "Meeting Link",
    },
    component: RHFTextField,
  },
  {
    id: 6,
    grid: 12,
    RhfValue: {
      name: "emailSubject",
      fullWidth: true,
      label: "Email Subject",
    },
    component: RHFTextField,
  },
  {
    id: 7,
    grid: 12,
    RhfValue: {
      name: "emailBody",
      fullWidth: true,
      label: "Email Body",
      multiline: true,
      rows: 4,
    },
    component: RHFTextField,
  },
];

export const ScheduleADemoValue = {
  demoDateAndTime: "",
  name: "",
  email: "",
  demoLink: "",
  emailSubject: "",
  emailBody: "",
};

export const scheduleADemoSchemaModel: any = Yup.object().shape({
  demoDateAndTime: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  demoLink: Yup.string().required("Required"),
  emailSubject: Yup.string().required("Required"),
  emailBody: Yup.string().required("Required"),
});

// edit forms data
export const EditFormData = [
  {
    id: 1,
    grid: 6,
    RhfValue: {
      name: "firstName",
      fullWidth: true,
      label: "FirstName",
    },
    component: RHFTextField,
  },
  {
    id: 2,
    grid: 6,
    RhfValue: {
      name: "lastName",
      fullWidth: true,
      label: "Last Name",
    },
    component: RHFTextField,
  },
  {
    id: 3,
    grid: 6,
    RhfValue: {
      name: "businessName",
      fullWidth: true,
      label: "Business Name",
    },
    component: RHFTextField,
  },
  {
    id: 4,
    grid: 6,
    RhfValue: {
      name: "workEmail",
      fullWidth: true,
      label: "Business Email",
      disabled: true,
    },
    component: RHFTextField,
  },
  {
    id: 5,
    grid: 6,
    RhfValue: {
      name: "contactNumber",
      fullWidth: true,
      label: "Phone No",
    },
    component: RHFTextField,
  },
  {
    id: 6,
    grid: 6,
    RhfValue: {
      multiple: false,
      name: "companySize",
      fullWidth: true,
      label: "No of employee",
      options: [
        { id: 1, name: "1-40", value: "1-40" },
        { id: 2, name: "41-75", value: "41-75" },
        { id: 3, name: "76-250", value: "76-250" },
        { id: 4, name: "251-1000", value: "251-1000" },
        { id: 5, name: "1000+", value: "1000+" },
        // { id: 3, name: "Clocklog", value: "Clocklog" },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 7,
    grid: 6,
    RhfValue: {
      multiple: true,
      name: "allowedCompany",
      fullWidth: true,
      label: "Select Product",
      limitTags: 1,
      options: [
        { id: 1, name: "PERFORMANCE", value: "PERFORMANCE" },
        { id: 2, name: "ONBOARDING", value: "ONBOARDING" },
        { id: 3, name: "RECRUITMENT", value: "RECRUITMENT" },
        // { id: 3, name: "Clocklog", value: "Clocklog" },
      ],
    },
    component: RHFAutocompleteSync,
  },
  {
    id: 8,
    grid: 6,
    RhfValue: {
      name: "city",
      fullWidth: true,
      label: "City",
    },
    component: RHFTextField,
  },
  {
    id: 9,
    grid: 6,
    RhfValue: {
      name: "state",
      fullWidth: true,
      label: "State",
    },
    component: RHFTextField,
  },
  {
    id: 10,
    grid: 6,
    RhfValue: {
      name: "companyAddress",
      fullWidth: true,
      label: "Address",
    },
    component: RHFTextField,
  },
];

export const EditFormDataValue = {
  firstName: "",
  lastName: "",
  businessName: "",
  workEmail: "",
  contactNumber: "",
  companySize: "",
  allowedCompany: null,
  city: "",
  state: "",
  companyAddress: "",
};

export const EditFormSchemaModel: any = Yup.object().shape({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  businessName: Yup.string().required("required"),
  workEmail: Yup.string().required("required"),
  contactNumber: Yup.string().required("required"),
  companySize: Yup.object().required("required"),
  allowedCompany: Yup.array().required("required"),
  city: Yup.string().required("required"),
  state: Yup.string().required("required"),
  companyAddress: Yup.string().required("required"),
});

//FILTER ARRAY,
export const FilterArray = [
  "firstName",
  "lastName",
  "contactNumber",
  "allowedCompany",
  "businessName",
  "companySize",
  "companyAddress",
  "city",
  "state",
];
