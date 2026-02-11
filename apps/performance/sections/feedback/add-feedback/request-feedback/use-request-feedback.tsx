import { useRouter, useSearchParams } from "next/navigation";
import type { RequestFeedback } from "@sections/feedback/add-feedback/request-feedback/request-feedback-types";
import { formSchema } from "@sections/feedback/add-feedback/request-feedback/request-feedback-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues } from "@sections/feedback/add-feedback/request-feedback/request-feedback-data";
import toast from "react-hot-toast";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { useGetSettingsCompanyDetailsQuery } from "@services/settings/company/company-details";
import { useAddFeedbackMutation } from "@services/feedbacks/feedbacks.api";
import { Box, Typography } from "@mui/material";

export function useRequestFeedback({ backPath }): RequestFeedback {
  const { data: employeeData } = useGetReferenceDataLookupQuery({
    search: "",
    type: "employees",
  });

  const [addFeedback, { isLoading }] = useAddFeedbackMutation();
  const { data: companyData } = useGetSettingsCompanyDetailsQuery({});

  const companyValue = companyData?.data?.permittedFeedbackTypes;

  const companyDetails =
    (companyValue &&
      Object.keys(companyValue).filter((key) => companyValue[key] === true)) ||
    null;

  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const companyValues = (companyDetails || []).map((item) => ({
    label: capitalizeFirstLetter(item),
    value: capitalizeFirstLetter(item),
  }));

  const radioOptionCaptions = {
    Public: "All Employees will see this Feedback",
    Private: "Only You will see this Feedback",
    Private_and_manager: "Only Employee and his Manager will see this Feedback",
    Manager: "Only Manger will See this Feedback",
  };

  function transformValue(label: string, value: string): string {
    if (label === "Private_and_manager") {
      const words = value.split("_");
      const transformedValue = words.join(" + ").replace(" + and + ", " + ");
      const capitalizedValue = transformedValue
        .split(" + ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" + ");
      return capitalizedValue;
    }
    return value;
  }

  const transformedOptions = companyValues.map((option: { label: string, value: string }) => ({
    label: (
      <Box>
        <Typography mb="-7px" variant="subtitle1">
          {option?.label}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {radioOptionCaptions[option?.label]}
        </Typography>
      </Box>
    ),
    value: transformValue(option?.label, option?.value),
  }));

  const router = useRouter();
  const redirectTo = Boolean(useSearchParams().get('redirectTo'));

  const methods = useForm<any>({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  async function onSubmit(formData: any): Promise<void> {
    const data = {
      feedbackSenderId: [formData.askFeedback.id],
      feedbackReceiverId: [formData.aboutFeedback.id],
      feedbackVisibility: formData.addType,
      requesterFeedbackText: formData.yourFeedback,
      feedbackType: "Request Feedback",
      question: [formData?.feedbackPrompt],
    };
    await addFeedback(data)
      .unwrap()
      .then(() => {
        toast.success("Feedback created successfully.");
        router.push(backPath ?? '/feedback');
      })
      .catch((error) => {
        toast.error(error?.data?.message);;
      });
  }

  return {
    onSubmit,
    handleSubmit,
    router,
    methods,
    employeeData,
    transformedOptions,
    watch,
    redirectTo,
    isLoading
  };
}
