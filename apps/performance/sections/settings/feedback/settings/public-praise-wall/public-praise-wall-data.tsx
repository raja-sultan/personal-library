import { FeedBackSettingProgressIcon } from '@assets/icons';

interface marks { value: number, label: JSX.Element | string, }[]
interface options { value: number, label: string, }[]

export const marks: marks[] = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 5,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 10,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 15,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 20,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 25,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 30,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 35,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 40,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 45,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 50,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },
  {
    value: 55,
    label: <FeedBackSettingProgressIcon sx={{ color: "primary.main" }} />,
  },

  {
    value: 60,
    label: '60',
  },
];
export const options: options[] =
  [
    { value: 7, label: "Last 7 days" },
    { value: 15, label: "Last 15 days" },
    { value: 30, label: "Last 30 days" },
  ]