export interface EditProfileFormFields {
  firstName: string;
  lastName: string;
  pronouns?: string[];
  email?: string;
  asyncAddressLine: {
    id?: string;
    addressLine: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contactNumber?: string;
  dob?: Date;
  gender?: string;
  ethnicity?: string;
  maritalStatus?: string;
  about?: string;
  address: {
    addressLine: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
  };
  employeeId?: string;
  workEmail: string;
  employmentStartDate?: string;
  timeZone?: string;
  employeeTitle?: string;
  department: string;
  managerId?: string;
  location: string;
  employmentStatus?: string;
  jobLevel?: string;
  emergencyContact: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    relationship?: string;
  };
}
