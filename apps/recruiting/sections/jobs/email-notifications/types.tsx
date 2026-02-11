interface ListItemData {
  id: number;
  mainTitle: string;
  category: {
    subTitle: string;
    link: string;
    description: string;
    reminder: string;
  }[];
}
export const emailNotificationsData: ListItemData[] = [
  {
    id: 1,
    mainTitle: `Scorecard Notifications`,
    category: [
      {
        subTitle: "Scorecard Reminders",
        description:
          "Customize the time and frequency that scorecard reminders are sent to interviewers.",
        reminder: "First Reminder: 1 hour after interview",
        link: "/configuration/notification",
      },
      {
        subTitle: "New Scorecards",
        description:
          "Email select team members when a new scorecard is submitted with a summary of submitted and outstanding scorecards for the selected stage.",
        reminder: "No participants added",
        link: "/configuration/notification",
      },
    ],
  },
  {
    id: 2,
    mainTitle: `Candidate Notifications`,
    category: [
      {
        subTitle: "New Applicants",
        description:
          "For each new candidate that applies to this job, emails will be sent to these participants:.",
        reminder: "No participants added",
        link: "/configuration/notification",
      },
      {
        subTitle: "New Internal Applicants",
        description:
          "For each new internal candidate that applies to this job, emails will be sent to these participants:",
        reminder: "No participants added",
        link: "/configuration/notification",
      },
      {
        subTitle: "New Referrals",
        description:
          "For each new referral added to this job, emails will be sent to:",
        reminder: "No participants added",
        link: "/configuration/notification",
      },
      {
        subTitle: "New Agency Submissions",
        description:
          "For each new agency submission added to this job, emails will be sent to:",
        reminder: "No participants added",
        link: "/configuration/notification",
      },
    ],
  },
  {
    id: 2,
    mainTitle: `Approval Notifications`,
    category: [
      {
        subTitle: "Approved to Start Recruiting",
        description:
          "For each job that is fully approved to start recruiting, emails will be sent to:",
        reminder: "No participants added",
        link: "/configuration/notification",
      },
      {
        subTitle: "Offer Fully Approved",
        description:
          "For each candidate offer that is fully approved, emails will be sent to:",
        reminder: "No participants added",
        link: "/configuration/notification",
      },
    ],
  },
  {
    id: 2,
    mainTitle: `Other Notifications`,
    category: [
      {
        subTitle: "Weekly Recruiting Report",
        description:
          "Weekly recruiting report emails will be sent to these participants:",
        reminder: "No participants added",
        link: "/configuration/notification",
      },
      {
        subTitle: "Stage Transitions",
        description:
          "Automate internal communication to select team members when a candidate transitions into a specific stage.",
        reminder: "No participants added",
        link: "/configuration/notification",
      },
    ],
  },
];
