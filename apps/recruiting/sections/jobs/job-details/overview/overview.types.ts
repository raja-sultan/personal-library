export interface applicationReviewsTypes {
  id: number;
  status: string;
  title: string;
  feedback: string;
  day: string;
}

export interface pipeLineTypes {
  type: "select";
  FieldProps: {
    name: string;
    placeholder?: string;
    label?: string;
  };
  options?: { label: string; value: string }[];
}
