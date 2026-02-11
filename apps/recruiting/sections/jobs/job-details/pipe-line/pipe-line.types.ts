export interface applicationReviewsTypes {
  id: number;
  status: string;
  title: string;
  feedback: string;
  day: string;
  link: false;
  slot:
    | "application-review"
    | "preliminary-phone-screen"
    | "background-check"
    | "phone-interview"
    | "face-to-face"
    | "offer";
}

export interface pipeLineTypes {
  type: "select";
  FieldProps: {
    name: string;
    placeholder?: string;
    label?: string;
  };
  options: { label: string; value: string }[];
}

export interface jobStagesTypes {
  id: number;
  title: string;
  numbers: string;
  slot:
    | "application-review"
    | "preliminary-phone-screen"
    | "background-check"
    | "phone-interview"
    | "face-to-face"
    | "offer";
}
export interface IPARAMS {
  jobId: string | null;
  sortBy:
    | "NAME_A_TO_Z"
    | "NAME_Z_TO_A"
    | "LAST_ACTIVITY_OLD_TO_NEW"
    | "LAST_ACTIVITY_NEW_TO_OLD"
    | "DATE_APPLIED_OLD_TO_NEW"
    | "DATE_APPLIED_NEW_TO_OLD"
    | string;
}
