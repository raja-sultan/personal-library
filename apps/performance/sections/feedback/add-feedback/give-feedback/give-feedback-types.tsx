import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface GiveFeedbackTypes {
  feedbackReceiverId: string;
  feedbackVisibility: string;
  senderFeedbackText: string;
  selectedEmoji: string;
}

export interface GiveFeedback {
  onSubmit: (formData: GiveFeedbackTypes) => Promise<void>;
  handleSubmit: any;
  router: AppRouterInstance;
  methods: any;
  handleReaction: any;
  selectedEmoji: string | null;
  employeeData: any;
  transformedOptions: string[];
  isLoading: boolean;
}

export interface FormValues {
  feedbackReceiverId: any[] | null;
  feedbackVisibility: string;
  senderFeedbackText: string;
  rating: null | any;
  feedbackType: string;
  feedbackSenderId: any[] | null;
}
