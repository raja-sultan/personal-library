import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { useAddQuestionnairesMutation } from "@services/settings/review/questions-api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

interface ReturnType {
  response?: string;
  handleResponseChange?: (event: SelectChangeEvent) => void;
  rating?: any;
  setRating: any;
  handleRatingChange?: (event: SelectChangeEvent) => void;
  onSubmit?: any;
  handleSubmit?: any;

  handleInputChange?: any;
  methods: any;
  watchType?: any;
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<[]>>;
  handleRatingNumberChange: any;
  questionRequired: any;
  handleQuestionRequiredChange: any;
  allowComment: any;
  handleAllowCommentChange: any;
  selectedNumber: any;
  setSelectedNumber?: React.Dispatch<React.SetStateAction<[]>>;
}

export function useNewQuestionModal(handleClose): ReturnType {
  const [response, setResponse] = useState("RATING");
  const [rating, setRating] = useState("TEXT");
  const [questionRequired, setQuestionRequired] = useState(false);
  const [allowComment, setAllowComment] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<any>([1, 2, 3, 4, 5]);

  const [addQuestions] = useAddQuestionnairesMutation();
  const methods = useForm({
    defaultValues: {
      description: "",
      type: "",
      questionRequired: false,
      allowComment: false,
    },
  });
  function handleResponseChange({
    target: { value },
  }: SelectChangeEvent): void {
    setResponse(value);
    setOptions([]);
  }
  function handleRatingChange({ target: { value } }: SelectChangeEvent): void {
    setRating(value);
  }
  const handleQuestionRequiredChange = (): void => {
    setQuestionRequired(!questionRequired);
  };

  const handleAllowCommentChange = (): void => {
    setAllowComment(!allowComment);
  };

  console.log('selectedNumber', selectedNumber);

  function handleInputChange(): void { }

  function handleRatingNumberChange(value: number): void {
    const selectedNumberArray = Array.from(
      { length: value },
      (_, index) => index + 1
    );
    setSelectedNumber(selectedNumberArray);
  }



  const { handleSubmit } = methods;
  async function onSubmit(formData: any): Promise<void> {
    const { ...rest } = formData;

    await addQuestions({
      ...rest,
      type: response,
      options: rating === "TEXT" ? options : selectedNumber,
      ratingType: rating,
      questionRequired,
      allowComment,
    })
      .unwrap()

      .then((resp) => {
        toast.success(resp?.message);
        handleClose();
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  }

  return {
    response,
    handleResponseChange,
    handleRatingChange,
    onSubmit,
    handleInputChange,
    handleSubmit,
    methods,
    options,
    setOptions,
    rating,
    setRating,
    handleRatingNumberChange,
    questionRequired,
    handleQuestionRequiredChange,
    allowComment,
    handleAllowCommentChange,
    selectedNumber,
  };
}
