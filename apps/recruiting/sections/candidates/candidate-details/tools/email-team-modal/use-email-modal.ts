import { useLazyGetEmailTemplatesQuery } from "@services/candidate/candidate-details/tools/email-team-api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSendEmailMutation } from "@services/send-email-api";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { schema, defaultValues } from "./email-modal.schema";
import { useGetJobCandidateQuery } from "@services/jobs/job-details/pipeline-api";
import { useSearchParams } from "next/navigation";

export function useEmailTeamModal(setCandidate: any): any {
  //POST API for email team
  const [sendEmailHandler] = useSendEmailMutation();
  //Email Templates GET Api
  const emailTemplates = useLazyGetEmailTemplatesQuery();
  const params = useSearchParams();

  const { data: jobDetails } = useGetJobCandidateQuery({
    candidateId: params.get("candidateID"),
  });

  const candidateEmail = jobDetails?.data?.info?.email?.emailAddress;

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues, recipients: candidateEmail },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const extendedCC = data.ccMe
      ? [...data.ccRecipients, data.from]
      : [...data.ccRecipients];

    let profileLink = "";

    if (data.candidateProfile) {
      profileLink = `<p>${`https://recruiting-dev.personnellibrary.co.uk/my-profile`}</p>`;
    }

    const body = {
      template: data.template.template_name,
      recipients: data.recipients,
      ccRecipients: extendedCC,
      subject: data.subject,
      html: data.html + profileLink,
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
    emailTemplates,
  };
}
