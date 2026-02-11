import { capitalizeFirstLetter } from "@sections/my-profile/profile-details/profile/personal-info";
import { RHFAutocompleteAsync, RHFCustomSelect } from "common";

export function PreviewExperienceData({
  getDepartmentListQuery,
  getCompanyLocations,
}: any): any {
  return [
    {
      id: 1,
      componentProps: {
        name: "department",
        outerLabel: "Department",
        apiQuery: getDepartmentListQuery,
        getOptionLabel: (option: any) => option.departmentName,
        placeholder: "Any Department",
      },

      component: RHFAutocompleteAsync,
      md: 4,
    },
    {
      id: 2,
      componentProps: {
        name: "location",
        outerLabel: "Location",
        apiQuery: getCompanyLocations,
        getOptionLabel: (option: any) => capitalizeFirstLetter(option.address),
        placeholder: "Any Location",
      },

      component: RHFAutocompleteAsync,
      md: 4,
    },
    {
      id: 3,
      componentProps: {
        name: "employmentStatus",
        outerLabel: "Employment Status",
        options: [
          {
            id: 1,
            label: "Contact",
            value: "Contact",
          },
          {
            id: 2,
            label: "Full-Time",
            value: "Full-Time",
          },
          {
            id: 3,
            label: "Intern",
            value: "Intern",
          },
          {
            id: 4,
            label: "Part-Time",
            value: "Part-Time",
          },
          {
            id: 5,
            label: "Temporary",
            value: "Temporary",
          },
          {
            id: 5,
            label: "Terminated",
            value: "Terminated",
          },
        ],
        placeholder: "Any Employment Status",
      },

      component: RHFCustomSelect,
      md: 4,
    },
    {
      id: 4,
      componentProps: {
        name: "otherCriteria",
        outerLabel: "Other Criteria",
        options: [
          {
            id: 1,
            label: "Welcome Email",
            value: "welcomeEmail",
          },
        ],
        placeholder: "Any Criteria",
      },

      component: RHFCustomSelect,
      md: 4,
    },
  ];
}
