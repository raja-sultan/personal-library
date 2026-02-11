import * as Yup from "yup";

export const formSchema = Yup.object().shape({
    currentDepartment: Yup.string().notRequired(),
    promotionDepartment: Yup.string().required("Field is required"),
    currentTitle: Yup.string().notRequired(),
    promotionTitle: Yup.string().required("Field is required"),
    currentJobLevel: Yup.string().notRequired(),
    promotionJobLevel: Yup.string().required("Field is required"),
    currentLocation: Yup.string().notRequired(),
    promotionLocation: Yup.string().required("Field is required"),
});