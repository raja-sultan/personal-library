import * as Yup from "yup";
import type { rejectModalTypes } from "./reject-modal.types";

export const schema = Yup.object({
  rejectionReason: Yup.string().required("required"),
});

export const defaultValues: rejectModalTypes = {
  rejectionReason: "",
  rejectionNote: "",
  otherReasons: "",
  prospect: false,
  sendEmail: false,
};
