"use client";

import React, { useState } from "react";
import { Box, Button, Checkbox, Stack, Switch, TextField, Typography, Radio } from "@mui/material";
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
} from "common";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomPopover from "@components/popover";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { toast } from "react-hot-toast";
import { useLazyUsersQuery } from "@services/json-placeholder-api";
import CustomCard from "@components/custom-card";
import CustomModal from "@components/custom-modal";
import { LoginIcon } from "@assets/icons";

const phoneNumberSchema = Yup.string()
  .required("Phone number is required")
  .test(
    "isValidPhoneNumber",
    "Invalid phone number",
    (value) => !value || isValidPhoneNumber(value)
  );

const MAX_FILE_SIZE = 2 * 1000 * 1000; // 2 Mb
const FILE_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png", "video/mp4"];

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
  checkbox: Yup.boolean().test("is checked", "Must agree with this", (value) => value === true),
  tel: Yup.string().required("Phone is required").min(7, "Invalid Phone number"),
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
    },
  });

  const apiQuery = useLazyUsersQuery();

  const { handleSubmit } = methods;

  const onSubmit = (formData: any): any => {
    formData;
  };

  const [openSimpleModal, setOpenSimpleModal] = useState(false);
  const handleOpenSimpleModal = (): void => {
    setOpenSimpleModal(!openSimpleModal);
  };
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const handleOpenCustomModal = (): void => {
    setOpenCustomModal(!openCustomModal);
  };
  const [openModalWithComponent, setOpenModalWithComponent] = useState(false);
  const handleModalWithCustomComponent = (): void => {
    setOpenModalWithComponent(!openModalWithComponent);
  };
  // popover state
  const [popoverOpen, setPopoverOpen] = useState(false);
  //popover mock data
  const popOverData = [
    {
      id: "1",
      label: "First Popover",
    },
    {
      id: "2",
      label: "Second Popover",
    },
    {
      id: "3",
      label: "Third Popover",
    },
  ];

  const handleItemClick = (item: any): void => {
    item;
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
          <Typography variant={variant}>this is typography with variant {variant}</Typography>
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
          <RHFTextField name="firstName" outerLabel="First Name" placeholder="First Name" />
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
            outerLabel="Async autocomplete"
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
          <RHFPhoneField name="phoneField" outerLabel="phone field" defaultCountry="pk" />

          {/* Phone Input with Country Initials */}
          <RHFPhoneInput name="phoneNumber" outerLabel="Phone Number" />

          {/* Dropzone for input files*/}
          <RHFUploadSingleFileWithPreview
            name="image"
            accept={{ "image/*": [], "video/*": [] }}
            type="image"
          />

          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </FormProvider>
      {/* Custom telephone input */}

      {/* Custom card wrapper with header, subHeader and children */}
      <CustomCard
        header
        cardHeader={{
          title: "this is simple card with title and back btn",
          // onBack: () => {
          //   alert("alert");
          // },
        }}
      />
      <br />
      <CustomCard
        subHeader
        cardSubHeader={{
          title: "This is simple card with title,description and header children ",
          description:
            "Shape a better experience with your valuable feedback and manage it seamlessly",
          // subHeaderChildren: (
          //   <>
          //     <Button variant="outlined">Go</Button>
          //     <Button variant="outlined">Go to Team</Button>
          //     <Button variant="outlined">Go FeedBack</Button>
          //     <Button variant="outlined">Go to Team FeedBack</Button>
          //   </>
          // ),
        }}
      />
      <br />
      <CustomCard
        header
        cardHeader={{
          title: "this is title",
          description:
            "Shape a better experience with your valuable feedback and manage it seamlessly",
          divider: true,
        }}
        subHeader
        cardSubHeader={{
          title: "this is title",
          description: "this is description",
        }}
      />
      <br />
      <CustomCard
        header
        cardHeader={{
          title: "this is title",
          description:
            "Shape a better experience with your valuable feedback and manage it seamlessly",
          divider: true,
          // onBack: () => {
          //   alert("alert");
          // },
        }}
      >
        Card Child
      </CustomCard>

      {/* default custom-modal is delete modal just need to change message if any */}
      <Box my={3}>
        <Button variant="contained" onClick={handleOpenSimpleModal}>
          Click to open simple modal box
        </Button>
      </Box>
      <CustomModal
        open={openSimpleModal}
        onClose={handleOpenSimpleModal}
        // message='other message'
      />
      <Button variant="contained" onClick={handleOpenCustomModal}>
        Click to open custom modal box
      </Button>
      <CustomModal
        // maxWidth="lg"
        open={openCustomModal}
        onClose={handleOpenCustomModal}
        message="This is message"
        title="this is title"
        headerIcon={<LoginIcon />}
        acceptText="Submit"
        onAccept={() => {
          "this is accept function";
        }}
        acceptButtonProps={{ color: "primary" }}
      >
        <Box>
          this is children
          <TextField fullWidth placeholder="text field" label="textfield" />
        </Box>
      </CustomModal>

      <br />
      <br />
      <Button variant="contained" onClick={handleModalWithCustomComponent}>
        Click to open custom modal box with custom component
      </Button>
      <CustomModal
        // maxWidth="lg"
        open={openModalWithComponent}
        onClose={handleModalWithCustomComponent}
        message="This is message"
        title="this is title"
        headerIcon={<LoginIcon />}
        rejectText="this is cancel text"
        onReject={handleModalWithCustomComponent}
        customAcceptComponent={<Button variant="text">this is custom button </Button>}
      >
        <Box>modal with custom accept component and cancel function</Box>
      </CustomModal>

      <Box mb={3} mt={3}>
        <Button
          variant="contained"
          onClick={() => {
            setPopoverOpen(true);
          }}
        >
          Open Popover
        </Button>
        <br />
        <CustomPopover
          isOpen={popoverOpen}
          handleClose={() => {
            setPopoverOpen(false);
          }}
          data={popOverData}
          onItemClick={handleItemClick}
        />

        {/* custom table with header and subheader */}
        <CustomTableWithHeader
          key="demo table"
          primaryHeader
          primaryHeaderProps={{
            title: "this is title and also render ReactNode if require ",
            description: "this is description and also render ReactNode if require ",
            actions: <>children will render here</>,
          }}
          secondaryHeader
          secondaryHeaderProps={{
            handleSearch: (value: string) => {
              value;
            },
            searchDelayTime: 2000, //default delay is 1500
            searchProps: {}, //if any need to pass
            actions: <>children will render here</>,
          }}
          tableProps={{
            // props same as used in global table
            columns: [],
            data: [],
          }}
        />
      </Box>
    </>
  );
}

export default Components;
