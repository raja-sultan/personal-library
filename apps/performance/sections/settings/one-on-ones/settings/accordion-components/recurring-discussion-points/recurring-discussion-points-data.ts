import type { DefaultData } from "./recurring-discussion-points-type";
import * as Yup from "yup";

export const recurringDiscussionsPointsSchema = Yup.object().shape({
  discussionPoint: Yup.string().trim().required("Field is required"),
});

export const defaultData = (args): DefaultData => {
  return {
    discussionPoint: args?.discussionPoint,
  };
};
