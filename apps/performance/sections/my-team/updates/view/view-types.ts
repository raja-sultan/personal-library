interface Point {
  _id: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  comments: any;
  question?: string;
}

interface Data {
  _id: string;
  from: string;
  to: string;
  status: string;
  points: Point[];
  sentimentScoreEnabled: boolean;
  sentimentScore: number;
  type: string;
  publishedAt: string;
  userId: string;
  userIds: string[];
  managerId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  reviewedAt: string;
}

interface ApiResponse {
  data: Data;
  message: string;
  errors: any;
}

export interface ReturnType {
  singleUpdate: ApiResponse;
  user: ApiResponse;
  addComment: any;
  refetch: any;
  isLoading: any;
  deleteComment: any;
  handlerMark: () => void;
}
