export const fieldsInfo = [
  {
    type: "SELECT_V2",
    name: "emailTemplate",
    outerLabel: "Email Template",
    fieldHeader: null,
    options: [
      { id: 1, label: "None Assigned", value: "None Assigned" },
      {
        id: 2,
        label: "Contacted:Specific Role",
        value: "Contacted:Specific Role",
      },
      { id: 3, label: "First Contact", value: "First Contact" },
      { id: 4, label: "Graduation Year:2023", value: "Graduation Year:2023" },
      { id: 5, label: "Graduation Year:2024", value: "Graduation Year:2024" },
    ],
  },
  {
    type: "TEXT_MULTILINE",
    name: "textResumeUpload",
    outerLabel: "Text for Resume Upload Page",
    fieldHeader: null,
  },
  {
    type: "TEXT",
    name: "textResumeConfirmation",
    outerLabel: "Text for Resume Upload Confirmation Page",
    fieldHeader: null,
  },
];
