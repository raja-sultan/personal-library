import { useRouter } from "next/navigation";
import type { giveFeedback } from "@sections/feedback/add-feedback/private-note/private-note-types";
import { formSchema } from "@sections/feedback/add-feedback/private-note/private-note-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { defaultValues } from "@sections/feedback/add-feedback/private-note/private-note-data";
import { useSelector } from "@store";
import toast from "react-hot-toast";
import { useGetReferenceDataLookupQuery } from "@services/reference-data/reference-api";
import { useAddFeedbackMutation } from "@services/feedbacks/feedbacks.api";

export function usePrivateNote({ backPath }): giveFeedback {
  const router = useRouter();

  const { user } = useSelector((state: any) => state.auth);

  const { data: employeeData } = useGetReferenceDataLookupQuery({
    search: "",
    type: "employees",
  });
  const [addFeedback, { isLoading }] = useAddFeedbackMutation();

  const methods = useForm<any>({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  async function onSubmit(formData): Promise<void> {
    const receiverIds = Array.isArray(formData?.aboutFeedback)
      ? formData.aboutFeedback.map((obj) => obj.id)
      : [];

    const senderId = user?.userId;
    const data = {
      feedbackReceiverId: receiverIds,
      senderFeedbackText: formData.yourFeedback,
      feedbackType: "Private Note",
      feedbackSenderId: [senderId],
      feedbackVisibility: "Private",
    };
    await addFeedback(data)
      .unwrap()
      .then(() => {
        toast.success("Feedback created successfully.");
        router.push(backPath ?? '/feedback');
      })
      .catch(() => {
        toast.error("something went wrong!");
      });
  }

  return {
    onSubmit,
    handleSubmit,
    router,
    methods,
    employeeData,
    watch,
    isLoading
  };
}
