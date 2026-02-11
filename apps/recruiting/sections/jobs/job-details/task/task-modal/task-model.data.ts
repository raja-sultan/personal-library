import {
  RHFAutocompleteAsync,
  RHFCustomSelect,
  RHFDatePicker,
  RHFTextField,
} from "common";
import * as Yup from "yup";

export const taskInitialValue = {
  category: "",
  taskDescription: "",
  assignee: null,
  assigneeId: "652fd272d37762bc3122e796",
  dueDate: new Date(),
};
export const schema: any = Yup.object({
  category: Yup.string().required("Category is required"),
  taskDescription: Yup.string()
    .max(50, "Task Description must be at most 50 characters")
    .required("Task Description is required"),
  assignee: Yup.object().required("Assignee Name is required"),
  dueDate: Yup.date().required("Due date is required"),
});
export const AddTaskFormData = (getAllUsersQuery) => {
  return [
    {
      id: 1,
      componentProps: {
        name: "category",
        outerLabel: "",
        placeholder: " Select Category",
        options: [
          {
            id: 1,
            label: "Need Decision",
            value: "need decision",
          },
          {
            id: 2,
            label: "Forms To Send",
            value: "forms to send",
          },
          {
            id: 3,
            label: "Candidate to Schedule",
            value: "candidate to schedule",
          },
          {
            id: 4,
            label: "Take Home Tests to Send",
            value: "take Home tests to Send",
          },
          {
            id: 5,
            label: "Offers",
            value: "offers",
          },
          {
            id: 6,
            label: "Kickoff from Tasks",
            value: "Kickoff from tasks",
          },
          {
            id: 7,
            label: "In Person Event",
            value: "in person event",
          },
          {
            id: 8,
            label: "Company Marketing",
            value: "company marketing",
          },
          {
            id: 9,
            label: "Agencies",
            value: "agencies",
          },
          {
            id: 10,
            label: "Others",
            value: "Others",
          },
        ],
      },
      component: RHFCustomSelect,
      md: 9,
    },
    {
      id: 2,
      componentProps: {
        name: "taskDescription",
        outerLabel: "Task Description:",
      },
      component: RHFTextField,
      md: 9,
    },
    {
      id: 3,
      componentProps: {
        name: "dueDate",
        outerLabel: "Due Date",
        minDate: new Date(),
      },

      component: RHFDatePicker,
      md: 11,
    },
    {
      id: 4,
      componentProps: {
        name: "assignee",
        outerLabel: "Assignee",
        placeholder: " Select Assignee",
        apiQuery: getAllUsersQuery,
        getOptionLabel: (option: any) => option?.userName,
      },
      component: RHFAutocompleteAsync,
      md: 9,
    },
  ];
};
