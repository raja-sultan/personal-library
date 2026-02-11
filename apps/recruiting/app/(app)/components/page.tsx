"use client";

import React from "react";
import {
  Button,
  Checkbox,
  Stack,
  Switch,
  Typography,
  Radio,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { usePhoneValidation } from "react-international-phone";

import { isValidPhoneNumber } from "react-phone-number-input";

import {
  RHFAutocompleteAsync,
  RHFTextField,
  RHFRadioGroup,
  RHFCheckbox,
  RHFMultiCheckbox,
  RHFDatePicker,
  RHFDateTimePicker,
  RHFAutocompleteSync,
  RHFSwitch,
  RHFTimePicker,
  FormProvider,
  RHFEditor,
  RHFTelInput,
  RHFPhoneInput,
  RHFUploadSingleFileWithPreview,
  fData,
  RHFPhoneField,
  RHFUploadSingleFileWithoutPreview,
} from "common";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useLazyUsersQuery } from "@services/json-placeholder-api";

const phoneNumberSchema = Yup.string()
  .required("Phone number is required")
  .test(
    "isValidPhoneNumber",
    "Invalid phone number",
    (value) => !value || isValidPhoneNumber(value)
  );

const MAX_FILE_SIZE = 2 * 1000 * 1000; // 2 Mb
const FILE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "video/mp4",
];

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Full name is required")
    .min(6, "Mininum 6 characters")
    .max(15, "Maximum 15 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be of minimum 6 characters length"),
  testAsyncSelect: Yup.object()
    .nullable()
    .test("check null", "This field is required", (value) => value !== null),
  testAsyncSelectMulti: Yup.array()
    .min(1, "Select atleast one option")
    .required("This test async multi is required."),
  testSyncSelect: Yup.object()
    .nullable()
    .test("check null", "This field is required", (value) => value !== null),
  testSyncSelectMulti: Yup.array()
    .min(1, "Select atleast one option")
    .required("This test sync multi is required."),
  checkboxMulti: Yup.array()
    .min(1, "Select atleast one option")
    .of(Yup.string().required("This test async multi is required."))
    .required("This test async multi is required."),
  datePicker: Yup.date().required("Date picker is required"),
  dateTimePicker: Yup.date().required("DateTime Picker is required"),
  timePicker: Yup.date()
    .nullable()
    .test("check null", "This field is required", (value) => value !== null),
  editor: Yup.string().required("Editor is required").max(200),
  radioTest: Yup.string().required("Select atleast one"),
  testSwitch: Yup.boolean().oneOf([true, false], "Must be true or false."),
  checkbox: Yup.boolean().test(
    "is checked",
    "Must agree with this",
    (value) => value === true
  ),
  tel: Yup.string()
    .required("Phone is required")
    .min(7, "Invalid Phone number"),
  phoneField: Yup.string()
    .required("Phone is required")
    .test(
      "verify phone number",
      "invalid phone number",
      (value) => usePhoneValidation(value).isValid
    ),
  phoneNumber: phoneNumberSchema,
  image: Yup.mixed()
    .nullable()
    .test("required", "Image is is required", (value: any) => Boolean(value))
    .test(
      "fileFormat",
      "Unsupported Format",
      (value: any) => value && FILE_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      `File must be less than or equal to ${fData(MAX_FILE_SIZE)}`,
      (value: any) => value && value.size <= MAX_FILE_SIZE
    ),
  fileWithoutPrevious: Yup.mixed()
    .nullable()
    .test("required", "File is is required", (value: any) => {
      return Boolean(value);
    }),
});

