import * as Yup from "yup";
import { InputAdornment, Typography } from "@mui/material";
import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFCustomSelect,
  RHFTextField,
  RHFUploadSingleFileWithoutPreview,
} from "common";
import { CustomFieldFunction } from "@sections/candidates/add-candidates/job-candidate/job.candidate.data";
import Image from "next/image";
import { ukFlag } from "@assets/images";

export const AddReferralsDefaultValues = {
  uploadFiles: "",
  isReferral: "",
  office: null,
  department: null,
  job: null,
  stages: "",
  firstName: "",
  lastName: "",
  currentCompany: "",
  currentTitle: "",
  followReferral: false,
  phone: "",
  email: "",
  socialMediaLink: "",
  website: "",
  resume: null,
  coverLetter: null,
  relationShip: "",
  workHistory: "",
  rating: "",
  reachedOut: "",
  beingReferred: "",
  referralNotes: "",
};

export const formSchema = Yup.object().shape({
  department: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  office: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  // stages: Yup.string().required("Stages is required"),
  isReferral: Yup.string().required("Is Referral is required"),
  // office: Yup.object().nullable().required("office is required"),
  firstName: Yup.string().required("Full name is required"),
  lastName: Yup.string().required("This field is required"),
  resume: Yup.mixed()
    .nullable()
    .test("required", "File is required", (value: any) => {
      if (!value) {
        return false;
      }
      // Check if the file size is within the limit
      return value.size <= 10 * 1024 * 1024; // Convert MB to bytes
    }),
  coverLetter: Yup.mixed()
    .nullable()
    .test("required", "File is required", (value: any) => {
      if (!value) {
        return false;
      }
      // Check if the file size is within the limit
      return value.size <= 10 * 1024 * 1024; // Convert MB to bytes
    }),
  phone: Yup.string()
    .typeError("Must be a number")
    .min(10, "Invalid Mobile Number")
    .matches(/^\+44\d{9,10}$/, "Invalid Mobile Number")
    .required("Mobile Number is Required"),
  email: Yup.string()
    .required("Required")
    .matches(
      /^[^\s@]+@[^\s@]+\.(?:com|[a-zA-Z]{2,})$/,
      "Invalid email address"
    ),
  socialMediaLink: Yup.string()
    .required("Required")
    .matches(
      /^(?:https?:\/\/)?(?:www\.)?[^ "]+(?:\.[a-zA-Z]{2,})+$/,
      "Invalid URL"
    ),
  website: Yup.string()
    .required("Required")
    .matches(
      /^(?:https?:\/\/)?(?:www\.)?[^ "]+(?:\.[a-zA-Z]{2,})+$/,
      "Invalid URL"
    ),
});

export const getAddReferralsFormData = ({
  getDepartmentListQuery,
  getOfficeListQuery,
  getJobListQuery,
  getJobListQueryParams,
  data,
  isLoading,
}: any): any => {
  const params = {
    office: getJobListQueryParams?.office?._id,
    department: getJobListQueryParams?.department?._id,
  };
  let referralQuestions: any;

  if (!isLoading) {
    const referralQuestionsData = data?.data.filter(
      (item) => item?.section === "Referral question fields"
    )[0];
    if (referralQuestionsData) {
      referralQuestions = referralQuestionsData?.customFields.map((items) => ({
        id: items?._id,
        componentProps: {
          multiple: items?.fieldType === "multi_select",
          name: `detail.customFields.[${items?._id}]`,
          outerLabel: items?.label,
          options: items?.options,
          getOptionLabel: (option: any) => option.label,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          placeholder: items?.placeholder,
        },
        component: CustomFieldFunction(items?.fieldType),
        md: 12,
      }));
    }
  }
  return [
    {
      id: 1,
      componentProps: {
        name: "isReferral",
        outerLabel: "Is Referral :",
        options: [
          { id: 1, label: "True", value: "true" },
          { id: 2, label: "False", value: "false" },
        ],
      },
      component: RHFCustomSelect,
      md: 9,
    },
    {
      id: 2,
      componentProps: {
        name: "office",
        outerLabel: "Office:",
        placeholder: "Filter jobs by office",
        apiQuery: getOfficeListQuery,
        getOptionLabel: (option: any) => option.officeName,
      },
      component: RHFAutocompleteAsync,
      md: 9,
    },
    {
      id: 3,
      componentProps: {
        name: "department",
        outerLabel: "Department:",
        placeholder: "Filter jobs by department",
        apiQuery: getDepartmentListQuery,
        getOptionLabel: (option: any) => option.departmentName,
      },
      component: RHFAutocompleteAsync,
      md: 9,
    },
    {
      id: 4,
      componentProps: {
        name: "job",
        outerLabel: "Job:",
        placeholder: "Select a Job",
        apiQuery: getJobListQuery,
        externalParams: params,
        getOptionLabel: (option: any) => option.jobName,
      },
      component: RHFAutocompleteAsync,
      md: 9,
    },
    {
      id: 5,
      componentProps: {
        name: "stages",
        outerLabel: "Stage:",
        options: [
          {
            id: 1,
            label: "Preliminary Phone Screen",
            value: "Preliminary Phone Screen",
          },
          { id: 2, label: "Application Review", value: "Application Review" },
          { id: 3, label: "Phone Interview", value: "Phone Interview" },
          { id: 4, label: "Face To Face", value: "Face To Face" },
          { id: 5, label: "Reference Check", value: "Reference Check" },
        ],
      },
      component: RHFCustomSelect,
      md: 9,
    },
    {
      id: 6,
      heading: "Name & Company",
      component: Typography,
      md: 9,
    },
    {
      id: 7,
      componentProps: { name: "firstName", outerLabel: "First Name" },
      component: RHFTextField,
      md: 9,
    },
    {
      id: 8,
      componentProps: { name: "lastName", outerLabel: "Last Name" },
      component: RHFTextField,
      md: 9,
    },
    {
      id: 9,
      componentProps: { name: "currentCompany", outerLabel: "Current Company" },
      component: RHFTextField,
      md: 9,
    },
    {
      id: 10,
      componentProps: { name: "currentTitle", outerLabel: "Current Title" },
      component: RHFTextField,
      md: 9,
    },
    {
      id: 11,
      componentProps: { name: "followReferral", label: "Follow Referral" },
      component: RHFCheckbox,
      md: 9,
    },
    {
      id: 12,
      heading: "Information",
      component: Typography,
      md: 9,
    },
    {
      id: 13,
      componentProps: {
        name: "phone",
        outerLabel: "Phone",
        placeholder: "+441234567890",
        InputProps: {
          startAdornment: (
            <InputAdornment position="start">
              <Image
                src={ukFlag}
                alt="UK"
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: 10,
                }}
              />
            </InputAdornment>
          ),
        },
      },
      component: RHFTextField,
      md: 9,
    },
    {
      id: 14,
      componentProps: { name: "email", outerLabel: "Email" },
      component: RHFTextField,
      md: 9,
    },
    {
      id: 15,
      componentProps: { name: "socialMediaLink", outerLabel: "Social Media" },
      component: RHFTextField,
      md: 9,
    },
    {
      id: 16,
      componentProps: { name: "website", outerLabel: "Website" },
      component: RHFTextField,
      md: 9,
    },
    {
      id: 17,
      heading: "Details",
      component: Typography,
      md: 9,
    },
    {
      id: 18,
      componentProps: {
        name: "resume",
        label: "Attach Resume:",
        accept: ".doc, .docx, .pdf, .rtf",
      },
      component: RHFUploadSingleFileWithoutPreview,
      md: 9,
    },
    {
      id: 19,
      componentProps: {
        name: "coverLetter",
        label: "Attach Cover Letter:",
        accept: ".doc, .docx, .pdf, .rtf",
      },
      component: RHFUploadSingleFileWithoutPreview,
      md: 9,
    },
    {
      id: 20,
      componentProps: {
        name: "relationShip",
        outerLabel: "Relationship:",
        options: [
          { id: 1, label: "Family Member", value: "family-member" },
          { id: 2, label: "Friend", value: "friend" },
          { id: 3, label: "Colleague", value: "colleague" },
          { id: 4, label: "Acquaintance", value: "acquaintance" },
          {
            id: 5,
            label: "Professional Contact",
            value: "professional-contact",
          },
          {
            id: 6,
            label: "Online Community Member",
            value: "online-community-member",
          },
        ],
      },
      component: RHFCustomSelect,
      md: 9,
    },

    {
      id: 21,
      componentProps: {
        name: "workHistory",
        outerLabel: "Work History:",
        options: [
          {
            id: 1,
            label: "Employed (Full-time)",
            value: "employed-full-time)",
          },
          {
            id: 2,
            label: "Employed (Part-time)",
            value: "employed-part-time",
          },
          { id: 3, label: "Self-employed", value: "self-employed" },
          { id: 4, label: "Unemployed", value: "unemployed" },
          { id: 5, label: "Student", value: "student" },
          { id: 6, label: "Retired", value: "retired" },
          { id: 7, label: "Homemaker", value: "homemaker" },
          {
            id: 8,
            label: "Freelancer/Contractor",
            value: "freelancer-or-contractor",
          },
          { id: 9, label: "Intern", value: "intern" },
          {
            id: 10,
            label: "Temporarily Unemployed",
            value: "temporarily-unemployed",
          },
        ],
      },
      component: RHFCustomSelect,
      md: 9,
    },

    {
      id: 22,
      componentProps: {
        name: "rating",
        outerLabel: "Rating:",
        options: [
          { id: 1, label: "Excellent", value: "excellent" },
          { id: 2, label: "Very Good", value: "very-good" },
          { id: 3, label: "Good", value: "good" },
          { id: 4, label: "Fair", value: "fair" },
          { id: 5, label: "Poor", value: "poor" },
        ],
      },
      component: RHFCustomSelect,
      md: 9,
    },

    {
      id: 23,
      componentProps: {
        name: "reachedOut",
        outerLabel: "When we reach out:",
        options: [
          { id: 1, label: "Initial Contact", value: "initial-contact" },
          { id: 2, label: "Follow-up", value: "follow-up" },
          { id: 2, label: "Interview Scheduled", value: "interview-scheduled" },
          { id: 2, label: "Offer Extended", value: "offer-extended" },
          { id: 2, label: "Offer Accepted", value: "offer-accepted" },
          { id: 2, label: "Offer Declined", value: "offer-declined" },
          { id: 2, label: "Rejected Candidate", value: "rejected-candidate" },
          { id: 2, label: "Onboarding", value: "onboarding" },
        ],
      },
      component: RHFCustomSelect,
      md: 9,
    },
    {
      id: 24,
      componentProps: {
        name: "beingReferred",
        outerLabel: "They know they're referred:",
        options: [
          { id: 1, label: "Yes", value: "yes" },
          { id: 2, label: "No", value: "no" },
        ],
      },
      component: RHFCustomSelect,
      md: 9,
    },
    {
      id: 25,
      componentProps: {
        name: "referralNotes",
        outerLabel: "Referral Notes",
        multiline: true,
        rows: 4,
      },
      component: RHFTextField,
      md: 12,
    },
    ...(referralQuestions ? referralQuestions : []),
  ];
};
