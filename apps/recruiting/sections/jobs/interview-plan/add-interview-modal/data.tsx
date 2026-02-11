import type { SwitchProps } from "@mui/material";
import { Switch, styled } from "@mui/material";
import { ApplicationReview } from "./components/application-review";
import { FocusAttribute } from "./components/focus-attributes";
import { InterviewPrep } from "./components/interview-prep";
import type { AddInterviewSwitchComponentTypes } from "./types";
import { InterviewQuestion } from "./components/interview-q";

export const switchComponentData = ({
  scoreCardAttributes,
  loadingAttr,
  successAttr,
  errorAttr,
  methods,
}: any): AddInterviewSwitchComponentTypes[] => [
  {
    id: "1",
    name: "applicationReview",
    heading: ` Determine the focus attributes of your interview and what questions the interviewer will ask.`,
    label: "Application Review",
    component: <ApplicationReview />,
  },
  {
    id: "2",
    name: "focusAttributes",
    heading: `Select the attributes that you want interviewers to focus on during this interview. Selected attributes will be highlighted on the scorecard.`,
    label: "Focus Attributes",
    component: (
      <FocusAttribute
        scoreCardAttributes={scoreCardAttributes}
        loadingAttr={loadingAttr}
        successAttr={successAttr}
        errorAttr={errorAttr}
      />
    ),
  },
  {
    id: "3",
    name: "interviewQuestion",
    heading: `Determine the focus attributes of your interview and what questions
                    the interviewer will ask.`,
    label: "Interview Question",
    component: <InterviewQuestion method={methods} />,
  },
  {
    id: "4",
    name: "interviewPrep",
    heading: `Provide context to your team about this interview’s purpose and any guidelines you’d like interviewers to follow.`,
    label: "Interview Prep",
    component: <InterviewPrep />,
  },
];

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.background.default,
      // theme.palette.mode === "light"
      //   ? theme.palette.grey[100]
      //   : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
