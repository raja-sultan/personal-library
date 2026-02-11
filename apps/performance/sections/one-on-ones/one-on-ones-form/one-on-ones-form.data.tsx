// import dayjs from "dayjs";
import dayjs from "dayjs";
import * as Yup from "yup";

export interface OneOnOneFormFields {
  title: string;
  attendeeId: string;
  time?: string;
  startDate?: string;
  endDate?: string;
  frequency?: string;
  locationType?: string;
  path?: string;
  templateId?: string;
  repeatInterval?: string;
  onDayMonth?: string;
  day?: string;
  week?: string;
  weekDay?: string;
  month?: Date;
  weekDays?: [];
};

const validateTime = (value) => {
  const currentTime = dayjs();
  const selectedTime = dayjs(value, 'HH:mm');
  // Allow a tolerance of 1 minute
  return selectedTime.isAfter(currentTime, 'minute');
};


export const oneOnOneFormSchema = Yup.object().shape({
  title: Yup.string().required("Field is required"),
  attendeeId: Yup.string().required("Field is required"),
  time: Yup.string()
    .required('Field is required')
    .test('next-to-current-time', 'Please select a time next to the current time', validateTime),
  startDate: Yup.string()
    .required('Field is required'),
  endDate: Yup.string()
    .required("Field is required")
    .when('startDate', (startDate: any, schema: any) => {
      return schema.test({
        test: (endDate: any) => {
          if (!startDate || !endDate) return true;
          return new Date(endDate) >= new Date(startDate);
        },
        message: 'End date must be greater than or equal to the start date',
      });
    }),

  frequency: Yup.string().required('Field is required'),
  repeatInterval: Yup.string().when("frequency", ([frequency], field) =>
    (frequency === "Does not repeat" || frequency === "Daily") ? field.optional() : field.required("Field is required")
  ),
  weekDays: Yup.array().test('frequency', 'Field is required', function (value, field) {
    const frequency = field.parent.frequency;
    if (frequency === "Does not repeat" || frequency === "Daily" || frequency === 'Yearly') {
      return true;
    }
    return value && value.length > 0;
  }),
  month: Yup.date().optional(),
  onDayMonth: Yup.string().optional(),
  locationType: Yup.string().optional(),
  path: Yup.string().required("Field is required")
});

export const defaultValues: OneOnOneFormFields = {
  title: "",
  attendeeId: "",
  time: '',
  startDate: "",
  endDate: "",
  frequency: "Does not repeat",
  repeatInterval: '',
  onDayMonth: 'onDay',
  day: '1',
  week: 'First',
  weekDay: 'monday',
  month: new Date(),
  locationType: "Virtual",
  path: '',
  templateId: "",
  weekDays: [],
};

export const frequencyOptions = [
  {
    value: "Does not repeat",
    label: "Does not repeat",
  },
  {
    value: "Every weekday(Mon-Fri)",
    label: "Every Weekday (Mon-fri)",
  },
  {
    value: "Daily",
    label: "Daily",
  },
  {
    value: "Weekly",
    label: "Weekly",
  },
  {
    value: "Monthly",
    label: "Monthly",
  },
  {
    value: "Yearly",
    label: "Yearly",
  },
];

export const daysList = [
  {
    id: "sunday",
    value: 0,
    label: "S",
  },
  {
    id: "monday",
    value: 1,
    label: "M",
  },
  {
    id: "tuesday",
    value: 2,
    label: "T",
  },
  {
    id: "wednesday",
    value: 3,
    label: "W",
  },
  {
    id: "thursday",
    value: 4,
    label: "T",
  },
  {
    id: "friday",
    value: 5,
    label: "F",
  },
  {
    id: "saturday",
    value: 6,
    label: "S",
  },
];

export const weekDaysList = [
  {
    label: 'Monday',
    value: "monday",
  },
  {
    label: "Tuesday",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    value: "wednesday",
  },
  {
    label: "Thursday",
    value: "thursday",
  },
  {
    label: "Friday",
    value: "friday",
  }
]

export const onTheList = [
  { value: 'First', label: 'First' },
  { value: 'Second', label: 'Second' },
  { value: 'Third', label: 'Third' },
]