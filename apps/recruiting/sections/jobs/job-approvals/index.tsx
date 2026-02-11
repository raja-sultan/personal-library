import { JobApprovalSec } from "./job-approval-sec";
import { JobApprovalContextProvider } from "./use-job-approval-context";

export function JobApproval({
  nextStepHandler,
  previousStepHandler,
}: any): JSX.Element {
  return (
    <JobApprovalContextProvider nextStepHandler={nextStepHandler}>
      <JobApprovalSec previousStepHandler={previousStepHandler} />
    </JobApprovalContextProvider>
  );
}
