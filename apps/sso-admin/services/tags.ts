export const USERS = "USERS";
export const AUDIT_LOGS = "AUDIT_LOGS";
export const BACK_UP = "BACK_UP";
export const UserManagementTag = "UserManagement";
export const CompanyManagementTag = "CompanyManagement";
export const SSO_PROFILE = "SSO_PROFILE";
export const NOTIFICATIONS_ACCOUNT = "NOTIFICATIONS_ACCOUNT";

export const TAGS = [
  USERS,
  AUDIT_LOGS,
  BACK_UP,
  UserManagementTag,
  CompanyManagementTag,
  SSO_PROFILE,
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
