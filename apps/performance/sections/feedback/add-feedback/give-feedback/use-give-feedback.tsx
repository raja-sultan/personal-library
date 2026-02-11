import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GiveFeedback } from "@sections/feedback/add-feedback/give-feedback/give-feedback-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues } from "@sections/feedback/add-feedback/give-feedback/give-feedback-data";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { useAddFeedbackMutation } from "@services/feedbacks/feedbacks.api";
import toast from "react-hot-toast";
import { useSelector } from "@store";
import { useGetSettingsCompanyDetailsQuery } from "@services/settings/company/company-details";
import { formSchema } from "@sections/feedback/add-feedback/give-feedback/give-feedback-schema";
import { Box, Typography } from "@mui/material";

export function useGiveFeedback({ backPath }): GiveFeedback {
  const router = useRouter();

  const { user } = useSelector((state: any) => state.auth);

  const [addFeedback, { isLoading }] = useAddFeedbackMutation();

  const { data: employeeData } = useGetReferenceDataLookupQuery({
    search: "",
    type: "employees",
  });
  const { data: companyData } = useGetSettingsCompanyDetailsQuery({});
  const companyValue = companyData?.data?.permittedFeedbackTypes;
  const companyDetails =
    (companyValue &&
      Object.keys(companyValue).filter((key) => companyValue[key] === true)) ||
    null;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const options = (companyDetails || []).map((item) => ({
    label: capitalizeFirstLetter(item),
    value: capitalizeFirstLetter(item),
  }));

  const radioOptionCaptions = {
    Public: "All Employees will see this Feedback",
    Private: "Only You will see this Feedback",
    Private_and_manager: "Only Employee and his Manager will see this Feedback",
    Manager: "Only Manger will See this Feedback",
  };

  function transformValue(label, value) {
    if (label === "Private_and_manager") {
      const words = value.split('_');
      const transformedValue = words.join(' + ').replace(' + and + ', ' + ');
      const capitalizedValue = transformedValue.split(' + ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' + ');
      return capitalizedValue;
    }
    return value;
  }

  const transformedOptions = options.map(option => ({
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

  const methods = useForm<any>({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleReaction = (title: string): void => {
    setSelectedEmoji(title);
  };

  async function onSubmit(formData: any): Promise<void> {
    const receiverIds = Array.isArray(formData?.feedbackReceiverId)
      ? formData.feedbackReceiverId.map((obj) => obj.id)
      : [];
    const senderId = user?.userId;
    const data = {
      feedbackReceiverId: receiverIds,
      feedbackVisibility: formData.feedbackVisibility,
      senderFeedbackText: formData.senderFeedbackText,
      rating: selectedEmoji,
      feedbackType: "Give Feedback",
      feedbackSenderId: [senderId],
    };
    await addFeedback(data)
      .unwrap()
      .then(() => {
        toast.success("Feedback created successfully.");
        router.push(backPath ?? '/feedback');
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  }

  return {
    onSubmit,
    handleSubmit,
    router,
    methods,
    selectedEmoji,
    handleReaction,
    employeeData,
    transformedOptions,
    isLoading,
  };
}
