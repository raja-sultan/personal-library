"use client";

import React from "react";

function ComponentTyped(): JSX.Element {
  return <div>ComponentTyped</div>;
}

export default ComponentTyped;

// import { Button, Stack } from "@mui/material";
// import { useLazyUsersQuery } from "@services/json-placeholder-api";
// import React from "react";
// import { useForm } from "react-hook-form";
// import {
//   RHFAutocompleteAsync,
//   RHFTextField,
//   RHFRadioGroup,
//   RHFCheckbox,
//   RHFMultiCheckbox,
//   RHFDatePicker,
//   RHFDateTimePicker,
//   RHFAutocompleteSync,
//   RHFSwitch,
//   RHFTimePicker,
// } from "common";

// interface FormValues {
//   firstName: string;
//   testAsyncSelect: JsonUser | null;
//   testAsyncSelectMulti: JsonUser[] | null;
//   testSyncSelect: { value: string; label: string } | null;
//   testSyncSelectMulti: { value: string; label: string }[] | null;
//   checkbox: boolean;
//   radioTest: string;
//   checkboxMulti: string[];
//   datePicker: Date;
//   dateTimePicker: Date;
//   timePicker: Date;
//   testSwitch: boolean;
// }

// function Page(): JSX.Element {
//   const { control, handleSubmit } = useForm<FormValues>({
//     defaultValues: {
//       firstName: "test name",
//       testAsyncSelect: null,
//       testAsyncSelectMulti: [],
//       testSyncSelect: null,
//       testSyncSelectMulti: [],
//       radioTest: "test",
//       checkbox: false,
//       checkboxMulti: ["test-2"],
//       datePicker: new Date(),
//       dateTimePicker: new Date(),
//       timePicker: new Date(),
//       testSwitch: true,
//     },
//   });
//   const [trigger, { data, isLoading, isError, isSuccess, isFetching }] =
//     useLazyUsersQuery();
//   const onSubmit = handleSubmit((formData) => {
//     console.log(formData);
//   });

//   return (
//     <form onSubmit={onSubmit}>
//       <Stack sx={{ maxWidth: 300, gap: 2, mt: 2, ml: 2 }}>
//         {/* Textfield */}
//         <RHFTextField<FormValues>
//           name="firstName"
//           label="First Name"
//           type="password"
//           control={control}
//           readOnly={false}
//           variant="outlined"
//         />
//         {/* Auto complete Asynchronous */}
//         <RHFAutocompleteAsync<FormValues, JsonUser>
//           multiple
//           name="testAsyncSelectMulti"
//           queryKey="id"
//           control={control}
//           label="Async complete Multi"
//           options={data ?? []}
//           apiState={{ isLoading, isError, isSuccess, isFetching }}
//           trigger={trigger}
//         />
//         <RHFAutocompleteAsync<FormValues, JsonUser>
//           name="testAsyncSelect"
//           queryKey="id"
//           control={control}
//           label="Async complete"
//           options={data ?? []}
//           apiState={{ isLoading, isError, isSuccess, isFetching }}
//           trigger={trigger}
//         />
//         {/* Auto complete Synchronous */}
//         <RHFAutocompleteSync<
//           FormValues,
//           { id: number; value: string; name: string }
//         >
//           id="test auto complete"
//           label="Sync complete"
//           name="testSyncSelect"
//           control={control}
//           options={[
//             { id: 1, name: "test", value: "test" },
//             { id: 2, name: "pest", value: "pest" },
//           ]}
//         />
//         <RHFAutocompleteSync<
//           FormValues,
//           { id: number; value: string; name: string }
//         >
//           multiple
//           id="test-auto-complete-multi"
//           label="Sync complete Multi"
//           name="testSyncSelectMulti"
//           control={control}
//           options={[
//             { id: 1, name: "test", value: "test" },
//             { id: 2, name: "pest", value: "pest" },
//           ]}
//         />
//         {/* Radio group  */}
//         <RHFRadioGroup<FormValues, { label: string; value: string }>
//           name="radioTest"
//           options={[
//             { label: "test", value: "test" },
//             { label: "test 2", value: "test-2" },
//           ]}
//           control={control}
//         />
//         {/* Checkbox*/}
//         <RHFCheckbox<FormValues>
//           name="checkbox"
//           control={control}
//           label="Testing checkbox"
//         />
//         <RHFMultiCheckbox<FormValues, { label: string; value: string }>
//           name="checkboxMulti"
//           options={[
//             { label: "test", value: "test" },
//             { label: "test 2", value: "test-2" },
//           ]}
//           control={control}
//         />
//         {/* Date Picker */}
//         <RHFDatePicker<FormValues>
//           name="datePicker"
//           label="Current Date"
//           control={control}
//         />
//         {/* Date and Time Picker */}
//         <RHFDateTimePicker<FormValues>
//           name="dateTimePicker"
//           label="Current Date Time"
//           control={control}
//         />
//         {/* Time Picker */}
//         <RHFTimePicker<FormValues>
//           name="timePicker"
//           label="Current Time"
//           control={control}
//         />

//         {/* Switch */}
//         <RHFSwitch<FormValues>
//           name="testSwitch"
//           label="Switch"
//           control={control}
//         />
//         <Button variant="contained" type="submit">
//           Submit
//         </Button>
//       </Stack>
//     </form>
//   );
// }

// export default Page;
