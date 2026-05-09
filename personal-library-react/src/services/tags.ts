export const USERS = "USERS";
export const SSO_PROFILE = "SSO_PROFILE";
export const ONBOARDING_PROFILE = "ONBOARDING_PROFILE";
export const DEPARTMENT_API = "DEPARTMENT_API";
export const ESIGNATURE_API = "ESIGNATURE_API";
export const FIELD_REPORTS = "FIELD_REPORTS";
export const PARTY_TASK = "PARTY_TASK";
export const LOCATIONS = "LOCATIONS";
export const BRANDED_ASSETS = "BRANDED_ASSETS";
export const OTHER_CRITERIA = "OTHER_CRITERIA";
export const ONBOARDING_TASKS = "ONBOARDING_TASKS";
export const FIELD_API = "FIELD_API";
export const NEW_HIRING = "NEW_HIRING";
export const PAGES = "PAGES";
export const PERMISSIONS = "PERMISSIONS";

export const TAGS = [
  USERS,
  SSO_PROFILE,
  DEPARTMENT_API,
  FIELD_REPORTS,
  BRANDED_ASSETS,
  PARTY_TASK,
  ESIGNATURE_API,
  OTHER_CRITERIA,
  ONBOARDING_TASKS,
  FIELD_API,
  NEW_HIRING,
  PAGES,
  PERMISSIONS,
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
