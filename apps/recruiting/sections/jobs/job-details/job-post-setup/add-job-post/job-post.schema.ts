import * as Yup from "yup";

export const jobPostInitialValue = {
  body: "",
  openingId: null,
  //boardId: "",
  postTo: null,
  postDetails: {
    jobName: "",
    location: "",
    applicationLanguage: "",
  },
  postDescription: {
    descriptionIntroduction: "",
    descriptionConclusion: "",
  },
  basicApplicationInformation: {
    personalInformation: {
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: false,
      resume: false,
      coverLetter: false,
    },
    educationItemDto: {
      schoolName: false,
      degree: false,
      discipline: false,
      startYear: false,
      startMonth: false,
      endMonth: false,
      endYear: false,
    },
  },
  customApplicationQuestions: [],
  setting: {
    confirmationEmailToCandidates: true,
    defaultCandidateAutoReplyEmail: "",
    defaultConfirmationPage: true,
    includeDemographicQuestions: true,
    defaultCandidateAutoReplyDemographics: "",
    includeEEOCQuestions: true,
    includeApplyWithSeekButton: true,
  },
  publishToFreeJobBoards: {
    indeed: true,
    location: "",
    remote: true,
  },
};
export const jobPostFormSchema = Yup.object({
  body: Yup.string().required("Required"),
  openingId: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  // boardId: Yup.string().required("Required"),
  postTo: Yup.object()
    .nullable()
    .test("check null", "Required", (value) => value !== null),
  postDetails: Yup.object().shape({
    jobName: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    applicationLanguage: Yup.string().required("Required"),
  }),
  postDescription: Yup.object().shape({
    descriptionIntroduction: Yup.string().required("Required"),
    descriptionConclusion: Yup.string().required("Required"),
  }),
  basicApplicationInformation: Yup.object().shape({
    personalInformation: Yup.object().shape({
      firstName: Yup.boolean().required("Required"),
      lastName: Yup.boolean().required("Required"),
      email: Yup.boolean().required("Required"),
      phoneNumber: Yup.boolean().required("Required"),
      resume: Yup.boolean().required("Required"),
      coverLetter: Yup.boolean().required("Required"),
    }),
    educationItemDto: Yup.object().shape({
      schoolName: Yup.boolean().required("Required"),
      degree: Yup.boolean().required("Required"),
      discipline: Yup.boolean().required("Required"),
      startYear: Yup.boolean().required("Required"),
      startMonth: Yup.boolean().required("Required"),
      endYear: Yup.boolean().required("Required"),
      endMonth: Yup.boolean().required("Required"),
    }),
  }),
  customApplicationQuestions: Yup.array(),
  setting: Yup.object().shape({
    confirmationEmailToCandidates: Yup.boolean().required("Required"),
    defaultCandidateAutoReplyEmail: Yup.string().required("Required"),
    defaultConfirmationPage: Yup.boolean().required("Required"),
    includeDemographicQuestions: Yup.boolean().required("Required"),
    defaultCandidateAutoReplyDemographics: Yup.string().required("Required"),
    includeEEOCQuestions: Yup.boolean().required("Required"),
    includeApplyWithSeekButton: Yup.boolean().required("Required"),
  }),
  publishToFreeJobBoards: Yup.object().shape({
    indeed: Yup.boolean().required("Required"),
    location: Yup.string().required("Required"),
    remote: Yup.boolean().required("Required"),
  }),
});
