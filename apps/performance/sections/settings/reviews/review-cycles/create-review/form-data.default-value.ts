import type { FormValues } from "./form-data.schema";

export const defaultValues: FormValues = {
  name: '',
  reviewType: '',
  reviewees: '',
  downwardReview: false,
  selfReview: false,
  peerReview: false,
  upwardReview: false,
  downwardReviewType: '',
  downwardReviewTemplate: '',
  selfReviewTemplate: '',
  upwardReviewTemplate: '',
  peerReviewTemplate: '',
  launchDate: new Date(),
  launchTime: new Date().toLocaleTimeString(),
  reminder: undefined,
  reminderTime: undefined,
  endDate: undefined,
  endTime: undefined,
  shareWith: ''
}