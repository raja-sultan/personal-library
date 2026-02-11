import { useLazyGetProspectsDropdownListQuery } from "@services/crm/events/crm-events-api";
import { useLazyGetUserListForJobApprovalsQuery } from "@services/json-placeholder-api";
import * as Yup from "yup";

export const defaultValues = (singleDetails) => {
  const singleDetailsData = singleDetails?.eventDetails;
  return {
    eventName: singleDetailsData?.eventName ?? "",
    description: singleDetailsData?.description ?? "",
    startDate: new Date(singleDetailsData?.startDate ?? ""),
    endDate: new Date(singleDetailsData?.endDate ?? ""),
    location: singleDetailsData?.location ?? "",
    prospectPool: singleDetailsData?.prospectPool ?? null,
    prospectStage: singleDetailsData?.prospectStage ?? null,
    source: singleDetailsData?.source ?? "",
    eventAdministrator:
      singleDetailsData?.eventAdministrator?.map((item) => {
        return { _id: item?._id, userName: item?.firstName };
      }) ?? [],
    attendees:
      singleDetailsData?.attendees?.map((item) => {
        return { _id: item?._id, userName: item?.firstName };
      }) ?? [],
    eventImage: null,
    tags: singleDetails?.gatheringFeedback?.tags ?? [],
    questions: singleDetails?.prospectInfoForm?.questions ?? [],
    emailTemplate: singleDetails?.eventEmail?.emailTemplate ?? "",
    textResumeUpload: singleDetails?.eventEmail?.textResumeUpload ?? "",
    textResumeConfirmation:
      singleDetails?.eventEmail?.textResumeConfirmation ?? "",
  };
};

export const FormSchema = Yup.object().shape({
  eventName: Yup.string().required("Event Name is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().typeError("Start Date is required").required("Start Date is required"),
  endDate: Yup.date().typeError("End Date is required").required("End Date is required"),
  location: Yup.string().required("Location is required"),
  prospectPool: Yup.object().required("Add Prospect Pool is required"),
  prospectStage: Yup.object().required("Add Prospect Stage is required"),
  source: Yup.string().required("Source is required"),
  tags: Yup.array().required("required"),
});

export const fieldsInfo = [
  {
    type: "TEXT",
    name: "eventName",
    outerLabel: <div>Event Name {<span style={{ color: "red" }}>*</span>}</div>,
    fieldHeader: null,
  },
  {
    type: "TEXT_MULTILINE",
    name: "description",
    outerLabel: "Description",
    fieldHeader: null,
  },
  {
    type: "DATE_PICKER",
    name: "startDate",
    outerLabel: "Start Date",
    fieldHeader: null,
  },
  {
    type: "DATE_PICKER",
    name: "endDate",
    outerLabel: "End Date",
    fieldHeader: null,
  },
  {
    type: "TEXT",
    name: "location",
    outerLabel: <div>Location {<span style={{ color: "red" }}>*</span>}</div>,
    fieldHeader: null,
  },
  // {
  //   getOptionLabel: (option) => option?.userName,
  //   type: "ASYNC_MULTISELECT",
  //   name: "prospectPool",
  //   queryKey: "search",
  //   apiQuery: useLazyGetUserListForJobApprovalsQuery,
  //   multiple: false,
  //   placeholder: "Select...",
  //   outerLabel: <div>Add Prospects To This Pool</div>,
  // },
  {
    getOptionLabel: (option) => option.name,
    type: "ASYNC_MULTISELECT",
    name: "prospectPool",
    queryKey: "search",
    apiQuery: useLazyGetProspectsDropdownListQuery,
    multiple: false,
    placeholder: "Select...",
    outerLabel: <div>Add Prospects To This Pool</div>,
  },

  {
    getOptionLabel: (option) => option.name,
    type: "ASYNC_MULTISELECT",
    name: "prospectStage",
    queryKey: "search",
    apiQuery: useLazyGetUserListForJobApprovalsQuery,
    multiple: false,
    placeholder: "Select...",
    outerLabel: <div>Prospect Stage</div>,
  },
  {
    type: "SELECT_V2",
    name: "source",
    outerLabel: "Source",
    fieldHeader: null,
    options: [
      { id: 1, label: "Agencies", value: "Agencies" },
      {
        id: 2,
        label: "Bubblesort",
        value: "Bubblesort",
      },
      { id: 3, label: "Hrmarket", value: "rmarket" },
      { id: 4, label: "Company Marketing", value: "Company Marketing" },
      { id: 5, label: "Customer Newsletter", value: "Customer Newsletter" },
      { id: 6, label: "Internet Applicant", value: "Internet Applicant" },
      { id: 7, label: "Jobs Page On Your Website", value: "Jobs Page On Your Website" },
      { id: 8, label: "Social Media Presence", value: "Social Media Presence" },
    ],
  },

  {
    getOptionLabel: (option) => option.userName,
    type: "ASYNC_MULTISELECT",
    name: "eventAdministrator",
    queryKey: "search",
    apiQuery: useLazyGetUserListForJobApprovalsQuery,
    multiple: true,
    placeholder: "Select...",
    outerLabel: <div>Event Administrator</div>,
  },
  {
    getOptionLabel: (option) => option.userName,
    type: "ASYNC_MULTISELECT",
    name: "attendees",
    queryKey: "search",
    apiQuery: useLazyGetUserListForJobApprovalsQuery,
    multiple: true,
    placeholder: "Select...",
    outerLabel: <div>Who is attending from your organization?</div>,
  },
];
