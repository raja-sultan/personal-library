import { useGetCompanyLocationQuery } from "@services/company-locations-api";
import { useGetDepartmentQuery } from "@services/department/department-api";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { RHFTextField } from "common";

export const FormData = (): any => {
  const { data: departmentsList } = useGetDepartmentQuery({ limit: 10000, offset: 0 })
  const { data: companyLocationsList } = useGetCompanyLocationQuery({})
  const { data: getJobTitle } = useGetReferenceDataLookupQuery({
    type: "job_title",
  });

  const departmentOptions = departmentsList?.data?.departments?.map(department => {
    return { label: department?.departmentName, value: department?._id }
  })

  const locationOptions = companyLocationsList?.data?.map(location => {
    return { label: location?.address, value: location?._id }
  })

  const jobTitleOptions = getJobTitle?.data?.map((jobTitle: { text: string }) => {
    return { label: jobTitle?.text, value: jobTitle?.text };
  });

  return [
    {
      id: "1",
      header: {
        title: "Band Information",
        desc: "Add compensation band information here",
      },
      formFields: [
        {
          id: "1",
          componentProps: {
            name: "name",
            outerLabel: "Band Name",
            variant: "outlined",
            placeholder: "Enter band name",
          },
          component: RHFTextField,
        },
        {
          id: "2",
          componentProps: {
            name: "departmentId",
            outerLabel: "Department",
            select: true,
          },
          options: departmentOptions,
          component: RHFTextField,
        },
        {
          id: "3",
          componentProps: {
            name: "jobTitle",
            outerLabel: "Job Title",
            select: true,
          },
          options: jobTitleOptions,
          component: RHFTextField,
        },
        {
          id: "4",
          componentProps: {
            name: "jobLevel",
            outerLabel: "Job Level",
            select: true,
          },
          options: [
            { label: "Junior", value: "Junior" },
            { label: "Mid Level", value: "Mid" },
            { label: "Senior", value: "Senior" },
          ],
          component: RHFTextField,
        },
        {
          id: "5",
          componentProps: {
            name: "locationId",
            outerLabel: "Location",
            select: true,
          },
          options: locationOptions,
          component: RHFTextField,
        },
      ],
    },
    { divider: true },
    {
      id: "2",
      header: {
        title: "Pay Information",
        desc: "Add compensation band information here",
      },
      formFields: [
        {
          id: "6",
          componentProps: {
            name: "currency",
            outerLabel: "Currency",
            select: true,
          },
          options: [
            { label: "AUD $", value: "AUD $" },
            { label: "USD $", value: "USD $" },
            { label: "GBP £", value: "GBP £" },
          ],
          component: RHFTextField,
        },
        {
          id: "7",
          componentProps: {
            name: "minBasePay",
            type: "number",
            outerLabel: "Min base Pay",
            variant: "outlined",
            placeholder: "£ 0.00",
          },
          component: RHFTextField,
        },
        {
          id: "8",
          componentProps: {
            name: "midBasePay",
            type: "number",
            outerLabel: "Mid base Pay",
            variant: "outlined",
            placeholder: "£ 0.00",
          },
          component: RHFTextField,
        },
        {
          id: "9",
          componentProps: {
            name: "maxBasePay",
            type: "number",
            outerLabel: "Max base Pay",
            variant: "outlined",
            placeholder: "£ 0.00",
          },
          component: RHFTextField,
        },
        {
          id: "10",
          componentProps: {
            name: "minVariablePay",
            type: "number",
            outerLabel: "Min Variable Pay(optional)",
            variant: "outlined",
            placeholder: "£ 0.00",
          },
          component: RHFTextField,
        },
        {
          id: "11",
          componentProps: {
            name: "midVariablePay",
            type: "number",
            outerLabel: "Mid Variable Pay(optional)",
            variant: "outlined",
            placeholder: "£ 0.00",
          },
          component: RHFTextField,
        },
        {
          id: "12",
          componentProps: {
            name: "maxVariablePay",
            type: "number",
            outerLabel: "Max Variable Pay(optional)",
            variant: "outlined",
            placeholder: "£ 0.00",
          },
          component: RHFTextField,
        },
      ],
    },
  ];
}
