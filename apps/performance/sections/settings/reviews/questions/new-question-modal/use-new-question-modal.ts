import { useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { useAddQuestionnairesMutation } from "@services/settings/review/questions-api";
import { useEditQuestionnairesMutation } from "@services/settings/review/questions-api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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
  questionRequired: any;
  handleQuestionRequiredChange: any;
  allowComment: any;
  handleAllowCommentChange: any;
  selectedNumber?: any;
}

const QuestionSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  type: Yup.string().required("Description is required"),
  options: Yup.array().of(Yup.string()).required("Options are required"),
  ratingType: Yup.string(),
  questionRequired: Yup.boolean().required("Allow comment is required"),
  allowComment: Yup.boolean().required("Allow comment is required"),
});

export function useNewQuestionModal(
  handleClose,
  isEdit,
  tableId,
  singleData
): ReturnType {
  const [response, setResponse] = useState(
    isEdit ? singleData[0].type : "RATING"
  );
  const [rating, setRating] = useState(
    isEdit ? singleData[0].ratingType : "TEXT"
  );
  const [questionRequired, setQuestionRequired] = useState(
    isEdit ? singleData[0].questionRequired : false
  );
  const [allowComment, setAllowComment] = useState(
    isEdit ? singleData[0].allowComment : false
  );
  const [options, setOptions] = useState<string[]>(
    isEdit ? singleData[0].options : []
  );

  const selectedNumber = [1, 2, 3, 4, 5];
  const [addQuestions] = useAddQuestionnairesMutation();
  const [editQuestion] = useEditQuestionnairesMutation();

  const methods = useForm({
    resolver: yupResolver(QuestionSchema),
    defaultValues: {
      description: isEdit ? singleData[0].description : "",
      type: response,
      options,
      ratingType: rating,
      questionRequired,
      allowComment,
    },
  });
  function handleResponseChange({
    target: { value },
  }: SelectChangeEvent): void {
    setResponse(value);
    setOptions([]);
  }


  const handleRatingChange = (event: SelectChangeEvent): void => {
    const { value } = event.target;
    setRating(value);
    if (value === "NUMBER") {
      // Convert selectedNumber to string array when rating is "NUMBER"
      setOptions(selectedNumber.map(num => String(num)));
    } else {
      setOptions([]);
    }
  };

  const handleQuestionRequiredChange = () => {
    setQuestionRequired(!questionRequired);
  };

  const handleAllowCommentChange = () => {
    setAllowComment(!allowComment);
  };

  function handleInputChange(): void {}

  const { handleSubmit } = methods;

  const onSubmit = async (formData: any): Promise<void> => {
    const { ...rest } = formData;

    const newData = {
      ...rest,
      type: response,
      options,
      ratingType: rating,
      questionRequired,
      allowComment,
    };

    try {
      if (!isEdit) {
        await addQuestions(newData).unwrap();
        toast.success(`Question Added successfully`);
      } else {
        await editQuestion({ id: tableId, ...newData }).unwrap();
        toast.success(`Question Edited successfully`);
      }
      handleClose();
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

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
    // handleRatingNumberChange,
    questionRequired,
    handleQuestionRequiredChange,
    allowComment,
    handleAllowCommentChange,
    selectedNumber
  };
}
