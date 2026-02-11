import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface privateNote {
  addType: string;
  yourFeedback: string;
}

export interface giveFeedback {
  onSubmit: (formData: privateNote) => Promise<void>;
  handleSubmit: any;
  router: AppRouterInstance;
  methods: any;
  employeeData: any;
  watch: any;
  isLoading: boolean;
}
