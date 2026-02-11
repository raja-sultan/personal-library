import { StatsIcon } from "@assets/jobs/stats-icon";

interface ListDataTypes {
  id: number;
  title: string;
  description: string;
  list: {
    id: number;
    list: string;
    route: string;
    icon: any;
  }[];
}
export const reportsListViewData: ListDataTypes[] = [
  {
    id: 1,
    title: "Stay on top of Current Recruiting Activity",
    description: `Access the progress of your company's current hiring process`,
    list: [
      {
        id: 1,
        list: "Current Pipeline Per Job",
        route: "/reports/essential-reports/pipeline-per-job",
        icon: <StatsIcon />,
      },
      {
        id: 2,
        list: "Interviewing Activity",
        route: "/reports/essential-reports/interviewing-activity",
        icon: <StatsIcon />,
      },
      {
        id: 3,
        list: "Department Summary",
        route: "/reports/essential-reports/department-summary",
        icon: "",
      },
    ],
  },
  {
    id: 2,
    title: "Manage Expectations with Hiring Managers",
    description: `Proactively update your hiring managers on the status of each job`,
    list: [
      {
        id: 1,
        list: "Application Over Time",
        route: "/reports/essential-reports/application-time",
        icon: "",
      },
      {
        id: 2,
        list: "New Candidates by Source",
        route: "/reports/essential-reports/candidate-source",
        icon: <StatsIcon />,
      },
    ],
  },
  // {
  //   id: 3,
  //   title: "Access Your Prospecting Efforts (CRM)",
  //   description: `Measure the effectiveness of your sources and sourcing strategies`,
  //   list: [
  //     {
  //       id: 1,
  //       list: "Prospect Pool Activity",
  //       route: "/reports/essential-reports/pool-activity",
  //       icon: "",
  //     },
  //     {
  //       id: 2,
  //       list: "Prospecting Activity",
  //       route: "/reports/essential-reports/prospecting-activity",
  //       icon: <StatsIcon />,
  //     },
  //     {
  //       id: 3,
  //       list: "Prospect Conversion",
  //       route: "/reports/essential-reports/prospect-conversion",
  //       icon: "",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   title: "Run Your Own Analysis",
  //   description: `Review raw data to form your analysis`,
  //   list: [
  //     {
  //       id: 1,
  //       list: "All Jobs Summary",
  //       route: "/reports/essential-reports/job-summary",
  //       icon: "",
  //     },
  //     {
  //       id: 2,
  //       list: "Scorecard Feedback",
  //       route: "/reports/essential-reports/scorecard-feedback",
  //       icon: "",
  //     },
  //   ],
  // },
];
