export interface companyDefaultValues {
  companyName?: string;
  companySize?: null | string;
  contactNumber?: string;
  website?: string;
  missionStatement?: string;
  emailDomain?: string;
  timeZone?: null | string;
  currency?: null | string;
  limitInvite?: boolean;
  image?: null
}

export interface options {
  value: string;
  label: string;
}
export interface componentProps {
  id?: string;
  helperText?: string;
  Component?: any;
  componentProps?: any;
  options?: options[];
  companyLocation?: boolean;
}