import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import {
  useGetScoreCardQuery,
  usePutAttributesMutation,
} from "@services/jobs/create-jobs/score-card/score-card-api";
import { defaultValues, schema } from "./score-card.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export const useScoreCard = (): any => {
  const [toggleSave, setToggleSave] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [showReplacement, setShowReplacement] = useState<boolean>(true);
  const [getId, setGetId] = useState<string>("");

  const searchParams = useSearchParams();
  const jobsId = searchParams.get("jobId");
  const editText = searchParams.get("action");

  const { data, isLoading, isError } = useGetScoreCardQuery({
    jobId: jobsId,
  });

  const [postAttributes] = usePutAttributesMutation();

  //ScoreCard Data
  const scoreCardData = data?.data?.scorecard;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  const onSubmit = handleSubmit(async (response: any, id) => {
    const payload = {
      jobId: jobsId,
      categoryId: id,
      body: response,
    };
    try {
      const { message } = await postAttributes(payload).unwrap();
      toast.success(message || "Attribute Added Successfully");
      setOpenCategory(false);
      reset({
        attributes: [""],
      });
    } catch (error) {
      const errMsg = error?.data?.message;
      toast.error(errMsg || "Error Occurred");
    }
  });

  function handleAddAttribute(itemId: any): void {
    setGetId(itemId);
    append("");
    setToggleSave(true);
  }

  //Handle Cross Icon
  function crossIconHandler(index: any): void {
    remove(index);
    if (fields.length - 1) {
      setToggleSave(true);
    } else {
      setToggleSave(false);
    }
  }

  return {
    handleSubmit,
    crossIconHandler,
    handleAddAttribute,
    onSubmit,
    toggleSave,
    methods,
    fields,
    open,
    setOpen,
    openCategory,
    setOpenCategory,
    showReplacement,
    setShowReplacement,
    isLoading,
    scoreCardData,
    isError,
    isSubmitting,
    getId,
    setGetId,
    editText,
  };
};
