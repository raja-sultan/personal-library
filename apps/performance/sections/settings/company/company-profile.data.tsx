import React from "react";
import {
  RHFCheckbox,
  RHFTelInput,
  RHFTextField,
  RHFUploadSingleFileWithPreview,
} from "common";
import type { companyDefaultValues } from "./company-profile.types";
import { Typography } from "@mui/material";


export const defaultValues: companyDefaultValues = {
  companyName: "",
  companySize: "",
  contactNumber: "+44",
  website: "",
  missionStatement: "",
  emailDomain: "",
  timeZone: "",
  currency: "",
  limitInvite: false,
  image: null,
};

const companySizeOptions = [
  { value: "1-40", label: "1-40" },
  { value: "41-75", label: "41-75" },
  { value: "76-250", label: "76-250" },
  { value: "251-1000", label: "251-1000" },
  { value: "1000+", label: "1000+" },
];

const timezoneOptions = [
  {
    value: "UTC (Coordinated Universal Time)",
    label: "Coordinated Universal Time (UTC)",
  },
  { value: "GMT (Greenwich Mean Time)", label: "Greenwich Mean Time (GMT)" },
  {
    value: "EST (Eastern Standard Time)",
    label: "Eastern Standard Time (EST)",
  },
  {
    value: "CST (Central Standard Time)",
    label: "Central Standard Time (CST)",
  },
  {
    value: "MST (Mountain Standard Time)",
    label: "Mountain Standard Time (MST)",
  },
  {
    value: "PST (Pacific Standard Time)",
    label: "Pacific Standard Time (PST)",
  },
];

const currencyOptions = [
  { value: "USD", label: "United States Dollar (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
  { value: "GBP", label: "British Pound Sterling (GBP)" },
  { value: "AUD", label: "Australian Dollar (AUD)" },
  { value: "CAD", label: "Canadian Dollar (CAD)" },
  { value: "JPY", label: "Japanese Yen (JPY)" },
  { value: "CNY", label: "Chinese Yuan (CNY)" },
  { value: "INR", label: "Indian Rupee (INR)" },
  { value: "KRW", label: "South Korean Won (KRW)" },
  { value: "SGD", label: "Singapore Dollar (SGD)" },
  { value: "HKD", label: "Hong Kong Dollar (HKD)" },
  { value: "CHF", label: "Swiss Franc (CHF)" },
  { value: "SEK", label: "Swedish Krona (SEK)" },
  { value: "RUB", label: "Russian Ruble (RUB)" },
  { value: "TRY", label: "Turkish Lira (TRY)" },
];

export const companyFormData = [
  {
    id: "0",
    componentProps: {
      name: "image",
      outerLabel: "Logo",
      accept: {
        "image/jpeg": [".jpeg", ".png"],
      },
      type: "image",
    },
    Component: RHFUploadSingleFileWithPreview,
  },
  {
    id: "1",
    componentProps: {
      name: "companyName",
      outerLabel: "Company Name",
      placeholder: "Enter company name",
    },
    Component: RHFTextField,
  },
  {
    id: "2",
    componentProps: {
      name: "companySize",
      select: true,
      InputProps: {
        placeholder: "Select",
      },
      SelectProps: {
        placeholder: "Select",
      },
      outerLabel: <>Company Size</>,
    },
    options: companySizeOptions,
    Component: RHFTextField,
  },
  {
    id: "3",
    companyLocation: true,
  },
  {
    id: "4",
    componentProps: {
      name: "contactNumber",
      defaultCountry: "GB",
      outerLabel: <>Contact</>,
    },
    Component: RHFTelInput,
  },
  {
    id: "5",
    componentProps: {
      name: "website",
      outerLabel: "Website",
      placeholder: "www.dummy.com",
      InputProps: {
        startAdornment: (
          <Typography mr={1.5} fontSize={14} fontWeight={500}>
            http://
          </Typography>
        ),
      },
    },
    Component: RHFTextField,
  },
  {
    id: "6",
    componentProps: {
      name: "missionStatement",
      outerLabel: <>Mission Statement</>,
      minRows: 3,
      multiline: true,
    },
    Component: RHFTextField,
  },
  {
    id: "7",
    componentProps: {
      name: "emailDomain",
      outerLabel: "Enter Domain",
      placeholder: "Enter domain",
    },
    Component: RHFTextField,
  },
  {
    id: "8",
    componentProps: {
      name: "timeZone",
      select: true,
      InputProps: {
        placeholder: "Enter time zone",
      },
      SelectProps: {
        placeholder: "Enter time zone",
      },
      outerLabel: <>Time Zone</>,
    },
    options: timezoneOptions,
    Component: RHFTextField,
  },
  {
    id: "9",
    componentProps: {
      name: "currency",
      select: true,
      InputProps: {
        placeholder: "Select",
      },
      SelectProps: {
        placeholder: "Select",
      },
      outerLabel: <>Currency</>,
    },
    options: currencyOptions,
    Component: RHFTextField,
  },
  {
    id: "10",
    componentProps: {
      name: "limitInvite",
      label: "Limit invites to @orcalo.co.uk?",
    },
    helperText: "Disallow invites going to emails outside your company domains",
    Component: RHFCheckbox,
  },
];
