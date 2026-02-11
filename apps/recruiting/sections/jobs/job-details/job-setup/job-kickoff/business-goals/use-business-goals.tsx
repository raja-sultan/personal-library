import { useUpdateJobKickOffMutation } from "@services/jobs/create-jobs/job-kickoff/job-kickoff-api";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

export function useBusinessSetUp({
  modalData,
  setShowBusinessModal,
}: any): any {
  const [currentlyEdited, setCurrentlyEdited] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const handleEditQuestion = (index: number): void => {
    setCurrentlyEdited(index);
    setIsEditing(true);
  };

  const handleSaveQuestion = (): void => {
    setCurrentlyEdited(null);
    setIsEditing(false);
  };

  const [updateJobKickOff] = useUpdateJobKickOffMutation();

  const methods = useForm({
    defaultValues: {
      name: modalData?.section?.name ?? "",
      description: modalData?.section?.description ?? "",
      questions: modalData?.section?.questions ?? [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "questions",
  });
  const onSubmitHandler = handleSubmit(async (data) => {
    const formData = {
      section: data,
    };
    try {
      const res: any = await updateJobKickOff({
        formData: { kickoff: formData },
        jobId,
      });
      toast.success(res?.data?.message ?? `Update Successfully!`);
      setShowBusinessModal(false);
    } catch (error) {
      toast.error(error?.data?.message ?? "Something went wrong");
    }
  });

  return {
    currentlyEdited,
    fields,
    isEditing,
    methods,
    isSubmitting,
    prepend,
    remove,
    handleEditQuestion,
    handleSaveQuestion,
    onSubmitHandler,
  };
}
