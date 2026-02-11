import * as Yup from "yup";

export interface FormValues {
  name: string;
  reviewType: string;
  reviewees: string;
  downwardReview?: boolean;
  selfReview?: boolean;
  peerReview?: boolean;
  upwardReview?: boolean;
  downwardReviewType?: string;
  downwardReviewTemplate?: string;
  selfReviewTemplate?: string;
  upwardReviewTemplate?: string;
  peerReviewTemplate?: string;
  launchDate?: Date;
  launchTime?: any;
  reminder?: Date;
  reminderTime?: Date;
  endDate?: Date;
  endTime?: Date;
  shareWith: string;
}

export const reviewCycleSchema = Yup.object().shape({
  name: Yup.string().trim()
    .required("Cycle name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 35 characters"),
  reviewType: Yup.string().required("Review type is required"),
  reviewees: Yup.string().required("Reviewees employees is required"),
  downwardReview: Yup.boolean().optional(),
  selfReview: Yup.boolean().optional(),
  peerReview: Yup.boolean().optional(),
  upwardReview: Yup.boolean().optional(),
  downwardReviewType: Yup.string().when("downwardReview", ([downwardReview], field) =>
    downwardReview ? field.required("Downward review type is required") : field.optional()
  ),

  downwardReviewTemplate: Yup.string().when("downwardReview", ([downwardReview], field) =>
    downwardReview ? field.required("Downward review template is required") : field.optional()
  ),

  selfReviewTemplate: Yup.string().when("selfReview", ([selfReview], field) =>
    selfReview ? field.required("Self review template is required") : field.optional()
  ),

  upwardReviewTemplate: Yup.string().when("upwardReview", ([upwardReview], field) =>
    upwardReview ? field.required("Upward review template is required") : field.optional()
  ),

  peerReviewTemplate: Yup.string().when("peerReview", ([peerReview], field) =>
    peerReview ? field.required("Peer review template is required") : field.optional()
  ),
  // launchDate: Yup.mixed().optional(),
  // launchTime: Yup.mixed().optional(),
  // reminder: Yup.mixed().optional(),
  // reminderTime: Yup.mixed().optional(),
  launchDate: Yup.date().default(() => new Date()),
  launchTime: Yup.mixed().default(() => new Date().toLocaleTimeString()),
  reminder: Yup.mixed().optional(),
  reminderTime: Yup.mixed().optional(),
  endDate: Yup.string().when('launchDate', (launchDate: any, schema) => {
    return schema
      .required('Field is required')
      .test({
        test(endDate) {
          if (!endDate) return true;
          return new Date(endDate) >= new Date(launchDate);
        },
        message: 'End date must be greater than or equal to start date',
      });
  }),
  endTime: Yup.mixed().optional(),
  shareWith: Yup.string().required("Share review is required"),
});
