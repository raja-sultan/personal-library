export const USERS = "USERS";
export const DEPARTMENTS = "DEPARTMENTS";
export const PROFILE = "PROFILE";
export const GOALS_CYCLE = "GOALS_CYCLE";
export const RESOURCES = "RESOURCES";
export const PERMISSIONS = "PERMISSIONS";
export const TEMPLATES = "TEMPLATES";
export const ONE_ON_ONES_TEMPLATES = "ONE_ON_ONES_TEMPLATES";
export const ONE_ON_ONES_LOGS = "ONE_ON_ONES_LOGS";
export const REFERENCE_DATA = "REFERENCE_DATA";
export const GROUPS = "GROUPS";
export const LOCATIONS = "LOCATIONS";
export const FEEDBACKLOGS = "FEEDBACKLOGS";
export const USER_REVIEW = "USER_REVIEW";
export const EMPLOYEES = "EMPLOYEES";
export const EMPLOYEE_PAY = "EMPLOYEE_PAY";
export const REVIEW_CYCLE = "REVIEW_CYCLE";
export const FEEDBACKS = "FEEDBACKS";
export const GOALS = "GOALS";
export const COMPENSATION_CYCLE = "COMPENSATION_CYCLE";
export const FEEDBACKSETTINGS = "FEEDBACKSETTINGS";
export const COMPENSATION_BANDS = "COMPENSATION_BANDS";
export const COMPENSATION_BAND_MEMBERS = "COMPENSATION_BAND_MEMBERS";
export const ONE_ON_ONES = "ONE_ON_ONES";
export const DASHBOARD = "DASHBOARD";
export const COMPENSATED_EMPLOYEE = "COMPENSATED_EMPLOYEE";
export const COMPENSATION_CYCLE_VIEW_DETAILS =
  "COMPENSATION_CYCLE_VIEW_DETAILS";
export const COMPENSATED_EMPLOYEES = "COMPENSATED_EMPLOYEES";
export const REPORTS = "REPORTS";
export const DIRECTORY = "DIRECTORY";
export const REPORTS_FEEDBACK = "REPORTS_FEEDBACK";
export const ONE_ON_ONE_FEEDBACK = "ONE_ON_ONE_FEEDBACK";
export const UPDATES_SETTINGS = "UPDATES_SETTINGS";
export const SKILLS = "SKILLS";
export const PLANS = "PLANS";
export const UPDATES = "UPDATES";
export const UPDATES_LOG = "UPDATES_LOG";
export const QUESTIONNAIRES = "QUESTIONNAIRES";
export const CAREER_SKILLS = "CAREER_SKILLS";
export const  CAREER_PERMISSIONS = " CAREER_PERMISSIONS";
export const  CAREER_VISION = " CAREER_VISION";
export const  MYTEAMUPDATES = " MYTEAMUPDATES";
export const MY_TEAMS = "MY_TEAMS";
export const NOTIFICATION = "NOTIFICATION";

export const TAGS = [
  USERS,
  DEPARTMENTS,
  PROFILE,
  GOALS_CYCLE,
  RESOURCES,
  PERMISSIONS,
  TEMPLATES,
  ONE_ON_ONES_TEMPLATES,
  ONE_ON_ONES_LOGS,
  REFERENCE_DATA,
  GROUPS,
  LOCATIONS,
  EMPLOYEES,
  EMPLOYEE_PAY,
  REVIEW_CYCLE,
  USER_REVIEW,
  EMPLOYEES,
  FEEDBACKS,
  GOALS,
  COMPENSATION_CYCLE,
  COMPENSATION_BANDS,
  COMPENSATION_BAND_MEMBERS,
  ONE_ON_ONES,
  DASHBOARD,
  REPORTS,
  ONE_ON_ONE_FEEDBACK,
  COMPENSATED_EMPLOYEE,
  COMPENSATION_CYCLE_VIEW_DETAILS,
  DIRECTORY,
  REPORTS_FEEDBACK,
  PLANS,
  CAREER_SKILLS,
  UPDATES,
  UPDATES_SETTINGS,
  SKILLS,
  CAREER_PERMISSIONS,
  CAREER_VISION,
  MYTEAMUPDATES,
  MY_TEAMS,
  NOTIFICATION
];

export const generateTags = (result: any, TAG: string) => {
  return result
    ? [
        ...result.map(({ _id }: any) => ({
          type: TAG,
          id: _id,
        })),
        { type: TAG, id: "LIST" },
      ]
    : [{ type: TAG, id: "LIST" }];
};

export const generateSingleTag = (result: any, TAG: string) => {
  return result
    ? [
        {
          type: TAG,
          id: result._id,
        },
      ]
    : [{ type: TAG, id: "LIST" }];
};
