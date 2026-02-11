export interface candidateTypes {
  id: number;
  status: string;
  appliedDate: string;
  source: string;
}

export interface rejectionTypes {
  id: number;
  rejectBy: string;
  reason: string;
  notes: string;
}

export interface tagTypes {
  id: number;
  tag: string;
}

export interface filesTypes {
  id: number;
  resume: string;
  coverLetter: string;
  icon: JSX.Element;
}
