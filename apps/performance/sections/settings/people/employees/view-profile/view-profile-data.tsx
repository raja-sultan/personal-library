import { ClockIcon } from "@assets/icons/clock-icon";
import { EmailIcon } from "@assets/icons/email-icon";
import { PhoneNumberIcon } from "@assets/icons/phone-number-icon";
import { reportsAvatar } from "@assets/images";
import type { profileDataProps } from "@sections/profile/profile.types";

export const profileData: profileDataProps = {
  profileReviewsData: [
    {
      id: 1,
      title: "Consulting Services Project",
      status: "active",
      buttonText: "Perform reviews",
    },
    {
      id: 2,
      title: "Marketing Team Q1 Review",
      status: "ended",
      buttonText: "Select peers",
    },
  ],
  profileGoalsData: [
    {
      id: 1,
      title: "Consulting Services Project",
      status: "on track",
      percentage: "20%",
    },
    {
      id: 2,
      title: "Marketing Team Q1 Review",
      status: "off track",
      percentage: "2%",
    },
  ],
  profileGrowthAreas: [
    {
      id: 1,
      title: "Design System",
      desc: "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",
    },
    {
      id: 2,
      title: "Wireframes",
      status: "completed",
      desc: "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",
    },
    {
      id: 2,
      title: "Design System",
      desc: "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",
    },
  ],
  information: {
    personalInfo: [
      { id: 1, icon: <EmailIcon />, title: "robertmathew@orcalo.co.uk" },
      { id: 2, icon: <PhoneNumberIcon />, title: "+44 7700 900077" },
      { id: 3, icon: <ClockIcon />, title: "8:25 Am (London)" },
    ],
    desc: "My passion lies in creating intuitive, user-centered designs that provide exceptional user experiences. I have wealth of experience in designing for various platforms, including web, mobile, and desktop applications. My designs are not only visually appealing but also highly functional and easy to use.",
    department: "Design",
    directReports: {
      img: reportsAvatar,
      name: "Ronald Richards",
    },
    startDate: "Jan 01, 2023",
    gender: "Male",
  },
};
