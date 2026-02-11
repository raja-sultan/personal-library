import * as Yup from "yup";
import type { referralDetails } from "./referral-details.types";

export const schema = Yup.object({
  workHistory: Yup.string().required("required"),
  relationship: Yup.string().required("required"),
  rating: Yup.string().required("required"),
  reachout: Yup.string().required("required"),
  beingRefered: Yup.string().required("required"),
  referalNotes: Yup.string().required("required"),
});

export const defaultValues: referralDetails = {
  workHistory: "",
  relationship: "",
  rating: "",
  reachout: "",
  beingRefered: "",
  referalNotes: "",
};
