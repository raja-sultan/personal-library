import * as Yup from "yup";

export interface ApprovalModalInterface {
  fullName: any[];
  approvers: string;
}
export const defaultValues = {
  fullName: [],
  approvers: "",
};

export const ApprovalModalFormSchema: any = Yup.object().shape({
  fullName: Yup.array()
    .min(1, "Select at least one option")
    .required("This test async multi is required."),
  approvers: Yup.string().trim().required("First Select User"),
});

// export const ApprovalModalValueArray = [
//   {
//     id: 1,
//     componentProps: {
//       name: "user",
//       placeholder: "Select Option",
//       outerLabel: "User",
//       multiple: true,
//       options: [
//         { id: 1, name: "Adam carroll", value: "Adam carroll" },
//         { id: 2, name: "John Doe", value: "John Doe" },
//         { id: 3, name: "Albert", value: "Albert" },
//       ],
//     },
//     component: RHFAutocompleteSync,
//     md: 3,
//   },
//   {
//     id: 2,
//     componentProps: {
//       name: "approvers",
//       outerLabel: "Approvers",
//       placeholder: "Select Option",
//       // multiple: true,
//       options: [
//         { id: 1, label: "1 of 1 required", value: "1 of 1 required" },
//         { id: 2, label: "1 of 2 required", value: "1 of 2 required" },
//         { id: 3, label: "2 of 2 required", value: "2 of 2 required" },
//       ],
//     },
//     component: RHFCustomSelect,
//     md: 3,
//   },
// ];
