import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { schema, defaultValues } from "./email-modal.schema";
import { useGenerateSendEmailMutation } from "@services/candidate/custom-report/custom-report-api";

export function useEmailTeamModal(setCandidate: any): any {
  //POST API for email team
  const [sendEmailHandler] = useGenerateSendEmailMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const extendedCC = [...data.recipients];

    const body = {
      recipients: extendedCC,
      subject: data.subject,
      html: data.text,
    };
    try {
      const res = await sendEmailHandler({
        body,
        emailSendAt: dayjs(data.emailSendAt),
      }).unwrap();
      toast.success(res.data ?? "Email Sent Successfully");
      setCandidate(false);
      reset();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return {
    handleSubmit,
    onSubmit,
    methods,
    reset,
  };
}
