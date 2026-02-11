import { Chip, InputAdornment } from "@mui/material";
import {
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFCustomSelect,
  RHFTextField,
  RHFUploadSingleFileWithoutPreview,
} from "common";
import * as Yup from "yup";
import { CustomFieldFunction } from "../job-candidate/job.candidate.data";
import Image from "next/image";
import { ukFlag } from "@assets/images";

const transformedData = {};

export const prospectDefaultValues = {
  specificJob: [],
  department: null,
  office: null,
  pool: null,
  prospectStage: null,
  productOwner: null,
  nameAndCompany: {
    firstName: "",
    lastName: "",
    currentCompany: "",
    currentTitle: "",
    timeZone: "",
    notes: "",
    candidateTags: [],
    followCandidate: false,
  },
  info: {
    phone: {
      phoneNumber: "+44",
      phoneType: "",
    },
    email: {
      emailAddress: "",
      emailType: "",
    },
    socialMediaLink: "",
    websites: {
      url: "",
      websiteType: "",
    },
    address: {
      address: "",
      addressType: "",
    },
  },
  education: [
    {
      schoolName: "",
      degree: "",
      discipline: "",
      startDate: "",
      endDate: "",
      customFields: transformedData,
    },
  ],
  resume: null,
  coverLetter: null,
  detail: {},
  // candidateResponsibleFor: {
  //   recruiter: "",
  //   coordinator: "",
  // },
};
export const AddProspectFormData = ({
  getDepartmentListQuery,
  getOfficeListQuery,
  getJobListQuery,
  getPoolListQuery,
  getProductOwnerList,
  getJobListQueryParams,
  getProspectStagesList,
  getCandidateTagsListQuery,
  data,
  isLoading,
}: any): any => {
  const params = {
    office: getJobListQueryParams?.office?._id,
    department: getJobListQueryParams?.department?._id,
  };
  data?.data?.forEach((field) => {
    if (field.section === "Education") {
      transformedData[field._id] = ""; // You can assign any value here if needed
    }
  });
  let nameAndCompany: any;
  let Info: any;
  let Education: any;
  let Details: any;
  // let WhoResponsible: any;

  if (!isLoading) {
    const nameAndCompanyData = data?.data.filter(
      (item) => item?.section === "Name and Company"
    )[0];
    const infoData = data?.data.filter((item) => item?.section === "Info")[0];
    const educationData = data?.data.filter(
      (item) => item?.section === "Education"
    )[0];
    const detailsData = data?.data.filter(
      (item) => item?.section === "Details"
    )[0];
    // const responsibleData = data?.data.filter(
    //   (item) => item?.section === "WhoResponsible"
    // )[0];

    if (nameAndCompanyData) {
      nameAndCompany = nameAndCompanyData?.customFields.map((items) => ({
        id: items?._id,
        componentProps: {
          multiple: items?.fieldType === "multi_select",
          name: `nameAndCompany.customFields.[${items?._id}]`,
          label: items?.fieldType === "attachment" ? items?.label : undefined,
          outerLabel: items?.label,
          options: items?.options,
          getOptionLabel: (option: any) => option.label,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          placeholder: items?.placeholder,
          multiline: items?.fieldType === "long_text",
          rows: items?.fieldType === "long_text" ? 3 : 1,
        },
        component: CustomFieldFunction(items?.fieldType),
        md: items?.fieldType === "long_text" ? 12 : 3,
      }));
    }
    if (infoData) {
      Info = infoData?.customFields?.map((items) => ({
        id: items?._id,
        componentProps: {
          multiple: items?.fieldType === "multi_select",
          name: `info.customFields.[${items?._id}]`,
          label: items?.fieldType === "attachment" ? items?.label : undefined,
          outerLabel: items?.label,
          options: items?.options,
          getOptionLabel: (option: any) => option.label,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          placeholder: items?.placeholder,
          multiline: items?.fieldType === "long_text",
          rows: items?.fieldType === "long_text" ? 3 : 1,
        },
        component: CustomFieldFunction(items?.fieldType),
        md: 12,
      }));
    }
    if (educationData) {
      Education = educationData?.customFields?.map((items) => ({
        id: items?._id,
        componentProps: {
          multiple: items?.fieldType === "multi_select",
          label: items?.fieldType === "attachment" ? items?.label : undefined,
          outerLabel: items?.label,
          options: items?.options,
          getOptionLabel: (option: any) => option.label,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          placeholder: items?.placeholder,
          multiline: items?.fieldType === "long_text",
          rows: items?.fieldType === "long_text" ? 3 : 1,
        },
        component: CustomFieldFunction(items?.fieldType),
        md: items?.fieldType === "long_text" ? 12 : 11,
      }));
    }
    if (detailsData) {
      Details = detailsData?.customFields?.map((items) => ({
        id: items?._id,
        componentProps: {
          multiple: items?.fieldType === "multi_select",
          name: `detail.customFields.[${items?._id}]`,
          label: items?.fieldType === "attachment" ? items?.label : undefined,
          outerLabel: items?.label,
          options: items?.options,
          getOptionLabel: (option: any) => option.label,
          isOptionEqualToValue: (option: any, newValue: any) =>
            option === newValue,
          placeholder: items?.placeholder,
          multiline: items?.fieldType === "long_text",
          rows: items?.fieldType === "long_text" ? 3 : 1,
        },
        component: CustomFieldFunction(items?.fieldType),
        md: 12,
      }));
    }
    // if (responsibleData) {
    //   WhoResponsible = responsibleData?.customFields?.map((items) => ({
    //     id: items?._id,
    //     componentProps: {
    //       multiple: items?.fieldType === "multi_select",
    //       name: `candidateResponsibleFor.customFields.[${items?._id}]`,
    //       label: items?.fieldType === "attachment" ? items?.label : undefined,
    //       outerLabel: items?.label,
    //       options: items?.options,
    //       getOptionLabel: (option: any) => option.label,
    //       isOptionEqualToValue: (option: any, newValue: any) =>
    //         option === newValue,
    //       placeholder: items?.placeholder,
    //       multiline: items?.fieldType === "long_text",
    //       rows: items?.fieldType === "long_text" ? 3 : 1,
    //     },
    //     component: CustomFieldFunction(items?.fieldType),
    //     md: 12,
    //   }));
    // }
  }
  return {
    prospectInitialDetails: [
      {
        id: 1,
        componentProps: {
          name: "department",
          outerLabel: "Department",
          apiQuery: getDepartmentListQuery,
          getOptionLabel: (option: any) => option.departmentName,
        },

        component: RHFAutocompleteAsync,
        md: 3,
      },
      {
        id: 2,
        componentProps: {
          name: "office",
          outerLabel: "Office",
          apiQuery: getOfficeListQuery,
          getOptionLabel: (option: any) => option.officeName,
        },

        component: RHFAutocompleteAsync,
        md: 3,
      },
      {
        id: 3,
        componentProps: {
          name: "specificJob",
          outerLabel: "Specific Job(s)",
          apiQuery: getJobListQuery,
          externalParams: params,
          getOptionLabel: (option: any) => option.jobName,
          multiple: true,
          disabled:
            !getJobListQueryParams?.office ||
            !getJobListQueryParams?.department,
        },

        component: RHFAutocompleteAsync,
        md: 3,
      },

      {
        id: 4,
        componentProps: {
          name: "pool",
          outerLabel: "Pool",
          apiQuery: getPoolListQuery,
          getOptionLabel: (option: any) => option.name,
        },

        component: RHFAutocompleteAsync,
        md: 3,
      },
      {
        id: 5,
        componentProps: {
          name: "prospectStage",
          outerLabel: "Prospect Stage",
          apiQuery: getProspectStagesList,
          externalParams: {
            search: "",
            poolId: getJobListQueryParams?.pool?._id,
          },
          getOptionLabel: (option: any) => option.stage,
        },
        component: RHFAutocompleteAsync,
        md: 3,
      },
      {
        id: 6,
        componentProps: {
          name: "productOwner",
          outerLabel: "Product Owner",
          apiQuery: getProductOwnerList,
          getOptionLabel: (option: any) => option.userName,
        },

        component: RHFAutocompleteAsync,
        md: 3,
      },
    ],
    NameAndCompany: nameAndCompany
      ? [
          {
            id: 1,
            componentProps: {
              name: "nameAndCompany.firstName",
              outerLabel: "First Name",
            },

            component: RHFTextField,
            md: 3,
          },
          {
            id: 2,
            componentProps: {
              name: "nameAndCompany.lastName",
              outerLabel: "Last Name",
            },

            component: RHFTextField,
            md: 3,
          },
          {
            id: 3,
            componentProps: {
              name: "nameAndCompany.currentCompany",
              outerLabel: "Current Company",
            },

            component: RHFTextField,
            md: 3,
          },
          {
            id: 4,
            componentProps: {
              name: "nameAndCompany.currentTitle",
              outerLabel: "Current Title",
            },

            component: RHFTextField,
            md: 3,
          },
          {
            id: 5,
            componentProps: {
              name: "nameAndCompany.timeZone",
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
            md: 3,
          },
          {
            id: 6,
            componentProps: {
              name: "nameAndCompany.notes",
              outerLabel: "Note",
              multiline: true,
              rows: 3,
            },

            component: RHFTextField,
            md: 12,
          },
          {
            id: 7,
            componentProps: {
              name: "nameAndCompany.candidateTags",
              outerLabel: "Candidate Tags",
              placeholder: "Select",
              limitTags: 1,
              apiQuery: getCandidateTagsListQuery,
              getOptionLabel: (option: any) => option?.candidateTag,
              multiple: true,
              renderTags: (value: readonly string[], getTagProps) =>
                value?.map((option: any, index: number) => (
                  <Chip
                    variant="outlined"
                    key={option?.candidateTag}
                    label={option?.candidateTag}
                    {...getTagProps({ index })}
                  />
                )),
            },
            component: RHFAutocompleteAsync,
            md: 3,
          },
          {
            id: 8,
            componentProps: {
              name: "nameAndCompany.followCandidate",
              label: "Follow Candidate",
            },

            component: RHFCheckbox,
            md: 12,
          },
          ...nameAndCompany,
        ]
      : [
          {
            id: 1,
            componentProps: {
              name: "nameAndCompany.firstName",
              outerLabel: "First Name",
            },

            component: RHFTextField,
            md: 3,
          },
          {
            id: 2,
            componentProps: {
              name: "nameAndCompany.lastName",
              outerLabel: "Last Name",
            },

            component: RHFTextField,
            md: 3,
          },
          {
            id: 3,
            componentProps: {
              name: "nameAndCompany.currentCompany",
              outerLabel: "Current Company",
            },

            component: RHFTextField,
            md: 3,
          },
          {
            id: 4,
            componentProps: {
              name: "nameAndCompany.currentTitle",
              outerLabel: "Current Title",
            },

            component: RHFTextField,
            md: 3,
          },
          {
            id: 5,
            componentProps: {
              name: "nameAndCompany.timeZone",
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
            md: 3,
          },
          {
            id: 6,
            componentProps: {
              name: "nameAndCompany.notes",
              outerLabel: "Note",
              multiline: true,
              rows: 3,
            },

            component: RHFTextField,
            md: 12,
          },
          {
            id: 7,
            componentProps: {
              name: "nameAndCompany.candidateTags",
              outerLabel: "Candidate Tags",
              placeholder: "Select",
              limitTags: 1,
              apiQuery: getCandidateTagsListQuery,
              getOptionLabel: (option: any) => option?.candidateTag,
              multiple: true,
              renderTags: (value: readonly string[], getTagProps) =>
                value?.map((option: any, index: number) => (
                  <Chip
                    variant="outlined"
                    key={option?.candidateTag}
                    label={option?.candidateTag}
                    {...getTagProps({ index })}
                  />
                )),
            },
            component: RHFAutocompleteAsync,
            md: 3,
          },
          {
            id: 8,
            componentProps: {
              name: "nameAndCompany.followCandidate",
              label: "Follow Candidate",
            },

            component: RHFCheckbox,
            md: 12,
          },
        ],
    info: Info
      ? [
          {
            id: 1,
            componentProps: {
              name: "info.phone.phoneNumber",
              outerLabel: "Phone",
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
            md: 8,
          },
          {
            id: 2,
            componentProps: {
              name: "info.phone.phoneType",
              outerLabel: "\u00a0",
              options: [
                { id: 1, label: "Home", value: "Home" },
                { id: 2, label: "Work", value: "Work" },
                { id: 3, label: "Mobile", value: "Mobile" },
                { id: 4, label: "Skype", value: "Skype" },
                { id: 5, label: "Other", value: "Other" },
              ],
            },
            component: RHFCustomSelect,
            md: 4,
          },
          {
            id: 3,
            componentProps: {
              name: "info.email.emailAddress",
              outerLabel: "Email",
            },

            component: RHFTextField,
            md: 8,
          },
          {
            id: 4,
            componentProps: {
              name: "info.email.emailType",
              outerLabel: "\u00a0",
              options: [
                { id: 1, label: "Personal", value: "Personal" },
                { id: 2, label: "Work", value: "Work" },
                { id: 5, label: "Other", value: "other" },
              ],
            },
            component: RHFCustomSelect,
            md: 4,
          },
          {
            id: 5,
            componentProps: {
              name: "info.socialMediaLink",
              outerLabel: "Social Media (Link)",
            },

            component: RHFTextField,
            md: 8,
          },
          {
            id: 6,
            componentProps: {
              name: "info.websites.url",
              outerLabel: "Website",
            },

            component: RHFTextField,
            md: 8,
          },
          {
            id: 7,
            componentProps: {
              name: "info.websites.websiteType",
              outerLabel: "\u00a0",
              options: [
                { id: 1, label: "Personal Website", value: "Personal Website" },
                { id: 2, label: "Company Website", value: "Company Website" },
                { id: 3, label: "Portfolio", value: "Portfolio" },
                { id: 4, label: "Blog", value: "Blog" },
                { id: 5, label: "Other", value: "other" },
              ],
            },
            component: RHFCustomSelect,
            md: 4,
          },
          {
            id: 8,
            componentProps: {
              name: "info.address.address",
              outerLabel: "Address",
              multiline: true,
              rows: 3,
            },

            component: RHFTextField,
            md: 8,
          },
          {
            id: 9,
            componentProps: {
              name: "info.address.addressType",
              outerLabel: "\u00a0",
              options: [
                { id: 1, label: "Home", value: "Home" },
                { id: 2, label: "Work", value: "Work" },
                { id: 5, label: "Other", value: "Other" },
              ],
            },
            component: RHFCustomSelect,
            md: 4,
          },
          ...Info,
        ]
      : [
          {
            id: 1,
            componentProps: {
              name: "info.phone.phoneNumber",
              outerLabel: "Phone",
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
            md: 8,
          },
          {
            id: 2,
            componentProps: {
              name: "info.phone.phoneType",
              outerLabel: "\u00a0",
              options: [
                { id: 1, label: "Home", value: "Home" },
                { id: 2, label: "Work", value: "Work" },
                { id: 3, label: "Mobile", value: "Mobile" },
                { id: 4, label: "Skype", value: "Skype" },
                { id: 5, label: "Other", value: "Other" },
              ],
            },
            component: RHFCustomSelect,
            md: 4,
          },
          {
            id: 3,
            componentProps: {
              name: "info.email.emailAddress",
              outerLabel: "Email",
            },

            component: RHFTextField,
            md: 8,
          },
          {
            id: 4,
            componentProps: {
              name: "info.email.emailType",
              outerLabel: "\u00a0",
              options: [
                { id: 1, label: "Personal", value: "Personal" },
                { id: 2, label: "Work", value: "Work" },
                { id: 5, label: "Other", value: "other" },
              ],
            },
            component: RHFCustomSelect,
            md: 4,
          },
          {
            id: 5,
            componentProps: {
              name: "info.socialMediaLink",
              outerLabel: "Social Media (Link)",
            },

            component: RHFTextField,
            md: 8,
          },
          {
            id: 6,
            componentProps: {
              name: "info.websites.url",
              outerLabel: "Website",
            },

            component: RHFTextField,
            md: 8,
          },
          {
            id: 7,
            componentProps: {
              name: "info.websites.websiteType",
              outerLabel: "\u00a0",
              options: [
                { id: 1, label: "Personal Website", value: "Personal Website" },
                { id: 2, label: "Company Website", value: "Company Website" },
                { id: 3, label: "Portfolio", value: "Portfolio" },
                { id: 4, label: "Blog", value: "Blog" },
                { id: 5, label: "Other", value: "other" },
              ],
            },
            component: RHFCustomSelect,
            md: 4,
          },
          {
            id: 8,
            componentProps: {
              name: "info.address.address",
              outerLabel: "Address",
              multiline: true,
              rows: 3,
            },

            component: RHFTextField,
            md: 8,
          },
          {
            id: 9,
            componentProps: {
              name: "info.address.addressType",
              outerLabel: "\u00a0",
              options: [
                { id: 1, label: "Home", value: "Home" },
                { id: 2, label: "Work", value: "Work" },
                { id: 5, label: "Other", value: "Other" },
              ],
            },
            component: RHFCustomSelect,
            md: 4,
          },
        ],
    education: Education ? [...Education] : [],
    details: Details
      ? [
          {
            id: 1,
            componentProps: {
              name: "resume",
              label: "Resume",
              accept: ".pdf, .doc, .docx",
            },

            component: RHFUploadSingleFileWithoutPreview,
            md: 12,
          },
          {
            id: 2,
            componentProps: {
              name: "coverLetter",
              label: "Cover Letter",
              accept: ".pdf, .doc, .docx",
            },

            component: RHFUploadSingleFileWithoutPreview,
            md: 12,
          },

          ...Details,
        ]
      : [
          {
            id: 1,
            componentProps: {
              name: "resume",
              label: "Resume",
              accept: ".pdf, .doc, .docx",
            },

            component: RHFUploadSingleFileWithoutPreview,
            md: 12,
          },
          {
            id: 2,
            componentProps: {
              name: "coverLetter",
              label: "Cover Letter",
              accept: ".pdf, .doc, .docx",
            },

            component: RHFUploadSingleFileWithoutPreview,
            md: 12,
          },
        ],
    // responsibleForCandidate: WhoResponsible
    //   ? [
    //       {
    //         id: 1,
    //         componentProps: {
    //           name: "candidateResponsibleFor.recruiter",
    //           outerLabel: "Recruiter",
    //           options: [
    //             { id: 1, label: "Home", value: "home" },
    //             { id: 2, label: "Work", value: "work" },
    //             { id: 3, label: "Mobile", value: "mobile" },
    //             { id: 4, label: "Skype", value: "skype" },
    //             { id: 5, label: "Other", value: "other" },
    //           ],
    //         },

    //         component: RHFCustomSelect,
    //         md: 12,
    //       },
    //       {
    //         id: 2,
    //         componentProps: {
    //           name: "candidateResponsibleFor.coordinator",
    //           outerLabel: "Coordinator",
    //           options: [
    //             { id: 1, label: "Home", value: "home" },
    //             { id: 2, label: "Work", value: "work" },
    //             { id: 3, label: "Mobile", value: "mobile" },
    //             { id: 4, label: "Skype", value: "skype" },
    //             { id: 5, label: "Other", value: "other" },
    //           ],
    //         },

    //         component: RHFCustomSelect,
    //         md: 12,
    //       },
    //       ...WhoResponsible,
    //     ]
    //   : [
    //       {
    //         id: 1,
    //         componentProps: {
    //           name: "candidateResponsibleFor.recruiter",
    //           outerLabel: "Recruiter",
    //           options: [
    //             { id: 1, label: "Home", value: "home" },
    //             { id: 2, label: "Work", value: "work" },
    //             { id: 3, label: "Mobile", value: "mobile" },
    //             { id: 4, label: "Skype", value: "skype" },
    //             { id: 5, label: "Other", value: "other" },
    //           ],
    //         },

    //         component: RHFCustomSelect,
    //         md: 12,
    //       },
    //       {
    //         id: 2,
    //         componentProps: {
    //           name: "candidateResponsibleFor.coordinator",
    //           outerLabel: "Coordinator",
    //           options: [
    //             { id: 1, label: "Home", value: "home" },
    //             { id: 2, label: "Work", value: "work" },
    //             { id: 3, label: "Mobile", value: "mobile" },
    //             { id: 4, label: "Skype", value: "skype" },
    //             { id: 5, label: "Other", value: "other" },
    //           ],
    //         },

    //         component: RHFCustomSelect,
    //         md: 12,
    //       },
    //     ],
  };
};
export const prospectValidationSchema = Yup.object({
  department: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  office: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  specificJob: Yup.array().of(Yup.mixed()),
  pool: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  prospectStage: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  productOwner: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  nameAndCompany: Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    currentCompany: Yup.string().required("Required"),
    currentTitle: Yup.string().required("Required"),
    timeZone: Yup.string().required("Required"),
    notes: Yup.string().required("Required"),
    candidateTags: Yup.array().of(Yup.object()),
    followCandidate: Yup.boolean().required("Required"),
  }),
  info: Yup.object().shape({
    phone: Yup.object().shape({
      phoneNumber: Yup.string()
        .typeError("Must be a number")
        .min(10, "Invalid Mobile Number")
        .matches(/^\+44\d{9,10}$/, "Invalid Mobile Number")
        .required("Mobile Number is Required"),
      phoneType: Yup.string().required("Required"),
    }),
    email: Yup.object().shape({
      emailAddress: Yup.string()
        .required("Required")
        .matches(
          /^[^\s@]+@[^\s@]+\.(?:com|[a-zA-Z]{2,})$/,
          "Invalid email address"
        ),
      emailType: Yup.string().required("Required"),
    }),
    socialMediaLink: Yup.string()
      .required("Required")
      .matches(
        /^(?:https?:\/\/)?(?:[\da-z.-]+)\.(?:[a-z.]{2,6})(?:[/\w.-]*)*\/?$/,
        "Invalid URL"
      ),
    websites: Yup.object().shape({
      url: Yup.string()
        .required("Required")
        .matches(
          /^(?:https?:\/\/)?(?:[\da-z.-]+)\.(?:[a-z.]{2,6})(?:[/\w.-]*)*\/?$/,
          "Invalid URL"
        ),
      websiteType: Yup.string().required("Required"),
    }),
    address: Yup.object().shape({
      address: Yup.string().required("Required"),
      addressType: Yup.string().required("Required"),
    }),
  }),
  education: Yup.array().of(
    Yup.object().shape({
      schoolName: Yup.string().required("Required"),
      degree: Yup.string().required("Required"),
      discipline: Yup.string().required("Required"),
      startDate: Yup.string().required("Required"),
      endDate: Yup.string().required("Required"),
    })
  ),
  resume: Yup.mixed()
    .nullable()
    .test("Required", (value: any) => {
      return Boolean(value);
    }),
  coverLetter: Yup.mixed()
    .nullable()
    .test("Required", (value: any) => {
      return Boolean(value);
    }),

  // candidateResponsibleFor: Yup.object().shape({
  //   recruiter: Yup.string().required("Required"),
  //   coordinator: Yup.string().required("Required"),
  // }),
});
