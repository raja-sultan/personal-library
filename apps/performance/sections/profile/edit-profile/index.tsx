"use client";
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFAutocompleteSync,
  RHFDatePicker,
  RHFPhoneInput,
  RHFTextField,
  SearchIcon,
} from "common";
import type { SetStateAction } from "react";
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomCard from "@components/custom-card";
import {
  defaultValues,
  pronounOptions,
} from "@sections/profile/edit-profile/edit-profile.data";
import ProfileChangePassword from "@sections/profile/change-password";
import {
  Typography,
  Box,
  Grid,
  Divider,
  MenuItem,
  Button,
  Stack,
  Card,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./edit-profile.schema";
import { useRouter } from "next/navigation";
import type { EditProfileFormFields } from "./edit-profile.types";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@services/profile/profile-api";
import { useProfile } from "../use-profile";
import toast from "react-hot-toast";
import DynamicDropdown from "@components/dynamic-dropdown";
import {
  useAddResourceMutation,
  useDeleteResourceMutation,
  useGetResourcesListQuery,
} from "@services/resources/resources-api";
import HorizontalTabs from "@components/horizontal-tab";
import {
  useGetReferenceDataAddressLocationsByIdQuery,
  useGetReferenceDataLookupQuery,
  useGetReferenceDataStatesQuery,
  useLazyGetReferenceDataAddressLocationsQuery,
  useLazyGetReferenceDataCitiesQuery,
} from "@services/reference-data/reference-api";
import { EmailIcon } from "@assets/icons/email-icon";
import { useSelector } from "react-redux";
import { useAttributeOptionsQuery } from "@services/settings/people/user-attribute-api";

function EditProfile(): React.JSX.Element {

  const {user: { defaultRole }} = useSelector((state: any) => state.auth);

  console.log(defaultRole);

  const theme = useTheme();
  const { departments, companyLocations } = useProfile();
  const { data: getProfileData, isLoading } = useGetProfileQuery({});
  const { data: getRelationshipList } = useGetResourcesListQuery({
    type: "relationship",
  });
  const { data: jobTitleList } = useGetResourcesListQuery({
    type: "job_title",
  });
  const [departmentsData, setDepartmentsData] = useState([]);
  const [companyLocationsData, setCompanyLocationsData] = useState([]);
  const [managersData, setManagersData] = useState([]);
  const [relationshipOptions, setRelationshipOptions] = useState([]);
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [addResourceMutation] = useAddResourceMutation();
  const [deleteResourceMutation] = useDeleteResourceMutation();
  const { data: getStatesData } = useGetReferenceDataStatesQuery({
    country: "United Kingdom",
  });
  const { data: getManagersList } = useGetReferenceDataLookupQuery({
    search: "",
    type: "managers",
  });
  const [getCitiesQuery] = useLazyGetReferenceDataCitiesQuery();
  const apiQuery = useLazyGetReferenceDataAddressLocationsQuery();
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  const methods = useForm<EditProfileFormFields>({
    resolver: yupResolver(formSchema) as any,
    defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;

  const { data: addressLine } = useGetReferenceDataAddressLocationsByIdQuery({
    id: watch("asyncAddressLine")?.id ?? "",
  });

  let filterBy;

switch (true) {
  case defaultRole?.includes('ADMIN'):
    filterBy = "Admin Only";
    break;
  case defaultRole?.includes('MANAGER'):
    filterBy = "Admin and Manager";
    break;
  default:defaultRole?.includes('EMPLOYEE')
    filterBy = "Everyone";
    break;
}
  
  const {data:userAttribute} = useAttributeOptionsQuery({visibility:filterBy})

  // const userAttributeNumber = userAttribute?.data?.map((item) => {
  //   if (item?.type === "Number") {
  //     return item?.options?.map((option) => ({
  //       label: option?.value,
  //       value: option?.value, 
  //     }));
  //   }
  //   return null; 
  // });
  
  // const userAttributeNumberOptions = userAttributeNumber ? userAttributeNumber.flat() : ["No Age Found"];

  const userAttributeNumber = userAttribute?.data?.flatMap((item) => {
    if (item?.type === "Number" && item?.options?.length > 0) {
      return item.options.map((option) => ({
        label: option?.value,
        value: option?.value,
      }));
    }

    return null;
  }).filter((item) => item !== null);
  const userAttributeNumberOptions = userAttributeNumber ? userAttributeNumber.flat() : ["No Age Found"];

  

  const userAttributeMultiple = userAttribute?.data?.flatMap((item) => {
    if (item?.type === "Multiple Choice" && item?.options?.length > 0) {
      // Map over options if item.type is "Multiple Choice" and options array is non-empty
      return item.options.map((option) => ({
        label: option?.value,
        value: option?.value,
      }));
    }
  
    // Return null for items that are not "Multiple Choice" or have empty options
    return null;
  }).filter((item) => item !== null);
  
  // console.log(userAttributeMultiple);
  
  
  const userAttributeMultipleOptions = userAttributeMultiple ? userAttributeMultiple.flat() : ["No Age Found"];

  // Data Components
  const editFormData = [
    {
      id: "1",
      head: "Personal Information",
      subText: "Update your the details that will be visible on your profile.",
      divider: true,
      fields: [
        {
          id: "1",
          componentProps: {
            name: "firstName",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">First Name</Typography>,
            placeholder: "First Name",
          },
          description:
            "This is how a name will be shown in a list, like on the Employee Directory page",
          component: RHFTextField,
        },
        {
          id: "2",
          componentProps: {
            name: "lastName",
            placeholder: "Last Name",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Last Name</Typography>,
          },
          description:
            "This is how a name will be shown as part of a sentence. For example, “Welcome back, Robert!”",
          component: RHFTextField,
        },
        {
          id: "3",
          componentProps: {
            name: "pronouns",
            options: pronounOptions,
            multiple: true,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Pronouns <span style={{ opacity: 0.7 }}>(optional)</span></Typography>

          },
          description: `This is how pronouns will display, "Robert Mathew (he)"`,
          component: RHFAutocompleteSync,
        },
        {
          id: "4",
          componentProps: {
            name: "email",
            placeholder: "Email",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Personal Email <span style={{ opacity: 0.7 }}>(optional)</span></Typography>
          },
          component: RHFTextField,
        },
        {
          id: "5",
          componentProps: {
            name: "contactNumber",
            placeholder: "+xx xxxx xxxxxx",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Phone Number <span style={{ opacity: 0.7 }}>(optional)</span></Typography>
          },
          component: RHFPhoneInput,
        },
        {
          id: "6",
          componentProps: {
            maxDate: new Date(),
            name: "dob",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Date of Birth <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
            autoConvert: true,
          },
          component: RHFDatePicker,
        },
        {
          id: "7",
          componentProps: {
            name: "gender",
            select: true,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Gender <span style={{ opacity: 0.7 }}>(optional)</span></Typography>
          },
          options: [
            { value: "male", label: "male" },
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
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Ethnicity <span style={{ opacity: 0.7 }}>(optional)</span></Typography>
          },
          options: [
            { value: "Asian", label: "Asian" },
            { value: "White", label: "White" },
            { value: "Black", label: "Black" },
            { value: "Irish", label: "Irish" },
            { value: "Hispanic", label: "Hispanic" },
            { value: "African", label: "African" },
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
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Marital Status <span style={{ opacity: 0.7 }}>(optional)</span></Typography>
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
            outerLabel: <Typography variant="subtitle2" fontWeight="600">About <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
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
      subText: "Enter your address details.",
      divider: true,
      fields: [
        {
          id: "1",
          componentProps: {
            name: "asyncAddressLine",
            queryKey: "search",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Address</Typography>,
            placeholder: "Address",
            getOptionLabel: (option: any) => option?.address,
            EndIcon: <SearchIcon />,
            apiQuery,
          },
          component: RHFAutocompleteAsync,
        },
        {
          id: "2",
          componentProps: {
            name: "address.country",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Country</Typography>,
            disabled: true,
            value: "United Kingdom",
          },
          sx: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(16, 24, 40, 0.04)",
              color: "rgba(16, 24, 40, 0.38)",

              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor:
                  theme.palette.mode === "light"
                    ? theme.palette.neutral[200]
                    : theme.palette.divider,
              },
            },
          },
          component: RHFTextField,
        },
        {
          id: "3",
          componentProps: {
            name: "address.state",
            select: true,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">State</Typography>,
          },
          options: stateOptions,
          component: RHFTextField,
        },
        {
          id: "4",
          componentProps: {
            name: "address.city",
            select: true,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">City</Typography>,
            disabled: !cityOptions.length,
          },
          sx: {
            ...(cityOptions.length === 0
              ? {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(16, 24, 40, 0.04)",
                  color: "rgba(16, 24, 40, 0.38)",
                  "& fieldset.MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "light"
                        ? theme.palette.neutral[200]
                        : theme.palette.divider,
                  },
                },
              }
              : {}),
          },
          options: cityOptions,
          component: RHFTextField,
        },
        {
          id: "5",
          componentProps: {
            name: "address.zipCode",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Zip Code</Typography>,
          },
          component: RHFTextField,
        },
      ],
    },
    {
      id: "3",
      head: "Work Information",
      subText: "Add your work information.",
      divider: true,
      fields: [
        {
          id: "1",
          componentProps: {
            name: "employeeId",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Employee Id <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
          },
          component: RHFTextField,
        },
        {
          id: "2",
          componentProps: {
            name: "workEmail",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Work Email</Typography>,
            StartIcon: <EmailIcon sx={{ mr: 1 }} />,
          },
          component: RHFTextField,
        },
        {
          id: "3",
          componentProps: {
            name: "employmentStartDate",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Start Date <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
          },
          component: RHFDatePicker,
        },
        {
          id: "4",
          componentProps: {
            name: "timeZone",
            select: true,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Time Zone <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
          },
          options: [
            {
              value: "UTC (Coordinated Universal Time)",
              label: "UTC (Coordinated Universal Time) ",
            },
            {
              value: "GMT (Greenwich Mean Time)",
              label: "GMT (Greenwich Mean Time)",
            },
            {
              value: "EST (Eastern Standard Time)",
              label: "EST (Eastern Standard Time)",
            },
            {
              value: "CST (Central Standard Time)",
              label: "CST (Central Standard Time)",
            },
            {
              value: "MST (Mountain Standard Time)",
              label: "MST (Mountain Standard Time)",
            },
            {
              value: "PST (Pacific Standard Time)",
              label: "PST (Pacific Standard Time)",
            },
          ],
          component: RHFTextField,
        },
        {
          id: "5",
          componentProps: {
            name: "employeeTitle",
            addButtonText: "Add Job Title",
            fieldType: "job_title",
            addOption: addResource,
            deleteOption: deleteResource,
            optionTextMaxWidth: 490,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Title <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
            options: jobTitleOptions,
          },
          component: DynamicDropdown,
        },
        {
          id: "6",
          componentProps: {
            name: "department",
            select: true,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Department</Typography>,
          },
          options: departmentsData,
          component: RHFTextField,
        },
        {
          id: "7",
          componentProps: {
            name: "managerId",
            select: true,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Manager <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
          },
          options: managersData,
          component: RHFTextField,
        },
        {
          id: "8",
          componentProps: {
            name: "location",
            select: true,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Location</Typography>,
          },
          options: companyLocationsData,
          component: RHFTextField,
        },
        {
          id: "9",
          componentProps: {
            name: "employmentStatus",
            select: true,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Employment Status <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
          },
          options: [
            { value: "Full Time", label: "Full Time" },
            { value: "Part Time", label: "Full Time" },
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
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Job Level <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
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
      head: "Emergency Contact (Optional)",
      // divider: true,
      subText: "Add your next of kin information.",
      fields: [
        {
          id: "1",
          componentProps: {
            name: "emergencyContact.firstName",
            placeholder: "Name",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">First Name</Typography>,
          },
          component: RHFTextField,
        },
        {
          id: "2",
          componentProps: {
            name: "emergencyContact.lastName",
            placeholder: "Name",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Last Name</Typography>,
          },
          component: RHFTextField,
        },
        {
          id: "3",
          componentProps: {
            name: "emergencyContact.email",
            placeholder: "Email",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Email</Typography>,
          },
          component: RHFTextField,
        },
        {
          id: "4",
          componentProps: {
            name: "emergencyContact.phone",
            placeholder: "+xx xxxx xxxxxx",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Phone Number</Typography>,
          },
          component: RHFPhoneInput,
        },
        {
          id: "5",
          componentProps: {
            name: "emergencyContact.relationship",
            addButtonText: "Add relationship",
            fieldType: "relationship",
            placeholder: "Select",
            addOption: addResource,
            deleteOption: deleteResource,
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Relationship</Typography>,
            options: relationshipOptions,
            optionTextMaxWidth: 490,
          },
          component: DynamicDropdown,
        },
      ],
    },
    {
      id: "5",
      head: "Customize Fields",
      subText: "Add Employee's additional information",
      fields: [
        {
          id: "1",
          componentProps: {
            name: "attributeOptionIds.age",
            outerLabel: (
              <Typography variant="subtitle2" fontWeight="600">
                Age <span style={{ opacity: 0.7 }}>(optional)</span>
              </Typography>
            ),
            select: true,
            placeholder: "Enter",
          },
          options: userAttributeNumberOptions.length > 0 ? userAttributeNumberOptions : ["No Age Found"],
          component: RHFTextField,
          xl: 12,
          lg: 12,
          md: 12,
          xs: 12,
        },        
        {
          id: "2",
          componentProps: {
            name: "attributeOptionIds.experience",
            outerLabel: <Typography variant="subtitle2" fontWeight="600">Experience <span style={{ opacity: 0.7 }}>(optional)</span></Typography>,
            select: true,
            placeholder: "Enter",
          },
          options: userAttributeMultipleOptions.length > 0 ? userAttributeMultipleOptions : ["No experience Found"],
          component: RHFTextField,
          xl: 12,
          lg: 12,
          md: 12,
          xs: 12,
        },
      ],
    },
  ];

  const router = useRouter();

 

  const onSubmit = (data: EditProfileFormFields): void => {
    console.log("data form is:",data)
    let pronounArray: string[] = [];
    if (data.pronouns?.length) {
      pronounArray = data.pronouns.map((item: any) => item.id);
    }
    const submissionData = {
      ...data,
      pronouns: pronounArray,
      contactNumber: data?.contactNumber ?? "",
    };
    updateProfileMutation(submissionData)
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
        router.push("/profile");
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  async function addResource({
    name,
    type,
  }: {
    name: string;
    type: string;
  }): Promise<void> {
    const data = {
      name,
      type,
    };
    const response = await addResourceMutation(data).unwrap();
    return response;
  }

  async function deleteResource(id: string): Promise<any> {
    const response = await deleteResourceMutation({ id }).unwrap();
    return response;
  }

  useEffect(() => {
    let profileData = getProfileData?.data;
    if (profileData) {
      if (profileData?.pronouns?.length) {
        const updatedPronouns = profileData.pronouns?.map((pronoun: string) => ({ id: pronoun, name: pronoun, value: pronoun })) ?? []
        // const updatedPronouns = profileData.pronouns.map((pronoun) => {
        //   const data = pronounOptions.find(
        //     (option) => option.name.toLowerCase() === pronoun.toLowerCase()
        //   );
        //   return data || pronoun;
        // });

        profileData = { ...profileData, pronouns: updatedPronouns };
      }
      if (profileData?.dob) {
        const formattedDate = new Date(profileData.dob);
        profileData = { ...profileData, dob: formattedDate };
      }
      if (profileData?.employmentStartDate) {
        const formattedDate = new Date(profileData.employmentStartDate);
        profileData = { ...profileData, employmentStartDate: formattedDate };
      }
      if (profileData?.department) {
        profileData = {
          ...profileData,
          department: profileData.department._id,
        };
      }
      if (profileData?.location) {
        profileData = {
          ...profileData,
          location: profileData.location._id,
        };
      }
      if (profileData?.manager) {
        profileData = {
          ...profileData,
          managerId: profileData.manager._id,
        };
      }
      methods.reset(profileData);
    }
  }, [getProfileData?.data]);

  useEffect(() => {
    if (departments?.data?.departments?.length) {
      const data = departments.data?.departments.map((item) => ({
        value: item._id,
        label: item.departmentName,
      }));
      setDepartmentsData(data);
    }
    if (companyLocations?.data?.length) {
      const data = companyLocations.data.map((item) => ({
        value: item?._id,
        label: item?.address,
      }));
      setCompanyLocationsData(data);
    }
    if (getRelationshipList?.data?.length) {
      const options = getRelationshipList.data.map((item) => ({
        label: item.name,
        value: item.name.toLowerCase(),
        id: item._id,
        userId: item.userId,
      }));
      setRelationshipOptions(options);
    }
    if (jobTitleList?.data?.length) {
      const options = jobTitleList.data.map((item) => ({
        label: item.name,
        value: item.name.toLowerCase(),
        id: item._id,
        userId: item.userId,
      }));
      setJobTitleOptions(options);
    }
    if (getStatesData?.data?.length) {
      const options = getStatesData?.data.map((stateName) => ({
        label: stateName,
        value: stateName,
      })) as SetStateAction<never[]>;
      setStateOptions(options);
    }
    if (getManagersList?.data?.length) {
      const data = getManagersList.data.map((item) => ({
        value: item.value,
        label: item.text,
      }));
      setManagersData(data);
    }
  }, [
    departments?.data,
    companyLocations?.data,
    getRelationshipList?.data,
    jobTitleList?.data,
    getStatesData?.data,
    getManagersList?.data,
  ]);

  useEffect(() => {
    if (watch("address.state")) {
      void getCitiesByState();
    }
  }, [watch("address.state")]);

  async function getCitiesByState(): Promise<void> {
    const { data, isError, error } = await getCitiesQuery({
      state: watch("address.state"),
    });
    if (isError || !data?.data) {
      const {
        data: { message },
      }: any = error;
      toast.error(message);
    }
    const citiesList = data?.data;
    if (citiesList?.length) {
      const options = citiesList?.map((stateName) => ({
        label: stateName,
        value: stateName,
      })) as SetStateAction<never[]>;
      setCityOptions(options);
      setValue("address.city", options[0].value, { shouldValidate: true });
    }
  }

  useEffect(() => {
    if (addressLine?.data) {
      const data = addressLine.data as {
        addressLine: string;
        city: string;
        country: string;
        state: string;
        zipCode: string;
      };

      setValue("address.addressLine", data.addressLine, {
        shouldValidate: true,
      });
      setValue("address.state", data.state, {
        shouldValidate: true,
      });
      setValue("address.city", data.city, {
        shouldValidate: true,
      });
      setValue("address.zipCode", data.zipCode, {
        shouldValidate: true,
      });
    }
  }, [addressLine?.data, setValue]);

  return (
    <Stack spacing={3}>
      <CustomCard
        header
        cardHeader={{
          title: "Edit Profile",
          divider: false,
          onBack: () => {
            router.push("/profile");
          },
        }}
      />
      <HorizontalTabs tabsArray={["Profile", "Account"]}>
        <Card sx={{ p: 2.4 }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "50vh",
              }}
            >
              <CircularProgress size={40} />
            </Box>
          ) : (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              {editFormData.map(({ divider, fields, head, id, subText }) => (
                <Fragment key={id}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4} lg={4}>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {head}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mt: "16px",
                          fontWeight: 400,
                          color:
                            theme?.palette?.mode === "dark"
                              ? theme?.palette?.neutral[200]
                              : theme?.palette?.neutral[500],
                        }}
                      >
                        {subText}
                      </Typography>
                    </Grid>
                    <Grid item lg={4} md={8} xs={12}>
                      {fields?.map((field) => (
                        <Box key={field.id} sx={{ mb: 4 }}>
                          <field.component
                            fullWidth
                            sx={{ ...field.sx }}
                            {...field.componentProps}
                          >
                            {field?.componentProps?.select
                              ? field?.options?.map(
                                (option: {
                                  value?: string;
                                  label?: string;
                                }) => (
                                  <MenuItem
                                    value={option?.value}
                                    key={option?.value}
                                  >
                                    {option?.label}
                                  </MenuItem>
                                )
                              )
                              : null}
                          </field.component>
                          {field.description && (
                            <Typography
                              variant="subtitle2"
                              color="neutral.500"
                              fontWeight={400}
                              mt={0.6}
                            >
                              {field.description}
                            </Typography>
                          )}
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                  {divider && <Divider sx={{ my: 3 }} />}
                </Fragment>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </Box>
            </FormProvider>
          )}
        </Card>
        <ProfileChangePassword />
      </HorizontalTabs>
    </Stack>
  );
}

export default EditProfile;
