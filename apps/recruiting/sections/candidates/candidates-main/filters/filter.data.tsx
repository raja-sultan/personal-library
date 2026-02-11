export const filterName = {
  main: {
    search: "",
  },
  applicationTypeName: {
    candidateAndProspect: "",
    prospectsOnNoJobs: undefined,
  },
  Jobs: {
    jobStage: "",
    jobPostSubmitted: "",
    toBeSent: undefined,
    pendingSubmission: undefined,
    selectedRow: undefined,
    jobIds: "",
  },
  crm: {
    prospectPoolId: "",
    prospectPoolStageId: "",
    prospectOwner: "",
    event: "",
  },
  profileDetails: {
    candidateSearch: "",
    status: "",
    rejectionReason: "",
    gdprStatus: "",
    lastActivityToDate: undefined,
    lastActivityFromDate: undefined,
    appliedDateTo: undefined,
    appliedDateFrom: undefined,
    HiredOnToDate: undefined,
    HiredOnFromDate: undefined,
    showPotentialDuplicates: undefined,
  },
  responsibility: {
    recruiter: "",
    coordinator: "",
    whoIAmFollowing: undefined,
  },
  pipelineTask: {
    needsDecision: undefined,
    toBeScheduled: undefined,
    scheduled: undefined,
    scorecardsDue: undefined,
    completedScorecards: undefined,
    interviewDateFrom: null,
    interviewDateTo: null,
    availabilityStatus: "",
    testStatus: "",
    offer: "",
  },
  education: {
    schoolName: "",
    degree: "",
    discipline: "",
    eduStartMonth: "",
    eduEndMonth: "",
    eduStartYear: "",
    eduEndYear: "",
    mostRecentEdu: undefined,
  },
  pagePrams: {
    offset: 0,
  },
};

//applicationTypeName
export const type = [
  { name: "Candidates only", value: "CANDIDATE" },
  { name: "prospects only", value: "PROSPECT" },
  { name: "candidated + prospect", value: "BOTH" },
];
//Jobs
export const stage = [
  "Application Review",
  "Preliminary Phone Screen",
  "Background Check",
  "Phone Interview",
  "Face to Face",
  "Offer",
];
export const milestone = ["Application", "Assessment", "Face to Face", "Offer"];
export const jobPostSubmitted = [
  "Business Analyst (London)",
  "Assessment",
  "Data Analyst (Uxbridge)",
  "Data Engineer (London) [offline]",
  "Care Team Lead (London)",
];
//crm
export const prospectPool = [
  "None assigned",
  "Cold Outreach",
  "First Contact",
  "College Recruitment",
  "Past Applicants",
];

export const prospectOwner = [
  "Full Name 1",
  "Full Name 2",
  "Full Name 3",
  "Full Name 4",
];
export const event = ["New Hiring"];
//profileDetails
export const status = ["active", "rejected", "hired", "converted"];
export const rejectionReason = [
  "duplicate",
  "lacking",
  "skill (s) / qualification (s)",
  "not a cultural fit",
  "other(add notes below)",
  "candidate",
  "spam",
];
export const gdprStatus = ["data due to be deleted"];
//responsibility
export const recruiter = [
  "none assigned",
  "faisal naeem",
  "kamran zafar",
  "faisal naeem",
  "faisal naeem",
];
export const coordinator = [
  "none assigned",
  "faisal naeem",
  "faisal naeem",
  "faisal naeem",
];
//pipelineTask
export const availabilityStatus = [
  "not requested",
  "requested",
  "received",
  "confirmation sent",
  "send interview confirmation",
  "enter availability manually",
];
export const testStatus = ["To Be Sent", "waiting", "To be Graded"];
export const offer = ["All", "To be created", "created", "To be sent"];
//education
export const schoolName = [
  "govt.high school",
  "university",
  "govt.high school",
  "university",
  "govt.high school",
  "university",
];
export const degree = [
  "govt.high school",
  "BA",
  "MSC",
  "software engineering",
  "master of business",
  "master of it",
];
export const discipline = [
  "Accounting",
  "African Studies",
  "agriculture",
  "accounting",
  "African studies",
  "accounting",
];
export const educationStartMonth = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "march", value: 3 },
  { label: "April", value: 4 },
  { label: "may", value: 5 },
];
export const educationEndMonth = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "march", value: 3 },
  { label: "April", value: 4 },
  { label: "may", value: 5 },
];
export const educationStartYear = [2000, 2001, 2002, 2003, 2004];
export const educationEndYear = [2000, 2001, 2002, 2003, 2004];
