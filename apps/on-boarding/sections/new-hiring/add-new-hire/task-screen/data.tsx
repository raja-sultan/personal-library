const personalInformationColumn = [
  {
    accessorFn: (row) => row?.department,
    id: "department",
    cell: (info) => info.getValue(),
    header: () => <span>Department</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.employmentStatus,
    id: "employmentStatus",
    cell: (info) => info.getValue(),
    header: () => <span>Employment Status</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.location,
    id: "location",
    cell: (info) => info.getValue(),
    header: () => <span>Locations</span>,
    isSortable: false,
  },
];
const buildRelationshipsColumn = [
  {
    accessorFn: (row) => row?.name,
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.whoResponsible,
    id: "whoResponsible",
    cell: (info) => info.getValue(),
    header: () => <span>Who is Responsible?</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.dueData,
    id: "dueData",
    cell: (info) => info.getValue(),
    header: () => <span>Due Date</span>,
    isSortable: false,
  },
];
const knowCompanyColumn = [
  {
    accessorFn: (row) => row?.name,
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.whoResponsible,
    id: "whoResponsible",
    cell: (info) => info.getValue(),
    header: () => <span>Who is Responsible?</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.dueData,
    id: "dueData",
    cell: (info) => info.getValue(),
    header: () => <span>Due Date</span>,
    isSortable: false,
  },
];
const jobTrainingColumns = [
  {
    accessorFn: (row) => row?.name,
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.whoResponsible,
    id: "whoResponsible",
    cell: (info) => info.getValue(),
    header: () => <span>Who is Responsible?</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.dueData,
    id: "dueData",
    cell: (info) => info.getValue(),
    header: () => <span>Due Date</span>,
    isSortable: false,
  },
];
const logisticsColumn = [
  {
    accessorFn: (row) => row?.name,
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.whoResponsible,
    id: "whoResponsible",
    cell: (info) => info.getValue(),
    header: () => <span>Who is Responsible?</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.dueData,
    id: "dueData",
    cell: (info) => info.getValue(),
    header: () => <span>Due Date</span>,
    isSortable: false,
  },
];
const eSignatureColumn = [
  {
    accessorFn: (row) => row?.name,
    id: "name",
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.counter,
    id: "counter",
    cell: (info) => info.getValue(),
    header: () => <span>Counter Signer</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.assign,
    id: "assign",
    cell: (info) => info.getValue(),
    header: () => <span>Assign</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.action,
    id: "action",
    cell: (info) => info.getValue(),
    header: () => <span>Email Title</span>,
    isSortable: false,
  },
];

const emailColumn = [
  {
    accessorFn: (row) => row?.email,
    id: "email",
    cell: (info) => info.getValue(),
    header: () => <span>Email Title</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.sendDate,
    id: "sendDate",
    cell: (info) => info.getValue(),
    header: () => <span>Send Date</span>,
    isSortable: false,
  },
];
const feedbackQuestionsColumn = [
  {
    accessorFn: (row) => row?.questions,
    id: "questions",
    cell: (info) => info.getValue(),
    header: () => <span>Questions</span>,
    isSortable: false,
  },
  {
    accessorFn: (row) => row?.sendToNewHire,
    id: "sendToNewHire",
    cell: (info) => info.getValue(),
    header: () => <span>Send To New Hire</span>,
    isSortable: false,
  },
];

export const addNewHireSecondPageData = [
  {
    id: 1,
    title: "Personal Information",
    isButton: true,
    task: null,
    tableColumns: personalInformationColumn,
    tableData: [],
  },
  {
    id: 2,
    title: "Build Relationships",

    task: 1,
    tableColumns: buildRelationshipsColumn,
    tableData: [],
  },
  {
    id: 3,
    title: "Job Training",

    task: 2,
    tableColumns: jobTrainingColumns,
    tableData: [],
  },
  {
    id: 4,
    title: "Know the Company",

    task: 2,
    tableColumns: knowCompanyColumn,
    tableData: [],
  },
  {
    id: 5,
    title: "Logistics",

    task: 2,
    tableColumns: logisticsColumn,
    tableData: [],
  },
  {
    id: 6,
    title: "E-signature Requests",
    tableColumns: eSignatureColumn,
    tableData: [],
  },
  {
    id: 7,
    title: "Emails",

    task: null,
    tableColumns: emailColumn,
    tableData: [],
  },
  {
    id: 8,
    title: "Feedback Questions",

    task: null,
    tableColumns: feedbackQuestionsColumn,
    tableData: [],
  },
];