function Components(): JSX.Element {
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      firstName: "",
      password: "",
      testAsyncSelect: null,
      testAsyncSelectMulti: [],
      testSyncSelect: null,
      testSyncSelectMulti: [],
      radioTest: "",
      checkbox: false,
      checkboxMulti: [],
      datePicker: new Date(),
      dateTimePicker: new Date(),
      timePicker: null,
      testSwitch: true,
      editor: "",
      tel: "+44",
      phoneField: "+92",
      phoneNumber: "",
      image: null,
      fileWithoutPrevious: null,
    },
  });

  const apiQuery = useLazyUsersQuery();

  const { handleSubmit } = methods;

  const onSubmit = (formData: any): any => {
    console.log(formData);
  };

  return (
    <>
      {[
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body1",
        "body2",
        "subtitle1",
        "subtitle2",
        "caption",
        "button",
        "overline",
      ].map((variant: any) => (
        <div key={variant}>
          <Typography variant={variant}>
            this is typography with variant {variant}
          </Typography>
        </div>
      ))}
      <Button variant="contained" size="small">
        this is small btn
      </Button>
      <Button variant="contained" size="medium">
        this is medium btn
      </Button>
      <Button variant="contained" color="warning" size="large">
        this is large btn
      </Button>
      <Switch />
      <Checkbox />
      <Radio />
      <Button
        variant="contained"
        size="large"
        onClick={() => toast.success("this is success toast")}
      >
        Click to open toast
      </Button>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ maxWidth: 400, gap: 2, mt: 2, mx: "auto" }}>
          {/* Textfield */}
          <RHFTextField
            name="firstName"
            outerLabel="First Name"
            placeholder="First Name"
          />
          <RHFTextField
            type="password"
            name="password"
            outerLabel="Password"
            placeholder="Password"
          />
          {/* Auto complete Asynchronous */}
          <RHFAutocompleteAsync
            multiple
            name="testAsyncSelectMulti"
            queryKey="id"
            outerLabel="Async autocomplete Multi"
            placeholder="Async autocomplete Multi"
            apiQuery={apiQuery}
          />
          <RHFAutocompleteAsync
            name="testAsyncSelect"
            queryKey="id"
            placeholder="Async autocomplete"
            apiQuery={apiQuery}
          />
          {/* Auto complete Synchronous */}
          <RHFAutocompleteSync
            name="testSyncSelect"
            outerLabel="Sync autocomplete"
            placeholder="Sync autocomplete"
            options={[
              { id: 1, name: "test", value: "test" },
              { id: 2, name: "pest", value: "pest" },
            ]}
          />
          <RHFAutocompleteSync
            multiple
            name="testSyncSelectMulti"
            outerLabel="Sync autocomplete Multi"
            placeholder="Sync autocomplete Multi"
            options={[
              { id: 1, name: "test", value: "test" },
              { id: 2, name: "pest", value: "pest" },
            ]}
          />
          <RHFEditor name="editor" />
          {/* Radio group  */}
          <RHFRadioGroup
            name="radioTest"
            options={[
              { label: "test", value: "test" },
              { label: "test 2", value: "test-2" },
            ]}
          />
          {/* Checkbox*/}
          <RHFCheckbox name="checkbox" label="Testing checkbox" />
          <RHFMultiCheckbox
            name="checkboxMulti"
            options={[
              { label: "test", value: "test" },
              { label: "test 2", value: "test-2" },
            ]}
          />
          {/* Date Picker */}
          <RHFDatePicker name="datePicker" label="Current Date" />
          {/* Date and Time Picker */}
          <RHFDateTimePicker name="dateTimePicker" label="Current Date Time" />
          {/* Time Picker */}
          <RHFTimePicker name="timePicker" label="Current Time" />
          {/* Switch */}
          <RHFSwitch name="testSwitch" label="Switch" />
          {/* Phone */}
          <RHFTelInput name="tel" defaultCountry="GB" focusOnSelectCountry />
          {/* phone field updated */}
          <RHFPhoneField
            name="phoneField"
            outerLabel="phone field"
            defaultCountry="pk"
          />
          {/* Phone Input with Country Initials */}
          <RHFPhoneInput name="phoneNumber" outerLabel="Phone Number" />
          {/* Dropzone for input files*/}
          <RHFUploadSingleFileWithPreview
            name="image"
            accept={{ "image/*": [], "video/*": [] }}
            type="image"
          />

          {/* File upload without preview */}
          <RHFUploadSingleFileWithoutPreview
            label="Attach Resume"
            name="fileWithoutPrevious"
            accept="image/*"
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}

export default Components;
