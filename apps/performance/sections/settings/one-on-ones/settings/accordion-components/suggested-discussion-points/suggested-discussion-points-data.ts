import type { DefaultData } from "./suggested-discussion-points-type";
import * as Yup from "yup";

export const suggestedDiscussionsPointsSchema = Yup.object().shape({
  category: Yup.string().required().required(),
  discussionPoint: Yup.string().required(),
});

export const defaultData = (args): DefaultData => {
  return {
    category: args.category,
    discussionPoint: args.discussionPoint,
  };
};
