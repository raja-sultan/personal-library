import { EmailModal } from "@sections/jobs/job-details/pipe-line/app-review/email-modal";

export function EmailCandidateModal(props): JSX.Element {
  const { email, setEmail } = props;

  return email && <EmailModal email={email} setEmail={setEmail} />;
}
