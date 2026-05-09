import {
  RHFAutocompleteAsync,
  RHFCustomSelect,
  RHFDatePicker,
  RHFSwitch,
} from "common";
import * as Yup from "yup";

export const setRulesDefaultValues = {
  onBoardingPlan: false,
  assignDate: "",
  departmentsMatches: [],
  locationMatches: "",
  employmentStatusMatches: "",
  otherCriteriaMatches: "",
};
export const setRulesValidationSchema = Yup.object().shape({
  onBoardingPlan: Yup.boolean().required("Onboarding plan is required"),
  assignDate: Yup.string().required("Required"),
  departmentsMatches: Yup.array().of(Yup.string()).required("Required"),
  locationMatches: Yup.string().required("Location matcher is required"),
  employmentStatusMatches: Yup.string().required(
    "Employment status matches are required"
  ),
  otherCriteriaMatches: Yup.string().required(
    "Other criteria matches are required"
  ),
});
export const CreateSetRulesData = ({ getDepartmentListQuery }: any): any => {
  return {
    first: [
      {
        id: 1,
        componentProps: {
          name: "onBoardingPlan",
          label: "Add to Onboarding Plan",
        },

        component: RHFSwitch,
        md: 12,
      },
      {
        id: 2,
        componentProps: {
          name: "assignDate",
          outerLabel: "Assign Date",
        },
        format: (date: any) => {
          return new Date(date);
        },
        component: RHFDatePicker,
        md: 12,
      },
    ],
    whose: [
      {
        id: 1,
        componentProps: {
          name: "departmentsMatches",
          outerLabel: "Department Matches",
          placeholder: "Select",
          apiQuery: getDepartmentListQuery,
          getOptionLabel: (option: any) => option.departmentName,
          multiple: true,
        },
        component: RHFAutocompleteAsync,
        md: 6,
      },
      {
        id: 2,
        componentProps: {
          name: "locationMatches",
          outerLabel: "Location Matches",
          options: [
            { id: 1, label: "Dublin Office", value: "Dublin Office" },
            { id: 2, label: "Glasgow Office", value: "Glasgow Office" },
            { id: 3, label: "London Office", value: "London Office" },
          ],
        },

        component: RHFCustomSelect,
        md: 6,
      },
      {
        id: 3,
        componentProps: {
          name: "employmentStatusMatches",
          outerLabel: "Employment Status Matches",
          options: [
            { id: 1, label: "Contract", value: "Contract" },
            { id: 2, label: "Full-time", value: "Full-time" },
            { id: 3, label: "Intern", value: "Intern" },
            { id: 4, label: "Part-time", value: "Part-time" },
            { id: 5, label: "Temporary", value: "Temporary" },
            { id: 6, label: "Terminated", value: "Terminated" },
          ],
        },

        component: RHFCustomSelect,
        md: 6,
      },
      {
        id: 4,
        componentProps: {
          name: "otherCriteriaMatches",
          outerLabel: "Other Criteria Matches",
          options: [{ id: 1, label: "Welcome Email", value: "Welcome Email" }],
        },

        component: RHFCustomSelect,
        md: 6,
      },
    ],
  };
};
