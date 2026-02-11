import * as Yup from "yup";

export const defaultValues = {
  openingId: "35-5",
  status: "",
  openDate: new Date(),
  targetStartDate: new Date(),
  closeDate: new Date(),
  closeReasonId: {},
};

export const FormSchema = Yup.object().shape({
  openingId: Yup.string(),
  status: Yup.string().required("required"),
  openDate: Yup.date().required("required"),
  targetStartDate: Yup.date().required("required"),
  closeDate: Yup.date().required("required"),
  closeReasonId: Yup.object().required("required"),
});

export const fieldsInfo = (mintargetDate, mincloseDate) => {
  return [
    {
      type: "TEXT",
      name: "openingId",
      outerLabel: "Opening ID",
      fieldHeader: null,
      disable: true,
      OuterConProps: { md: 12 },
    },
    {
      type: "SELECT_V2",
      name: "status",
      outerLabel: "Status",
      fieldHeader: null,
      options: [
        { id: 1, label: "Open", value: "Open" },
        { id: 2, label: "Closed", value: "Closed" },
      ],
      OuterConProps: { md: 12 },
    },
    {
      type: "DATE_PICKER",
      name: "openDate",
      outerLabel: "Open Date",
      minDate: new Date(),
      fieldHeader: null,
      OuterConProps: { md: 12 },
    },
    {
      type: "DATE_PICKER",
      name: "targetStartDate",
      outerLabel: "Target Start Date",
      fieldHeader: null,
      minDate: mintargetDate,
      OuterConProps: { md: 12 },
    },
    {
      type: "DATE_PICKER",
      name: "closeDate",
      outerLabel: "Close Date",
      fieldHeader: null,
      minDate: mincloseDate,
      OuterConProps: { md: 12 },
    },
    {
      type: "SELECT_V2",
      name: "closeReasonId",
      outerLabel: "Close Reason",
      fieldHeader: null,
      options: [
        { id: 1, label: "No Reason", value: "No Reason" },
        {
          id: 2,
          label: "Yes There was a reason",
          value: "Yes There was a reason",
        },
      ],
      OuterConProps: { md: 12 },
    },
  ];
};
