export const PERMISSIONS = {
  MENU: {
    id: "menu",
    PERFORMANCE: {
      id: "menu.prf",
      DASHBOARD: {
        id: "menu.prf.dashboard",
        name: "Dashboard",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.dashboard.view",
            name: "View",
          },
        },
      },
      MY_TEAM: {
        id: "menu.prf.my_team",
        name: "My team",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.my_team.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.my_team.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.my_team.delete",
            name: "Delete",
          },
        },
      },
      _1_ON_1S: {
        id: "menu.prf.1_on_1s",
        name: "1-on-1s",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.1_on_1s.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.1_on_1s.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.1_on_1s.delete",
            name: "Delete",
          },
        },
      },
      FEEDBACK: {
        id: "menu.prf.feedback",
        name: "Feedback",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.feedback.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.feedback.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.feedback.delete",
            name: "Delete",
          },
        },
      },
      UPDATES: {
        id: "menu.prf.updates",
        name: "Updates",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.updates.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.updates.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.updates.delete",
            name: "Delete",
          },
        },
      },
      CAREER: {
        id: "menu.prf.career",
        name: "Career",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.career.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.career.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.career.delete",
            name: "Delete",
          },
        },
      },
      GOALS: {
        id: "menu.prf.goals",
        name: "Goals",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.goals.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.goals.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.goals.delete",
            name: "Delete",
          },
        },
      },
      REVIEWS: {
        id: "menu.prf.reviews",
        name: "Reviews",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.reviews.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.reviews.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.reviews.delete",
            name: "Delete",
          },
        },
      },
      COMPENSATION: {
        id: "menu.prf.compensation",
        name: "Compensation",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.compensation.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.compensation.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.compensation.delete",
            name: "Delete",
          },
        },
      },
      REPORTS: {
        id: "menu.prf.reports",
        name: "Reports",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.reports.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.reports.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.reports.delete",
            name: "Delete",
          },
        },
      },
      DIRECTORY: {
        id: "menu.prf.directory",
        name: "Directory",
        PERMISSION: {
          VIEW: {
            id: "menu.prf.directory.view",
            name: "View",
          },
          EDIT: {
            id: "menu.prf.directory.edit",
            name: "Edit",
          },
          DELETE: {
            id: "menu.prf.directory.delete",
            name: "Delete",
          },
        },
      },
    },
    RECRUITING: {
      id: "menu.rct",
    },
    ONBOARDING: {
      id: "menu.onb",
    },
  },
  PERFORMANCE: {
    id: "prf",
    MODULE: {
      id: "prf.module",
      name: "Modules",
      _1_ON_1S: {
        id: "prf.module.1_on_1s",
        name: "1-on-1s",
        _1_ON_1S: {
          id: "prf.module.1_on_1s.1_on_1s",
          name: "1-on-1s",
          PERMISSION: {
            CREATE: {
              id: "prf.module.1_on_1s.1_on_1s.create",
              name: "Create 1-on-1s",
            },
            VIEW: {
              id: "prf.module.1_on_1s.1_on_1s.view",
              name: "View 1-on-1s",
            },
            UPDATE: {
              id: "prf.module.1_on_1s.1_on_1s.update",
              name: "Edit 1-on-1s",
            },
            DELETE: {
              id: "prf.module.1_on_1s.1_on_1s.delete",
              name: "Delete 1-on-1s",
            },
            CANCEL: {
              id: "prf.module.1_on_1s.1_on_1s.cancel",
              name: "Cancel 1-on-1s",
            },
          },
        },
        TEMPLATES: {
          id: "prf.module.1_on_1s.templates",
          name: "Templates",
          PERMISSION: {
            CREATE: {
              id: "prf.module.1_on_1s.templates.create",
              name: "Create 1-on-1 templates",
            },
            VIEW: {
              id: "prf.module.1_on_1s.templates.view",
              name: "View 1-on-1 templates",
            },
            UPDATE: {
              id: "prf.module.1_on_1s.templates.update",
              name: "Edit 1-on-1 templates",
            },
            DELETE: {
              id: "prf.module.1_on_1s.templates.delete",
              name: "Delete 1-on-1 templates",
            },
            DUPLICATE: {
              id: "prf.module.1_on_1s.templates.duplicate",
              name: "Duplicate 1-on-1 templates",
            },
          },
        },
        FOR_TEAM_MEMBERS: {
          id: "prf.module.1_on_1s.for_team_members",
          name: "1-on-1s for team members",
          PERMISSION: {
            CREATE: {
              id: "prf.module.1_on_1s.for_team_members.create",
              name: "Create 1-on-1 for team members",
            },
            VIEW: {
              id: "prf.module.1_on_1s.for_team_members.view",
              name: "View 1-on-1s of your team members",
            },
            UPDATE: {
              id: "prf.module.1_on_1s.for_team_members.update",
              name: "Edit 1-on-1s of your team members",
            },
            DELETE: {
              id: "prf.module.1_on_1s.for_team_members.delete",
              name: "Delete 1-on-1s of your team members",
            },
            CANCEL: {
              id: "prf.module.1_on_1s.for_team_members.cancel",
              name: "Cancel 1-on-1s of your team members",
            },
          },
        },
        FOR_ALL_EMPLOYEES: {
          id: "prf.module.1_on_1s.for_all_employees",
          name: "1-on-1s for all employees",
          PERMISSION: {
            CREATE: {
              id: "prf.module.1_on_1s.for_all_employees.create",
              name: "Create 1-on-1 for all employees",
            },
            VIEW: {
              id: "prf.module.1_on_1s.for_all_employees.view",
              name: "View 1-on-1s of all employees",
            },
            UPDATE: {
              id: "prf.module.1_on_1s.for_all_employees.update",
              name: "Edit 1-on-1s of all employees",
            },
            DELETE: {
              id: "prf.module.1_on_1s.for_all_employees.delete",
              name: "Delete 1-on-1s of all employees",
            },
            CANCEL: {
              id: "prf.module.1_on_1s.for_all_employees.cancel",
              name: "Cancel 1-on-1s of all employees",
            },
          },
        },
      },
      FEEDBACK: {
        id: "prf.module.feedback",
        name: "Feedback",
        FEEDBACK: {
          id: "prf.module.feedback.feedback",
          name: "Feedback",
          PERMISSION: {
            GIVE: {
              id: "prf.module.feedback.feedback.give",
              name: "Give feedback",
            },
            REQUEST: {
              id: "prf.module.feedback.feedback.request",
              name: "Request feedback",
            },
            WRITE_PRIVATE_NOTE: {
              id: "prf.module.feedback.feedback.write_private_note",
              name: "Write private note",
            },
            DELETE_PRIVATE_NOTE: {
              id: "prf.module.feedback.feedback.delete_private_note",
              name: "Delete private note",
            },
            VIEW_OWN: {
              id: "prf.module.feedback.feedback.view_own",
              name: "View their own feedback (given, received, pending)",
            },
          },
        },
        FOR_TEAM_MEMBERS: {
          id: "prf.module.feedback.for_team_members",
          name: "Feedback for team members",
          PERMISSION: {
            VIEW: {
              id: "prf.module.feedback.for_team_members.view",
              name: "View feedbacks for team members",
            },
          },
        },
        FOR_ALL_EMPLOYEES: {
          id: "prf.module.feedback.for_all_employees",
          name: "Feedback for all employees",
          PERMISSION: {
            VIEW: {
              id: "prf.module.feedback.for_all_employees.view",
              name: "View feedbacks for all employees",
            },
          },
        },
      },
      UPDATES: {
        id: "prf.module.updates",
        name: "Updates",
        UPDATES: {
          id: "prf.module.updates.updates",
          name: "Updates",
          PERMISSION: {
            VIEW_OWN: {
              id: "prf.module.updates.updates.view_own",
              name: "View private updates",
            },
            UPDATE: {
              id: "prf.module.updates.updates.update",
              name: "Edit updates",
            },
            SHARE: {
              id: "prf.module.updates.updates.share",
              name: "Share updates",
            },
            ADD_COMMENT: {
              id: "prf.module.updates.updates.add_comment",
              name: "Add comments on update",
            },
            UPDATE_COMMENT: {
              id: "prf.module.updates.updates.update_comment",
              name: "Edit comments on update",
            },
          },
          
        },
        UPDATES_FOR_TEAM_MEMBERS: {
          id: "prf.module.updates.updates_for_team_members",
          name: "Updates for team members",
          PERMISSION: {
            REVIEW: {
              id: "prf.module.updates.updates_for_team_members.review",
              name: "Review updates",
            },
            VIEW: {
              id: "prf.module.updates.updates_for_team_members.view",
              name: "View public updates for your team members",
            },
            SET_CUSTOM: {
              id: "prf.module.updates.updates_for_team_members.set_custom",
              name: "Set custom updates settings for team",
            },
          },
        },
        UPDATES_FOR_ALL_EMPLOYEES: {
          id: "prf.module.updates.updates_for_all_employees",
          name: "Updates for all employees",
          PERMISSION: {
            VIEW: {
              id: "prf.module.updates.updates_for_all_employees.view",
              name: "View public updates for all employees",
            },
          },
        },
      },
      GOALS: {
        id: "prf.module.goals",
        name: "Goals",
        MY_GOALS: {
          id: "prf.module.goals.my_goals",
          name: "My goals",
          PERMISSION: {
            CREATE: {
              id: "prf.module.goals.my_goals.create",
              name: "Create individual goal",
            },
            VIEW: {
              id: "prf.module.goals.my_goals.view",
              name: "View individual goal",
            },
            UPDATE: {
              id: "prf.module.goals.my_goals.update",
              name: "Edit individual goal",
            },
            DELETE: {
              id: "prf.module.goals.my_goals.delete",
              name: "Delete individual goal",
            },
          },
        },
        DEPARTMENT_GOALS: {
          id: "prf.module.goals.department_goals",
          name: "Department goals",
          PERMISSION: {
            CREATE: {
              id: "prf.module.goals.department_goals.create",
              name: "Create department goal",
            },
            VIEW: {
              id: "prf.module.goals.department_goals.view",
              name: "View department goal",
            },
            UPDATE: {
              id: "prf.module.goals.department_goals.update",
              name: "Edit department goal",
            },
            DELETE: {
              id: "prf.module.goals.department_goals.delete",
              name: "Delete department goal",
            },
          },
        },
        COMPANY_GOALS: {
          id: "prf.module.goals.company_goals",
          name: "Company goals",
          PERMISSION: {
            CREATE: {
              id: "prf.module.goals.company_goals.create",
              name: "Create company goal",
            },
            VIEW: {
              id: "prf.module.goals.company_goals.view",
              name: "View company goal",
            },
            UPDATE: {
              id: "prf.module.goals.company_goals.update",
              name: "Edit company goal",
            },
            DELETE: {
              id: "prf.module.goals.company_goals.delete",
              name: "Delete company goal",
            },
          },
        },
        COMPANY_GOALS_FOR_TEAM_MEMBERS: {
          id: "prf.module.goals.company_goals_for_team_members",
          name: "Company goals for team members",
          PERMISSION: {
            VIEW: {
              id: "prf.module.goals.company_goals_for_team_members.view",
              name: "View goals for team members",
            },
          },
        },
        COMPANY_GOALS_FOR_ALL_EMPLOYEES: {
          id: "prf.module.goals.company_goals_for_all_employees",
          name: "Company goals for all employees",
          PERMISSION: {
            VIEW: {
              id: "prf.module.goals.company_goals_for_all_employees.view",
              name: "View goals for all employees",
            },
          },
        },
      },
      REVIEWS: {
        id: "prf.module.reviews",
        name: "Reviews",
        REVIEWS: {
          id: "prf.module.reviews.reviews",
          name: "Reviews",
          PERMISSION: {
            PERFORM: {
              id: "prf.module.reviews.reviews.perform",
              name: "Perform reviews",
            },
            ENABLE_PEER_REVIEW: {
              id: "prf.module.reviews.reviews.enable_peer_review",
              name: "Enable peer selection",
            },
            VIEW: {
              id: "prf.module.reviews.reviews.view",
              name: "View reviews",
            },
          },
        },
      },
      CAREER_OR_GROWTH: {
        id: "prf.module.career_growth",
        name: "Career/growth",
        CAREER_PLAN: {
          id: "prf.module.career_growth.career_plan",
          name: "Career plan",
          PERMISSION: {
            EDIT_PLAN: {
              id: "prf.module.career_growth.career_plan.edit_plan",
              name: "Edit plan for whom he is selected as plan admin",
            },
            CREATE_SKILLS: {
              id: "prf.module.career_growth.career_plan.create_skills",
              name: "Create skills for whom he is selected as plan admin",
            },
            EDIT_SKILLS: {
              id: "prf.module.career_growth.career_plan.edit_skills",
              name: "Edit skills for whom he is selected as plan admin",
            },
            CREATE_PLAN_LVL: {
              id: "prf.module.career_growth.career_plan.create_plan_lvl",
              name: "Create plan levels for whom he is selected as plan admin",
            },
            EDIT_PLAN_LVL: {
              id: "prf.module.career_growth.career_plan.edit_plan_lvl",
              name: "Edit plan levels for whom he is selected as plan admin",
            },
          },
        },
        GROWTH_AREAS: {
          id: "prf.module.career_growth.growth_areas",
          name: "Growth areas",
          PERMISSION: {
            ADD: {
              id: "prf.module.career_growth.growth_areas.add",
              name: "Add growth area",
            },
            EDIT: {
              id: "prf.module.career_growth.growth_areas.edit",
              name: "Edit growth area",
            },
            DELETE: {
              id: "prf.module.career_growth.growth_areas.delete",
              name: "Delete growth area",
            },
          },
        },
        CAREER_VISION: {
          id: "prf.module.career_growth.career_vision",
          name: "Career vision",
          PERMISSION: {
            CREATE: {
              id: "prf.module.career_growth.career_vision.create",
              name: "Create career vision exercise",
            },
            VIEW: {
              id: "prf.module.career_growth.career_vision.view",
              name: "View career vision exercise",
            },
            ADD_RESPONSE: {
              id: "prf.module.career_growth.career_vision.add_response",
              name: "Add responses to exercise",
            },
          },
        },
      },
      DIRECTORY: {
        id: "prf.module.directory",
        name: "Directory",
        DIRECTORY: {
          id: "prf.module.directory.directory",
          name: "Directory",
          PERMISSION: {
            VIEW_LIST: {
              id: "prf.module.directory.directory.view_list",
              name: "View employees list",
            },
            VIEW_PROFILE: {
              id: "prf.module.directory.directory.view_profile",
              name: "View employee profile",
            },
          },
        },
      },
      REPORTS: {
        id: "prf.module.reports",
        name: "Reports",
        REPORTS: {
          id: "prf.module.reports.reports",
          name: "Reports",
          PERMISSION: {
            VIEW_1_ON_1s: {
              id: "prf.module.reports.reports.view_1_on_1s",
              name: "View 1-on-1 reports",
            },
            VIEW_FEEDBACK: {
              id: "prf.module.reports.reports.view_feedback",
              name: "View feedback reports",
            },
            VIEW_CAREER: {
              id: "prf.module.reports.reports.view_career",
              name: "View career reports",
            },
            VIEW_GOALS: {
              id: "prf.module.reports.reports.view_goals",
              name: "View goals reports",
            },
            VIEW_REVIEW: {
              id: "prf.module.reports.reports.view_review",
              name: "View review reports",
            },
            VIEW_COMPENSATION: {
              id: "prf.module.reports.reports.view_compensation",
              name: "View compensation reports",
            },
          },
        },
      },
      COMPENSATION: {
        id: "prf.module.compensation",
        name: "Compensation",
        COMPENSATION: {
          id: "prf.module.compensation.compensation",
          name: "Compensation",
          PERMISSION: {
            VIEW_OWN: {
              id: "prf.module.compensation.compensation.view_own",
              name: "View own compensation",
            },
            VIEW_ACTIVE_CYCLES: {
              id: "prf.module.compensation.compensation.view_active_cycles",
              name: "View active cycles ",
            },
            VIEW_COMPLETED_CYCLES: {
              id: "prf.module.compensation.compensation.view_completed_cycles",
              name: "View completed cycles ",
            },
            GIVE_RECOMMENDATION: {
              id: "prf.module.compensation.compensation.give_recommendation",
              name: "Give recommendation",
            },
            APPROVE_RECOMMENDATION: {
              id: "prf.module.compensation.compensation.approve_recommendation",
              name: "Approve recommendation",
            },
          },
        },
        COMPENSATION_FOR_TEAM_MEMBER: {
          id: "prf.module.compensation.compensation_for_team_member",
          name: "Compensation for team member",
          PERMISSION: {
            VIEW: {
              id: "prf.module.compensation.compensation_for_team_member.view",
              name: "View compensation result for team members",
            },
            DOWNLOAD: {
              id: "prf.module.compensation.compensation_for_team_member.download",
              name: "Download compensation result for team members",
            },
          },
        },
        COMPENSATION_FOR_ALL_EMPLOYEES: {
          id: "prf.module.compensation.compensation_for_all_employees",
          name: "Compensation for all employees",
          PERMISSION: {
            VIEW: {
              id: "prf.module.compensation.compensation_for_all_employees.view",
              name: "View compensation result for all employees",
            },
            DOWNLOAD: {
              id: "prf.module.compensation.compensation_for_all_employees.download",
              name: "Download compensation result for all employees",
            },
          },
        },
      },
    },
    SETTING: {
      id: "prf.setting",
      name: "Settings",
      PEOPLE: {
        id: "prf.setting.people",
        name: "People",
        PEOPLE: {
          id: "prf.setting.people.people",
          name: "People",
          PERMISSION: {
            ADD: {
              id: "prf.setting.people.people.add",
              name: "Add new employee",
            },
            VIEW: {
              id: "prf.setting.people.people.view",
              name: "View employee profile",
            },
            EDIT: {
              id: "prf.setting.people.people.edit",
              name: "Edit employee",
            },
            RESET_PWD: {
              id: "prf.setting.people.people.reset_pwd",
              name: "Reset password",
            },
            ACTIVATE_OR_DEACTIVATE: {
              id: "prf.setting.people.people.activate_deactivate",
              name: "Activate/deactivate employee",
            },
            RESEND_INVITE: {
              id: "prf.setting.people.people.resend_invite",
              name: "Resend invite",
            },
            LOGIN_AS: {
              id: "prf.setting.people.people.login_as",
              name: "Login as a user",
            },
          },
        },
        DEPARTMENTS: {
          id: "prf.setting.people.departments",
          name: "Departments",
          PERMISSION: {
            ADD: {
              id: "prf.setting.people.departments.add",
              name: "Add department",
            },
            VIEW: {
              id: "prf.setting.people.departments.view",
              name: "View departments",
            },
            EDIT: {
              id: "prf.setting.people.departments.edit",
              name: "Edit department",
            },
            DELETE: {
              id: "prf.setting.people.departments.delete",
              name: "Delete department",
            },
            SET_HEAD: {
              id: "prf.setting.people.departments.set_head",
              name: "Set department head",
            },
          },
        },
        GROUPS: {
          id: "prf.setting.people.groups",
          name: "Groups",
          PERMISSION: {
            ADD: {
              id: "prf.setting.people.groups.add",
              name: "Add group",
            },
            VIEW: {
              id: "prf.setting.people.groups.view",
              name: "View groups",
            },
            EDIT: {
              id: "prf.setting.people.groups.edit",
              name: "Edit group",
            },
            DELETE: {
              id: "prf.setting.people.groups.delete",
              name: "Delete group",
            },
          },
        },
        IMPERSONATIONS: {
          id: "prf.setting.people.impersonations",
          name: "Impersonations",
          PERMISSION: {
            VIEW_LOG: {
              id: "prf.setting.people.impersonations.view_log",
              name: "View impersonations log",
            },
          },
        },
        PERMISSIONS: {
          id: "prf.setting.people.permissions",
          name: "Permissions",
          PERMISSION: {
            ADD_ROLE: {
              id: "prf.setting.people.permissions.add_role",
              name: "Add new role",
            },
            VIEW_ROLE: {
              id: "prf.setting.people.permissions.view_role",
              name: "View roles",
            },
            EDIT_ROLE: {
              id: "prf.setting.people.permissions.edit_role",
              name: "Edit role",
            },
            DELETE_ROLE: {
              id: "prf.setting.people.permissions.delete_role",
              name: "Delete role",
            },
          },
        },
        USER_ATTRIBUTES: {
          id: "prf.setting.people.user_attributes",
          name: "User attributes",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.people.user_attributes.create",
              name: "Create attribute",
            },
            EDIT: {
              id: "prf.setting.people.user_attributes.edit",
              name: "Edit attribute",
            },
            ARCHIVE: {
              id: "prf.setting.people.user_attributes.archive",
              name: "Archive attribute",
            },
            RESTORE: {
              id: "prf.setting.people.user_attributes.restore",
              name: "Restore archived attribute",
            },
          },
        },
      },
      COMPANY: {
        id: "prf.setting.company",
        name: "Company",
        COMPANY: {
          id: "prf.setting.company.company",
          name: "Company",
          PERMISSION: {
            VIEW_PROFILE: {
              id: "prf.setting.company.company.view_profile",
              name: "View company profile",
            },
            EDIT_PROFILE: {
              id: "prf.setting.company.company.edit_profile",
              name: "Edit company profile",
            },
          },
        },
      },
      SETTINGS: {
        id: "prf.setting.settings",
        name: "Settings",
        SETTINGS: {
          id: "prf.setting.settings.settings",
          name: "Settings",
          PERMISSION: {
            INTEGRATION: {
              id: "prf.setting.settings.settings.integration",
              name: "Integration settings",
            },
            NOTIFICATIONS: {
              id: "prf.setting.settings.settings.notifications",
              name: "Notifications",
            },
            SSO: {
              id: "prf.setting.settings.settings.sso",
              name: "Single sign-on",
            },
            ACCOUNT: {
              id: "prf.setting.settings.settings.account",
              name: "Account status",
            },
          },
        },
      },
      REVIEWS: {
        id: "prf.setting.reviews",
        name: "Reviews",
        REVIEW_CYCLES: {
          id: "prf.setting.reviews.review_cycles",
          name: "Review cycles",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.reviews.review_cycles.create",
              name: "Create review cycle",
            },
            VIEW: {
              id: "prf.setting.reviews.review_cycles.view",
              name: "View review cycles",
            },
            EDIT: {
              id: "prf.setting.reviews.review_cycles.edit",
              name: "Edit review cycle",
            },
            DELETE: {
              id: "prf.setting.reviews.review_cycles.delete",
              name: "Delete review cycle",
            },
            DUPLICATE: {
              id: "prf.setting.reviews.review_cycles.duplicate",
              name: "Duplicate review cycle",
            },
            LAUNCH: {
              id: "prf.setting.reviews.review_cycles.launch",
              name: "Launch a review cycle and send notifications",
            },
            SEND_REMINDER: {
              id: "prf.setting.reviews.review_cycles.send_reminder",
              name: "Send reminders to reviewers",
            },
            APPROVE_PEER_REVIEW: {
              id: "prf.setting.reviews.review_cycles.approve_peer_review",
              name: "Approve peer nomination",
            },
            END: {
              id: "prf.setting.reviews.review_cycles.end",
              name: "End review cycle",
            },
          },
        },
        TEMPLATES: {
          id: "prf.setting.reviews.templates",
          name: "Templates",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.reviews.templates.create",
              name: "Create review template",
            },
            VIEW: {
              id: "prf.setting.reviews.templates.view",
              name: "View review templates",
            },
            EDIT: {
              id: "prf.setting.reviews.templates.edit",
              name: "Edit review template",
            },
            DELETE: {
              id: "prf.setting.reviews.templates.delete",
              name: "Delete review template",
            },
            DUPLICATE: {
              id: "prf.setting.reviews.templates.duplicate",
              name: "Duplicate review template",
            },
          },
        },
        QUESTIONS: {
          id: "prf.setting.reviews.questions",
          name: "Questions",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.reviews.questions.create",
              name: "Create review question",
            },
            VIEW: {
              id: "prf.setting.reviews.questions.view",
              name: "View review questions",
            },
            EDIT: {
              id: "prf.setting.reviews.questions.edit",
              name: "Edit review question",
            },
            DELETE: {
              id: "prf.setting.reviews.questions.delete",
              name: "Delete review question",
            },
            DUPLICATE: {
              id: "prf.setting.reviews.questions.duplicate",
              name: "Duplicate review question",
            },
          },
        },
      },
      CAREER: {
        id: "prf.setting.career",
        name: "Career",
        CAREER_PLANS: {
          id: "prf.setting.career.career_plans",
          name: "Career plans",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.career.career_plans.create",
              name: "Create career plan",
            },
            VIEW: {
              id: "prf.setting.career.career_plans.view",
              name: "View career plans",
            },
            EDIT: {
              id: "prf.setting.career.career_plans.edit",
              name: "Edit career plan",
            },
            DUPLICATE: {
              id: "prf.setting.career.career_plans.duplicate",
              name: "Duplicate career plan",
            },
            PUBLISH_OR_UNPUBLISH: {
              id: "prf.setting.career.career_plans.publish_unpublish",
              name: "Publish/unpublish career plan",
            },
            DELETE: {
              id: "prf.setting.career.career_plans.delete",
              name: "Delete career plan",
            },
          },
        },
        CAREER_GROUPS: {
          id: "prf.setting.career.career_groups",
          name: "Career groups",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.career.career_groups.create",
              name: "Create career group",
            },
            VIEW: {
              id: "prf.setting.career.career_groups.view",
              name: "View career groups",
            },
            EDIT: {
              id: "prf.setting.career.career_groups.edit",
              name: "Edit career group",
            },
            DELETE: {
              id: "prf.setting.career.career_groups.delete",
              name: "Delete career group",
            },
          },
        },
        TEMPLATES: {
          id: "prf.setting.career.templates",
          name: "Templates",
          PERMISSION: {
            VIEW: {
              id: "prf.setting.career.templates.view",
              name: "View career templates",
            },
            USE: {
              id: "prf.setting.career.templates.use",
              name: "Use career templates",
            },
          },
        },
        SKILLS: {
          id: "prf.setting.career.skills",
          name: "Skills",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.career.skills.create",
              name: "Create new skill",
            },
            VIEW: {
              id: "prf.setting.career.skills.view",
              name: "View skills",
            },
            EDIT: {
              id: "prf.setting.career.skills.edit",
              name: "Edit skill",
            },
            DELETE: {
              id: "prf.setting.career.skills.delete",
              name: "Delete skill",
            },
          },
        },
        CATEGORY: {
          id: "prf.setting.career.category",
          name: "Category",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.career.category.create",
              name: "Create new category",
            },
            VIEW: {
              id: "prf.setting.career.category.view",
              name: "View categories",
            },
            EDIT: {
              id: "prf.setting.career.category.edit",
              name: "Edit category",
            },
            DELETE: {
              id: "prf.setting.career.category.delete",
              name: "Delete category",
            },
          },
        },
        LIBRARY: {
          id: "prf.setting.career.library",
          name: "Library",
          PERMISSION: {
            VIEW: {
              id: "prf.setting.career.library.view",
              name: "View library",
            },
          },
        },
      },
      GOALS: {
        id: "prf.setting.goals",
        name: "Goals",
        GOALS: {
          id: "prf.setting.goals.goals",
          name: "Goals",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.goals.goals.create",
              name: "Create new goal cycle",
            },
            VIEW: {
              id: "prf.setting.goals.goals.view",
              name: "View goal cycle details",
            },
            EDIT: {
              id: "prf.setting.goals.goals.edit",
              name: "Edit goal cycle",
            },
            MARK_AS_ACTIVE_OR_INACTIVE: {
              id: "prf.setting.goals.goals.mark_as_active_inactive",
              name: "Mark cycle as active/inactive",
            },
            DELETE: {
              id: "prf.setting.goals.goals.delete",
              name: "Delete goal cycle",
            },
          },
        },
      },
      COMPENSATION: {
        id: "prf.setting.compensation",
        name: "Compensation",
        EMPLOYEE_PAY: {
          id: "prf.setting.compensation.employee_pay",
          name: "Employee pay",
          PERMISSION: {
            UPLOAD: {
              id: "prf.setting.compensation.employee_pay.upload",
              name: "Upload employee pay",
            },
            EDIT: {
              id: "prf.setting.compensation.employee_pay.edit",
              name: "Edit employee pay",
            },
            DELETE: {
              id: "prf.setting.compensation.employee_pay.delete",
              name: "Delete employee pay",
            },
            EXPORT: {
              id: "prf.setting.compensation.employee_pay.export",
              name: "Export (csv)",
            },
          },
        },
        COMPENSATION_BANDS: {
          id: "prf.setting.compensation.compensation_bands",
          name: "Compensation bands",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.compensation.compensation_bands.create",
              name: "Create compensation band",
            },
            EDIT: {
              id: "prf.setting.compensation.compensation_bands.edit",
              name: "Edit compensation band",
            },
            DELETE: {
              id: "prf.setting.compensation.compensation_bands.delete",
              name: "Delete compensation band",
            },
            EXPORT: {
              id: "prf.setting.compensation.compensation_bands.export",
              name: "Export bands",
            },
          },
        },
        COMPENSATION_CYCLES: {
          id: "prf.setting.compensation.compensation_cycles",
          name: "Compensation cycles",
          PERMISSION: {
            CREATE: {
              id: "prf.setting.compensation.compensation_cycles.create",
              name: "Create new cycle",
            },
            EDIT: {
              id: "prf.setting.compensation.compensation_cycles.edit",
              name: "Edit compensation cycle",
            },
            VIEW: {
              id: "prf.setting.compensation.compensation_cycles.view",
              name: "View compensation cycle details",
            },
            DELETE: {
              id: "prf.setting.compensation.compensation_cycles.delete",
              name: "Delete compensation cycle",
            },
          },
        },
      },
      _1_ON_1S: {
        id: "prf.setting.1_on_1s",
        name: "1-on-1s",
        _1_ON_1_LOGS: {
          id: "prf.setting.1_on_1s.1_on_1_logs",
          name: "1-on-1 logs",
          PERMISSION: {
            VIEW: {
              id: "prf.setting.1_on_1s.1_on_1_logs.view",
              name: "View 1-on-1 logs",
            },
            DOWNLOAD: {
              id: "prf.setting.1_on_1s.1_on_1_logs.download",
              name: "Download 1-on-1 logs (csv)",
            },
            VIEW_DETAILS: {
              id: "prf.setting.1_on_1s.1_on_1_logs.view_details",
              name: "View 1-on-1 details",
            },
            VIEW_INDIVIDUAL: {
              id: "prf.setting.1_on_1s.1_on_1_logs.view_individual",
              name: "View individual wise 1-on-1 log",
            },
            DOWNLOAD_INDIVIDUAL: {
              id: "prf.setting.1_on_1s.1_on_1_logs.download_individual",
              name: "Download individual wise (csv)",
            },
          },
        },
        TEMPLATES: {
          id: "prf.setting.1_on_1s.templates",
          name: "Templates",
          PERMISSION: {
            VIEW_ACTIVE: {
              id: "prf.setting.1_on_1s.templates.view_active",
              name: "View activated templates",
            },
            VIEW_INACTIVE: {
              id: "prf.setting.1_on_1s.templates.view_inactive",
              name: "View deactivated templates",
            },
            CREATE: {
              id: "prf.setting.1_on_1s.templates.create",
              name: "Create template",
            },
            PREVIEW: {
              id: "prf.setting.1_on_1s.templates.preview",
              name: "Preview template",
            },
            ACTIVATE_OR_DEACTIVATE: {
              id: "prf.setting.1_on_1s.templates.activate_deactivate",
              name: "Activate/deactivate template",
            },
            DUPLICATE: {
              id: "prf.setting.1_on_1s.templates.duplicate",
              name: "Duplicate template",
            },
            EDIT: {
              id: "prf.setting.1_on_1s.templates.edit",
              name: "Edit template",
            },
            DELETE: {
              id: "prf.setting.1_on_1s.templates.delete",
              name: "Delete template",
            },
          },
        },
        SETTINGS: {
          id: "prf.setting.1_on_1s.settings",
          name: "Settings",
          PERMISSION: {
            LIMIT_SETTINGS: {
              id: "prf.setting.1_on_1s.settings.limit_settings",
              name: "Limit 1-on-1 settings",
            },
            RECURRING_POINTS: {
              id: "prf.setting.1_on_1s.settings.recurring_points",
              name: "Recurring discussion points (company default)",
            },
            SUGGESTED_POINTS: {
              id: "prf.setting.1_on_1s.settings.suggested_points",
              name: "Suggested discussion points",
            },
            CONFIRMATION_EMAIL: {
              id: "prf.setting.1_on_1s.settings.confirmation_email",
              name: "Confirmation email",
            },
            DEFAULT_REMINDER: {
              id: "prf.setting.1_on_1s.settings.default_reminder",
              name: "Pre-meeting reminder",
            },
          },
        },
      },
      FEEDBACK: {
        id: "prf.setting.feedback",
        name: "Feedback",
        FEEDBACK_LOG: {
          id: "prf.setting.feedback.feedback_log",
          name: "Feedback log",
          PERMISSION: {
            VIEW_ALL: {
              id: "prf.setting.feedback.feedback_log.view_all",
              name: "View all feedback logs",
            },
            VIEW_PENDING_ONLY: {
              id: "prf.setting.feedback.feedback_log.view_pending_only",
              name: "View pending feedback logs",
            },
            VIEW_INDIVIDUAL: {
              id: "prf.setting.feedback.feedback_log.view_individual",
              name: "View feedback log employee wise",
            },
            DOWNLOAD: {
              id: "prf.setting.feedback.feedback_log.download",
              name: "Download (csv)",
            },
          },
        },
        SETTINGS: {
          id: "prf.setting.feedback.settings",
          name: "Settings",
          PERMISSION: {
            PERMITTED_FEEDBACK_TYPES: {
              id: "prf.setting.feedback.settings.permitted_feedback_types",
              name: "Permitted feedback types",
            },
            LAUNCH_PUBLICLY: {
              id: "prf.setting.feedback.settings.launch_publicly",
              name: "Launch public praise wall",
            },
          },
        },
      },
      UPDATES: {
        id: "prf.setting.updates",
        name: "Updates",
        UPDATES_LOG: {
          id: "prf.setting.updates.updates_log",
          name: "Updates log",
          PERMISSION: {
            VIEW: {
              id: "prf.setting.updates.updates_log.view",
              name: "View updates log",
            },
            VIEW_DETAIL: {
              id: "prf.setting.updates.updates_log.view_detail",
              name: "View update details",
            },
            DOWNLOAD: {
              id: "prf.setting.updates.updates_log.download",
              name: "Download in (csv) format",
            },
            DOWNLOAD_EXCEL: {
              id: "prf.setting.updates.updates_log.download_excel",
              name: "Download in excel format",
            },
            VIEW_INDIVIDUAL: {
              id: "prf.setting.updates.updates_log.view_individual",
              name: "View update log individual wise",
            },
          },
        },
        SETTINGS: {
          id: "prf.setting.updates.settings",
          name: "Settings",
          PERMISSION: {
            EDIT_GENERAL: {
              id: "prf.setting.updates.settings.edit_general",
              name: "Edit general settings",
            },
            EDIT_DEFAULT: {
              id: "prf.setting.updates.settings.edit_default",
              name: "Edit default settings",
            },
            
          },
        },
      },
    },
  },
  SSO_ADMIN: {
    id: "sso",
    MENU: {
      id: "sso.menu",
      name: "Menu",
      DASHBOARD: {
        id: "sso.menu.dashboard",
        name: "Dashboard",
        PERMISSION: {
          VIEW: {
            id: "sso.menu.dashboard.view",
            name: "View dashboard",
          },
        },
      },
      USER_MANAGEMENT: {
        id: "sso.menu.user_management",
        name: "User management",
        PERMISSION: {
          VIEW: {
            id: "sso.menu.user_management.view",
            name: "View user management",
          },
        },
      },
      COMPANY_MANAGEMENT: {
        id: "sso.menu.company_management",
        name: "Company management",
        PERMISSION: {
          VIEW: {
            id: "sso.menu.company_management.view",
            name: "View company management",
          },
        },
      },
      AUDIT_LOGS: {
        id: "sso.menu.audit_logs",
        name: "Audit logs",
        PERMISSION: {
          VIEW: {
            id: "sso.menu.audit_logs.view",
            name: "View audit logs",
          },
        },
      },
      BACKUP: {
        id: "sso.menu.backup",
        name: "Backup",
        PERMISSION: {
          VIEW: {
            id: "sso.menu.backup.view",
            name: "View backup",
          },
        },
      },
      CHAT: {
        id: "sso.menu.chat",
        name: "Chat",
        PERMISSION: {
          VIEW: {
            id: "sso.menu.chat.view",
            name: "View chat",
          },
        },
      },
    },
  },
  RECRUITING: {
    id: "rct",
    DASHBOARD: {
      id: "rct.dashboard",
      PERMISSION: {
        VIEW: {
          id: "rct.dashboard.view",
          name: "Can view the dashboard",
        },
      },
    },
    JOBS: {
      id: "rct.jobs",
      PERMISSION: {
        SUBMIT_REFERRAL: {
          id: "rct.jobs.submit_referral",
          name: "Can submit referral",
        },
        REVIEW_REFERRAL: {
          id: "rct.jobs.review_referral",
          name: "Can review previously submitted referrals",
        },
        SHARE_JOB_POSTS: {
          id: "rct.jobs.share_job_posts",
          name: "Can share job posts to social media",
        },
        ACCESS_INTERNAL_JOB_BOARD: {
          id: "rct.jobs.access_internal_job_board",
          name: "Can access your company's internal job board",
        },
        SCHEDULE_INTERVIEW: {
          id: "rct.jobs.schedule_interview",
          name: "Can be scheduled for interviews",
        },
        SUBMIT_SCORECARDS: {
          id: "rct.jobs.submit_scorecards",
          name: "Can submit scorecards",
        },
        VIEW_JOB_DASHBOARD_PIPELINE_REPORTS: {
          id: "rct.jobs.view_job_dashboard_pipeline_reports",
          name: "Can see the job's dashboard, pipeline, and reports",
        },
        CREATE_AND_REQUEST_JOB_APPROVAL: {
          id: "rct.jobs.create_request_job_approval",
          name: "Can create new jobs and request job approvals",
        },
        CREATE_JOB_STAGE_NAME: {
          id: "rct.jobs.create_job_stage_name",
          name: "Can create new job stage names",
        },
        INVITE_AND_DEACTIVATE_RECRUITERS: {
          id: "rct.jobs.invite_deactivate_recruiters",
          name: "Can invite and deactivate agency recruiters",
        },
        EDIT_JOB: {
          id: "rct.jobs.edit_job",
          name: "Can edit job info",
        },
        DELETE_JOB: {
          id: "rct.jobs.delete_job",
          name: "Can delete jobs",
        },
        MANAGE_JOB_POSTS: {
          id: "rct.jobs.manage_job_posts",
          name: "Can create, edit, and delete job posts",
        },
        CHANGE_JOB_POST_STATUS: {
          id: "rct.jobs.change_job_post_status",
          name: "Can change job posts status",
        },
        EDIT_FORM: {
          id: "rct.jobs.edit_form",
          name: "Can edit forms",
        },
        CONFIGURE_SCORECARD_ATTRIBUTES: {
          id: "rct.jobs.configure_scorecard_attributes",
          name: "Can configure scorecard attributes",
        },
        EDIT_INTERVIEW_PLAN: {
          id: "rct.jobs.edit_interview_plan",
          name: "Can edit interview plans",
        },
        EDIT_HIRING_TEAM: {
          id: "rct.jobs.edit_hiring_team",
          name: "Can edit hiring teams",
        },
        ADD_AND_REMOVE_AGENCY: {
          id: "rct.jobs.add_remove_agency",
          name: "Can add and remove agencies from jobs",
        },
        VIEW_AND_EDIT_PRIVATE_FIELDS_AND_APPROVE_OR_REQUEST_JOB_APPROVAL: {
          id: "rct.jobs.view_edit_private_fields_approve_request_job_approval",
          name: "Can view and edit private job fields and approve/request approval on jobs",
        },
        EDIT_JOB_APPROVAL: {
          id: "rct.jobs.edit_job_approval",
          name: "Can edit job approvals",
        },
        ADD_AND_REMOVE_USERS_FROM_JOB: {
          id: "rct.jobs.add_remove_users_from_job",
          name: "Can add and remove users to their assigned jobs",
        },
        MANAGE_STAGE_TRANSITION_RULES: {
          id: "rct.jobs.manage_stage_transition_rules",
          name: "Can create, edit, and delete stage transition rules",
        },
        MANAGE_STAGE_TRANSITION_RULES_ADVANCE_EXPERT_ONLY: {
          id: "rct.jobs.manage_stage_transition_rules_advance_expert_only",
          name: "Can create, edit, and delete stage transition rules (advanced and expert subscriptions only)",
        },
      },
    },
    CANDIDATES: {
      id: "rct.candidates",
      PERMISSION: {
        VIEW_CANDIDATES_ON_JOB: {
          id: "rct.candidates.view_candidates_on_job",
          name: "Can see all candidates on the job",
        },
        ADD_AND_EDIT_CANDIDATES_AND_REFERRALS: {
          id: "rct.candidates.add_edit_candidates_referrals",
          name: "Can add and edit candidates and referrals",
        },
        VIEW_SUBMITTED_SCORECARDS: {
          id: "rct.candidates.view_submitted_scorecards",
          name: "Can view candidate scorecards submitted by other users",
        },
        VIEW_AND_EDIT_PRIVATE_FIELDS: {
          id: "rct.candidates.view_edit_private_fields",
          name: "Can view and edit private candidate and application fields",
        },
        VIEW_AND_CREATE_PRIVATE_NOTES: {
          id: "rct.candidates.view_create_private_notes",
          name: "Can view and create private notes",
        },
        VIEW_AND_EDIT_OFFER_AND_APPROVE_OR_REQUEST_OFFER_APPROVAL: {
          id: "rct.candidates.view_edit_offer_approve_request_offer_approval",
          name: "Can view and edit offers and approve/request approval on offers",
        },
        EDIT_OFFER_APPROVAL: {
          id: "rct.candidates.edit_offer_approval",
          name: "Can edit offer approvals",
        },
        ADVANCE_CANDIDATES_OR_PROSPECTS: {
          id: "rct.candidates.advance_candidates_prospects",
          name: "Can advance candidates/prospects",
        },
        REJECT_CANDIDATES_OR_PROSPECTS: {
          id: "rct.candidates.reject_candidates_prospects",
          name: "Can reject candidates/prospects",
        },
        EMAIL_CANDIDATES_OR_PROSPECTS: {
          id: "rct.candidates.email_candidates_prospects",
          name: "Can email candidates/prospects",
        },
        CREATE_AND_VIEW_PRIVATE_CANDIDATES_OR_PROSPECTS: {
          id: "rct.candidates.create_view_private_candidates_prospects",
          name: "Can create and view private candidates/prospects",
        },
        VIEW_INTERNAL_CANDIDATES_OR_PROSPECTS: {
          id: "rct.candidates.view_internal_candidates_prospects",
          name: "Can view internal candidates/prospects",
        },
        MERGE_CANDIDATES_AND_PROSPECTS: {
          id: "rct.candidates.merge_candidates_prospects",
          name: "Can merge candidates and prospects",
        },
        MANAGE_UNATTACHED_PROSPECTS: {
          id: "rct.candidates.manage_unattached_prospects",
          name: "Can manage unattached prospects",
        },
        MANAGE_OFFER_TEMPLATES: {
          id: "rct.candidates.manage_offer_templates",
          name: "Can manage offer templates",
        },
      },
    },
    CRM: {
      id: "rct.crm",
      PERMISSION: {
        VIEW_PROSPECT_POOL: {
          id: "rct.crm.view_prospect_pool",
          name: "Can view prospect pools",
        },
        EDIT_PROSPECT_POOL: {
          id: "rct.crm.edit_prospect_pool",
          name: "Can edit prospect pools",
        },
        DELETE_PROSPECT_POOL: {
          id: "rct.crm.delete_prospect_pool",
          name: "Can delete prospect pools",
        },
        CREATE_EVENT: {
          id: "rct.crm.create_event",
          name: "Can create events",
        },
        VIEW_EVENT: {
          id: "rct.crm.view_event",
          name: "Can view events details",
        },
        ADD_AND_ORGANIZE_PROSPECTS: {
          id: "rct.crm.add_organize_prospects",
          name: "Can add & organize prospects",
        },
      },
    },
    REPORTS: {
      id: "rct.reports",
      PERMISSION: {
        CREATE_ORGANIZATION_REPORT_TEMPLATES: {
          id: "rct.reports.create_organization_report_templates",
          name: "Can create organization report templates",
        },
        EDIT_ORGANIZATION_REPORT_TEMPLATES: {
          id: "rct.reports.edit_organization_report_templates",
          name: "Can edit organization report templates",
        },
        DELETE_ORGANIZATION_REPORT_TEMPLATES: {
          id: "rct.reports.delete_organization_report_templates",
          name: "Can delete organization report templates",
        },
        CREATE_CUSTOM_REPORTS: {
          id: "rct.reports.create_custom_reports",
          name: "Can build custom reports",
        },
        VIEW_DEMOGRAPHICS_REPORT: {
          id: "rct.reports.view_demographics_report",
          name: "Can see demographics reports",
        },
      },
    },
    CONFIGURATION: {
      id: "rct.configuration",
      PERMISSION: {
        MANAGE_TEAM_MEMBERS_AND_INVITE_USERS: {
          id: "rct.configuration.manage_team_members_invite_users",
          name: "Manage team members and invite new users",
        },
        MANAGE_NOTIFICATIONS: {
          id: "rct.configuration.manage_notifications",
          name: "Manage notifications",
        },
        MANAGE_EMAIL_TEMPLATES: {
          id: "rct.configuration.manage_email_templates",
          name: "Manage email templates",
        },
        MANAGE_SOCIAL_TEMPLATES: {
          id: "rct.configuration.manage_social_templates",
          name: "Manage social templates",
        },
        MANAGE_OFFER_TEMPLATES: {
          id: "rct.configuration.manage_offer_templates",
          name: "Manage offer templates",
        },
        MANAGE_ORDER_HISTORY: {
          id: "rct.configuration.manage_order_history",
          name: "Manage order history",
        },
        MANAGE_JOB_BOARDS: {
          id: "rct.configuration.manage_job_boards",
          name: "Manage job boards",
        },
        MANAGE_CUSTOM_OPTIONS: {
          id: "rct.configuration.manage_custom_options",
          name: "Manage custom options i.e. (company custom fields + company metadata)",
        },
        MANAGE_AGENCIES: {
          id: "rct.configuration.manage_agencies",
          name: "Manage agencies",
        },
        MANAGE_DEV_CENTER: {
          id: "rct.configuration.manage_dev_center",
          name: "Manage dev center",
        },
        MANAGE_BULK_IMPORT: {
          id: "rct.configuration.manage_bulk_import",
          name: "Manage bulk import of candidates and prospects",
        },
      },
    },
  },
  ONBOARDING: {
    id: "onb",
    HOME: {
      id: "onb.home",
      PERMISSION: {
        VIEW: {
          id: "onb.home.view",
          name: "Can view the home module",
        },
      },
    },
    MY_TASKS: {
      id: "onb.my_tasks",
      PERMISSION: {
        VIEW: {
          id: "onb.my_tasks.view",
          name: "Can view my tasks",
        },
        MARK_COMPLETE_MINE: {
          id: "onb.my_tasks.mark_complete_mine",
          name: "Can mark complete the assign task",
        },
        CONFIGURE_ONBOARDING_TASKS: {
          id: "onb.my_tasks.configure_onb_tasks",
          name: "Can configure the onboarding tasks for future employees",
        },
        MANAGE_CURRENT_EMPLOYEE_TASKS: {
          id: "onb.my_tasks.manage_current_employee_tasks",
          name: "Can see and edit the tasks that have been assigned to current employees",
        },
        MANAGE_DIRECT_REPORT_TASKS: {
          id: "onb.my_tasks.manage_direct_report_tasks",
          name: "Can view and edit the tasks that have been assigned to direct reports",
        },
      },
    },
    REPORTS: {
      id: "onb.reports",
      PERMISSION: {
        MANAGE_FIELD_REPORTS: {
          id: "onb.reports.manage_field_reports",
          name: "Can manage field reports",
        },
        CREATE_AND_VIEW_EMPLOYEE_REPORTS: {
          id: "onb.reports.create_view_employee_reports",
          name: "Can create and access employee reports",
        },
        VIEW_E_SIGN_REPORT: {
          id: "onb.reports.view_e_sign_report",
          name: "Can view the e-signature report",
        },
        VIEW_NEW_HIRING_REPORT: {
          id: "onb.reports.view_new_hiring_report",
          name: "Can view the report on new hires",
        },
        VIEW_PENDING_HIRING_REPORT: {
          id: "onb.reports.view_pending_hiring_report",
          name: "Can view the report on pending hires",
        },
        VIEW_NEW_HIRING_TASKS: {
          id: "onb.reports.view_new_hiring_tasks",
          name: "Can view the tasks assigned to new hire report",
        },
        VIEW_LATEST_FEEDBACK_REPORT: {
          id: "onb.reports.view_latest_feedback_report",
          name: "Can view the stay on top of onboarding feedback report",
        },
        VIEW_NEW_HIRING_CHANGES_REPORT: {
          id: "onb.reports.view_new_hiring_changes_report",
          name: "Can view the report on new hire changes",
        },
      },
    },
    SETTINGS: {
      id: "onb.settings",
      PERMISSION: {
        MANAGE_EMPLOYEE_DOCS_AND_SIGN_REQUESTS: {
          id: "onb.settings.manage_employee_docs_sign_requests",
          name: "Can manage employee documents and signature requests",
        },
        VIEW_EMAIL_ACTIVITY: {
          id: "onb.settings.view_email_activity",
          name: "Can see the email activity tab on the employee profile",
        },
        VIEW_INTEGRATIONS: {
          id: "onb.settings.view_integrations",
          name: "Can use the integrations tab on the employee profile",
        },
        TERMINATE_EMPLOYEE: {
          id: "onb.settings.terminate_employee",
          name: "Can terminate employee",
        },
        RESEND_HIRING_EMAIL: {
          id: "onb.settings.resend_hiring_email",
          name: "Can resend new hire emails",
        },
        CREATE_WELCOME_EXPERIENCE: {
          id: "onb.settings.create_welcome_experience",
          name: "Can build welcome experience",
        },
        DELETE_EMPLOYEE: {
          id: "onb.settings.delete_employee",
          name: "Can delete employee record",
        },
        VIEW_SETTINGS_OVERVIEW: {
          id: "onb.settings.view_settings_overview",
          name: "Can view the settings overview section",
        },
        VIEW_COMPANY_INFO: {
          id: "onb.settings.view_company_info",
          name: "Can view the company info section",
        },
        VIEW_ONBOARDING_PLAN: {
          id: "onb.settings.view_onb_plan",
          name: "Can view the onboarding plan section",
        },
        VIEW_WELCOME_EXPERIENCE: {
          id: "onb.settings.view_welcome_experience",
          name: "Can view the welcome experience section",
        },
      },
    },
    NEW_HIRES: {
      id: "onb.new_hires",
      PERMISSION: {
        MANAGE_PENDING: {
          id: "onb.new_hires.manage_pending",
          name: "Can manage pending hires",
        },
        MANAGE_NEW: {
          id: "onb.new_hires.manage_new",
          name: "Can manage new hires",
        },
        VIEW_NEW: {
          id: "onb.new_hires.view_new",
          name: "Can view new hires",
        },
        ONBOARD: {
          id: "onb.new_hires.onboard",
          name: "Can onboard new hires",
        },
      },
    },
    FIELDS: {
      id: "onb.fields",
      PERMISSION: {
        VIEW: {
          id: "onb.fields.view",
          name: "Can view the fields",
        },
        EDIT: {
          id: "onb.fields.edit",
          name: "Can edit the fields",
        },
        DELETE: {
          id: "onb.fields.delete",
          name: "Can delete the fields",
        },
      },
    },
    PROFILE: {
      id: "onb.profile",
      PERMISSION: {
        VIEW: {
          id: "onb.profile.view",
          name: "Can view the profile",
        },
        EDIT: {
          id: "onb.profile.edit",
          name: "Can edit the profile",
        },
      },
    },
  },
};
