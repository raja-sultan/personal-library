import * as Yup from "yup";

export const otpVerificationInitialValue = {
  fieldOne: "",
  fieldTwo: "",
  fieldThree: "",
  fieldFour: "",
};
export const otpVerificationSchema: any = Yup.object().shape({
  fieldOne: Yup.string().required(""),
  fieldTwo: Yup.string().required(""),
  fieldThree: Yup.string().required(""),
  fieldFour: Yup.string().required(""),
});
