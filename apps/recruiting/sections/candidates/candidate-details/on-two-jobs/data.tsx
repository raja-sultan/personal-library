import { PeopleOperationsCoordinator } from "./people-operations-coordinator";
import CandidatesDetailsProspect from "./prospect";
import type { accordionTypes } from "./types";

export const accordionData: accordionTypes[] = [
  {
    id: 1,
    title: "People Operations Coordinator",
    subTitle: "Application Review (5 Days)",
    component: <PeopleOperationsCoordinator />,
  },
  {
    id: 2,
    title: "Data Analyst",
    subTitle: "Application Review (9 Days)",
    component: "Data Analyst",
  },
  {
    id: 3,
    title: "Prospect",
    subTitle: "Application Review (9 Days)",
    component: <CandidatesDetailsProspect />,
  },
];
