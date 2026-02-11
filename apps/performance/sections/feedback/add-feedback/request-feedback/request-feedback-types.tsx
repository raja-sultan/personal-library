import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface RequestFeedbackTypes {
  askFeedback: any;
  feedbackPrompt: any;
  addType: string;
  yourFeedback: string;
}

export interface RequestFeedback {
  onSubmit: (formData: RequestFeedbackTypes) => Promise<void>;
  handleSubmit: any;
  router: AppRouterInstance;
  methods: any;
  employeeData: any;
  transformedOptions: [];
  watch: any;
  redirectTo: boolean;
  isLoading: boolean;
}
