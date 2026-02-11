import styled from "@emotion/styled";
import { MentionsInput } from "react-mentions";

export const StyledMentionedField = styled(MentionsInput)(({ theme }) => ({
  "&__control": {
    backgroundColor: theme.palette.background.paper,
    fontSize: 14,
    fontWeight: "normal",
  },
  "&__highlighter": {
    padding: 9,
    border: "1px solid transparent",
  },

  strong: {
    padding: 2,
    borderRadius: "6px",
  },
  "&--multiLine": {
    minHeight: "150px",
  },
  "&__input": {
    padding: 9,
    border: "1px solid silver",
    borderRadius: "8px",
    display: "none",

    color:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.neutral[900],
    "&:focus": {
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  },

  "&__suggestions": {
    height: "120px",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    "&__list": {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "4px",
      border: `1px solid ${theme.palette.primary.main}`,
      fontSize: 14,
      height: "160px",
      overflowY: "auto",
    },
    "&__item": {
      padding: "5px 15px",
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      borderRadius: "4px",
      "&--focused": {
        // backgroundColor: `${theme.palette.neutral[700]}`,
        color:
          theme.palette.mode === "dark"
            ? theme.palette.neutral[800]
            : theme.palette.neutral[800],
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.common.white
            : theme.palette.neutral[100],
      },
    },
  },
}));
