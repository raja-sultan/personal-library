import * as Yup from "yup";

export const defaultValues:any = {
  jobStatus: "Open",
  department: null,
  officeName: null,
  openDate: new Date(),
  noOfOpenings: "10",
  requisitionID: 0,
  openingId: "18-1",
};

export const FormSchema = Yup.object().shape({
  jobStatus: Yup.string().required("Job Status is required"),
  officeName: Yup.object().required("Office Name is required"),
  department: Yup.object().required("Department is required"),
});

export const fieldsInfoFun = (getOfficeListQuery, getDepartmentListQuery) => {
  return [
    {
      type: "SELECT_V2",
      name: "jobStatus",
      outerLabel: "Job Status",
      fieldHeader: null,
      options: [
        {
          id: 1,
          label: "Open",
          value: "Open",
        },
        {
          id: 2,
          label: "Close",
          value: "Close",
        },
        {
          id: 3,
          label: "Draft",
          value: "Draft",
        },
      ],
      OuterConProps: { md: 6 },
    },
    {
      type: "ASYNC_MULTISELECT",
      name: "department",
      outerLabel: "Department",
      fieldHeader: null,
      apiQuery: getDepartmentListQuery,
      getOptionLabel: (option: any) => option.departmentName,
      OuterConProps: { md: 6 },
      transformResponse: (res: any) => res?.data,
    },
    {
      type: "ASYNC_MULTISELECT",
      name: "officeName",
      outerLabel: "Office",
      fieldHeader: null,
      apiQuery: getOfficeListQuery,
      getOptionLabel: (option: any) => option.officeName,
      transformResponse: (res: any) => res?.data,
      OuterConProps: { md: 6 },
    },
    {
      type: "DATE_PICKER",
      name: "openDate",
      outerLabel: "Open Date",
      disable: true,
      fieldHeader: null,
      OuterConProps: { md: 6 },
    },
    {
      type: "TEXT",
      name: "noOfOpenings",
      outerLabel: "No Of Openings",
      disable: true,
      fieldHeader: null,
      OuterConProps: { md: 6 },
    },
    {
      type: "TEXT",
      name: "requisitionID",
      outerLabel: "Requisition ID",
      disable: true,
      fieldHeader: null,
      OuterConProps: { md: 6 },
    },
    {
      type: "TEXT",
      name: "openingId",
      outerLabel: "Opening IDs",
      disable: true,
      fieldHeader: null,
      OuterConProps: { md: 6 },
    },
  ];
};
