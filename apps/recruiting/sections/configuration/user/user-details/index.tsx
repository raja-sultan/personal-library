import styled from "@emotion/styled";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useLazyGetInterviewerTagsListQuery } from "@services/configuration/interviewer-tags-api/interviewer-tags-api";
import {
  useGetSingleConfigurationUsersQuery,
  useLazyGetSingleConfigurationUsersQuery,
  useUpdateConfigurationUserMutation,
} from "@services/configuration/user-api";
import { useLazyDropdownDepartmentsListQuery } from "@services/offices-and-departments/departments-api";
import { useLazyDropdownOfficeListQuery } from "@services/offices-and-departments/offices-api";
import { FormProvider, IsFetching, RHFAutocompleteAsync } from "common";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  assignedPermissions,
  defKeys,
  organizationData,
  schema,
  userPersonalData,
} from "./user-detail.data";
import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "lodash";

export function UserDetailSection(): React.JSX.Element {
  //  STATES
  const [toggleForPermissions, setToggleForPermissions] = useState(false);
  const [loading, setLoading] = useState(false);
  //THEME
  const theme = useTheme();

  //URI USERID
  const userId = useSearchParams().get("userId");

  //API HANDLERS

  const [getSingleConfigurationUsers] =
    useLazyGetSingleConfigurationUsersQuery();
  const departmentQuery = useLazyDropdownDepartmentsListQuery();
  const tagQuery = useLazyGetInterviewerTagsListQuery();
  const officeQuery = useLazyDropdownOfficeListQuery();
  const updateQuery = useUpdateConfigurationUserMutation();
  const { data: userData, isLoading } = useGetSingleConfigurationUsersQuery({
    params: { userId },
  });
  const router = useRouter();
  //DESTRUCTURE API HANDLERS VALUES
  const [dropdownDepartmentsList] = departmentQuery;
  const [getInterviewerTagsList] = tagQuery;
  const [dropdownOfficeList] = officeQuery;
  const [updateConfigurationUser] = updateQuery;
  //FORM HOOKS
  /**
   * ASYNC FUNCTIONS TAKE DATA FORM DIFFERENT API AND GIVE IT TO THE FORM TO DISPLAY
   */
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: async function getData() {
      setLoading(true);
      try {
        const res = await getSingleConfigurationUsers({
          params: { userId },
        }).unwrap();
        const departmentList = await dropdownDepartmentsList({}).unwrap();
        const tagApi = await getInterviewerTagsList({
          params: {
            limit: 100000000000,
            offset: 0,
          },
        }).unwrap();
        const officeList = await dropdownOfficeList({}).unwrap();
        const apiData = res.data;
        const tagData = tagApi.data.interviewerTags;
        const officeData = officeList.data;

        const updateData: any = {};
        for (const keys in defKeys) {
          updateData[keys] = apiData[keys];
          if (keys === "department") {
            updateData[keys] = departmentList.data.filter(
              (item) => item._id === updateData.department
            )[0];
          }
          if (keys === "interviewerTags") {
            updateData[keys] = tagData.filter((item) =>
              apiData[keys]?.some((firstItem) => firstItem === item._id)
            );
          }
          if (keys === "location") {
            updateData[keys] = officeData.filter(
              (item) => item._id === updateData.location
            )[0];
          }
        }
        updateData.userId = apiData._id;
        setLoading(false);

        return updateData;
      } catch (error) {
        setLoading(false);
        toast.error(error ?? "something went Wrong");
        return {};
      }
    },
  });
  const assignPermissions = () => {
    setToggleForPermissions(!toggleForPermissions);
  };

  const { handleSubmit } = methods;
  const onSubmit = async (formData: any): Promise<void> => {
    try {
      formData.interviewerTags = formData.interviewerTags.map(
        (item) => item._id
      );
      formData.location = formData.location._id;
      formData.department = formData.department._id;
      formData.customFields = {};
      const response = await updateConfigurationUser({
        body: {
          ...omit(formData, ["employeeId"]),
        },
      }).unwrap();
      router.push("/configuration/user");
      toast.success("user updated successfully");
    } catch (error) {
      toast.error(error.data.message || "something went wrong");
      router.push("/configuration/user");
    }
  };

  const renderUserDataFields = (data) => {
    return (
      <Grid container columnSpacing={2} rowGap={2}>
        {data?.map((item) => (
          <Grid item xs={12} md={item?.md} key={item?.id}>
            <item.component {...item.componentProps} />
          </Grid>
        ))}
      </Grid>
    );
  };
  const username = `${userData?.data?.firstName ?? "-"} ${userData?.data?.lastName ?? "-"}`;

  const permissionsDisplay = (permissions) => {
    return (
      <>
        {permissions?.map((item) => (
          <Box key={item.heading}>
            <Typography>{item.heading}</Typography>

            {item.permissions?.map((permission) => (
              <Box key={permission}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Typography variant="subtitle2">{permission}</Typography>
                  }
                />
              </Box>
            ))}
          </Box>
        ))}
      </>
    );
  };
  if (loading) {
    return (
      <Box position="relative" height="50vh">
        <IsFetching isFetching />
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box position="relative" height="50vh">
        <IsFetching isFetching />
      </Box>
    );
  }

  return (
    <Stack>
      <StyledBackLink href="/configuration/user">
        Back To All Users
      </StyledBackLink>
      <Typography variant="h6">{username}</Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#344054",
          m: "1em 0 1.2em 0",
          display: "flex",
          fontWeight: "600",
        }}
      >
        Personal Information
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {renderUserDataFields(userPersonalData)}

        <Divider sx={{ mt: 5 }} />
        <Typography
          my={5}
          variant="body2"
          sx={{
            color: "#344054",
            m: "2.7em 0 1.2em 0",
            display: "flex",
            fontWeight: "600",
          }}
        >
          Organization Information
        </Typography>

        <Grid container columnSpacing={5} rowGap={3} sx={{ width: "70%" }}>
          {organizationData?.map((item) => {
            if (item.componentProps.name === "department") {
              return (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <RHFAutocompleteAsync
                    multiple={false}
                    name={item.componentProps.name}
                    size="small"
                    placeholder="Select Option"
                    outerLabel={item.componentProps.outerLabel}
                    getOptionLabel={(option: any) => option?.departmentName}
                    apiQuery={departmentQuery}
                    transformResponse={(res: any) => res?.data}
                  />
                </Grid>
              );
            }
            if (item.componentProps.name === "location") {
              return (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <RHFAutocompleteAsync
                    multiple={false}
                    name={item.componentProps.name}
                    size="small"
                    placeholder="Select Option"
                    outerLabel={item.componentProps.outerLabel}
                    getOptionLabel={(option: any) => option?.officeName}
                    apiQuery={officeQuery}
                    transformResponse={(res: any) => res?.data}
                  />
                </Grid>
              );
            }
            if (item.componentProps.name === "interviewerTags") {
              return (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <RHFAutocompleteAsync
                    multiple
                    limitTags={1}
                    name={item.componentProps.name}
                    size="small"
                    placeholder="Select Option"
                    outerLabel={item.componentProps.outerLabel}
                    getOptionLabel={(option: any) => option?.interviewerTag}
                    apiQuery={tagQuery}
                    transformResponse={(res: any) => res?.data.interviewerTags}
                    externalParams={{ limit: 100000000000, offset: 0 }}
                  />
                  {item?.link && (
                    <Link href={item?.link.href}>
                      <Button variant="text" color="primary">
                        {item?.link.label}
                      </Button>
                    </Link>
                  )}
                </Grid>
              );
            }
            return (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item.componentProps} />
              </Grid>
            );
          })}
        </Grid>

        <Box mt={2} display="flex">
          <Box
            mr="auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <LoadingButton
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              Save User Details
            </LoadingButton>
            <Link href="/configuration/user">
              <Button size="small" variant="outlined">
                Cancel
              </Button>
            </Link>
          </Box>
        </Box>
        <Divider sx={{ mt: 5 }} />
      </FormProvider>
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          mt={0}
        >
          <Grid item xs={10}>
            <Typography
              my={2}
              variant="body2"
              sx={{
                color: "#344054",
                m: "2.7em 0 1.2em 0",
                display: "flex",
                fontWeight: "600",
              }}
            >
              Permissions
            </Typography>
            <Typography my={2} variant="subtitle2">
              Every user must be assigned to a permission level-basic, job admin
              or site admin. Then, within each user, you can edit the specific
              permissions to control what they ll be able to view and what
              actions they can take.
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={assignPermissions}
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              Resign Permissions
            </Button>
          </Grid>
        </Grid>

        <Box
          mt={2}
          sx={{
            backgroundColor: theme?.palette?.background?.default,
            padding: "3rem",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              my={2}
              variant="body2"
              sx={{
                color: "#344054",
                display: "flex",
              }}
            >
              Job Admin
            </Typography>
            <Button type="submit" variant="contained">
              Add job-base permissions
            </Button>
          </Box>
          {toggleForPermissions && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexWrap: "wrap" }}
            >
              {permissionsDisplay(assignedPermissions)}
            </Box>
          )}

          <Box
            sx={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: "4px",
              padding: "1.2rem 1.2rem ",
            }}
          >
            <Typography
              my={1}
              variant="body2"
              sx={{
                color: "#344054",
                fontWeight: "600",
                display: "inline",
              }}
            >
              Job Admin :
            </Typography>
            <span style={{ color: theme?.palette?.primary?.main }}>
              Standard
            </span>
            <Typography
              variant="body2"
              sx={{
                width: "fit-content",
                fontSize: "small",
                padding: "1px 5px",
                borderRadius: "5px",
                color: theme?.palette?.success?.dark,
                backgroundColor: theme?.palette?.success?.lightest,
              }}
            >
              3 Current jobs
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ fontWeight: "600", display: "inline" }}
          >
            Note :
          </Typography>
          <Typography variant="body2" sx={{ display: "inline" }}>
            You can only assign a user role that has no greater permissions than
            what you on that job.{" "}
            <Typography
              variant="body2"
              sx={{
                display: "inline",
                color: theme?.palette?.primary?.main,
                fontWeight: 600,
              }}
            >
              What are my roles?
            </Typography>
          </Typography>
        </Box>

        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <LoadingButton
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              Save Permissions
            </LoadingButton>

            <Button sx={{ marginLeft: "10px" }} size="small" variant="outlined">
              Cancel
            </Button>
          </Box>

          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant="subtitle2">
                Notify user of new permissions via email
              </Typography>
            }
          />
        </Box>
      </Box>
    </Stack>
  );
}
const StyledBackLink = styled(Link)(() => ({
  color: "#7A5AF8",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  margin: "20px 0px",
}));
