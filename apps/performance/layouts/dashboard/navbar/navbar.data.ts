import { PERMISSIONS } from "@enums/permissions";

const {
    DASHBOARD,
    MY_TEAM,
    _1_ON_1S,
    FEEDBACK,
    UPDATES,
    CAREER,
    GOALS,
    REVIEWS,
    COMPENSATION,
    REPORTS,
    DIRECTORY,
} = PERMISSIONS.MENU.PERFORMANCE;

export const routePermissions = {
    "/dashboard": DASHBOARD.PERMISSION.VIEW,
    "/my-team": MY_TEAM.PERMISSION.VIEW,
    "/one-on-ones": _1_ON_1S.PERMISSION.VIEW,
    "/feedback": FEEDBACK.PERMISSION.VIEW,
    "/updates": UPDATES.PERMISSION.VIEW,
    "/career": CAREER.PERMISSION.VIEW,
    "/goals": GOALS.PERMISSION.VIEW,
    "/reviews": REVIEWS.PERMISSION.VIEW,
    "/compensation": COMPENSATION.PERMISSION.VIEW,
    "/reports": REPORTS.PERMISSION.VIEW,
    "/directory": DIRECTORY.PERMISSION.VIEW,
};

export const pagesNavbar = [
    { id: 1, title: "Home", link: "/dashboard" },
    { id: 2, title: "My Team", link: "/my-team" },
    { id: 3, title: "1-on-1s", link: "/one-on-ones" },
    { id: 4, title: "Feedback", link: "/feedback" },
    { id: 5, title: "Updates", link: "/updates" },
    {
        id: 6,
        title: "Career",
        link: "/career",
    },
    { id: 7, title: "Goals", link: "/goals" },
    { id: 8, title: "Reviews", link: "/reviews" },
    {
        id: 9,
        title: "Compensation",
        link: "/compensation",
    },
    { id: 10, title: "Reports", link: "/reports" },
    {
        id: 11,
        title: "Directory",
        link: "/directory",
    },
];