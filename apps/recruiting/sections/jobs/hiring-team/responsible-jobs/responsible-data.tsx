import * as Yup from "yup";

export const hiringTeamFormSchema = Yup.object().shape({
  hiringManagers: Yup.mixed().required("Field is required"),
});
