export interface rejectReasonTypes {
  id: number;
  label: string;
  value: string;
}

export interface rejectModalTypes {
  rejectionReason: string;
  rejectionNote: string;
  otherReasons: string;
  prospect: boolean;
  sendEmail: boolean;
}
