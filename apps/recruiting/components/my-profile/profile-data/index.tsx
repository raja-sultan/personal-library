import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "./profile-form.data";

export function ProfileData(props: any): JSX.Element {
  const { data } = props;

 

  const profileData = {
    personalInfo: [
      {
        label: "First Name",
        value: capitalizeFirstLetter(data?.firstName ?? "---"),
      },
      {
        label: "Last Name",
        value: capitalizeFirstLetter(data?.lastName ?? "---"),
      },
      {
        label: "Pronouns",
        value: capitalizeFirstLetter(data?.pronouns ?? "---"),
      },
      { label: "Personal Email", value: data?.email },
      { label: "Phone Number", value: data?.contactNumber },
      {
        label: "Date of Birth",
        value: dayjs(data?.dob).format("DD/MM/YYYY"),
      },
      { label: "Gender", value: capitalizeFirstLetter(data?.gender ?? "---") },
      { label: "Ethnicity", value: data?.ethnicity },
      {
        label: "Marital Status",
        value: capitalizeFirstLetter(data?.maritalStatus ?? "---"),
      },
    ],
    addressDetails: [
      {
        label: "Address",
        value: capitalizeFirstLetter(data?.address?.addressLine ?? "---"),
      },
      {
        label: "Country",
        value: capitalizeFirstLetter(data?.address?.country ?? "---"),
      },
      {
        label: "City",
        value: capitalizeFirstLetter(data?.address?.city ?? "---"),
      },
      {
        label: "State",
        value: capitalizeFirstLetter(data?.address?.state ?? "---"),
      },
      { label: "Zip Code", value: data?.address?.zipCode },
    ],
    workInfo: [
      { label: "Employee ID", value: data?.employeeId },
      { label: "Work Email", value: data?.workEmail },
      {
        label: "Start Date",
        value: dayjs(data?.createdAt).format("DD/MM/YYYY"),
      },
      {
        label: "Title",
        value: capitalizeFirstLetter(data?.employeeTitle ?? "---"),
      },
      {
        label: "Department",
        value: capitalizeFirstLetter(data?.department?.departmentName ?? "---"),
      },
      {
        label: "Manager",
        value: `${capitalizeFirstLetter(
          data?.manager?.firstName ?? "---"
        )} ${capitalizeFirstLetter(data?.manager?.lastName ?? "---")}`,
      },
      {
        label: "Location",
        value: capitalizeFirstLetter(data?.location?.address ?? "---"),
      },
      {
        label: "Employment Status",
        value: capitalizeFirstLetter(data?.employmentStatus ?? "---"),
      },
      {
        label: "Job Level",
        value: capitalizeFirstLetter(data?.jobLevel ?? "---"),
      },
    ],
    emergencyContact: [
      {
        label: "First Name",
        value: capitalizeFirstLetter(
          data?.emergencyContact?.firstName ?? "---"
        ),
      },
      {
        label: "Last Name",
        value: capitalizeFirstLetter(data?.emergencyContact?.lastName ?? "---"),
      },
      { label: "Email", value: data?.emergencyContact?.email },
      {
        label: "Phone Number",
        value: data?.emergencyContact?.phone,
      },
      {
        label: "Relationship",
        value: capitalizeFirstLetter(
          data?.emergencyContact?.relationship ?? "---"
        ),
      },
    ],
  };
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Personal Info</Typography>
      </Grid>
      {profileData.personalInfo.map((item) => {
        return (
          <Grid
            item
            sm={4}
            xs={6}
            key={item.value}
            sx={{ pl: { md: 5, xs: 1 } }}
          >
            <Typography variant="body2" fontWeight={600}>
              {item.label}
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.disabled">
              {item.value}
            </Typography>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Address Detail</Typography>
      </Grid>
      {profileData.addressDetails.map((item) => {
        return (
          <Grid
            item
            sm={4}
            xs={6}
            key={item.value}
            sx={{ pl: { md: 5, xs: 1 } }}
          >
            <Typography variant="body2" fontWeight={600}>
              {item.label}
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.disabled">
              {item.value}
            </Typography>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Work Information</Typography>
      </Grid>
      {profileData.workInfo.map((item) => {
        return (
          <Grid
            item
            sm={4}
            xs={6}
            key={item.value}
            sx={{ pl: { md: 5, xs: 1 } }}
          >
            <Typography variant="body2" fontWeight={600}>
              {item.label}
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.disabled">
              {item.value}
            </Typography>
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Emergency Contact</Typography>
      </Grid>
      {profileData.emergencyContact.map((item) => {
        return (
          <Grid
            item
            sm={4}
            xs={6}
            key={item.value}
            sx={{ pl: { md: 5, xs: 1 } }}
          >
            <Typography variant="body2" fontWeight={600}>
              {item.label}
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.disabled">
              {item.value}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
