// import { fData } from "common";
import * as Yup from "yup";

// const maxFileSize = 2 * 1000 * 1000; // 2 Mb
// const fileFormats = [
//   "image/jpg",
//   "image/jpeg",
//   "image/gif",
//   "image/png",
//   "video/mp4",
// ];

export const formSchema = Yup.object().shape({
  companyName: Yup.string()
  .required('Company Name is required')
  .max(50, 'Company Name must be at most 50 characters')
  .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Company Name must contain only alphabets with spaces allowed only between words'),

  companySize: Yup.string().required("Field is required"),

  image: Yup.mixed()
    .nullable()
    .test("required", "Image is is required", (value: any) => Boolean(value)),
  // .test(
  //   "fileFormat",
  //   "Unsupported Format",
  //   (value: any) => value && fileFormats.includes(value.type)
  // )
  // .test(
  //   "fileSize",
  //   `File must be less than or equal to ${fData(maxFileSize)}`,
  //   (value: any) => value && value.size <= maxFileSize
  // ),

  contactNumber: Yup.string()
  .required('Phone is required')
  .min(7, 'Minimum length is 7 digits.')
  .max(15, 'Maximum length is 15 digits.'),

  website: Yup.string().required('url is required'),

  missionStatement: Yup.string()
  .required('Mission Statement is required')
  .max(300, 'Mission Statement must be at most 300 characters')
  .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Mission Statement must contain only alphabets with spaces allowed only between words'),


  emailDomain: Yup.string()
    .required('Email Domain is required')
    .max(30, 'Email Domain must be at most 30 characters'),

  timeZone: Yup.string().required("Field is required"),
  currency: Yup.string().required("Field is required"),
})
