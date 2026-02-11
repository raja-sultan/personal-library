import React from "react";
import dynamicDropdown from "@components/dynamic-dropdown";
import { useGetCompanyLocationQuery } from "@services/company-locations-api";
import { RHFAutocompleteAsync, RHFAutocompleteSync, RHFDatePicker, RHFTelInput, RHFTextField, SearchIcon } from "common";
import { useAddResourceMutation, useDeleteResourceMutation, useGetResourcesListQuery } from "@services/resources/resources-api";
import { useGetReferenceDataLookupQuery, useGetReferenceDataStatesQuery, useLazyGetReferenceDataAddressLocationsQuery } from "@services/reference-data/reference-api";

export function useEditFormData(addressLine): any[] {
  // get resource
  const { data: getRelationshipList } = useGetResourcesListQuery({ type: "relationship" });
  const { data: jobTitleList } = useGetResourcesListQuery({ type: "job_title" });

  // add resource
  const [addResourceMutation] = useAddResourceMutation({});
  async function addResource({ name, type, }: { name: string; type: string; }): Promise<void> {
    const response = await addResourceMutation({ name, type }).unwrap();
    return response;
  }
  // delete resource
  const [deleteResourceMutation] = useDeleteResourceMutation({});
  async function deleteResource(id: string): Promise<any> {
    const response = await deleteResourceMutation({ id }).unwrap();
    return response;
  }

  // get departments
  const { data: getDepartments } = useGetReferenceDataLookupQuery({ type: "departments", });
  const departments = getDepartments?.data?.map(({ value, text }: { value: string; text: string }) => ({ value, label: text }))

  // get managers
  const { data: getMangers } = useGetReferenceDataLookupQuery({ type: "managers" });
  const managers = getMangers?.data?.map(({ value, text }: { value: string; text: string }) => ({ value, label: text }));

  // get Company-Locations
  const { data: companyLocations } = useGetCompanyLocationQuery({});
  const companyLocationsOptions = companyLocations?.data.map(({ _id, address }: { _id: string; address: string }) => ({ value: _id, label: address }));
  // console.log(companyLocationsOptions, 'companyLocationsOptions');


  // get states 
  const { data: getStatesData } = useGetReferenceDataStatesQuery({ country: "United Kingdom" });
  const statesOptions = getStatesData?.data;

  // get address details
  const apiQuery = useLazyGetReferenceDataAddressLocationsQuery();

  return [
    {
      id: "1",
      head: "Personal Information",
      subText: "Update Employee details that will be visible on their profile.",
      divider: true,
      fields: [
        {
          id: "1",
          componentProps: {
            name: "firstName",
            outerLabel: "First Name",
            disabled: true,
          },
          component: RHFTextField,
        },
        {
          id: "2",
          componentProps: {
            name: "lastName",
            outerLabel: "Last Name",
            disabled: true,
          },
          component: RHFTextField,
        },
        {
          id: "3",
          componentProps: {
            multiple: true,
            name: "pronouns",
            outerLabel: (
              <>
                Pronouns <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
            options: [
              { id: "she", name: "she" },
              { id: "he", name: "he" },
              { id: "they", name: "they" },
              { id: "you", name: "you" },
              { id: "it", name: "it" },
              { id: "we", name: "we" },
            ],
          },
          component: RHFAutocompleteSync,
        },
        {
          id: "4",
          componentProps: {
            name: "email",
            disabled: true,
            outerLabel: (
              <>
                Personal Email <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          component: RHFTextField,
        },
        {
          id: "5",
          componentProps: {
            name: "contactNumber",
            defaultCountry: "GB",
            isOptional: true,
            outerLabel: (
              <>
                Phone Number <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          component: RHFTelInput,
        },
        {
          id: "6",
          componentProps: {
            name: "dob",
            maxDate: new Date(),
            outerLabel: (
              <>
                Date of Birth <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
            autoConvert: true,
          },
          component: RHFDatePicker,
        },
        {
          id: "7",
          componentProps: {
            name: "gender",
            select: true,
            outerLabel: (
              <>
                Gender <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ],
          component: RHFTextField,
        },
        {
          id: "8",
          componentProps: {
            name: "ethnicity",
            select: true,
            outerLabel: (
              <>
                Ethnicity <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          options: [
            { value: "Asian", label: "Asian" },
            { value: "African", label: "African" },
            { value: "White", label: "White" },
            { value: "Black", label: "Black" },
            { value: "Irish", label: "Irish" },
            { value: "Hispanic", label: "Hispanic" },
            { value: "European", label: "European" },
            { value: "Native American", label: "Native American" },
          ],
          component: RHFTextField,
        },
        {
          id: "9",
          componentProps: {
            name: "maritalStatus",
            select: true,
            outerLabel: (
              <>
                Marital Status <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          options: [
            { value: "Single", label: "Single" },
            { value: "Married", label: "Married" },
            { value: "Divorced", label: "Divorced" },
            { value: "Widowed", label: "Widowed" },
          ],
          component: RHFTextField,
        },
        {
          id: "10",
          componentProps: {
            name: "about",
            outerLabel: (
              <>
                About <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
            minRows: 3,
            multiline: true,
          },
          component: RHFTextField,
        },
      ],
    },
    {
      id: "2",
      head: "Address Details",
      subText: "Add Employee address details.",
      divider: true,
      fields: [
        {
          id: "1",
          componentProps: {
            name: "asyncAddressLine",
            queryKey: "search",
            outerLabel: "Address",
            placeholder: "Address",
            EndIcon: <SearchIcon />,
            apiQuery,
            getOptionLabel: (option: any) => option?.address,
            defaultSearchValue: addressLine?.addressLine
          },
          component: RHFAutocompleteAsync,
        },
        {
          id: "2",
          componentProps: {
            name: "country",
            outerLabel: "Country",
            disabled: true
          },
          options: [{ value: "United Kingdom", label: "United Kingdom" }],
          component: RHFTextField,
        },
        {
          id: "3",
          componentProps: {
            name: "state",
            select: true,
            outerLabel: "State",
          },
          options: statesOptions?.map((stateName) => ({
            label: stateName,
            value: stateName,
          })),
          component: RHFTextField,
        },
        {
          id: "4",
          componentProps: {
            name: "city",
            select: true,
            outerLabel: "City",
          },
          component: RHFTextField,
        },
        {
          id: "5",
          componentProps: {
            name: "zipCode",
            outerLabel: "Zip Code",
          },
          component: RHFTextField,
        }
      ],
    },
    {
      id: "3",
      head: "Work Information",
      subText: "Add Employee work information.",
      divider: true,
      fields: [
        {
          id: "1",
          componentProps: {
            name: "employeeId",
            outerLabel: (
              <>
                Employee Id <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          component: RHFTextField,
        },
        {
          id: "2",
          componentProps: {
            name: "workEmail",
            outerLabel: "Work Email",
          },
          component: RHFTextField,
        },
        {
          id: "3",
          componentProps: {
            name: "employmentStartDate",
            outerLabel: (
              <>
                Start Date <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          component: RHFDatePicker,
        },
        {
          id: "4",
          componentProps: {
            name: "employeeTitle",
            addButtonText: "Add job title",
            fieldType: "job_title",
            addOption: addResource,
            deleteOption: deleteResource,
            select: true,
            optionTextMaxWidth: 390,
            outerLabel: (
              <>
                Title <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
            options: jobTitleList?.data?.map((item) => ({
              label: item.name,
              value: item.name.toLowerCase(),
              id: item._id,
              userId: item.userId,
            })),
          },
          component: dynamicDropdown,
        },
        {
          id: "5",
          componentProps: {
            name: "timeZone",
            select: true,
            outerLabel: (
              <>
                Time Zone <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          options: [
            { value: "UTC (Coordinated Universal Time)", label: "UTC (Coordinated Universal Time)" },
            { value: "GMT (Greenwich Mean Time)", label: "GMT (Greenwich Mean Time)" },
            { value: "EST (Eastern Standard Time)", label: "EST (Eastern Standard Time)" },
            { value: "CST (Central Standard Time)", label: "CST (Central Standard Time)" },
            { value: "MST (Mountain Standard Time)", label: "MST (Mountain Standard Time)" },
            { value: "PST (Pacific Standard Time)", label: "PST (Pacific Standard Time)" },
          ],
          component: RHFTextField,
        },
        {
          id: "6",
          componentProps: {
            name: "department",
            select: true,
            outerLabel: (
              <>
                Department <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          options: departments,
          component: RHFTextField,
        },
        {
          id: "7",
          componentProps: {
            name: "managerId",
            select: true,
            outerLabel: (
              <>
                Manager <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          options: managers,
          component: RHFTextField,
        },
        {
          id: "8",
          componentProps: {
            name: "location",
            select: true,
            outerLabel: (
              <>
                Location <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          options: companyLocationsOptions,
          component: RHFTextField,
        },
        {
          id: "9",
          componentProps: {
            name: "employmentStatus",
            select: true,
            outerLabel: (
              <>
                Employment Status <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          options: [
            { value: "Full Time", label: "Full Time" },
            { value: "Part Time", label: "Part Time" },
            { value: "Temporary", label: "Temporary" },
            { value: "Contract", label: "Contract" },
          ],
          component: RHFTextField,
        },
        {
          id: "10",
          componentProps: {
            name: "jobLevel",
            select: true,
            outerLabel: (
              <>
                Job Level <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          options: [
            { value: "Junior", label: "Junior" },
            { value: "Mid", label: "Mid" },
            { value: "Senior", label: "Senior" },
          ],
          component: RHFTextField,
        },
      ],
    },
    {
      id: "4",
      head: "Emergency Contact",
      subText: "Add Employee next of kin information.",
      fields: [
        {
          id: "1",
          componentProps: {
            name: "emergencyFirstName",
            outerLabel: (
              <>
                First Name <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          component: RHFTextField,
        },
        {
          id: "2",
          componentProps: {
            name: "emergencyLastName",
            outerLabel: (
              <>
                Last Name <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          component: RHFTextField,
        },
        {
          id: "3",
          componentProps: {
            name: "emergencyEmail",
            outerLabel: (
              <>
                Email <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          component: RHFTextField,
        },
        {
          id: "4",
          componentProps: {
            name: "emergencyContactNumber",
            defaultCountry: "GB",
            isOptional: true,
            outerLabel: (
              <>
                Phone Number <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
          },
          component: RHFTelInput,
        },
        {
          id: "5",
          componentProps: {
            name: "relationship",
            addButtonText: "Add relationship",
            fieldType: "relationship",
            addOption: addResource,
            deleteOption: deleteResource,
            select: true,
            optionTextMaxWidth: 390,
            outerLabel: (
              <>
                Relationship <span style={{ opacity: 0.7 }}>(optional)</span>
              </>
            ),
            options: getRelationshipList?.data?.map((item) => ({
              label: item.name,
              value: item.name.toLowerCase(),
              id: item._id,
              userId: item.userId,
            })),
          },
          component: dynamicDropdown,
        },
      ],
    },
  ];
}
