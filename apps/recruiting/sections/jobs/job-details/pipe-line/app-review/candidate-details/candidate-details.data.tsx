import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import type {
  candidateTypes,
  filesTypes,
  rejectionTypes,
  tagTypes,
} from "./candidate-details.types";

export const candidateDetails: candidateTypes[] = [
  {
    id: 1,
    status: "Referral",
    appliedDate: "March 22 , 2023",
    source: "Referred by Faisal Naeem",
  },
];
export const rejectionData: rejectionTypes[] = [
  {
    id: 1,
    rejectBy: "Faisal Naeem",
    reason: "Lacking skills / Qualifications",
    notes: "Lacking skills that we need",
  },
];

export const tagsData: tagTypes[] = [
  {
    id: 1,
    tag: "Developer",
  },
  {
    id: 2,
    tag: "Full Stack",
  },
  {
    id: 3,
    tag: "Manager",
  },
  {
    id: 4,
    tag: "BA",
  },
  {
    id: 5,
    tag: "HR",
  },
];

export const filesData: filesTypes[] = [
  {
    id: 1,
    resume: "resume.txt",
    coverLetter: "cover.txt",
    icon: <ArrowDownwardIcon />,
  },
];
