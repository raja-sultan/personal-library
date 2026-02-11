import type { SignUpFormTypes } from "./sign-up-form.types";
import * as Yup from "yup";

export const signUpInitialValue: SignUpFormTypes = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  allowedCompany: ["PERFORMANCE"],
  companyName: null,
  companySize: "",
  country: "",
  companyNo: "",
  companyAddress: "",
  postalCode: "",
};

export const personalDetailSchema: any = Yup.object().shape({
  firstName: Yup.string().required("Invalid Entry"),

  lastName: Yup.string().required("Invalid Entry"),
  email: Yup.string().email().required("Invalid Entry"),
  contactNumber: Yup.string()
    .required("Invalid Entry")
    .min(7, "Invalid Phone number"),
});

export const companyDetailOneSchema: any = Yup.object().shape({
  companyName: Yup.object()
    .nullable()
    .test("check null", "This field is required", (value) => value !== null),
  companySize: Yup.string().required("Invalid Entry"),
  country: Yup.string().required("Invalid Entry"),
});

export const companyDetailTwoSchema: any = Yup.object().shape({
  companyNo: Yup.string()
    .test(
      "companyNumber-match",
      "Field does not match with company number",
      function companyNumberMatch(value) {
        const companyNumberInObject = this.parent.companyName?.company_number;
        if (companyNumberInObject && value === companyNumberInObject) {
          return true;
        }
        return false;
      }
    )
    .required("This field is required"),
  companyAddress: Yup.string().required("Invalid Entry"),
  postalCode: Yup.string()
    .test(
      "companyPostalCode-match",
      "Field does not match with company postal code",
      function postalCodeMatch(value) {
        const companyPostalCodeInObject =
          this.parent.companyName?.registered_office_address.postal_code;
        if (
          companyPostalCodeInObject &&
          value?.toLocaleLowerCase() ===
            companyPostalCodeInObject?.toLocaleLowerCase()
        ) {
          return true;
        }
        return false;
      }
    )
    .required("This field is required"),
});
