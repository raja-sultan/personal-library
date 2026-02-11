import { BlankJobIcon, SampleJobIcon, ExistingJobIcon } from "@assets/jobs";
import type { JobTypes } from "./create-job.types";

export const createJob: JobTypes[] = [
  {
    id: 1,
    icon: <ExistingJobIcon />,
    title: "Copy an Existing Job",
    description: `Use an existing job as a template & customize as needed.\n(Includes the job’s  scorecard attributes, interview plan & other details)`,
    route: "/existing-jobs",
  },
  {
    id: 2,
    icon: <SampleJobIcon />,
    title: "Sample Job",
    description: `Use a sample Personnel Library template & customized as needed.\n(Includes generic scorecard attributes & interview plan)`,
    route: "/create-job?sample_job",
  },
  {
    id: 3,
    icon: <BlankJobIcon />,
    title: "Blank Job",
    description: `Use a blank template to create your job from scratch`,
    route: "/create-job?blank_job",
  },
];
