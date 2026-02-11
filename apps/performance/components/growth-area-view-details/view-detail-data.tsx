interface ViewDetail {
  id?: string;
  name?: string;
  description?: string;
  growthPeriod?: string;
  dueDate?: string;
  action?: {
    id: string;
    value: string;
  }[];
}

interface CommentsInter {
  id?: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  time?: string;
}

export const viewDetailData: ViewDetail[] = [
  {
    id: "1",
    name: "L1 - Brand Designer",
    description:
      "Learn how to create layouts that adapt gracefully to various screen sizes and orientations, ensuring a consistent user experience across different devices.",
    // growthPeriod: "2 months",
    // dueDate: "1 Oct 2023",
    // action: [
    //   {
    //     id: "1",
    //     value: "Style Guide",
    //   },
    //   {
    //     id: "2",
    //     value: "Micro Interactions",
    //   },
    // ],
  },
];
export const commentsData: CommentsInter[] = [
  {
    id: "1",
    image: "",
    firstName: "Rachel",
    lastName: "Samson",
    time: "22 days ago",
    description:
      "The employee has met expectations about their career growth and have performed very well in the last year",
  },
];
