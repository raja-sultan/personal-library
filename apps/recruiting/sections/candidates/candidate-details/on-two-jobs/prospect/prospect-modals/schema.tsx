import * as Yup from "yup";

export const convertCandidateSchema = Yup.object({});

export const editProspectSchema: any = Yup.object({
  specificJob: Yup.array(),
  department: Yup.mixed().required("Required"),
  office: Yup.mixed().required("Required"),
  pool: Yup.mixed().required("Required"),
  prospectStage: Yup.mixed().required("Required"),
  prospectOwner: Yup.mixed(),
});

export const schema: any = Yup.object({
  rejectionReason: Yup.mixed().required("Rejection Reason is required"),
  // from: Yup.string()
  //   .when("shouldSendEmail", {
  //     is: (shouldSendEmail) => shouldSendEmail,
  //     then: (res) => res.min(1),
  //     otherwise: (res) => res.min(0),
  //   })
  //   .required("Sender is required"),
  recipients: Yup.string()
    .when("shouldSendEmail", {
      is: true,
      then: (res) => res.required("Recipient required"),
    }),
  subject: Yup.string().when("shouldSendEmail", {
    is: true,
    then: (res) => res.required("Subject Required"),
  }),
});

export const defaultValues = {
  rejectionReason: null,
  notes: "",
  from: "info@personnelibrary.co.uk",
  recipients: "",
  ccRecipients: [],
  subject: "",
  html: "",
  shouldSendEmail: false,
};
export const convertCandidateDefaultValues = { jobName: null, jobStage: null };
